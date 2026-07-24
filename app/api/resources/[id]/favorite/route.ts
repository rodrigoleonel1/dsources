import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { toggleFavorite } from "@/lib/db/favorites";
import { getResourceById } from "@/lib/db/resources";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Necesitás iniciar sesión" }, { status: 401 });
  }

  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource || resource.status !== "approved") {
    return NextResponse.json({ error: "Recurso no encontrado" }, { status: 404 });
  }

  const favorited = await toggleFavorite(session.userId, id);
  return NextResponse.json({ favorited });
}
