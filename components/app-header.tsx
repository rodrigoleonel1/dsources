"use client"

import Link from "next/link"
import { Search, Layers } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ThemeToggle from "@/components/theme-toggle"

export function AppHeader({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (value: string) => void
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-6" />

      <Link href="/" className="group flex items-center gap-2 font-semibold">
        <span className="relative inline-flex items-center justify-center">
          <span className="absolute -inset-1 rounded-md bg-gradient-to-r from-emerald-500/20 via-fuchsia-500/20 to-amber-500/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
          <Layers className="relative size-5 text-foreground" />
        </span>
        <span className="hidden sm:inline">Dsources</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <div className="group relative rounded-md p-[1px] bg-gradient-to-r from-emerald-500/40 via-fuchsia-500/40 to-amber-500/40 focus-within:from-emerald-500/70 focus-within:via-fuchsia-500/70 focus-within:to-amber-500/70 transition-colors">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 opacity-60" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por nombre o tags..."
            className="w-[52vw] max-w-[560px] rounded-[6px] pl-9 sm:w-[42vw] bg-background"
            aria-label="Buscar recursos por nombre o tags"
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
