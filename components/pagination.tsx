import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ResourcePagination({
  page,
  totalPages,
  category,
  query,
  sort,
}: {
  page: number;
  totalPages: number;
  category?: string;
  query?: string;
  sort?: "recent" | "popular";
}) {
  if (totalPages <= 1) return null;

  function hrefFor(p: number) {
    const params = new URLSearchParams();
    if (category && category !== "todas") params.set("cat", category);
    if (query?.trim()) params.set("q", query.trim());
    if (sort === "popular") params.set("sort", "popular");
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  }

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-3"
      aria-label="Paginación de resultados"
    >
      <Button asChild variant="outline" size="sm" disabled={prevDisabled}>
        {prevDisabled ? (
          <span className="pointer-events-none opacity-50">
            <ChevronLeft className="mr-1 size-4" /> Anterior
          </span>
        ) : (
          <Link href={hrefFor(page - 1)} rel="prev">
            <ChevronLeft className="mr-1 size-4" /> Anterior
          </Link>
        )}
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <Button asChild variant="outline" size="sm" disabled={nextDisabled}>
        {nextDisabled ? (
          <span className="pointer-events-none opacity-50">
            Siguiente <ChevronRight className="ml-1 size-4" />
          </span>
        ) : (
          <Link href={hrefFor(page + 1)} rel="next">
            Siguiente <ChevronRight className="ml-1 size-4" />
          </Link>
        )}
      </Button>
    </nav>
  );
}
