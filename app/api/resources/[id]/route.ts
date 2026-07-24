import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { deleteOwnPendingResource, findDuplicateByUrl, updateOwnPendingResource } from "@/lib/db/resources";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { checkBlacklist } from "@/lib/blacklist";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(300),
  url: z.string().trim().url("La URL no es válida"),
  tags: z.array(z.string().trim().min(1).max(24)).min(1).max(8),
  category: z.enum(SUBMITTABLE_CATEGORY_KEYS as [string, ...string[]]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }
  const { id } = await params;

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
  if (duplicate && duplicate.id !== id) {
    return NextResponse.json({ error: "Ya existe otro recurso con esa URL." }, { status: 409 });
  }

  const resource = await updateOwnPendingResource(id, session.userId, {
    ...parsed.data,
    category: parsed.data.category as (typeof SUBMITTABLE_CATEGORY_KEYS)[number],
  });

  if (!resource) {
    return NextResponse.json(
      { error: "No se pudo editar: el recurso no existe, no es tuyo o ya fue revisado." },
      { status: 404 }
    );
  }

  return NextResponse.json({ resource });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteOwnPendingResource(id, session.userId);
  if (!ok) {
    return NextResponse.json(
      { error: "No se pudo retirar: el recurso no existe, no es tuyo o ya fue revisado." },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
