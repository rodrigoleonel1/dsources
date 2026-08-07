"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [value, setValue] = useState(initialQuery);
  const [prevQuery, setPrevQuery] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the input in sync if the URL changes elsewhere (e.g. "Limpiar filtros").
  if (prevQuery !== initialQuery) {
    setPrevQuery(initialQuery);
    setValue(initialQuery);
  }

  function pushQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.trim()) params.set("q", next.trim());
    else params.delete("q");
    // Reset pagination whenever the search term changes.
    params.delete("page");
    const target = pathname === "/" ? "/" : "/";
    const qs = params.toString();
    router.push(qs ? `${target}?${qs}` : target, { scroll: false });
  }

  function onChange(next: string) {
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => pushQuery(next), 350);
  }

  function onClear() {
    setValue("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pushQuery("");
  }

  return (
    <div className="relative min-w-0 flex-1 rounded-md p-[1px] transition-colors sm:max-w-[420px]">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-4 -translate-y-1/2 opacity-60 sm:left-3" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar..."
        className="w-full min-w-0 rounded-[6px] pl-8 pr-8 bg-background sm:pl-9"
        aria-label="Buscar recursos por nombre o tags"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0.5 top-1/2 size-7 -translate-y-1/2"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
