"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  resourceId,
  resourceName,
  initialFavorited,
  isAuthenticated,
}: {
  resourceId: string;
  resourceName: string;
  initialFavorited: boolean;
  isAuthenticated: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleClick() {
    if (!isAuthenticated) {
      toast("Iniciá sesión para guardar favoritos", {
        action: {
          label: "Iniciar sesión",
          onClick: () => router.push("/login?next=/"),
        },
      });
      return;
    }

    const optimistic = !favorited;
    setFavorited(optimistic);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/resources/${resourceId}/favorite`, {
          method: "POST",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFavorited(data.favorited);
        if (data.favorited) {
          toast.success(`${resourceName} agregado a favoritos`);
        }
      } catch {
        setFavorited(!optimistic);
        toast.error("No se pudo actualizar el favorito");
      }
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      className="absolute right-2 top-2 z-10 size-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background"
      aria-pressed={favorited}
      aria-label={favorited ? `Quitar ${resourceName} de favoritos` : `Agregar ${resourceName} a favoritos`}
      title={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          favorited ? "fill-rose-500 text-rose-500" : "text-foreground/70"
        )}
      />
    </Button>
  );
}
