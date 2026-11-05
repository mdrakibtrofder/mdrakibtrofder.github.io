import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "academic" | "engineering";

const dotTone: Record<Tone, string> = {
  neutral: "bg-foreground/60",
  academic: "bg-academic",
  engineering: "bg-engineering",
};

/** Vertical axis with a dot per entry, as used in Education. */
export const Timeline = ({ children, className }: { children: ReactNode; className?: string }) => (
  <ol className={cn("relative space-y-4 border-l pl-6 md:pl-8", className)}>{children}</ol>
);

export const TimelineItem = ({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) => (
  <li className={cn("relative", className)}>
    <span
      aria-hidden="true"
      className={cn(
        "absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-background md:-left-[39px]",
        dotTone[tone],
      )}
    />
    {children}
  </li>
);
