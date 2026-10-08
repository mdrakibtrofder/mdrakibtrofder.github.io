import { useMemo, useState } from "react";
import { Link as LinkIcon, Users } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section from "@/components/common/Section";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import { volunteer } from "@/data";
import type { Volunteer } from "@/types";

const INITIAL = 6;

interface Group {
  organization: string;
  category: string;
  logo?: string;
  roles: Volunteer[];
}

const VolunteerSection = () => {
  const [expanded, setExpanded] = useState(false);

  // One card per organisation, listing every role held there.
  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    for (const v of volunteer) {
      const key = v.organization.trim();
      if (!map.has(key)) map.set(key, { organization: key, category: v.category, logo: v.logo, roles: [] });
      map.get(key)!.roles.push(v);
    }
    return [...map.values()];
  }, []);

  const visible = expanded ? groups : groups.slice(0, INITIAL);

  return (
    <Section
      id="volunteer"
      eyebrow="Background"
      title="Volunteer experience"
      description="Clubs and community organisations I have served."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((g) => (
          <article key={g.organization} className="surface flex flex-col p-5">
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
        ))}
      </div>
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
