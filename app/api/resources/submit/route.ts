import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { findDuplicateByUrl, submitResource } from "@/lib/db/resources";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { rateLimit } from "@/lib/rate-limit";
import { checkBlacklist } from "@/lib/blacklist";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10, "Contá un poco más (mínimo 10 caracteres)").max(300),
  url: z.string().trim().url("La URL no es válida"),
  tags: z
    .array(z.string().trim().min(1).max(24))
    .min(1, "Agregá al menos un tag")
    .max(8, "Máximo 8 tags"),
  category: z.enum(SUBMITTABLE_CATEGORY_KEYS as [string, ...string[]]),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }

  const limit = await rateLimit({
    action: "submit-resource",
    identifier: session.userId,
    limit: 10,
    windowSeconds: 60 * 60,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Enviaste demasiados recursos en poco tiempo. Probá de nuevo más tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const blacklistReason = checkBlacklist(parsed.data);
  if (blacklistReason) {
    return NextResponse.json({ error: blacklistReason }, { status: 400 });
  }

  const duplicate = await findDuplicateByUrl(parsed.data.url);
  if (duplicate) {
    const msg =
      duplicate.status === "approved"
        ? "Ese recurso ya está publicado en Dsources."
        : "Ese recurso ya fue enviado y está pendiente de revisión.";
    return NextResponse.json({ error: msg }, { status: 409 });
  }

  const resource = await submitResource({
    ...parsed.data,
    category: parsed.data.category as (typeof SUBMITTABLE_CATEGORY_KEYS)[number],
    submittedBy: { userId: session.userId, name: session.name },
  });

  return NextResponse.json({ resource }, { status: 201 });
}
