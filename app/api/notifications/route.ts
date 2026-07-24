import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { countUnread, listNotifications } from "@/lib/db/notifications";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ notifications: [], unread: 0 });
  }
  const [notifications, unread] = await Promise.all([
    listNotifications(session.userId),
    countUnread(session.userId),
  ]);
  return NextResponse.json({ notifications, unread });
}
