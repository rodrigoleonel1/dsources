"use client";

import { useEffect, useState } from "react";
import type { CategoryItem } from "@/data/types";

/**
 * Loads the dynamic category list from the public API. Client forms use this
 * instead of a hardcoded array so categories stay DB-driven.
 */
export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (active) setCategories(data.categories ?? []);
      })
      .catch(() => {
        if (active) setCategories([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return categories;
}
