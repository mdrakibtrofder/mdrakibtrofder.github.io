import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  Database,
  Feather,
  Layers,
  Layout,
  MapPin,
  Monitor,
  PenTool,
  Rocket,
  Shield,
  Star,
  Terminal,
  Youtube,
  type LucideIcon,
} from "lucide-react";

// Lets JSON data refer to icons by name, e.g. "icon": "database".
const ICONS: Record<string, LucideIcon> = {
  award: Award,
  book: BookOpen,
  "book-open": BookOpen,
  briefcase: Briefcase,
  code: Code,
  cpu: Cpu,
  database: Database,
  feather: Feather,
  layers: Layers,
  layout: Layout,
  "map-pin": MapPin,
  monitor: Monitor,
  "pen-tool": PenTool,
  rocket: Rocket,
  shield: Shield,
  star: Star,
  terminal: Terminal,
  youtube: Youtube,
};

export const getIcon = (name?: string, fallback: LucideIcon = Award): LucideIcon =>
  (name && ICONS[name]) || fallback;
