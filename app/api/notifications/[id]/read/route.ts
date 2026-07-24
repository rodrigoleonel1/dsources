import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { markAsRead } from "@/lib/db/notifications";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }
  const { id } = await params;
  await markAsRead(session.userId, id);
  return NextResponse.json({ ok: true });
}
