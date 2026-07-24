"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Report } from "@/lib/db/reports";

export function ReportsList({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState(initialReports);
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  async function resolve(r: Report) {
    setResolvingId(r.id);
    try {
      const res = await fetch(`/api/admin/reports/${r.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReports((prev) => prev.filter((x) => x.id !== r.id));
      toast.success("Reporte resuelto");
    } catch {
      toast.error("No se pudo resolver el reporte");
    } finally {
      setResolvingId(null);
    }
  }

  if (reports.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          No hay reportes pendientes. 🎉
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((r) => (
        <Card key={r.id}>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <Link
                href={`/recurso/${r.resourceId}`}
                className="flex items-center gap-1 font-medium hover:underline"
              >
                {r.resourceName} <ExternalLink className="size-3" />
              </Link>
              <p className="text-sm text-muted-foreground">{r.reason}</p>
              <p className="text-xs text-muted-foreground">
                {r.reportedBy ? `Reportado por ${r.reportedBy.name}` : "Reportado anónimamente"} ·{" "}
                {new Date(r.createdAt).toLocaleDateString("es-AR")}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => resolve(r)}
              disabled={resolvingId === r.id}
            >
              <Check /> Resolver
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
