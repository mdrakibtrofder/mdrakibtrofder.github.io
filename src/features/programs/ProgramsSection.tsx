import LogoBox from "@/components/common/LogoBox";
import Section from "@/components/common/Section";
import { programs } from "@/data";
import { getIcon } from "@/lib/icons";

const ProgramsSection = () => (
  <Section
    id="non-academic-program"
    eyebrow="Background"
    title="Professional programs"
    description="Career tracks and leadership programs outside formal degrees."
  >
    <div className="grid gap-4 md:grid-cols-2">
      {programs.map((p) => (
        <article key={p.title} className="surface flex items-start gap-4 p-5">
          <LogoBox src={p.logo} alt={`${p.organization} logo`} fallbackIcon={getIcon(p.icon)} />
          <div>
            <h3 className="font-semibold capitalize leading-snug">{p.title.toLowerCase()}</h3>
            <p className="text-sm text-muted-foreground">{p.organization}</p>
            <p className="mt-1 text-sm tabular-nums text-muted-foreground">{p.duration}</p>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default ProgramsSection;
