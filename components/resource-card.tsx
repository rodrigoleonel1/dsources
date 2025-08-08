"use client"

import { ExternalLink } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import styles from "@/app/page.module.css"
import { Resource } from '@/data/types'

export function ResourceCard({
  resource = {
    id: "demo",
    name: "Recurso de ejemplo",
    description: "Descripción breve del recurso.",
    url: "#",
    tags: ["tag1", "tag2"],
    category: "herramientas",
  },
  onTagClick = () => {},
  index = 0,
}: {
  resource?: Resource
  onTagClick?: (tag: string) => void
  index?: number
}) {
  return (
    <div className={cn("group relative", styles.fadeInUp)} style={{ animationDelay: `${Math.min(12 * index, 300)}ms` }}>
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-sm transition-opacity group-hover:opacity-100 bg-gradient-to-br from-emerald-500/20 via-fuchsia-500/20 to-amber-500/20" />
      <Card className="relative flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{resource.name}</CardTitle>
          <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="mb-3 flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <button
                key={t}
                onClick={() => onTagClick(t)}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:scale-95"
                aria-label={`Filtrar por tag ${t}`}
                title={`Filtrar por tag ${t}`}
              >
                #{t}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="capitalize">
              {resource.category}
            </Badge>
            <Button asChild size="sm" className="group/btn">
              <a href={resource.url} target="_blank" rel="noreferrer noopener" aria-label={`Visitar ${resource.name}`}>
                Visitar
                <ExternalLink className="ml-2 size-4 transition-transform group-hover/btn:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
