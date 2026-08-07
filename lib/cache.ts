import "server-only";
import { unstable_cache } from "next/cache";
import {
  countResourcesByCategory,
  getAllTagsWithCounts,
} from "@/lib/db/resources";

/** Revalidated whenever resources are created/edited/reviewed/deleted. */
export const RESOURCES_TAG = "resources";

const getCachedTagsWithCounts = unstable_cache(
  async () => getAllTagsWithCounts(),
  ["tags-with-counts"],
  { tags: [RESOURCES_TAG], revalidate: 300 }
);

const getCachedCategoryCounts = unstable_cache(
  async () => countResourcesByCategory(),
  ["category-counts"],
  { tags: [RESOURCES_TAG], revalidate: 300 }
);

export { getCachedTagsWithCounts, getCachedCategoryCounts };
