import { MapPin, Users } from "lucide-react";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { mentorship } from "@/data";

const MentorshipSection = () => (
  <Section
    id="mentorship"
    eyebrow="Teaching"
    accent="academic"
    title="Student mentorship"
    description="Final-year projects I co-supervise and student interns I have mentored in industry."
  >
    <div className="grid gap-4 md:grid-cols-2">
      {mentorship.map((m, i) => (
        <article key={`${m.role}-${i}`} className="surface surface-hover flex flex-col p-5 md:p-6">
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
              {m.projects.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-academic" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default MentorshipSection;
