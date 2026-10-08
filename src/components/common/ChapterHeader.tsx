import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  accent: "academic" | "engineering" | "neutral";
}

const styles = {
  academic: "bg-academic-soft text-academic",
  engineering: "bg-engineering-soft text-engineering",
  neutral: "bg-secondary text-foreground",
};

const labelStyles = {
  academic: "text-academic",
  engineering: "text-engineering",
  neutral: "text-muted-foreground",
};

/** Divider that opens a group of related sections (e.g. everything about teaching). */
const ChapterHeader = ({ icon: Icon, label, title, description, accent }: ChapterHeaderProps) => (
  <div className="border-y bg-card px-4 py-10 sm:px-6">
    <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center">
      <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", styles[accent])}>
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <p className={cn("eyebrow", labelStyles[accent])}>
          {label}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-1 max-w-3xl text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

export default ChapterHeader;
