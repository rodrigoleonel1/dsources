import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { TagsExplorer } from "@/components/tags-explorer";
import { getCategories } from "@/lib/db/categories";
import { getCachedTagsWithCounts } from "@/lib/cache";
import type { CategoryKey } from "@/data/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explorar por tags",
  description: "Navegá todo el catálogo de Dsources por tag.",
  alternates: { canonical: "/tags" },
};

type SearchParams = { cat?: string };

export default async function TagsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const categories = await getCategories();
  const activeCategory = categories.some((c) => c.key === sp.cat)
    ? (sp.cat as CategoryKey)
    : "todas";

  const tags = await getCachedTagsWithCounts(activeCategory);
  const max = tags[0]?.count ?? 1;

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">
        Explorar por tags
        {activeCategory !== "todas" && (
          <span className="text-muted-foreground">
            {" · "}
            {categories.find((c) => c.key === activeCategory)?.label}
          </span>
        )}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {tags.length} tags distintos en {tags.reduce((a, t) => a + t.count, 0)} recursos.
      </p>

      <TagsExplorer
        tags={tags}
        categories={categories}
        max={max}
        activeCategory={activeCategory}
      />
    </AppShell>
  );
}