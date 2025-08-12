"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

import styles from "./page.module.css";
import { categories } from "@/components/categories";
import { RESOURCES } from "@/data/resources";
import { AppHeader } from "@/components/app-header";
import { ResourceGrid } from "@/components/resource-grid";
import { SidebarCategories } from "@/components/sidebar-categories";
import { useFilters } from "@/hooks/use-filters";
import { CategoryKey } from "@/data/types";
import { SEOJsonLd } from "@/components/seo-jsonld";
import { useSearchParams } from "next/navigation";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <DsourcesClient />
    </Suspense>
  );
}

function DsourcesClient() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") || "todas";
  const q = searchParams.get("q") || "";
  const validCats: CategoryKey[] = [
    "todas",
    "cursos",
    "challenges",
    "herramientas",
    "documentacion",
    "diseño",
    "inspiraciones",
    "blogs",
    "apis",
    "librerias",
    "repositorios",
  ];
  const initialCat: CategoryKey = (validCats as string[]).includes(cat)
    ? (cat as CategoryKey)
    : "todas";
  const initialQuery = q;
  const {
    activeCategory,
    setActiveCategory,
    query,
    setQuery,
    countsByCategory,
    filtered,
    addTagToQuery,
  } = useFilters({
    resources: RESOURCES,
    categories,
    initialCategory: initialCat,
    initialQuery,
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarCategories
          categories={categories}
          countsByCategory={countsByCategory}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <AppHeader query={query} onQueryChange={setQuery} />

        <main className="flex-1 p-4 mt-16">
          <h1 className="mb-1 text-2xl font-bold">
            Recursos para desarrolladores
          </h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Explora categorías y filtra por nombre o tags. Comparte resultados
            con URLs con filtros.
          </p>

          <div
            className={cn(
              "mb-4 flex flex-wrap items-center justify-between gap-3",
              styles.fadeIn
            )}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-md bg-muted px-2 py-1">
                {categories.find((c) => c.key === activeCategory)?.label}
              </span>
              <span>•</span>
              <span>
                {filtered.length} recurso{filtered.length === 1 ? "" : "s"}
              </span>
              {query && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Tag className="size-3" />
                    {query}
                  </span>
                </>
              )}
            </div>
            {(query || activeCategory !== "todas") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("todas");
                }}
                className="relative overflow-hidden"
              >
                <span className="absolute inset-0 -z-10 opacity-0 bg-gradient-to-r from-emerald-500/10 via-fuchsia-500/10 to-amber-500/10 transition-opacity hover:opacity-100" />
                Limpiar filtros
              </Button>
            )}
          </div>

          {filtered.length === 0 ? (
            <Card
              className={cn("border-dashed", styles.fadeInUp)}
              style={{ animationDelay: "40ms" }}
            >
              <CardHeader>
                <CardTitle>Sin resultados</CardTitle>
                <CardDescription>
                  No encontramos recursos que coincidan con tus filtros. Intenta
                  con otras palabras clave o cambia la categoría.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <ResourceGrid resources={filtered} onTagClick={addTagToQuery} />
          )}
        </main>

        <SEOJsonLd resources={filtered} />
      </SidebarInset>
    </SidebarProvider>
  );
}
