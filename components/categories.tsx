import { CategoryItem } from "@/data/types";
import {
  GraduationCap,
  Rocket,
  Wrench,
  BookOpen,
  Palette,
  Sparkles,
  FileText,
  Globe,
  Package,
  GitBranch,
  Layers,
} from "lucide-react";

export const categories: CategoryItem[] = [
  { key: "todas", label: "Todas", icon: Layers },
  { key: "cursos", label: "Páginas de Cursos", icon: GraduationCap },
  { key: "challenges", label: "Páginas de Challenges", icon: Rocket },
  { key: "herramientas", label: "Páginas de Herramientas", icon: Wrench },
  { key: "documentacion", label: "Páginas de Documentación", icon: BookOpen },
  { key: "diseno", label: "Páginas de Diseño", icon: Palette },
  { key: "inspiraciones", label: "Páginas de Inspiraciones", icon: Sparkles },
  { key: "blogs", label: "Blogs y guías", icon: FileText },
  { key: "apis", label: "APIs", icon: Globe },
  { key: "librerias", label: "Librerías", icon: Package },
  { key: "repositorios", label: "Repositorios", icon: GitBranch },
];
