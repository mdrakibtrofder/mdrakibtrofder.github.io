import { Code2, Wrench } from "lucide-react";
import ExternalLink from "@/components/common/ExternalLink";
import Section from "@/components/common/Section";
import { skills } from "@/data";

const SkillsSection = () => {
  const groups = [
    { title: "Languages & frameworks", icon: Code2, items: skills.languages_frameworks },
    { title: "Tools & platforms", icon: Wrench, items: skills.tools_technologies },
  ];

  const certsByTag = skills.certifications.reduce<Record<string, typeof skills.certifications>>((acc, c) => {
    (acc[c.tag] ??= []).push(c);
    return acc;
  }, {});

  return (
    <Section
      id="skills"
      eyebrow="Engineering"
      accent="engineering"
      title="Skills"
      description="The stack I use day to day, and the certifications behind it."
    >
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

      <div className="surface mt-4 p-6">
        <h3 className="mb-4 font-semibold">Technical certifications</h3>
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
    </Section>
  );
};

export default SkillsSection;
