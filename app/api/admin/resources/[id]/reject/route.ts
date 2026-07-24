import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { reviewResource } from "@/lib/db/resources";
import { createNotification } from "@/lib/db/notifications";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;
  const resource = await reviewResource(id, "rejected", {
    userId: admin.userId,
    name: admin.name,
  });
  if (!resource) {
    return NextResponse.json(
      { error: "El recurso no existe o ya fue revisado" },
      { status: 404 }
    );
  }
  if (resource.submittedBy) {
    await createNotification({
      userId: resource.submittedBy.userId,
      type: "resource_rejected",
      message: `Tu recurso "${resource.name}" no fue aprobado.`,
      resourceId: resource.id,
    });
  }
  return NextResponse.json({ resource });
}
