import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { markAllAsRead } from "@/lib/db/notifications";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }
  await markAllAsRead(session.userId);
  return NextResponse.json({ ok: true });
}
