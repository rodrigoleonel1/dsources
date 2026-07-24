import { NextResponse } from "next/server";
import { getAllTagsWithCounts } from "@/lib/db/resources";

export async function GET() {
  const tags = await getAllTagsWithCounts();
  return NextResponse.json({ tags: tags.map((t) => t.tag) });
}
