import { Code2, Wrench } from "lucide-react";
import ExternalLink from "@/components/common/ExternalLink";
import Section, { sectionProps } from "@/components/common/Section";
import type { Certification, SiteSection } from "@/types";

const SkillsSection = ({ section }: { section: SiteSection<Certification> }) => {
  const o = section.options;
  const groups = [
    { title: o.languagesLabel || "Languages & frameworks", icon: Code2, items: (o.languages_frameworks ?? []) as string[] },
    { title: o.toolsLabel || "Tools & platforms", icon: Wrench, items: (o.tools_technologies ?? []) as string[] },
  ].filter((g) => g.items.length > 0);

  const certsByTag = section.items.reduce<Record<string, Certification[]>>((acc, c) => {
    (acc[c.tag] ??= []).push(c);
    return acc;
  }, {});

  return (
    <Section {...sectionProps(section)}>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map(({ title, icon: Icon, items }) => (
          <div key={title} className="surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon className="h-4 w-4 text-engineering" />
              <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s} className="rounded-lg border bg-background px-3 py-1.5 font-mono text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {section.items.length > 0 && (
      <div className="surface mt-4 p-6">
        <h3 className="mb-4 font-semibold">{o.certificationsLabel || "Technical certifications"}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(certsByTag).map(([tag, certs]) => (
            <div key={tag}>
              <p className="eyebrow mb-2 text-muted-foreground">{tag}</p>
              <ul className="space-y-1.5">
                {certs.map((c) => (
                  <li key={c.name}>
                    <ExternalLink href={c.url} className="font-normal text-foreground">
                      {c.name}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      )}
    </Section>
  );
};

export default SkillsSection;
