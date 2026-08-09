import "server-only";
import { unstable_cache } from "next/cache";
import {
  countResourcesByCategory,
  getAllTagsWithCounts,
} from "@/lib/db/resources";
import type { CategoryKey } from "@/data/types";

/** Revalidated whenever resources are created/edited/reviewed/deleted. */
export const RESOURCES_TAG = "resources";

function getCachedTagsWithCounts(category?: CategoryKey) {
  const key = category && category !== "todas" ? category : "todas";
  return unstable_cache(
    async () => getAllTagsWithCounts(category),
    [`tags-with-counts`, key],
    { tags: [RESOURCES_TAG], revalidate: 300 }
  )();
}

const getCachedCategoryCounts = unstable_cache(
  async () => countResourcesByCategory(),
  ["category-counts"],
  { tags: [RESOURCES_TAG], revalidate: 300 }
);

export { getCachedTagsWithCounts, getCachedCategoryCounts };