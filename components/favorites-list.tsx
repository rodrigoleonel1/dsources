"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceGrid } from "@/components/resource-grid";
import { ResourceGridSkeleton } from "@/components/resource-grid-skeleton";
import { useFavorites } from "@/providers/favorites-provider";
import type { Resource } from "@/data/types";

const PAGE_SIZE = 24;

export function FavoritesList() {
  const { favoriteIds, ready } = useFavorites();
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ready || favoriteIds.length === 0) return;
    let cancelled = false;
    fetch(`/api/resources/by-ids?ids=${encodeURIComponent(favoriteIds.join(","))}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setResources(data.resources ?? []);
      })
      .catch(() => {
        if (!cancelled) setResources([]);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, favoriteIds]);

  const visible = useMemo(() => {
    if (!resources) return null;
    const byId = new Map(resources.map((r) => [r.id, r]));
    return [...favoriteIds]
      .reverse()
      .map((id) => byId.get(id))
      .filter((r): r is Resource => !!r);
  }, [resources, favoriteIds]);

  const hasMore = visible !== null && visibleCount < visible.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((c) => c + PAGE_SIZE);
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore]);

  if (!ready) {
    return (
      <div className="text-sm text-muted-foreground">Cargando favoritos...</div>
    );
  }

  if (favoriteIds.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Todavía no tenés favoritos</CardTitle>
          <CardDescription>
            Tocá el marcador en cualquier recurso para guardarlo acá.{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-foreground">
              Explorar recursos
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (visible === null) {
    return (
      <div>
        <h1 className="mb-1 text-2xl font-bold">Mis favoritos</h1>
        <p className="mb-6 text-sm text-muted-foreground">Cargando favoritos...</p>
        <ResourceGridSkeleton count={6} />
      </div>
    );
  }

  const shown = visible.slice(0, visibleCount);

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold">Mis favoritos</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {visible.length} recurso{visible.length === 1 ? "" : "s"} guardado
        {visible.length === 1 ? "" : "s"}.
      </p>
      <ResourceGrid resources={shown} />
      {hasMore && (
        <div ref={sentinelRef} className="mt-6 flex min-h-10 items-center justify-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </>
  );
}
