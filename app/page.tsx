import type { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ArrowDownWideNarrow, Sparkles, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import styles from "./page.module.css";
import { AppHeader } from "@/components/app-header";
import { SidebarCategories } from "@/components/sidebar-categories";
import { CategoryItem, CategoryKey } from "@/data/types";
import { SEOJsonLd } from "@/components/seo-jsonld";
import { getSession } from "@/lib/auth";
import { toPublicUser } from "@/lib/db/users";
import { listResources } from "@/lib/db/resources";
import { getCategories } from "@/lib/db/categories";
import { getCachedCategoryCounts } from "@/lib/cache";
import { SITE_NAME } from "@/lib/site";
import {
  InfiniteResourceList,
  HomeResultsSkeleton,
} from "@/components/infinite-resource-list";

export const dynamic = "force-dynamic";

type SearchParams = {
  cat?: string;
  q?: string;
  sort?: string;
  featured?: string;
};

function resolveCategory(cat: string | undefined, cats: CategoryItem[]): CategoryKey {
  return cats.some((c) => c.key === cat) ? (cat as CategoryKey) : "todas";
}

function resolveSort(sort: string | undefined): "recientes" | "populares" {
  return sort === "populares" ? "populares" : "recientes";
}

function buildHref(params: {
  cat?: string;
  q?: string;
  sort?: string;
  featured?: string;
}) {
  const sp = new URLSearchParams();
  if (params.cat && params.cat !== "todas") sp.set("cat", params.cat);
  if (params.q?.trim()) sp.set("q", params.q.trim());
  if (params.sort === "populares") sp.set("sort", "populares");
  if (params.featured === "1") sp.set("featured", "1");
  const qs = sp.toString();
  return qs ? `/?${qs}` : "/";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const cats = await getCategories();
  const cat = resolveCategory(sp.cat, cats);
  const q = (sp.q || "").trim();
  const catLabel = cats.find((c) => c.key === cat)?.label ?? "Todas";

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

  const canonical = buildHref({ cat, q });

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
  const categories = await getCategories();
  const activeCategory = resolveCategory(sp.cat, categories);
  const query = sp.q || "";
  const sort = resolveSort(sp.sort);
  const featured = sp.featured === "1";

  const [session, counts, result] = await Promise.all([
    getSession(),
    getCachedCategoryCounts(),
    listResources({
      category: activeCategory,
      query,
      page: 1,
      status: "approved",
      sort,
      featured: featured || undefined,
    }),
  ]);

  const publicUser = toPublicUser(session);

  const { resources, total, totalPages } = result;
  const hasFilters = Boolean(query) || activeCategory !== "todas" || featured;

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarCategories
          categories={categories}
          activeCategory={activeCategory}
          query={query}
          counts={counts}
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
              {featured && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-brand">
                    <Sparkles className="size-3" />
                    Destacados
                  </span>
                </>
              )}
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
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex items-center gap-1 rounded-md bg-muted p-1"
                role="group"
                aria-label="Ordenar resultados"
              >
                <Button
                  asChild
                  variant={sort === "recientes" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                >
                  <Link href={buildHref({ cat: activeCategory, q: query, featured: featured ? "1" : undefined })}>
                    Recientes
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={sort === "populares" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2.5 text-xs"
                >
                  <Link
                    href={buildHref({
                      cat: activeCategory,
                      q: query,
                      sort: "populares",
                      featured: featured ? "1" : undefined,
                    })}
                  >
                    <ArrowDownWideNarrow className="size-3.5" />
                    Populares
                  </Link>
                </Button>
              </div>

              <Button
                asChild
                variant={featured ? "secondary" : "outline"}
                size="sm"
                className="h-7 px-2.5 text-xs"
              >
                <Link
                  href={buildHref({
                    cat: activeCategory,
                    q: query,
                    sort,
                    featured: featured ? undefined : "1",
                  })}
                  aria-pressed={featured}
                >
                  <Sparkles className="size-3.5" />
                  Destacados
                </Link>
              </Button>

              {hasFilters && (
                <Button asChild variant="outline" size="sm" className="relative overflow-hidden">
                  <Link href="/">
                    <span className="absolute inset-0 -z-10 opacity-0 bg-gradient-to-r from-emerald-500/10 via-fuchsia-500/10 to-amber-500/10 transition-opacity hover:opacity-100" />
                    Limpiar filtros
                  </Link>
                </Button>
              )}
            </div>
          </div>

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
            <Suspense fallback={<HomeResultsSkeleton />}>
              <InfiniteResourceList
                key={`${activeCategory}|${query}|${sort}|${featured}`}
                initialResources={resources}
                initialPage={1}
                totalPages={totalPages}
                category={activeCategory}
                query={query}
                sort={sort}
                featured={featured}
                activeCategory={activeCategory}
              />
            </Suspense>
          )}
        </main>

        <SEOJsonLd
          resources={resources}
          breadcrumb={
            activeCategory !== "todas"
              ? [
                  {
                    name: categories.find((c) => c.key === activeCategory)?.label ?? activeCategory,
                    url: `/?cat=${activeCategory}`,
                  },
                ]
              : []
          }
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
