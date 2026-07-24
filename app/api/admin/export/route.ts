import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { exportAllResources } from "@/lib/db/resources";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const resources = await exportAllResources();
  const payload = {
    exportedAt: new Date().toISOString(),
    count: resources.length,
    resources,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="dsources-backup-${Date.now()}.json"`,
    },
  });
}
