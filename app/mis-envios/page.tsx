import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { MySubmissionsList } from "@/components/my-submissions-list";
import { getSession } from "@/lib/auth";
import { listResourcesByUser } from "@/lib/db/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis envíos",
  description: "Recursos que enviaste a Dsources y su estado de revisión.",
  alternates: { canonical: "/mis-envios" },
  robots: { index: false, follow: true },
};

export default async function MySubmissionsPage() {
  const session = await getSession();
  const resources = session ? await listResourcesByUser(session.userId) : [];

  return (
    <AppShell>
      <h1 className="mb-1 text-2xl font-bold">Mis envíos</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Acá ves el estado de cada recurso que enviaste. Podés editar o retirar
        los que todavía están pendientes de revisión.
      </p>
      <MySubmissionsList initialResources={resources} />
    </AppShell>
  );
}
