import Link from "next/link";
import { ExternalLink, UserRound } from "lucide-react";
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

export function ResourceCard({
  resource,
  index = 0,
  activeCategory = "todas",
  isFavorited = false,
  isAuthenticated = false,
}: {
  resource: Resource;
  index?: number;
  activeCategory?: string;
  isFavorited?: boolean;
  isAuthenticated?: boolean;
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
      <Card className="relative flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gradient-to-br from-indigo-500 to-indigo-300 dark:from-indigo-800 dark:to-indigo-400">
        <FavoriteButton
          resourceId={resource.id}
          resourceName={resource.name}
          initialFavorited={isFavorited}
          isAuthenticated={isAuthenticated}
        />
        <CardHeader>
          <CardTitle className="text-base pr-8">
            <Link
              href={`/recurso/${resource.id}`}
              className="hover:underline underline-offset-2"
            >
              {resource.name}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-300">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="mb-3 flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <Link
                key={t}
                href={tagHref(t)}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:scale-95 group-hover:border-white/20"
                aria-label={`Filtrar por tag ${t}`}
                title={`Filtrar por tag ${t}`}
              >
                #{t}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-col gap-1">
              <Badge variant="secondary" className="w-fit capitalize">
                {resource.category}
              </Badge>
              {resource.submittedBy && (
                <span className="flex items-center gap-1 truncate text-[11px] text-muted-foreground group-hover:text-gray-800 dark:group-hover:text-gray-300">
                  <UserRound className="size-3 shrink-0" />
                  Enviado por {resource.submittedBy.name}
                </span>
              )}
            </div>
            <Button asChild size="sm" className="group/btn shrink-0">
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visitar ${resource.name}`}
              >
                Visitar
                <ExternalLink />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
