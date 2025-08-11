"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryItem, CategoryKey } from "@/data/types";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"] });

export function SidebarCategories({
  categories,
  countsByCategory,
  activeCategory,
  onChangeCategory,
}: {
  categories: CategoryItem[];
  countsByCategory: Map<CategoryKey, number>;
  activeCategory: CategoryKey;
  onChangeCategory: (key: CategoryKey) => void;
}) {
  return (
    <>
      <SidebarHeader className="pt-4">
        <div className="px-2">
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
        </div>
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
                      isActive={isActive}
                      onClick={() => onChangeCategory(cat.key)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-indigo-500"
                          : "hover:bg-sidebar-accent/60"
                      )}
                      aria-label={`Filtrar por ${cat.label}`}
                      tooltip={cat.label}
                    >
                      <Icon
                        className={cn(
                          "transition-colors",
                          isActive ? "text-indigo-600 dark:text-indigo-400" : ""
                        )}
                      />
                      <span>{cat.label}</span>
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
      </SidebarContent>
    </>
  );
}
