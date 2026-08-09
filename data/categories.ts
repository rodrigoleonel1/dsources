/**
 * Initial category catalog. MongoDB (collection: categories) is the source of
 * truth at runtime; these are only the defaults inserted when the collection
 * is empty (see lib/db/categories.ts and scripts/seed.ts).
 */
export type CategorySeed = {
  key: string;
  label: string;
  icon: string;
  order: number;
  submittable: boolean;
};

export const DEFAULT_CATEGORIES: CategorySeed[] = [
  { key: "ia", label: "IA", icon: "ia", order: 1, submittable: true },
  { key: "cursos", label: "Cursos", icon: "cursos", order: 2, submittable: true },
  { key: "challenges", label: "Challenges", icon: "challenges", order: 3, submittable: true },
  { key: "herramientas", label: "Herramientas", icon: "herramientas", order: 4, submittable: true },
  { key: "documentacion", label: "Documentación", icon: "documentacion", order: 5, submittable: true },
  { key: "diseño", label: "Diseño", icon: "diseño", order: 6, submittable: true },
  { key: "inspiraciones", label: "Inspiraciones", icon: "inspiraciones", order: 7, submittable: true },
  { key: "blogs", label: "Blogs y guías", icon: "blogs", order: 8, submittable: true },
  { key: "apis", label: "APIs", icon: "apis", order: 9, submittable: true },
  { key: "librerias", label: "Frameworks y librerías", icon: "librerias", order: 10, submittable: true },
  { key: "repositorios", label: "Repositorios", icon: "repositorios", order: 11, submittable: true },
  { key: "componentes", label: "Componentes", icon: "componentes", order: 12, submittable: true },
  { key: "didactico", label: "Didáctico", icon: "didactico", order: 13, submittable: true },
  { key: "hosting", label: "Hosting y deploy", icon: "hosting", order: 14, submittable: true },
  { key: "productividad", label: "Productividad", icon: "productividad", order: 15, submittable: true },
  { key: "testing", label: "Testing", icon: "testing", order: 16, submittable: true },
];
