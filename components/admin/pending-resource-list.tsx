"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Check, CheckCheck, ExternalLink, ListChecks, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resource } from "@/data/types";

export function PendingResourceList({ initialResources }: { initialResources: Resource[] }) {
  const [resources, setResources] = useState(initialResources);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const selectedCount = selected.size;
  const allSelected = resources.length > 0 && selectedCount === resources.length;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(resources.map((r) => r.id)));
  }

  function runDecision(ids: string[], decision: "approve" | "reject") {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/resources/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids, decision }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setResources((prev) => prev.filter((r) => !ids.includes(r.id)));
        setSelected((prev) => {
          const next = new Set(prev);
          for (const id of ids) next.delete(id);
          return next;
        });
        const noun = decision === "approve" ? "aprobado" : "rechazado";
        toast.success(
          `${data.reviewed} recurso${data.reviewed === 1 ? "" : "s"} ${noun}${data.reviewed === 1 ? "" : "s"}`
        );
      } catch (err) {
        toast.error(err instanceof Error && err.message ? err.message : "No se pudo procesar la acción");
      }
    });
  }

  function handleBatch(decision: "approve" | "reject") {
    if (selectedCount === 0) return;
    runDecision([...selected], decision);
  }

  if (resources.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>No hay recursos pendientes</CardTitle>
          <CardDescription>Cuando alguien envíe un recurso nuevo, aparecerá acá.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={toggleAll}
          disabled={isPending}
        >
          <ListChecks /> {allSelected ? "Quitar selección" : "Seleccionar todo"}
        </Button>
        {selectedCount > 0 && (
          <>
            <Button size="sm" onClick={() => handleBatch("approve")} disabled={isPending}>
              <CheckCheck /> Aprobar {selectedCount}
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBatch("reject")} disabled={isPending}>
              <X /> Rechazar {selectedCount}
            </Button>
            <span className="text-sm text-muted-foreground">
              {selectedCount} seleccionado{selectedCount === 1 ? "" : "s"}
            </span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((r) => {
          const isChecked = selected.has(r.id);
          return (
            <Card key={r.id} className={isChecked ? "ring-1 ring-brand" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      aria-label={`Seleccionar ${r.name}`}
                      checked={isChecked}
                      onChange={() => toggle(r.id)}
                      disabled={isPending}
                      className="mt-1 size-4 shrink-0 accent-brand"
                    />
                    <CardTitle className="text-base">{r.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="capitalize shrink-0">
                    {r.category}
                  </Badge>
                </div>
                <CardDescription>{r.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-sm text-brand hover:underline"
                >
                  {r.url} <ExternalLink className="size-3" />
                </a>
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-md border px-2 py-0.5 text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => runDecision([r.id], "approve")}
                    disabled={isPending}
                  >
                    <Check /> Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => runDecision([r.id], "reject")}
                    disabled={isPending}
                  >
                    <X /> Rechazar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
