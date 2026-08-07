import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Acceso de administración",
  description: "Iniciá sesión para acceder al panel de administración de Dsources.",
  alternates: { canonical: "/admin/login" },
  robots: { index: false, follow: true },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session?.role === "admin") redirect("/admin");

  return (
    <AuthShell
      title="Acceso de administración"
      description="Este acceso es solo para administradores de Dsources."
    >
      <Suspense fallback={null}>
        <LoginForm defaultNext="/admin" />
      </Suspense>
    </AuthShell>
  );
}
