import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin/admin-nav";
import { ManageResources } from "@/components/admin/manage-resources";
import { ExportButton } from "@/components/admin/export-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recursos publicados",
  robots: { index: false, follow: false },
};

export default function AdminManageResourcesPage() {
  return (
    <AppShell>
      <div className="mb-1 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Recursos publicados</h1>
        <ExportButton />
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Buscá un recurso publicado para editarlo o eliminarlo.
      </p>

      <AdminNav active="/admin/recursos" />

      <ManageResources />
    </AppShell>
  );
}
