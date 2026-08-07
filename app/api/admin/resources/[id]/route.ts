import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteResource, findDuplicateByUrl, getResourceById, updateResource } from "@/lib/db/resources";
import { isSubmittableCategory } from "@/lib/db/categories";
import { formatZodIssues, resourceSchema } from "@/lib/validation";
import { RESOURCES_TAG } from "@/lib/cache";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invÃ¡lido" }, { status: 400 });
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

  const current = await getResourceById(id);
  if (!current) {
    return NextResponse.json({ error: "El recurso no existe" }, { status: 404 });
  }

  const duplicate = await findDuplicateByUrl(parsed.data.url);
  if (duplicate && duplicate.id !== id) {
    return NextResponse.json(
      { error: "Ya existe otro recurso con esa URL." },
      { status: 409 }
    );
  }

  const resource = await updateResource(id, {
    ...parsed.data,
    featured: parsed.data.featured ?? false,
  });

  revalidateTag(RESOURCES_TAG, { expire: 0 });
  revalidatePath("/", "page");
  revalidatePath(`/recurso/${id}`, "page");

  return NextResponse.json({ resource });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;
  const ok = await deleteResource(id);
  if (!ok) {
    return NextResponse.json({ error: "El recurso no existe" }, { status: 404 });
  }
  revalidateTag(RESOURCES_TAG, { expire: 0 });
  revalidatePath("/", "page");
  return NextResponse.json({ ok: true });
}
