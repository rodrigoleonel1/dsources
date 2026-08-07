import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { TagsExplorer } from "@/components/tags-explorer";
import { getCategories } from "@/lib/db/categories";
import { getCachedTagsWithCounts } from "@/lib/cache";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explorar por tags",
  description: "Navegá todo el catálogo de Dsources por tag.",
  alternates: { canonical: "/tags" },
};

export default async function TagsPage() {
  const [tags, categories] = await Promise.all([
    getCachedTagsWithCounts(),
    getCategories(),
  ]);
  const max = tags[0]?.count ?? 1;

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Explorar por tags</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {tags.length} tags distintos en {tags.reduce((a, t) => a + t.count, 0)} recursos.
      </p>

      {tags.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay recursos publicados.</p>
      ) : (
        <TagsExplorer tags={tags} categories={categories} max={max} />
      )}
    </AppShell>
  );
}
