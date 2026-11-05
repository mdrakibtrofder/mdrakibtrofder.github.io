import { CalendarDays, Presentation } from "lucide-react";
import ExternalLink from "@/components/common/ExternalLink";
import Section, { sectionProps } from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { SiteSection, Workshop } from "@/types";

const WorkshopsSection = ({ section }: { section: SiteSection<Workshop> }) => (
  <Section {...sectionProps(section)}>
    <Timeline>
      {section.items.map((w) => (
        <TimelineItem key={w.title} tone="academic">
        <article className="surface surface-hover flex flex-col p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-academic-soft text-academic">
              <Presentation className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-snug">{w.title}</h3>
              <p className="text-sm text-muted-foreground">
                {w.org}
                {w.dept ? ` · ${w.dept}` : ""}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Tag tone="outline">
              <CalendarDays className="h-3 w-3" /> {w.date}
            </Tag>
            <Tag tone="academic">{w.program}</Tag>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
          {w.tags && w.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {w.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
          {w.url && (
            <ExternalLink href={w.url} className="mt-4 text-academic">
              Details
            </ExternalLink>
          )}
        </article>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);

export default WorkshopsSection;
