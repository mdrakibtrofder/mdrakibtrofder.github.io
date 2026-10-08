import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "academic" | "engineering" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  academic: "bg-academic-soft text-academic",
  engineering: "bg-engineering-soft text-engineering",
  outline: "border text-muted-foreground",
};

const Tag = ({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
);

export default Tag;
