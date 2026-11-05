import { MapPin, Users } from "lucide-react";
import Section, { sectionProps } from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Mentorship, SiteSection } from "@/types";

const MentorshipSection = ({ section }: { section: SiteSection<Mentorship> }) => (
  <Section {...sectionProps(section)}>
    <Timeline>
      {section.items.map((m, i) => (
        <TimelineItem key={`${m.role}-${i}`} tone="academic">
        <article className="surface surface-hover flex flex-col p-5 md:p-6">
          <p className="text-sm font-medium tabular-nums text-muted-foreground">{m.period}</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug">{m.role}</h3>
          <p className="text-sm text-muted-foreground">{m.institution}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag tone="academic">
              <Users className="h-3 w-3" /> {m.studentCount}
            </Tag>
            <Tag tone="outline">
              <MapPin className="h-3 w-3" /> {m.location}
            </Tag>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="eyebrow mb-2 text-muted-foreground">Projects</p>
            <ul className="space-y-1.5 text-sm">
              {(m.projects ?? []).map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-academic" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);

export default MentorshipSection;
