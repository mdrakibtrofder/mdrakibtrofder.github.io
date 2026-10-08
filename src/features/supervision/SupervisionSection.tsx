import { ArrowUpRight, Building2 } from "lucide-react";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { supervision } from "@/data";
import type { Person } from "@/types";

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

const SupervisionSection = () => (
  <Section
    id="supervision"
    eyebrow="Background"
    title="Supervision"
    description="Supervisors and mentors who guided my work across academia and industry."
  >
    <div className="grid gap-4 md:grid-cols-2">
      {supervision.map((s, i) => (
        <article key={`${s.supervisionType}-${i}`} className="surface p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <h3 className="font-semibold leading-snug">{s.institutes.join(" · ")}</h3>
                {s.department && <p className="text-sm text-muted-foreground">{s.department}</p>}
              </div>
            </div>
            <Tag className="shrink-0">{s.supervisionType}</Tag>
          </div>
          <p className="mt-2 pl-6 text-sm tabular-nums text-muted-foreground">{s.duration}</p>
          <div className="mt-3 divide-y border-t pl-6">
            {s.supervisor && <PersonLine label="Supervisor" person={s.supervisor} />}
            {s.coSupervisor && <PersonLine label="Co-supervisor" person={s.coSupervisor} />}
            {s.mentor && <PersonLine label="Mentor" person={s.mentor} />}
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default SupervisionSection;
