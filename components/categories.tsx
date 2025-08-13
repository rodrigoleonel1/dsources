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
  Puzzle,
  ClipboardPenLine,
} from "lucide-react";

export const categories: CategoryItem[] = [
  { key: "todas", label: "Todas", icon: Layers },
  { key: "cursos", label: "Cursos", icon: GraduationCap },
  { key: "challenges", label: "Challenges", icon: Rocket },
  { key: "herramientas", label: "Herramientas", icon: Wrench },
  { key: "documentacion", label: "Documentación", icon: BookOpen },
  { key: "diseño", label: "Diseño", icon: Palette },
  { key: "componentes", label: "Componentes", icon: Puzzle },
  { key: "inspiraciones", label: "Inspiraciones", icon: Sparkles },
  { key: "blogs", label: "Blogs y guías", icon: FileText },
  { key: "apis", label: "APIs", icon: Globe },
  { key: "librerias", label: "Frameworks y librerías", icon: Package },
  { key: "didactico", label: "Didáctico", icon: ClipboardPenLine },
  { key: "repositorios", label: "Repositorios", icon: GitBranch },
];
