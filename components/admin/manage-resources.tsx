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
import { useCategories } from "@/hooks/use-categories";
import type { CategoryItem, Resource } from "@/data/types";

function EditResourceSheet({
  resource,
  categories,
  open,
  onOpenChange,
  onSaved,
}: {
  resource: Resource | null;
  categories: CategoryItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (updated: Resource) => void;
}) {
  const [name, setName] = useState(resource?.name ?? "");
  const [description, setDescription] = useState(resource?.description ?? "");
  const [url, setUrl] = useState(resource?.url ?? "");
  const [category, setCategory] = useState(resource?.category ?? "");
  const [tags, setTags] = useState<string[]>(resource?.tags ?? []);
  const [featured, setFeatured] = useState(resource?.featured ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submittable = categories.filter((c) => c.submittable);
  const categoryOptions = submittable.some((c) => c.key === resource?.category)
    ? submittable
    : [
        ...(resource?.category
          ? [{ key: resource.category, label: resource.category, icon: "", submittable: true }]
          : []),
        ...submittable,
      ];

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
        body: JSON.stringify({ name, description, url, category, tags, featured }),
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
            <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="admin-edit-name" className="text-sm font-medium">Nombre</label>
            <Input id="admin-edit-name" required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-edit-url" className="text-sm font-medium">URL</label>
            <Input id="admin-edit-url" type="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-edit-description" className="text-sm font-medium">Descripción</label>
            <Textarea
              id="admin-edit-description"
              required
              minLength={10}
              maxLength={300}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-edit-category" className="text-sm font-medium">Categoría</label>
            <SelectNative
              id="admin-edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </SelectNative>
          </div>
          <TagInput tags={tags} onChange={setTags} max={8} />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="size-4 accent-brand"
            />
            Destacado
          </label>
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
  const categories = useCategories();
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
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        if (active) setResources(data.resources ?? []);
      } catch {
        if (active) toast.error("No se pudieron cargar los recursos");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
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
          aria-label="Buscar recursos publicados"
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
        key={editing?.id ?? "closed"}
        resource={editing}
        categories={categories}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSaved={onSaved}
      />
    </div>
  );
}
