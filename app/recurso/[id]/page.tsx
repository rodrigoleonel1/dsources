import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { FavoriteButton } from "@/components/favorite-button";
import { CopyLinkButton } from "@/components/copy-link-button";
import { RelatedResources } from "@/components/related-resources";
import { getResourceById, getRelatedResources } from "@/lib/db/resources";
import { getCategories } from "@/lib/db/categories";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource || resource.status !== "approved") {
    return { title: "Recurso no encontrado" };
  }
  const title = resource.name;
  const description = resource.description;
  return {
    title,
    description,
    alternates: { canonical: `/recurso/${resource.id}` },
    openGraph: { title, description, url: `/recurso/${resource.id}`, type: "article" },
    twitter: { title, description },
    keywords: resource.tags,
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource || resource.status !== "approved") notFound();

  const related = await getRelatedResources(resource);
  const categories = await getCategories();
  const categoryLabel = categories.find((c) => c.key === resource.category)?.label ?? resource.category;

  let urlDisplay = resource.url;
  try {
    const u = new URL(resource.url);
    urlDisplay = `${u.hostname}${u.pathname !== "/" ? u.pathname : ""}`;
  } catch {
    // keep the raw url as fallback
  }

  const resourceUrl = `${SITE_URL}/recurso/${resource.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": resourceUrl,
    url: resourceUrl,
    name: resource.name,
    description: resource.description,
    inLanguage: "es-AR",
    datePublished: resource.createdAt,
    mainEntity: {
      "@type": "CreativeWork",
      "@id": resourceUrl,
      name: resource.name,
      description: resource.description,
      url: resource.url,
      keywords: resource.tags.join(", "),
      genre: resource.category,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryLabel,
          item: `${SITE_URL}/?cat=${resource.category}`,
        },
        { "@type": "ListItem", position: 3, name: resource.name, item: resourceUrl },
      ],
    },
  };

  return (
    <AppShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link href={`/?cat=${resource.category}`}>
          <ArrowLeft /> Volver a {categoryLabel}
        </Link>
      </Button>

      <Card className="relative max-w-2xl mx-auto">
        <FavoriteButton resourceId={resource.id} resourceName={resource.name} />
        <CardHeader>
          <Badge variant="secondary" className="w-fit capitalize">
            {categoryLabel}
          </Badge>
          <CardTitle className="text-2xl">{resource.name}</CardTitle>
          <CardDescription className="text-base">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm transition-colors hover:border-brand/40 hover:bg-brand/5"
              title={resource.url}
            >
              <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-brand hover:underline underline-offset-2">
                {urlDisplay}
              </span>
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            </a>
            <CopyLinkButton url={resource.url} resourceName={resource.name} />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {resource.tags.map((t) => (
              <Link
                key={t}
                href={`/?q=${encodeURIComponent(t)}`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                aria-label={`Filtrar por tag ${t}`}
                title={`Filtrar por tag ${t}`}
              >
                <Hash className="size-3 opacity-60" aria-hidden />
                {t}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <RelatedResources resources={related} />
    </AppShell>
  );
}
