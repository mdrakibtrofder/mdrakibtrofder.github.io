import { Check, GraduationCap, Microscope, TerminalSquare } from "lucide-react";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { profile } from "@/data";
import { cn } from "@/lib/utils";

const TRACKS = [
  { key: "academic", icon: GraduationCap, color: "text-academic", bg: "bg-academic-soft", bar: "bg-academic" },
  { key: "engineering", icon: TerminalSquare, color: "text-engineering", bg: "bg-engineering-soft", bar: "bg-engineering" },
] as const;

const About = () => (
  <Section
    id="about"
    eyebrow="About"
    title="Two sides of my work"
    description="I teach what I have built. My classroom draws on real engineering practice, and my engineering is shaped by research."
  >
    <div className="grid gap-6 md:grid-cols-2">
      {TRACKS.map(({ key, icon: Icon, color, bg, bar }) => {
        const track = profile.tracks[key];
        return (
          <article key={key} className="surface relative overflow-hidden p-6 md:p-8">
            <span className={cn("absolute inset-x-0 top-0 h-1", bar)} aria-hidden="true" />
            <div className="flex items-center gap-3">
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", bg, color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.role}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {track.points.map((point) => (
                <li key={point} className="flex gap-3 text-[15px] leading-relaxed">
                  <Check className={cn("mt-1 h-4 w-4 shrink-0", color)} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>

    <div className="surface mt-6 flex flex-col gap-4 p-6 md:flex-row md:items-center">
      <div className="flex items-center gap-3 md:w-56 md:shrink-0">
        <Microscope className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Research interests</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {profile.researchInterests.map((r) => (
          <Tag key={r} className="px-3 py-1 text-sm">
            {r}
          </Tag>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
