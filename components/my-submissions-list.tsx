"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TagInput } from "@/components/tag-input";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { categories } from "@/components/categories";
import type { Resource } from "@/data/types";

const STATUS_LABEL: Record<Resource["status"], string> = {
  approved: "Aprobado",
  pending: "Pendiente",
  rejected: "Rechazado",
};

const STATUS_VARIANT: Record<Resource["status"], string> = {
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
};

function EditSheet({
  resource,
  open,
  onOpenChange,
  onSaved,
}: {
  resource: Resource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (updated: Resource) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<(typeof SUBMITTABLE_CATEGORY_KEYS)[number]>(
    SUBMITTABLE_CATEGORY_KEYS[0]
  );
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resource) {
      setName(resource.name);
      setDescription(resource.description);
      setUrl(resource.url);
      setCategory(resource.category as (typeof SUBMITTABLE_CATEGORY_KEYS)[number]);
      setTags(resource.tags);
      setError(null);
    }
  }, [resource]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resource) return;
    setError(null);
    if (tags.length === 0) {
      setError("Agregá al menos un tag");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/resources/${resource.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, url, category, tags }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo guardar");
        return;
      }
      toast.success("Envío actualizado");
      onSaved(data.resource);
      onOpenChange(false);
    } catch {
      setError("Ocurrió un error de red. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar envío</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 px-4">
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nombre</label>
            <Input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">URL</label>
            <Input type="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea
              required
              minLength={10}
              maxLength={300}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Categoría</label>
            <SelectNative
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as (typeof SUBMITTABLE_CATEGORY_KEYS)[number])
              }
            >
              {SUBMITTABLE_CATEGORY_KEYS.map((key) => (
                <option key={key} value={key}>
                  {categories.find((c) => c.key === key)?.label ?? key}
                </option>
              ))}
            </SelectNative>
          </div>
          <TagInput tags={tags} onChange={setTags} max={8} />
          <SheetFooter className="px-0">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="animate-spin" />}
              Guardar cambios
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function MySubmissionsList({ initialResources }: { initialResources: Resource[] }) {
  const [resources, setResources] = useState(initialResources);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleWithdraw(r: Resource) {
    if (!window.confirm(`¿Retirar tu envío "${r.name}"?`)) return;
    setDeletingId(r.id);
    try {
      const res = await fetch(`/api/resources/${r.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }
      setResources((prev) => prev.filter((x) => x.id !== r.id));
      toast.success("Envío retirado");
    } catch (err) {
      toast.error(err instanceof Error && err.message ? err.message : "No se pudo retirar");
    } finally {
      setDeletingId(null);
    }
  }

  if (resources.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Todavía no enviaste ningún recurso</CardTitle>
          <CardDescription>Cuando envíes uno, vas a poder ver su estado acá.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{r.name}</CardTitle>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_VARIANT[r.status]}`}
                >
                  {STATUS_LABEL[r.status]}
                </span>
              </div>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="capitalize">
                  {r.category}
                </Badge>
                {r.tags.map((t) => (
                  <span key={t} className="rounded-md border px-2 py-0.5 text-xs">
                    #{t}
                  </span>
                ))}
              </div>
              {r.status === "pending" && (
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(r);
                      setSheetOpen(true);
                    }}
                  >
                    <Pencil /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    disabled={deletingId === r.id}
                    onClick={() => handleWithdraw(r)}
                  >
                    <Trash2 /> Retirar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <EditSheet
        resource={editing}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSaved={(updated) =>
          setResources((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
        }
      />
    </>
  );
}
