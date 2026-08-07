import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { adminCreateResource, findDuplicateByUrl, listPendingResources } from "@/lib/db/resources";
import { isSubmittableCategory } from "@/lib/db/categories";
import { formatZodIssues, resourceSchema } from "@/lib/validation";
import { RESOURCES_TAG } from "@/lib/cache";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const pending = await listPendingResources();
  return NextResponse.json({ resources: pending });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

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

  const duplicate = await findDuplicateByUrl(parsed.data.url);
  if (duplicate) {
    return NextResponse.json(
      { error: "Ya existe un recurso con esa URL (aprobado o pendiente)." },
      { status: 409 }
    );
  }

  const resource = await adminCreateResource({
    ...parsed.data,
    featured: parsed.data.featured ?? false,
    admin: { userId: admin.userId, name: admin.name },
  });

  revalidateTag(RESOURCES_TAG, { expire: 0 });
  revalidatePath("/", "page");

  return NextResponse.json({ resource }, { status: 201 });
}
