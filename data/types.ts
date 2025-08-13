import type { ComponentType } from "react"

export type CategoryKey =
  | "todas"
  | "cursos"
  | "challenges"
  | "herramientas"
  | "documentacion"
  | "diseño"
  | "inspiraciones"
  | "blogs"
  | "apis"
  | "librerias"
  | "repositorios"
  | "componentes"
  | "didactico"

export type Resource = {
  id: string
  name: string
  description: string
  url: string
  tags: string[]
  category: CategoryKey
}

export type CategoryItem = {
  key: CategoryKey
  label: string
  icon: ComponentType<{ className?: string }>
}
