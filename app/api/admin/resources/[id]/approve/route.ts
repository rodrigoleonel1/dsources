import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { reviewResource } from "@/lib/db/resources";
import { createNotification } from "@/lib/db/notifications";
import { CATEGORY_COUNTS_TAG } from "@/lib/cache";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;
  const resource = await reviewResource(id, "approved", {
    userId: admin.userId,
    name: admin.name,
  });
  if (!resource) {
    return NextResponse.json(
      { error: "El recurso no existe o ya fue revisado" },
      { status: 404 }
    );
  }
  revalidateTag(CATEGORY_COUNTS_TAG);
  if (resource.submittedBy) {
    await createNotification({
      userId: resource.submittedBy.userId,
      type: "resource_approved",
      message: `Tu recurso "${resource.name}" fue aprobado y ya está publicado.`,
      resourceId: resource.id,
    });
  }
  return NextResponse.json({ resource });
}
