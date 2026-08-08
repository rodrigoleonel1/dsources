import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/pendientes", label: "Pendientes" },
  { href: "/admin/recursos", label: "Recursos publicados" },
  { href: "/admin/agregar", label: "Agregar recurso" },
] as const;

export function AdminNav({ active }: { active: string }) {
  return (
    <nav
      aria-label="Secciones de administración"
      className="mb-6 flex flex-wrap gap-1 border-b pb-3"
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={active === l.href ? "page" : undefined}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            active === l.href
              ? "bg-brand text-white"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
