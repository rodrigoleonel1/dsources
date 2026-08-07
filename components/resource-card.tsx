import Link from "next/link";
import { createElement } from "react";
import { ArrowUpRight, ExternalLink, Hash, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import styles from "@/app/page.module.css";
import { Resource } from "@/data/types";
import { FavoriteButton } from "@/components/favorite-button";
import { VoteButton } from "@/components/vote-button";
import { getCategoryIcon } from "@/components/category-icons";

function categoryIcon(category: string, className: string) {
  const Icon = getCategoryIcon(category);
  return createElement(Icon, { className, "aria-hidden": true });
}

export function ResourceCard({
  resource,
  index = 0,
  activeCategory = "todas",
}: {
  resource: Resource;
  index?: number;
  activeCategory?: string;
}) {
  function tagHref(tag: string) {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "todas") params.set("cat", activeCategory);
    params.set("q", tag);
    return `/?${params.toString()}`;
  }

  return (
    <div
      className={cn("group relative", styles.fadeInUp)}
      style={{ animationDelay: `${Math.min(12 * index, 300)}ms` }}
    >
      <Card className="relative flex h-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-gradient-to-br hover:from-brand/25 hover:to-brand/5 hover:shadow-lg">
        <FavoriteButton resourceId={resource.id} resourceName={resource.name} />
        <CardHeader>
          <CardTitle className="pr-12 text-base">
            <Link
              href={`/recurso/${resource.id}`}
              className="inline-flex items-start gap-1 rounded-md py-0.5 -mx-0.5 px-0.5 transition-colors hover:text-brand hover:underline hover:decoration-brand/50 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
              title={`Ver detalle de ${resource.name}`}
            >
              <span className="min-w-0">{resource.name}</span>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 transition-colors group-hover:text-foreground/80">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {resource.tags.map((t) => (
              <Link
                key={t}
                href={tagHref(t)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                aria-label={`Filtrar por tag ${t}`}
                title={`Filtrar por tag ${t}`}
              >
                <Hash className="size-3 opacity-60" aria-hidden />
                {t}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Badge
                asChild
                variant="secondary"
                className="w-fit gap-1 rounded-full border border-transparent capitalize transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
              >
                <Link
                  href={`/?cat=${encodeURIComponent(resource.category)}`}
                  aria-label={`Filtrar por categoría ${resource.category}`}
                  title={`Ver recursos de ${resource.category}`}
                >
                  {categoryIcon(resource.category, "size-3 shrink-0")}
                  {resource.category}
                </Link>
              </Badge>
              {resource.featured && (
                <Star
                  className="size-3.5 shrink-0 text-brand"
                  aria-label="Destacado"
                />
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <VoteButton
                resourceId={resource.id}
                initialVotes={resource.votes}
                resourceName={resource.name}
              />
              <Button
                asChild
                size="sm"
                className="h-7 gap-1 px-2.5 text-xs group/btn shrink-0"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visitar ${resource.name}`}
                >
                  Visitar
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
