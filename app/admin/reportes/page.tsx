import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin/admin-nav";
import { ReportsList } from "@/components/admin/reports-list";
import { listReports } from "@/lib/db/reports";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reportes",
  robots: { index: false, follow: false },
};

export default async function AdminReportsPage() {
  const reports = await listReports();

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">
        Reportes{" "}
        <span className="text-lg font-normal text-muted-foreground">
          ({reports.length})
        </span>
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Links que la comunidad marcó como rotos o inválidos.
      </p>

      <AdminNav active="/admin/reportes" />

      <ReportsList initialReports={reports} />
    </AppShell>
  );
}
