"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Check, ExternalLink, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resource } from "@/data/types";

export function PendingResourceList({ initialResources }: { initialResources: Resource[] }) {
  const [resources, setResources] = useState(initialResources);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDecision(id: string, decision: "approve" | "reject") {
    setPendingId(id);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/resources/${id}/${decision}`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error);
        }
        setResources((prev) => prev.filter((r) => r.id !== id));
        toast.success(decision === "approve" ? "Recurso aprobado y publicado" : "Recurso rechazado");
      } catch (err) {
        toast.error(err instanceof Error && err.message ? err.message : "No se pudo procesar la acción");
      } finally {
        setPendingId(null);
      }
    });
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {resources.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{r.name}</CardTitle>
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
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline dark:text-indigo-400"
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
            {r.submittedBy && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <UserRound className="size-3" />
                Enviado por {r.submittedBy.name}
              </div>
            )}
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                onClick={() => handleDecision(r.id, "approve")}
                disabled={isPending && pendingId === r.id}
              >
                <Check /> Aprobar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDecision(r.id, "reject")}
                disabled={isPending && pendingId === r.id}
              >
                <X /> Rechazar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
