"use client"

import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Layers } from 'lucide-react'
import { cn } from "@/lib/utils"
import { CategoryItem, CategoryKey } from "@/data/types"

export function SidebarCategories({
  categories,
  countsByCategory,
  activeCategory,
  onChangeCategory,
}: {
  categories: CategoryItem[]
  countsByCategory: Map<CategoryKey, number>
  activeCategory: CategoryKey
  onChangeCategory: (key: CategoryKey) => void
}) {
  return (
    <>
      <SidebarHeader className="pt-4">
        <div className="px-2">
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-white shadow-sm shadow-emerald-500/10 bg-gradient-to-br from-emerald-500 to-fuchsia-500">
              <Layers className="size-4" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Dsources</div>
              <div className="text-xs text-sidebar-foreground/70">Recursos para devs</div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categorías</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.key
                return (
                  <SidebarMenuItem key={cat.key} className="relative">
                    {isActive && (
                      <span className="absolute left-1 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-fuchsia-500" />
                    )}
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onChangeCategory(cat.key)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-emerald-500/30" : "hover:bg-sidebar-accent/60"
                      )}
                      aria-label={`Filtrar por ${cat.label}`}
                      tooltip={cat.label}
                    >
                      <Icon className={cn("transition-colors", isActive ? "text-emerald-600 dark:text-emerald-400" : "")} />
                      <span>{cat.label}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-sidebar-accent text-sidebar-accent-foreground">
                      {(countsByCategory.get(cat.key) ?? 0).toString()}
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}
