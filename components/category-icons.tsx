import {
  BookOpen,
  Circle,
  ClipboardPenLine,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Package,
  Palette,
  Puzzle,
  Rocket,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons are the one thing that can't live in the DB (they're React components),
 * so categories store a string key that resolves here. Unknown keys fall back
 * to a neutral icon instead of breaking the render.
 */
export const categoryIcons: Record<string, LucideIcon> = {
  todas: Layers,
  cursos: GraduationCap,
  challenges: Rocket,
  herramientas: Wrench,
  documentacion: BookOpen,
  diseño: Palette,
  inspiraciones: Sparkles,
  blogs: FileText,
  apis: Globe,
  librerias: Package,
  repositorios: GitBranch,
  componentes: Puzzle,
  didactico: ClipboardPenLine,
};

export function getCategoryIcon(key: string): LucideIcon {
  return categoryIcons[key] ?? Circle;
}
