import type { CategoryKey } from "@/data/types";

export const SUBMITTABLE_CATEGORY_KEYS: Exclude<CategoryKey, "todas">[] = [
  "cursos",
  "challenges",
  "herramientas",
  "documentacion",
  "diseño",
  "inspiraciones",
  "blogs",
  "apis",
  "librerias",
  "repositorios",
  "componentes",
  "didactico",
];

export const ALL_CATEGORY_KEYS: CategoryKey[] = ["todas", ...SUBMITTABLE_CATEGORY_KEYS];
