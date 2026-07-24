import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import styles from "./page.module.css";
import { categories } from "@/components/categories";
import { AppHeader } from "@/components/app-header";
import { ResourceGrid } from "@/components/resource-grid";
import { ResourcePagination } from "@/components/pagination";
import { SidebarCategories } from "@/components/sidebar-categories";
import { CategoryKey } from "@/data/types";
import { ALL_CATEGORY_KEYS } from "@/data/category-keys";
import { SEOJsonLd } from "@/components/seo-jsonld";
import { getSession, sessionToPublicUser } from "@/lib/auth";
import { listResources } from "@/lib/db/resources";
import { getCachedCategoryCounts } from "@/lib/cache";
import { getFavoriteResourceIds } from "@/lib/db/favorites";
import { SortToggle } from "@/components/sort-toggle";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

type SearchParams = { cat?: string; q?: string; page?: string; sort?: string };

function resolveCategory(cat?: string): CategoryKey {
  return (ALL_CATEGORY_KEYS as string[]).includes(cat ?? "")
    ? (cat as CategoryKey)
    : "todas";
}

function resolveSort(sort?: string): "recent" | "popular" {
  return sort === "popular" ? "popular" : "recent";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const cat = resolveCategory(sp.cat);
  const q = (sp.q || "").trim();
  const catLabel = categories.find((c) => c.key === cat)?.label ?? "Todas";

  const titleParts = [];
  if (cat !== "todas") titleParts.push(catLabel);
  if (q) titleParts.push(`"${q}"`);
  const title = titleParts.length
    ? `${titleParts.join(" · ")} — Recursos para desarrolladores`
    : "Recursos para desarrolladores";

  const description =
    cat !== "todas"
      ? `Explorá recursos de ${catLabel.toLowerCase()} para desarrolladores en ${SITE_NAME}: cursos, herramientas, documentación y más, elegidos y aprobados por la comunidad.`
      : `Descubrí y filtrá cientos de recursos para desarrolladores en ${SITE_NAME}: cursos, challenges, herramientas, documentación, diseño, APIs, librerías y repositorios.`;

  const params = new URLSearchParams();
  if (cat !== "todas") params.set("cat", cat);
  if (q) params.set("q", q);
  const canonical = params.toString() ? `/?${params.toString()}` : "/";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const activeCategory = resolveCategory(sp.cat);
  const query = sp.q || "";
  const page = Math.max(1, Number(sp.page) || 1);
  const sort = resolveSort(sp.sort);

  const [session, counts, result] = await Promise.all([
    getSession(),
    getCachedCategoryCounts(),
    listResources({ category: activeCategory, query, page, status: "approved", sort }),
  ]);

  const publicUser = sessionToPublicUser(session);

  const favoriteIds = session
    ? new Set(await getFavoriteResourceIds(session.userId))
    : new Set<string>();

  const { resources, total, totalPages } = result;
  const hasFilters = Boolean(query) || activeCategory !== "todas";

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarCategories
          categories={categories}
          countsByCategory={counts}
          activeCategory={activeCategory}
          query={query}
          user={publicUser}
        />
      </Sidebar>

      <SidebarInset>
        <AppHeader query={query} user={publicUser} />

        <main id="main-content" className="flex-1 p-4">
          <h1 className="mb-1 text-2xl font-bold">
            Recursos para desarrolladores
          </h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Explorá categorías y filtrá por nombre o tags. Los resultados se
            comparten con URLs con filtros incluidos.{" "}
            <Link href="/enviar" className="underline underline-offset-2 hover:text-foreground">
              ¿Tenés un recurso para sumar?
            </Link>
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
                {total} recurso{total === 1 ? "" : "s"}
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
            {hasFilters && (
              <Button asChild variant="outline" size="sm" className="relative overflow-hidden">
                <Link href="/">
                  <span className="absolute inset-0 -z-10 opacity-0 bg-gradient-to-r from-emerald-500/10 via-fuchsia-500/10 to-amber-500/10 transition-opacity hover:opacity-100" />
                  Limpiar filtros
                </Link>
              </Button>
            )}
          </div>

          <SortToggle category={activeCategory} query={query} sort={sort} />

          {resources.length === 0 ? (
            <Card className={cn("border-dashed", styles.fadeInUp)} style={{ animationDelay: "40ms" }}>
              <CardHeader>
                <CardTitle>Sin resultados</CardTitle>
                <CardDescription>
                  No encontramos recursos que coincidan con tus filtros. Intentá
                  con otras palabras clave, cambiá de categoría, o{" "}
                  <Link href="/enviar" className="underline underline-offset-2 hover:text-foreground">
                    enviá vos el recurso que falta
                  </Link>
                  .
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <ResourceGrid
                resources={resources}
                activeCategory={activeCategory}
                favoriteIds={favoriteIds}
                isAuthenticated={Boolean(session)}
              />
              <ResourcePagination
                page={page}
                totalPages={totalPages}
                category={activeCategory}
                query={query}
                sort={sort}
              />
            </>
          )}
        </main>

        <SEOJsonLd resources={resources} />
      </SidebarInset>
    </SidebarProvider>
  );
}
