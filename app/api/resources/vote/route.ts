import { NextResponse } from "next/server";
import { voteResource } from "@/lib/db/resources";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const limit = await rateLimit({
    action: "vote",
    identifier: getClientIp(req),
    limit: 30,
    windowSeconds: 15 * 60,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiados votos en poco tiempo. Probá de nuevo más tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { resourceId?: unknown; delta?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { resourceId, delta } = body;
  if (typeof resourceId !== "string" || (delta !== 1 && delta !== -1)) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const votes = await voteResource(resourceId, delta);
  if (votes === null) {
    return NextResponse.json({ error: "El recurso no existe" }, { status: 404 });
  }

  return NextResponse.json({ votes });
}
