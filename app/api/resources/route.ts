import { NextResponse } from "next/server";
import { listResources } from "@/lib/db/resources";
import { getCategories } from "@/lib/db/categories";
import { requireAdmin } from "@/lib/auth";
import type { CategoryKey } from "@/data/types";

export async function GET(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const catParam = searchParams.get("cat") || "todas";
  const categories = await getCategories();
  const category: CategoryKey = categories.some((c) => c.key === catParam)
    ? (catParam as CategoryKey)
    : "todas";
  const query = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const result = await listResources({ category, query, page, status: "approved" });
  return NextResponse.json(result);
}
