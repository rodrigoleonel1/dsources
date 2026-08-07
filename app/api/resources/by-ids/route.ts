import { NextResponse } from "next/server";
import { listResourcesByIds } from "@/lib/db/resources";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get("ids") || "").split(",").map((s) => s.trim()).filter(Boolean);

  const byId = new Map((await listResourcesByIds(raw)).map((r) => [r.id, r]));
  const approved = raw
    .map((id) => byId.get(id))
    .filter((r): r is NonNullable<typeof r> => !!r && r.status === "approved");

  return NextResponse.json({ resources: approved });
}
