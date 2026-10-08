import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: ReactNode;
  /** Small label above the title, e.g. "Teaching". */
  eyebrow?: string;
  accent?: "academic" | "engineering" | "neutral";
  /** Element placed on the right of the heading (filters, buttons). */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

const accentText = {
  academic: "text-academic",
  engineering: "text-engineering",
  neutral: "text-muted-foreground",
};

const Section = ({
  id,
  title,
  description,
  eyebrow,
  accent = "neutral",
  action,
  className,
  children,
}: SectionProps) => (
  <section id={id} className={cn("scroll-mt-20 px-4 py-14 sm:px-6 md:py-16", className)}>
    <div className="mx-auto max-w-6xl">
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <p className={cn("eyebrow mb-2", accentText[accent])}>{eyebrow}</p>}
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      {children}
    </div>
  </section>
);

export default Section;
