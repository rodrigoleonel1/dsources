"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/providers/favorites-provider";

export function FavoriteButton({
  resourceId,
  resourceName,
}: {
  resourceId: string;
  resourceName: string;
}) {
  const { isFavorited, toggle, ready } = useFavorites();
  const favorited = isFavorited(resourceId);

  function handleClick() {
    toggle(resourceId);
    if (favorited) {
      toast(`${resourceName} quitado de favoritos`, {
        action: {
          label: "Deshacer",
          onClick: () => toggle(resourceId),
        },
      });
    } else {
      toast.success(`${resourceName} agregado a favoritos`);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-pressed={ready ? favorited : false}
      aria-label={
        favorited
          ? `Quitar ${resourceName} de favoritos`
          : `Agregar ${resourceName} a favoritos`
      }
      title={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
      className="group/fav absolute right-2 top-2 z-10 size-9 rounded-full transition-colors hover:bg-muted/70 hover:text-brand"
    >
      <Bookmark
        className={cn(
          "size-5 transition-colors",
          favorited
            ? "fav-pop fill-brand text-brand"
            : "text-muted-foreground group-hover/fav:text-brand/70"
        )}
      />
    </Button>
  );
}
