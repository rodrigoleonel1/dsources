"use client";

import { useState } from "react";
import { ArrowBigUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVotes } from "@/providers/votes-provider";

export function VoteButton({
  resourceId,
  initialVotes,
  resourceName,
}: {
  resourceId: string;
  initialVotes: number;
  resourceName: string;
}) {
  const { isVoted, toggleVoteLocal } = useVotes();
  const voted = isVoted(resourceId);
  const [count, setCount] = useState(initialVotes);
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    const previousCount = count;
    const nowVoted = toggleVoteLocal(resourceId);
    setCount((c) => Math.max(0, c + (nowVoted ? 1 : -1)));

    try {
      const res = await fetch("/api/resources/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, delta: nowVoted ? 1 : -1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCount(data.votes);
    } catch {
      // Revert the local toggle on failure.
      toggleVoteLocal(resourceId);
      setCount(previousCount);
      toast.error("No se pudo registrar el voto");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      aria-pressed={voted}
      aria-label={voted ? `Quitar voto a ${resourceName}` : `Votar ${resourceName}`}
      title={voted ? "Quitar voto" : "Votar"}
      className={cn(
        "h-7 gap-1 px-2 text-xs",
        voted
          ? "bg-brand/10 text-brand hover:bg-brand/15"
          : "text-muted-foreground hover:bg-muted/70 hover:text-brand"
      )}
    >
      <ArrowBigUp className={cn("size-4 transition-transform", voted && "fill-brand")} />
      {count}
    </Button>
  );
}
