import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getFavoriteResourceIds } from "@/lib/db/favorites";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ids: [] });
  }
  const ids = await getFavoriteResourceIds(session.userId);
  return NextResponse.json({ ids });
}
