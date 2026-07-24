import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getAllTagsWithCounts } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explorar por tags",
  description: "Navegá todo el catálogo de Dsources por tag.",
  alternates: { canonical: "/tags" },
};

export default async function TagsPage() {
  const tags = await getAllTagsWithCounts();
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
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => {
            // Simple visual weight based on how common the tag is.
            const scale = 0.85 + (count / max) * 0.5;
            return (
              <Link
                key={tag}
                href={`/?q=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
                style={{ fontSize: `${scale}rem` }}
              >
                #{tag}
                <span className="text-xs text-muted-foreground">{count}</span>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
