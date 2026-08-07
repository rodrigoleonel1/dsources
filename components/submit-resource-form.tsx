"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TagInput } from "@/components/tag-input";
import { useCategories } from "@/hooks/use-categories";

export function SubmitResourceForm() {
  const router = useRouter();
  const categories = useCategories();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submittable = categories.filter((c) => c.submittable);
  const selectedCategory = submittable.some((c) => c.key === category)
    ? category
    : submittable[0]?.key ?? "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (tags.length === 0) {
      setError("Agregá al menos un tag");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/resources/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, url, category: selectedCategory, tags }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo enviar el recurso");
        return;
      }
      toast.success("¡Gracias! Tu recurso quedó pendiente de aprobación.");
      router.push("/");
      router.refresh();
    } catch {
      setError("Ocurrió un error de red. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4 pt-6">
          {error && (
            <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre del recurso
            </label>
            <Input
              id="name"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Frontend Mentor"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción breve
            </label>
            <Textarea
              id="description"
              required
              minLength={10}
              maxLength={300}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="¿Qué ofrece este recurso y a quién le sirve?"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-medium">
              Categoría
            </label>
            <SelectNative
              id="category"
              value={selectedCategory}
              onChange={(e) => setCategory(e.target.value)}
            >
              {submittable.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </SelectNative>
          </div>
          <TagInput id="tags" tags={tags} onChange={setTags} max={8} />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Enviar para aprobación
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
