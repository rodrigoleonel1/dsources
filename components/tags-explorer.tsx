"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Hash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CategoryItem, CategoryKey } from "@/data/types";

export function TagsExplorer({
  tags,
  categories,
  max,
  activeCategory,
}: {
  tags: { tag: string; count: number }[];
  categories: CategoryItem[];
  max: number;
  activeCategory: CategoryKey;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => t.tag.toLowerCase().includes(q));
  }, [query, tags]);

  function hrefFor(tag: string) {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "todas") params.set("cat", activeCategory);
    params.set("q", tag);
    return `/?${params.toString()}`;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button
          asChild
          variant={activeCategory === "todas" ? "secondary" : "outline"}
          size="sm"
          className="h-7 px-3 text-xs"
        >
          <Link href="/tags">Todas</Link>
        </Button>
        {categories
          .filter((c) => c.key !== "todas")
          .map((c) => (
            <Button
              key={c.key}
              asChild
              variant={activeCategory === c.key ? "secondary" : "outline"}
              size="sm"
              className="h-7 px-3 text-xs"
            >
              <Link href={`/tags?cat=${encodeURIComponent(c.key)}`}>{c.label}</Link>
            </Button>
          ))}
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrar tags..."
          className="pl-9"
          aria-label="Filtrar tags por nombre"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay tags que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {filtered.map(({ tag, count }) => {
            // Simple visual weight based on how common the tag is.
            const scale = 0.85 + (count / max) * 0.5;
            return (
              <Link
                key={tag}
                href={hrefFor(tag)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                )}
                style={{ fontSize: `${scale}rem` }}
              >
                <Hash className="size-3 opacity-60" />
                {tag}
                <span className="text-xs text-muted-foreground">{count}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}