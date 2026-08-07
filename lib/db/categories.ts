import "server-only";
import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { DEFAULT_CATEGORIES } from "@/data/categories";
import type { CategoryItem } from "@/data/types";

export const CATEGORIES_TAG = "categories";

/** Document shape stored in MongoDB (collection: categories). */
export type CategoryDoc = {
  key: string;
  label: string;
  icon: string;
  order: number;
  submittable: boolean;
};

/** Inserts the default catalog if the collection is empty. Safe to call often. */
export async function ensureDefaultCategories() {
  const col = (await getDb()).collection<CategoryDoc>("categories");
  const count = await col.countDocuments();
  if (count > 0) return;
  await col.insertMany(DEFAULT_CATEGORIES.map((c) => ({ ...c })));
}

/**
 * Full category list (including the virtual "todas" pseudo-category), ordered.
 * Cached for a few minutes; invalidate eagerly via revalidateTag(CATEGORIES_TAG)
 * whenever categories are edited.
 */
const getCachedCategoriesEntries = unstable_cache(
  async (): Promise<CategoryDoc[]> => {
    await ensureDefaultCategories();
    const col = (await getDb()).collection<CategoryDoc>("categories");
    const docs = await col.find({}).sort({ order: 1, key: 1 }).toArray();
    return docs;
  },
  ["categories-list"],
  { tags: [CATEGORIES_TAG], revalidate: 300 }
);

export async function getCategories(): Promise<CategoryItem[]> {
  const docs = await getCachedCategoriesEntries();
  const all: CategoryItem[] = [
    { key: "todas", label: "Todas", icon: "todas", submittable: false },
    ...docs.map((d) => ({
      key: d.key,
      label: d.label,
      icon: d.icon,
      submittable: d.submittable,
    })),
  ];
  return all;
}

export async function getSubmittableCategories(): Promise<CategoryItem[]> {
  const cats = await getCategories();
  return cats.filter((c) => c.submittable);
}

export async function isSubmittableCategory(key: string): Promise<boolean> {
  const cats = await getCategories();
  return cats.some((c) => c.submittable && c.key === key);
}
