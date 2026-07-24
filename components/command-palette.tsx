"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories } from "@/components/categories";
import { Heart, Home, Moon, Plus, ShieldCheck, Sun, Tags, User } from "lucide-react";
import type { PublicUser } from "@/data/types";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<PublicUser | null>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key?.toLowerCase();
      if (key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // Also allow a bare "k" (no modifier) when not typing in a field,
      // as a friendlier fallback to the Cmd/Ctrl+K shortcut.
      if (key === "k" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (key === "escape") setOpen(false);
    }
    function onCustomOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => setUser(null));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[15vh]"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border bg-popover shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Buscador rápido"
      >
        <Command>
          <CommandInput placeholder="Buscar categorías, páginas o acciones..." autoFocus />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>
            <CommandGroup heading="Navegación">
              <CommandItem onSelect={() => go("/")}>
                <Home /> Inicio
              </CommandItem>
              <CommandItem onSelect={() => go("/tags")}>
                <Tags /> Explorar por tags
              </CommandItem>
              {user ? (
                <>
                  <CommandItem onSelect={() => go("/favoritos")}>
                    <Heart /> Mis favoritos
                  </CommandItem>
                  <CommandItem onSelect={() => go("/enviar")}>
                    <Plus /> Enviar recurso
                  </CommandItem>
                  <CommandItem onSelect={() => go("/mis-envios")}>
                    <User /> Mis envíos
                  </CommandItem>
                  {user.role === "admin" && (
                    <CommandItem onSelect={() => go("/admin")}>
                      <ShieldCheck /> Panel admin
                    </CommandItem>
                  )}
                </>
              ) : (
                <CommandItem onSelect={() => go("/login")}>
                  <User /> Iniciar sesión
                </CommandItem>
              )}
            </CommandGroup>
            <CommandGroup heading="Categorías">
              {categories
                .filter((c) => c.key !== "todas")
                .map((c) => {
                  const Icon = c.icon;
                  return (
                    <CommandItem key={c.key} onSelect={() => go(`/?cat=${c.key}`)}>
                      <Icon /> {c.label}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            <CommandGroup heading="Apariencia">
              <CommandItem
                onSelect={() => {
                  setTheme(resolvedTheme === "dark" ? "light" : "dark");
                  setOpen(false);
                }}
              >
                {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                Cambiar a modo {resolvedTheme === "dark" ? "claro" : "oscuro"}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
