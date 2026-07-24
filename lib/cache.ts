import "server-only";
import { unstable_cache } from "next/cache";
import { countByCategory } from "@/lib/db/resources";

export const CATEGORY_COUNTS_TAG = "category-counts";

/**
 * Category counts are read on almost every page render (sidebar badges) but
 * only change when a resource is approved, rejected, added or deleted.
 * Cache them for a few minutes and invalidate eagerly via revalidateTag
 * whenever a mutation happens, instead of hitting Mongo on every request.
 */
const getCachedCategoryCountsEntries = unstable_cache(
  async () => Array.from((await countByCategory("approved")).entries()),
  ["category-counts-approved"],
  { tags: [CATEGORY_COUNTS_TAG], revalidate: 300 }
);

export async function getCachedCategoryCounts() {
  const entries = await getCachedCategoryCountsEntries();
  return new Map(entries);
}
