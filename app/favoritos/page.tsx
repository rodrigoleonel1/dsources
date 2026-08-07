import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { FavoritesList } from "@/components/favorites-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis favoritos",
  description: "Tus recursos guardados en Dsources.",
  alternates: { canonical: "/favoritos" },
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <AppShell>
      <FavoritesList />
    </AppShell>
  );
}
