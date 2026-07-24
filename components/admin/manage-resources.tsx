"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/tag-input";
import { SUBMITTABLE_CATEGORY_KEYS } from "@/data/category-keys";
import { categories } from "@/components/categories";
import type { Resource } from "@/data/types";

function EditResourceSheet({
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
      const res = await fetch(`/api/admin/resources/${resource.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, url, category, tags }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo guardar");
        return;
      }
      toast.success("Recurso actualizado");
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
          <SheetTitle>Editar recurso</SheetTitle>
          <SheetDescription>Los cambios se ven reflejados de inmediato.</SheetDescription>
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

export function ManageResources() {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function search(q: string) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/resources?${params.toString()}`);
      const data = await res.json();
      setResources(data.resources ?? []);
    } catch {
      toast.error("No se pudieron cargar los recursos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search("");
  }, []);

  function onQueryChange(next: string) {
    setQuery(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(next), 350);
  }

  function openEdit(r: Resource) {
    setEditing(r);
    setSheetOpen(true);
  }

  function onSaved(updated: Resource) {
    setResources((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  async function handleDelete(r: Resource) {
    if (!window.confirm(`¿Eliminar "${r.name}" definitivamente?`)) return;
    setDeletingId(r.id);
    try {
      const res = await fetch(`/api/admin/resources/${r.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error);
      }
      setResources((prev) => prev.filter((x) => x.id !== r.id));
      toast.success("Recurso eliminado");
    } catch (err) {
      toast.error(err instanceof Error && err.message ? err.message : "No se pudo eliminar");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 opacity-60" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar recurso publicado..."
          className="pl-9"
        />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : resources.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay recursos que coincidan.</p>
      ) : (
        <div className="space-y-2">
          {resources.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{r.name}</p>
                    <Badge variant="secondary" className="capitalize shrink-0">
                      {r.category}
                    </Badge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{r.url}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(r)}>
                    <Pencil /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(r)}
                    disabled={deletingId === r.id}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 /> Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <EditResourceSheet
        resource={editing}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSaved={onSaved}
      />
    </div>
  );
}
