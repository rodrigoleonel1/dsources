import Link from "next/link";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { CategoryItem, CategoryKey } from "@/data/types";
import { Audiowide } from "next/font/google";
import { Heart, Plus, ShieldCheck, Tags, User } from "lucide-react";
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
  countsByCategory,
  activeCategory,
  query = "",
  user,
}: {
  categories: CategoryItem[];
  countsByCategory: Map<CategoryKey, number>;
  activeCategory: CategoryKey;
  query?: string;
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
                d<span className="text-indigo-500 text-5xl -mt-7 -ml-3">.</span>
              </span>
            </div>
            <div className="leading-tight">
              <div className={`text-2xl ${audiowide.className}`}>Dsources</div>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categorías</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <SidebarMenuItem key={cat.key} className="relative">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-indigo-500"
                          : "hover:bg-sidebar-accent/60"
                      )}
                      tooltip={cat.label}
                    >
                      <Link href={buildHref(cat.key, query)} aria-label={`Filtrar por ${cat.label}`}>
                        <Icon
                          className={cn(
                            "transition-colors",
                            isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                          )}
                        />
                        <span>{cat.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-sidebar-accent text-sidebar-accent-foreground">
                      {(countsByCategory.get(cat.key) ?? 0).toString()}
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Tu cuenta</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Favoritos">
                    <Link href="/favoritos" aria-label="Ver mis favoritos">
                      <Heart />
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
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Mis envíos">
                    <Link href="/mis-envios" aria-label="Ver mis envíos">
                      <User />
                      <span>Mis envíos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {user.role === "admin" && (
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
        )}
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <p className="px-2 text-xs text-muted-foreground">
          ¿Conocés un buen recurso? {user ? (
            <Link href="/enviar" className="underline underline-offset-2 hover:text-foreground">
              Compartilo
            </Link>
          ) : (
            <Link href="/login?next=/enviar" className="underline underline-offset-2 hover:text-foreground">
              Iniciá sesión para compartirlo
            </Link>
          )}
        </p>
      </SidebarFooter>
    </>
  );
}
