"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportButton({ resourceId }: { resourceId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit() {
    setSending(true);
    try {
      const res = await fetch(`/api/resources/${resourceId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }
      setSent(true);
      setOpen(false);
      toast.success("Gracias, un admin va a revisarlo.");
    } catch (err) {
      toast.error(err instanceof Error && err.message ? err.message : "No se pudo enviar el reporte");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <span className="text-xs text-muted-foreground">Reportado, ¡gracias!</span>
    );
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-auto gap-1 px-1.5 py-1 text-xs text-muted-foreground hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        <Flag className="size-3" /> Reportar link roto
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="¿Qué está mal? (opcional)"
        className="min-w-0 flex-1 rounded-md border bg-transparent px-2 py-1 text-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        maxLength={200}
      />
      <Button type="button" size="sm" className="h-7 px-2 text-xs" disabled={sending} onClick={submit}>
        Enviar
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => setOpen(false)}
      >
        Cancelar
      </Button>
    </div>
  );
}
