import { ArrowUpRight, Building2 } from "lucide-react";
import Section, { sectionProps } from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Person, SiteSection, Supervision } from "@/types";

const PersonLine = ({ label, person }: { label: string; person: Person }) => (
  <div className="flex items-baseline justify-between gap-3 py-2 text-sm">
    <div className="min-w-0">
      <span className="eyebrow mr-2 text-[10px] text-muted-foreground">{label}</span>
      {person.url ? (
        <a href={person.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
          {person.name}
          <ArrowUpRight className="ml-0.5 inline h-3 w-3 text-muted-foreground" />
        </a>
      ) : (
        <span className="font-medium">{person.name}</span>
      )}
      {person.role && <p className="text-xs text-muted-foreground">{person.role}</p>}
    </div>
  </div>
);

const SupervisionSection = ({ section }: { section: SiteSection<Supervision> }) => (
  <Section {...sectionProps(section)}>
    <Timeline>
      {section.items.map((s, i) => (
        <TimelineItem key={`${s.supervisionType}-${i}`}>
        <article className="surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="font-semibold leading-snug">{(s.institutes ?? []).join(" · ")}</h3>
                {s.department && <p className="text-sm text-muted-foreground">{s.department}</p>}
              </div>
            </div>
            <Tag className="shrink-0">{s.supervisionType}</Tag>
          </div>
          <p className="mt-2 pl-6 text-sm tabular-nums text-muted-foreground">{s.duration}</p>
          <div className="mt-3 divide-y border-t pl-6">
            {s.supervisor?.name && <PersonLine label="Supervisor" person={s.supervisor} />}
            {s.coSupervisor?.name && <PersonLine label="Co-supervisor" person={s.coSupervisor} />}
            {s.mentor?.name && <PersonLine label="Mentor" person={s.mentor} />}
          </div>
        </article>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);

export default SupervisionSection;
