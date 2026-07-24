import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/app-shell";
import { ResourceGrid } from "@/components/resource-grid";
import { getSession } from "@/lib/auth";
import { getFavoriteResourceIds } from "@/lib/db/favorites";
import { listResourcesByIds } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis favoritos",
  description: "Tus recursos guardados en Dsources.",
  alternates: { canonical: "/favoritos" },
  robots: { index: false, follow: true },
};

export default async function FavoritesPage() {
  const session = await getSession();
  const ids = session ? await getFavoriteResourceIds(session.userId) : [];
  const resources = await listResourcesByIds(ids);
  // Keep the most recently favorited first.
  const ordered = [...resources].sort(
    (a, b) => ids.indexOf(b.id) - ids.indexOf(a.id)
  );

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Mis favoritos</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {ordered.length} recurso{ordered.length === 1 ? "" : "s"} guardado
        {ordered.length === 1 ? "" : "s"}.
      </p>

      {ordered.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Todavía no tenés favoritos</CardTitle>
            <CardDescription>
              Tocá el corazón en cualquier recurso para guardarlo acá.{" "}
              <Link href="/" className="underline underline-offset-2 hover:text-foreground">
                Explorar recursos
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ResourceGrid
          resources={ordered}
          favoriteIds={new Set(ids)}
          isAuthenticated={Boolean(session)}
        />
      )}
    </AppShell>
  );
}
