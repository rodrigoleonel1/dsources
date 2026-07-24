import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listReports } from "@/lib/db/reports";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  const reports = await listReports();
  return NextResponse.json({ reports });
}
