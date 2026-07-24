import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getResourceById } from "@/lib/db/resources";
import { createReport } from "@/lib/db/reports";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({
  reason: z.string().trim().max(200).optional().default(""),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource || resource.status !== "approved") {
    return NextResponse.json({ error: "Recurso no encontrado" }, { status: 404 });
  }

  const session = await getSession();
  const identifier = session?.userId ?? getClientIp(req);
  const limit = await rateLimit({
    action: "report-resource",
    identifier,
    limit: 5,
    windowSeconds: 60 * 60,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Ya reportaste varios recursos. Probá de nuevo más tarde." },
      { status: 429 }
    );
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    // reason is optional, an empty/invalid body is fine
  }
  const parsed = schema.safeParse(body);

  await createReport({
    resourceId: resource.id,
    resourceName: resource.name,
    reason: parsed.success && parsed.data.reason ? parsed.data.reason : "Enlace roto o inválido",
    reportedBy: session ? { userId: session.userId, name: session.name } : null,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
