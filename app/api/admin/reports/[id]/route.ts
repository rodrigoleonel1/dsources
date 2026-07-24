import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { dismissReport } from "@/lib/db/reports";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const { id } = await params;
  const ok = await dismissReport(id);
  if (!ok) {
    return NextResponse.json({ error: "El reporte no existe" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
