import LogoBox from "@/components/common/LogoBox";
import Section from "@/components/common/Section";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import { programs } from "@/data";
import { getIcon } from "@/lib/icons";

const ProgramsSection = () => (
  <Section
    id="non-academic-program"
    eyebrow="Background"
    title="Professional programs"
    description="Career tracks and leadership programs outside formal degrees."
  >
    <Timeline>
      {programs.map((p) => (
        <TimelineItem key={p.title}>
        <article className="surface flex items-start gap-4 p-5">
          <LogoBox src={p.logo} alt={`${p.organization} logo`} fallbackIcon={getIcon(p.icon)} />
          <div>
            <h3 className="font-semibold capitalize leading-snug">{p.title.toLowerCase()}</h3>
            <p className="text-sm text-muted-foreground">{p.organization}</p>
            <p className="mt-1 text-sm tabular-nums text-muted-foreground">{p.duration}</p>
          </div>
        </article>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);

export default ProgramsSection;
