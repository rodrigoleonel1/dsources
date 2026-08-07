import { NextResponse } from "next/server";
import { listResources } from "@/lib/db/resources";
import { getCategories } from "@/lib/db/categories";
import type { CategoryKey } from "@/data/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const catParam = searchParams.get("cat") || "todas";
  const categories = await getCategories();
  const category: CategoryKey = categories.some((c) => c.key === catParam)
    ? (catParam as CategoryKey)
    : "todas";
  const query = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sortParam = searchParams.get("sort");
  const sort = sortParam === "populares" ? "populares" : "recientes";
  const featured = searchParams.get("featured") === "1";

  const result = await listResources({
    category,
    query,
    page,
    status: "approved",
    sort,
    featured,
  });

  return NextResponse.json({
    resources: result.resources,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
  });
}
