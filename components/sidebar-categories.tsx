import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SidebarClickToClose } from "@/components/sidebar-click-to-close";
import { CategoryItem, CategoryKey } from "@/data/types";
import { getCategoryIcon } from "@/components/category-icons";
import { Audiowide } from "next/font/google";
import { Bookmark, Plus, ShieldCheck, Tags } from "lucide-react";
import type { PublicUser } from "@/data/types";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"] });

function buildHref(key: CategoryKey, query: string) {
  const params = new URLSearchParams();
  if (key !== "todas") params.set("cat", key);
  if (query.trim()) params.set("q", query.trim());
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export function SidebarCategories({
  categories,
  activeCategory,
  query = "",
  counts,
  user,
}: {
  categories: CategoryItem[];
  activeCategory: CategoryKey;
  query?: string;
  counts?: Record<string, number>;
  user: PublicUser | null;
}) {
  return (
    <>
      <SidebarHeader className="pt-4">
        <Link href="/" className="px-2 block" aria-label="Ir al inicio de Dsources">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-white shadow-sm bg-black">
              <span
                className={`flex items-center justify-center gap-2 text-2xl ${audiowide.className} ml-1`}
              >
                d<span className="text-brand text-5xl -mt-7 -ml-3">.</span>
              </span>
            </div>
            <div className="leading-tight">
              <div className={`text-2xl ${audiowide.className}`}>Dsources</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarClickToClose>
          <SidebarGroup>
          <SidebarGroupLabel>Categorías</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const isActive = activeCategory === cat.key;
                return (
                  <SidebarMenuItem key={cat.key} className="relative">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-brand"
                          : "hover:bg-sidebar-accent/60"
                      )}
                      tooltip={cat.label}
                    >
                      <Link href={buildHref(cat.key, query)} aria-label={`Filtrar por ${cat.label}`}>
                        <Icon
                          className={cn(
                            "transition-colors",
                            isActive ? "text-brand" : ""
                          )}
                        />
                        <span className="flex-1">{cat.label}</span>
                        {counts && cat.key === "todas" && (
                          <span className="text-xs text-muted-foreground">
                            {Object.values(counts).reduce((a, b) => a + b, 0)}
                          </span>
                        )}
                        {counts && cat.key !== "todas" && (
                          <span className="text-xs text-muted-foreground">
                            {counts[cat.key] ?? 0}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Acciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Explorar por tags">
                  <Link href="/tags" aria-label="Explorar recursos por tags">
                    <Tags />
                    <span>Explorar por tags</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favoritos">
                  <Link href="/favoritos" aria-label="Ver mis favoritos">
                    <Bookmark />
                    <span>Favoritos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Enviar recurso">
                  <Link href="/enviar" aria-label="Enviar un recurso">
                    <Plus />
                    <span>Enviar recurso</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user?.role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Panel admin">
                    <Link href="/admin" aria-label="Ir al panel de administración">
                      <ShieldCheck />
                      <span>Panel admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarClickToClose>
      </SidebarContent>
    </>
  );
}
