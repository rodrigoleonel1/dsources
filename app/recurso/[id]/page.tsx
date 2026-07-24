import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, ExternalLink, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { FavoriteButton } from "@/components/favorite-button";
import { ReportButton } from "@/components/report-button";
import { RelatedResources } from "@/components/related-resources";
import { getResourceById, getRelatedResources } from "@/lib/db/resources";
import { getFavoriteResourceIds } from "@/lib/db/favorites";
import { getSession } from "@/lib/auth";
import { categories } from "@/components/categories";
import { SITE_URL } from "@/lib/site";

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
  const [resource, session] = await Promise.all([getResourceById(id), getSession()]);

  if (!resource || resource.status !== "approved") notFound();

  const [favoriteIds, related] = await Promise.all([
    session ? getFavoriteResourceIds(session.userId) : Promise.resolve([]),
    getRelatedResources(resource),
  ]);
  const favoriteIdSet = new Set(favoriteIds);
  const categoryLabel = categories.find((c) => c.key === resource.category)?.label ?? resource.category;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: resource.name,
    description: resource.description,
    url: resource.url,
    keywords: resource.tags.join(", "),
    genre: resource.category,
    mainEntityOfPage: `${SITE_URL}/recurso/${resource.id}`,
  };

  return (
    <AppShell>
      <Script
        id="ld-resource"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
        <Link href={`/?cat=${resource.category}`}>
          <ArrowLeft /> Volver a {categoryLabel}
        </Link>
      </Button>

      <Card className="relative max-w-2xl mx-auto">
        <FavoriteButton
          resourceId={resource.id}
          resourceName={resource.name}
          initialFavorited={favoriteIdSet.has(resource.id)}
          isAuthenticated={Boolean(session)}
        />
        <CardHeader>
          <Badge variant="secondary" className="w-fit capitalize">
            {categoryLabel}
          </Badge>
          <CardTitle className="text-2xl">{resource.name}</CardTitle>
          <CardDescription className="text-base">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <Link
                key={t}
                href={`/?q=${encodeURIComponent(t)}`}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs hover:bg-accent"
              >
                #{t}
              </Link>
            ))}
          </div>
          {resource.submittedBy && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <UserRound className="size-3.5" />
              Enviado por {resource.submittedBy.name}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href={resource.url} target="_blank" rel="noreferrer noopener">
                Visitar sitio <ExternalLink />
              </a>
            </Button>
            <ReportButton resourceId={resource.id} />
          </div>
        </CardContent>
      </Card>

      <RelatedResources
        resources={related}
        favoriteIds={favoriteIdSet}
        isAuthenticated={Boolean(session)}
      />
    </AppShell>
  );
}
