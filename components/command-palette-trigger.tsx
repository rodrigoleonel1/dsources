"use client";

import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

export function CommandPaletteTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden gap-1.5 text-muted-foreground sm:inline-flex"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      aria-label="Abrir el buscador rápido (K o Cmd+K)"
      title="Buscador rápido: K o Cmd/Ctrl+K"
    >
      <Command className="size-3.5" />
      <span className="text-xs">K</span>
    </Button>
  );
}
