import { MapPin } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section, { sectionProps } from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Experience, SiteSection } from "@/types";
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
          <Tag tone={item.track}>{trackLabel[item.track] ?? item.track}</Tag>
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

/** Colours the words "academic" and "industry" in the description to act as a legend. */
const withLegend = (text: string) =>
  text.split(/\b(academic|industry)\b/i).map((part, i) =>
    /^(academic|industry)$/i.test(part) ? (
      <span key={i} className={cn("font-medium", /^a/i.test(part) ? "text-academic" : "text-engineering")}>
        {part}
      </span>
    ) : (
      part
    ),
  );

const ExperienceSection = ({ section }: { section: SiteSection<Experience> }) => {
  const experience = section.items;
  const fullTime = experience.filter((e) => e.type !== "Internship");
  const internships = experience.filter((e) => e.type === "Internship");

  return (
    <Section {...sectionProps(section)} description={section.description ? withLegend(section.description) : undefined}>
      <Timeline>
        {fullTime.map((e) => (
          <TimelineItem key={e.company + e.role} tone={e.track}>
            <ExperienceCard item={e} />
          </TimelineItem>
        ))}
      </Timeline>

      {internships.length > 0 && (
        <>
          <h3 className="eyebrow mb-4 mt-10 text-muted-foreground">
            {section.options.internshipsLabel || "Internships"}
          </h3>
          <Timeline>
            {internships.map((e) => (
              <TimelineItem key={e.company + e.role} tone={e.track}>
                <ExperienceCard item={e} />
              </TimelineItem>
            ))}
          </Timeline>
        </>
      )}
    </Section>
  );
};

export default ExperienceSection;
