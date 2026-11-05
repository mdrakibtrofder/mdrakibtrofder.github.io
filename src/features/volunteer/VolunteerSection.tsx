import { useMemo, useState } from "react";
import { Link as LinkIcon, Users } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section, { sectionProps } from "@/components/common/Section";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { SiteSection, Volunteer } from "@/types";

const INITIAL = 6;

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "Jan 2024 - Feb 2025" -> sortable start value (year * 12 + month). */
const startValue = (duration: string): number => {
  const m = duration.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})/);
  if (!m) return 0;
  return Number(m[2]) * 12 + Math.max(0, MONTHS.indexOf(m[1].toLowerCase()));
};

interface Group {
  organization: string;
  category: string;
  logo?: string;
  roles: Volunteer[];
}

const VolunteerSection = ({ section }: { section: SiteSection<Volunteer> }) => {
  const volunteer = section.items;
  const [expanded, setExpanded] = useState(false);

  // One card per organisation, listing every role held there.
  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    for (const v of volunteer) {
      const key = v.organization.trim();
      if (!map.has(key)) map.set(key, { organization: key, category: v.category, logo: v.logo, roles: [] });
      map.get(key)!.roles.push(v);
    }
    // Newest first: roles within an organisation, then organisations by their latest role.
    const list = [...map.values()];
    list.forEach((g) => g.roles.sort((a, b) => startValue(b.duration) - startValue(a.duration)));
    return list.sort((a, b) => startValue(b.roles[0].duration) - startValue(a.roles[0].duration));
  }, [volunteer]);

  const visible = expanded ? groups : groups.slice(0, INITIAL);

  return (
    <Section {...sectionProps(section)}>
      <Timeline>
        {visible.map((g) => (
          <TimelineItem key={g.organization}>
          <article className="surface flex flex-col p-5">
            <div className="flex items-center gap-3">
              <LogoBox src={g.logo} alt={`${g.organization} logo`} fallbackIcon={Users} size="sm" />
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug">{g.organization}</h3>
                <p className="text-xs text-muted-foreground">{g.category}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 border-t pt-3">
              {g.roles.map((r, i) => (
                <li key={`${r.role}-${i}`} className="text-sm">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">{r.role}</span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{r.duration}</span>
                  </div>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <LinkIcon className="h-3 w-3" /> Details
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </article>
          </TimelineItem>
        ))}
      </Timeline>
      {groups.length > INITIAL && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          hiddenCount={groups.length - INITIAL}
        />
      )}
    </Section>
  );
};

export default VolunteerSection;
