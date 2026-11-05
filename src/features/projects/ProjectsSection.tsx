import { useMemo, useState } from "react";
import Section, { sectionProps } from "@/components/common/Section";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Project, SiteSection } from "@/types";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

const ALL = "All";
const INITIAL = 6;

const ProjectsSection = ({ section }: { section: SiteSection<Project> }) => {
  const projects = section.items;
  // Categories in the order they first appear in projects.json, with counts.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return [...counts.entries()];
  }, [projects]);

  const [active, setActive] = useState(ALL);
  const [expanded, setExpanded] = useState(false);

  // "All" interleaves categories so the first cards show the range of work, not one type.
  const mixed = useMemo(() => {
    const buckets = categories.map(([cat]) => projects.filter((p) => p.type === cat));
    const out: typeof projects = [];
    for (let i = 0; out.length < projects.length; i++) {
      buckets.forEach((b) => b[i] && out.push(b[i]));
    }
    return out;
  }, [categories, projects]);

  const filtered = active === ALL ? mixed : projects.filter((p) => p.type === active);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL);

  const select = (cat: string) => {
    setActive(cat);
    setExpanded(false);
  };

  return (
    <Section {...sectionProps(section)}>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Project category">
        {[[ALL, projects.length] as const, ...categories].map(([cat, count]) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => select(cat)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              active === cat
                ? "border-engineering bg-engineering text-white dark:text-slate-950"
                : "bg-card hover:bg-secondary",
            )}
          >
            {cat.replace(/ Project$/, "")}
            <span className={cn("text-xs tabular-nums", active === cat ? "opacity-80" : "text-muted-foreground")}>
              {count}
            </span>
          </button>
        ))}
      </div>

      <Timeline>
        {visible.map((p) => (
          <TimelineItem key={p.name} tone="engineering">
            <ProjectCard project={p} />
          </TimelineItem>
        ))}
      </Timeline>

      {filtered.length > INITIAL && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          hiddenCount={filtered.length - INITIAL}
          label="Show all projects"
        />
      )}
    </Section>
  );
};

export default ProjectsSection;
