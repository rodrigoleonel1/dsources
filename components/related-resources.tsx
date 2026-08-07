import { ResourceGrid } from "@/components/resource-grid";
import type { Resource } from "@/data/types";

export function RelatedResources({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;

  return (
    <section className="mx-auto mt-10 max-w-2xl">
      <h2 className="mb-3 text-lg font-semibold">Recursos relacionados</h2>
      <ResourceGrid resources={resources} />
    </section>
  );
}
