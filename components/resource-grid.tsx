import { Resource } from "@/data/types";
import { ResourceCard } from "./resource-card";

export function ResourceGrid({
  resources = [],
  activeCategory = "todas",
}: {
  resources?: Resource[];
  activeCategory?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((res, idx) => (
        <ResourceCard
          key={res.id}
          resource={res}
          index={idx}
          activeCategory={activeCategory}
        />
      ))}
    </div>
  );
}
