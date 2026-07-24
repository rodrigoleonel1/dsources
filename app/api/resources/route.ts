import { NextResponse } from "next/server";
import { listResources } from "@/lib/db/resources";
import { ALL_CATEGORY_KEYS } from "@/data/category-keys";
import type { CategoryKey } from "@/data/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const catParam = searchParams.get("cat") || "todas";
  const category: CategoryKey = (ALL_CATEGORY_KEYS as string[]).includes(catParam)
    ? (catParam as CategoryKey)
    : "todas";
  const query = searchParams.get("q") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const result = await listResources({ category, query, page, status: "approved" });
  return NextResponse.json(result);
}
