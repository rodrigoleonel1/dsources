import {
  BookOpen,
  Bot,
  Briefcase,
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
  Server,
  Sparkles,
  TestTubes,
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
  ia: Bot,
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
  hosting: Server,
  productividad: Briefcase,
  testing: TestTubes,
};

export function getCategoryIcon(key: string): LucideIcon {
  return categoryIcons[key] ?? Circle;
}
