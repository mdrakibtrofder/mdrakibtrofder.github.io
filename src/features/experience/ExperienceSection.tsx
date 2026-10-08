import { MapPin } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { experience } from "@/data";
import type { Experience } from "@/types";
import { cn } from "@/lib/utils";

const trackLabel = { academic: "Academia", engineering: "Industry" } as const;

const ExperienceCard = ({ item }: { item: Experience }) => (
  <article className="surface surface-hover relative p-5 md:p-6">
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-0 top-6 h-8 w-1 rounded-r",
        item.track === "academic" ? "bg-academic" : "bg-engineering",
      )}
    />
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <LogoBox src={item.logo} alt={`${item.company} logo`} href={item.link} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-4">
          <div>
            <h3 className="text-lg font-semibold leading-snug">{item.role}</h3>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-medium text-muted-foreground hover:text-foreground">
                {item.company}
              </a>
            ) : (
              <p className="font-medium text-muted-foreground">{item.company}</p>
            )}
          </div>
          <p className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">{item.duration}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Tag tone={item.track}>{trackLabel[item.track]}</Tag>
          <Tag tone="outline">{item.type}</Tag>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> {item.location}
          </span>
        </div>
        <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          {item.responsibilities.map((r) => (
            <li key={r} className="flex gap-2.5">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

const ExperienceSection = () => {
  const fullTime = experience.filter((e) => e.type === "Full-time");
  const internships = experience.filter((e) => e.type === "Internship");

  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Experience"
      description={
        <>
          From software engineering to the lecture hall. Bars mark{" "}
          <span className="font-medium text-academic">academic</span> and{" "}
          <span className="font-medium text-engineering">industry</span> roles.
        </>
      }
    >
      <div className="space-y-4">
        {fullTime.map((e) => (
          <ExperienceCard key={e.company + e.role} item={e} />
        ))}
      </div>

      {internships.length > 0 && (
        <>
          <h3 className="eyebrow mb-4 mt-10 text-muted-foreground">Internships & research</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {internships.map((e) => (
              <ExperienceCard key={e.company + e.role} item={e} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
};

export default ExperienceSection;
