"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { ResourceGrid } from "@/components/resource-grid";
import { ResourceGridSkeleton } from "@/components/resource-grid-skeleton";
import type { Resource } from "@/data/types";

export function InfiniteResourceList({
  initialResources,
  initialPage,
  totalPages,
  category,
  query,
  sort,
  featured,
  activeCategory,
}: {
  initialResources: Resource[];
  initialPage: number;
  totalPages: number;
  category: string;
  query: string;
  sort: "recientes" | "populares";
  featured: boolean;
  activeCategory: string;
}) {
  const [resources, setResources] = useState(initialResources);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const busyRef = useRef(false);

  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setLoading(true);
    try {
      const next = page + 1;
      const params = new URLSearchParams({ page: String(next) });
      if (category && category !== "todas") params.set("cat", category);
      if (query.trim()) params.set("q", query.trim());
      if (sort === "populares") params.set("sort", "populares");
      if (featured) params.set("featured", "1");

      const res = await fetch(`/api/resources/public?${params.toString()}`);
      if (!res.ok) throw new Error("error");
      const data = await res.json();
      setResources((prev) => {
        const known = new Set(prev.map((r) => r.id));
        return [...prev, ...data.resources.filter((r: Resource) => !known.has(r.id))];
      });
      setPage(next);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      busyRef.current = false;
    }
  }, [page, category, query, sort, featured]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { rootMargin: "600px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

  if (resources.length === 0) return null;

  return (
    <div>
      <ResourceGrid resources={resources} activeCategory={activeCategory} />

      <div ref={sentinelRef} className="mt-6 flex min-h-10 items-center justify-center">
        {loading && <Loader2 className="size-5 animate-spin text-muted-foreground" />}
        {error && (
          <button
            type="button"
            onClick={loadMore}
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            No se pudo cargar más. Tocar para reintentar.
          </button>
        )}
      </div>
    </div>
  );
}

export function HomeResultsSkeleton() {
  return (
    <div>
      <ResourceGridSkeleton />
      <div className="mt-6 flex min-h-10 items-center justify-center" />
    </div>
  );
}
