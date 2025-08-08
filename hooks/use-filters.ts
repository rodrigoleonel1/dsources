"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CategoryItem, Resource, CategoryKey } from "@/data/types";

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function useFilters({
  resources,
  categories,
  initialCategory = "todas",
  initialQuery = "",
}: {
  resources: Resource[];
  categories: CategoryItem[];
  initialCategory?: CategoryKey;
  initialQuery?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(
    categories.some((c) => c.key === initialCategory)
      ? initialCategory
      : "todas"
  );
  const [query, setQuery] = useState(initialQuery);

  const countsByCategory = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    for (const cat of categories) map.set(cat.key, 0);
    for (const r of resources) {
      map.set(r.category, (map.get(r.category) ?? 0) + 1);
    }
    map.set("todas", resources.length);
    return map;
  }, [categories, resources]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return resources.filter((r) => {
      const matchCategory =
        activeCategory === "todas" ? true : r.category === activeCategory;
      if (!matchCategory) return false;
      if (!q) return true;
      const inName = normalize(r.name).includes(q);
      const inTags = r.tags.some((t) => normalize(t).includes(q));
      return inName || inTags;
    });
  }, [resources, activeCategory, query]);

  // Sync filters to URL
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "todas")
      params.set("cat", activeCategory);
    if (query.trim()) params.set("q", query.trim());
    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    const id = setTimeout(() => router.replace(url), 150);
    return () => clearTimeout(id);
  }, [activeCategory, query, pathname, router]);

  // Tag click helper
  function addTagToQuery(tag: string) {
    const token = tag.toLowerCase();
    setQuery((prev) => {
      const has = normalize(prev).split(/\s+/).includes(normalize(token));
      return has ? prev : prev ? `${prev} ${token}` : token;
    });
  }

  return {
    activeCategory,
    setActiveCategory,
    query,
    setQuery,
    countsByCategory,
    filtered,
    addTagToQuery,
  };
}
