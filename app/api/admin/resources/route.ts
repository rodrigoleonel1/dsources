import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { adminCreateResource, findDuplicateByUrl, listPendingResources } from "@/lib/db/resources";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { CATEGORY_COUNTS_TAG } from "@/lib/cache";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(300),
  url: z.string().trim().url("La URL no es válida"),
  tags: z.array(z.string().trim().min(1).max(24)).min(1).max(8),
  category: z.enum(SUBMITTABLE_CATEGORY_KEYS as [string, ...string[]]),
});

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
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
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
    category: parsed.data.category as (typeof SUBMITTABLE_CATEGORY_KEYS)[number],
    admin: { userId: admin.userId, name: admin.name },
  });

  revalidateTag(CATEGORY_COUNTS_TAG);

  return NextResponse.json({ resource }, { status: 201 });
}
