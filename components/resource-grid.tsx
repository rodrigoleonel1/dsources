import { Resource } from "@/data/types";
import { ResourceCard } from "./resource-card";

export function ResourceGrid({
  resources = [],
  activeCategory = "todas",
  favoriteIds,
  isAuthenticated = false,
}: {
  resources?: Resource[];
  activeCategory?: string;
  favoriteIds?: Set<string>;
  isAuthenticated?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((res, idx) => (
        <ResourceCard
          key={res.id}
          resource={res}
          index={idx}
          activeCategory={activeCategory}
          isFavorited={favoriteIds?.has(res.id) ?? false}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
}
