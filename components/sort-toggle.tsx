import Link from "next/link";
import { cn } from "@/lib/utils";
import { Flame, Clock } from "lucide-react";

function hrefFor(category: string, query: string, sort: "recent" | "popular") {
  const params = new URLSearchParams();
  if (category && category !== "todas") params.set("cat", category);
  if (query.trim()) params.set("q", query.trim());
  if (sort === "popular") params.set("sort", "popular");
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export function SortToggle({
  category,
  query,
  sort,
}: {
  category: string;
  query: string;
  sort: "recent" | "popular";
}) {
  return (
    <div className="mb-4 inline-flex items-center gap-1 rounded-md border p-0.5 text-sm">
      <Link
        href={hrefFor(category, query, "recent")}
        className={cn(
          "flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 transition-colors",
          sort === "recent"
            ? "bg-indigo-600 text-white"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Clock className="size-3.5" /> Recientes
      </Link>
      <Link
        href={hrefFor(category, query, "popular")}
        className={cn(
          "flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 transition-colors",
          sort === "popular"
            ? "bg-indigo-600 text-white"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Flame className="size-3.5" /> Populares
      </Link>
    </div>
  );
}
