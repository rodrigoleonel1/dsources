import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin/admin-nav";
import { AddResourceForm } from "@/components/admin/add-resource-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agregar recurso",
  robots: { index: false, follow: false },
};

export default function AdminAddResourcePage() {
  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Agregar recurso</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Publicá un recurso directamente, sin pasar por la cola de revisión.
      </p>

      <AdminNav active="/admin/agregar" />

      <AddResourceForm />
    </AppShell>
  );
}
