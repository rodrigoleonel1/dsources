"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

let cachedTags: string[] | null = null;

async function fetchAllTags(): Promise<string[]> {
  if (cachedTags) return cachedTags;
  try {
    const res = await fetch("/api/tags");
    const data = await res.json();
    cachedTags = Array.isArray(data.tags) ? data.tags : [];
    return cachedTags ?? [];
  } catch {
    return [];
  }
}

export function TagInput({
  id,
  tags,
  onChange,
  max = 8,
  label = "Tags",
}: {
  id?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  max?: number;
  label?: string;
}) {
  const [query, setQuery] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllTags().then(setAllTags);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const suggestions = query.trim()
    ? allTags
        .filter(
          (t) => t.includes(query.trim().toLowerCase()) && !tags.includes(t)
        )
        .slice(0, 6)
    : [];

  function addTag(raw: string) {
    const t = raw.trim().toLowerCase();
    if (!t) return;
    if (tags.includes(t)) {
      setQuery("");
      setShowSuggestions(false);
      return;
    }
    if (tags.length >= max) {
      toast.error(`Máximo ${max} tags`);
      return;
    }
    onChange([...tags, t]);
    setQuery("");
    setShowSuggestions(false);
  }

  function removeTag(t: string) {
    onChange(tags.filter((x) => x !== t));
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative flex gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addTag(query);
              }
              if (e.key === "Escape") setShowSuggestions(false);
            }}
            placeholder="Escribí un tag y presioná Enter"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Tags existentes que coinciden"
              className="absolute top-full left-0 z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-md"
            >
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={false}
                    onClick={() => addTag(s)}
                    className="block w-full px-3 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    #{s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button type="button" variant="outline" onClick={() => addTag(query)}>
          Agregar
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-md border bg-muted px-2 py-0.5 text-xs"
            >
              #{t}
              <button
                type="button"
                onClick={() => removeTag(t)}
                aria-label={`Quitar tag ${t}`}
                className="rounded-full hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
