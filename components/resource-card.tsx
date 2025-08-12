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
      <Card className="relative flex h-full flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gradient-to-br from-indigo-500 to-indigo-300 dark:from-indigo-800 dark:to-indigo-400">
        <CardHeader>
          <CardTitle className="text-base">{resource.name}</CardTitle>
          <CardDescription className="line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-300">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="mb-3 flex flex-wrap gap-2">
            {resource.tags.map((t) => (
              <button
                key={t}
                onClick={() => onTagClick(t)}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:scale-95 cursor-pointer group-hover:border-white/20"
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
                <ExternalLink/>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
