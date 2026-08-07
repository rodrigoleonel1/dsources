import { NextResponse } from "next/server";
import { findDuplicateByUrl, submitResource } from "@/lib/db/resources";
import { isSubmittableCategory } from "@/lib/db/categories";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { checkBlacklist } from "@/lib/blacklist";
import { formatZodIssues, resourceSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const limit = await rateLimit({
    action: "submit-resource",
    identifier: getClientIp(req),
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

  const parsed = resourceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: formatZodIssues(parsed.error) },
      { status: 400 }
    );
  }

  if (!(await isSubmittableCategory(parsed.data.category))) {
    return NextResponse.json({ error: "La categoría elegida no existe" }, { status: 400 });
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

  const resource = await submitResource(parsed.data);

  return NextResponse.json({ resource }, { status: 201 });
}
