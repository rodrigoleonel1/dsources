import { Skeleton } from "@/components/ui/skeleton";
import { ResourceGridSkeleton } from "@/components/resource-grid-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 shrink-0 border-r p-4 md:block">
        <Skeleton className="mb-6 h-8 w-32" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <Skeleton className="mb-2 h-7 w-72" />
        <Skeleton className="mb-6 h-4 w-96" />
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-7 w-32" />
        </div>
        <ResourceGridSkeleton count={9} />
      </div>
    </div>
  );
}
