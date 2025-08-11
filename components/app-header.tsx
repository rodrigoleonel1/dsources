"use client";

import Link from "next/link";
import { Search, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Audiowide } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"] });

export function AppHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-6" />

      <Link
        href="/"
      >
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md text-white shadow-sm bg-black">
            <span
              className={`flex items-center justify-center gap-2 text-2xl ${audiowide.className} ml-1`}
            >
              d<span className="text-indigo-500 text-5xl -mt-7 -ml-3">.</span>
            </span>
          </div>
          <div className="leading-tight hidden sm:flex">
            <div className={`text-2xl ${audiowide.className}`}>Dsources</div>
          </div>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative rounded-md p-[1px]  transition-colors">
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
  );
}
