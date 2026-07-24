import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin/admin-nav";
import { PendingResourceList } from "@/components/admin/pending-resource-list";
import { listPendingResources } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pendientes de aprobación",
  robots: { index: false, follow: false },
};

export default async function AdminPendingPage() {
  const pending = await listPendingResources();

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">
        Pendientes de aprobación{" "}
        <span className="text-lg font-normal text-muted-foreground">
          ({pending.length})
        </span>
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Revisá cada envío de la comunidad y aprobalo o rechazalo.
      </p>

      <AdminNav active="/admin/pendientes" />

      <PendingResourceList initialResources={pending} />
    </AppShell>
  );
}
