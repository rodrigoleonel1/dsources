import type { Metadata } from "next";
import Link from "next/link";
import { ListChecks, Plus, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin/admin-nav";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { countResources, listPendingResources } from "@/lib/db/resources";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const [pending, published] = await Promise.all([
    listPendingResources(),
    countResources("approved"),
  ]);

  const cards = [
    {
      href: "/admin/pendientes",
      icon: ListChecks,
      title: "Pendientes de aprobación",
      badge: String(pending.length),
      description: "Recursos enviados por la comunidad esperando revisión.",
      highlight: pending.length > 0,
    },
    {
      href: "/admin/recursos",
      icon: ShieldAlert,
      title: "Recursos publicados",
      badge: String(published),
      description: "Buscá, editá o eliminá cualquier recurso publicado.",
      highlight: false,
    },
    {
      href: "/admin/agregar",
      icon: Plus,
      title: "Agregar recurso",
      badge: "+",
      description: "Publicá un recurso directamente, sin pasar por revisión.",
      highlight: false,
    },
  ] as const;

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Panel de administración</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Revisá los recursos enviados por la comunidad y gestioná el catálogo
        publicado.
      </p>

      <AdminNav active="/admin" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.href} href={c.href} className="block h-full">
              <Card
                className={cn(
                  "h-full transition-colors",
                  c.highlight
                    ? "border-indigo-500/50 hover:border-indigo-500"
                    : "hover:border-foreground/30"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="size-4 shrink-0" /> {c.title}
                    </CardTitle>
                    <span className="text-2xl font-bold tabular-nums shrink-0">
                      {c.badge}
                    </span>
                  </div>
                  <CardDescription>{c.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
