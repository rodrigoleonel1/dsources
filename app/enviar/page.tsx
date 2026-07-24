import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { SubmitResourceForm } from "@/components/submit-resource-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enviar un recurso",
  description: "Compartí un recurso con la comunidad de Dsources. Un admin lo revisará antes de publicarlo.",
  alternates: { canonical: "/enviar" },
  robots: { index: false, follow: true },
};

export default function SubmitPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-1 text-2xl font-bold">Enviar un recurso</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Completá el formulario con los datos del recurso. Quedará marcado
          como &quot;pendiente&quot; hasta que un administrador lo revise y lo
          publique.
        </p>
      </div>
      <SubmitResourceForm />
    </AppShell>
  );
}
