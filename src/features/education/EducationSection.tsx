import { useState } from "react";
import { GraduationCap, Trophy } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section, { sectionProps } from "@/components/common/Section";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Education, SiteSection } from "@/types";

const EducationSection = ({ section }: { section: SiteSection<Education> }) => {
  const education = section.items;
  const [expanded, setExpanded] = useState(false);
  const main = education.filter((e) => !e.isMore);
  const more = education.filter((e) => e.isMore);
  const list = expanded ? [...main, ...more] : main;

  return (
    <Section {...sectionProps(section)}>
      <Timeline>
        {list.map((e) => (
          <TimelineItem key={e.degree + e.institute}>
            <article className="surface p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <LogoBox src={e.logo} alt={`${e.institute} logo`} href={e.link} fallbackIcon={GraduationCap} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 md:flex-row md:justify-between md:gap-4">
                    <div>
                      <h3 className="font-semibold leading-snug">{e.degree}</h3>
                      <p className="text-sm text-muted-foreground">{e.institute}</p>
                    </div>
                    <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{e.duration}</p>
                  </div>
                  {(e.result || (e.achievements?.length ?? 0) > 0) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.result && <Tag tone="academic">{e.result}</Tag>}
                      {(e.achievements ?? []).map((a) => (
                        <Tag key={a} tone="outline">
                          <Trophy className="h-3 w-3" /> {a}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </TimelineItem>
        ))}
      </Timeline>
      {more.length > 0 && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          hiddenCount={more.length}
          label={section.options.moreLabel || "Show more"}
        />
      )}
    </Section>
  );
};

export default EducationSection;
