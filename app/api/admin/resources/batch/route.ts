import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { reviewResourcesBatch } from "@/lib/db/resources";
import { RESOURCES_TAG } from "@/lib/cache";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  let body: { ids?: unknown; decision?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const decision = body.decision;
  if (decision !== "approve" && decision !== "reject") {
    return NextResponse.json({ error: "Decisión inválida" }, { status: 400 });
  }

  const ids = Array.isArray(body.ids)
    ? body.ids.filter((id): id is string => typeof id === "string")
    : [];
  if (ids.length === 0) {
    return NextResponse.json(
      { error: "No se seleccionaron recursos" },
      { status: 400 }
    );
  }
  if (ids.length > 200) {
    return NextResponse.json(
      { error: "Demasiados recursos en una sola acción (máximo 200)" },
      { status: 400 }
    );
  }

  const { reviewed, notFound } = await reviewResourcesBatch(
    ids,
    decision === "approve" ? "approved" : "rejected",
    { userId: admin.userId, name: admin.name }
  );

  revalidateTag(RESOURCES_TAG, { expire: 0 });
  revalidatePath("/", "page");

  return NextResponse.json({ reviewed, notFound });
}
