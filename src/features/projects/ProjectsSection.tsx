import { useMemo, useState } from "react";
import Section from "@/components/common/Section";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import { projects } from "@/data";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

const ALL = "All";
const INITIAL = 6;

const ProjectsSection = () => {
  // Categories in the order they first appear in projects.json, with counts.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.type, (counts.get(p.type) ?? 0) + 1));
    return [...counts.entries()];
  }, []);

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
  }, [categories]);

  const filtered = active === ALL ? mixed : projects.filter((p) => p.type === active);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL);

  const select = (cat: string) => {
    setActive(cat);
    setExpanded(false);
  };

  return (
    <Section
      id="projects"
      eyebrow="Engineering"
      accent="engineering"
      title="Projects"
      description="Course tools, concept visualizers, capstones and engineering work. Many are live and free to use."
    >
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>

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
