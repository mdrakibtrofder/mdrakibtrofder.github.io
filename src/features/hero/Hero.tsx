import { ArrowRight, Github, GraduationCap, Linkedin, Mail, MapPin, TerminalSquare } from "lucide-react";
import { profile } from "@/data";
import { scrollToSection } from "@/lib/scroll";
import { stats } from "@/lib/stats";

const STAT_ITEMS = [
  { value: stats.courses, label: "Courses taught" },
  { value: stats.studentsMentored, label: "Students mentored" },
  { value: `${stats.industryYears}+`, label: "Years in industry" },
  { value: stats.projects, label: "Projects built" },
];

const Hero = () => {
  const { academic, engineering } = profile.tracks;

  return (
    <section id="home" className="relative px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-academic-soft px-3 py-1 text-sm font-medium text-academic">
              <GraduationCap className="h-4 w-4" /> Educator
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-engineering-soft px-3 py-1 text-sm font-medium text-engineering">
              <TerminalSquare className="h-4 w-4" /> Software Engineer
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{profile.name}</h1>
          <p className="mt-4 text-lg font-medium md:text-xl">{profile.headline}</p>
          <a
            href={profile.affiliation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <MapPin className="h-4 w-4" />
            {profile.affiliation.name}
          </a>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("teaching")}
              className="inline-flex items-center gap-2 rounded-lg bg-academic px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:text-slate-950"
            >
              Teaching <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 rounded-lg bg-engineering px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 dark:text-slate-950"
            >
              Projects <ArrowRight className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {[
                { href: profile.socials.github, icon: Github, label: "GitHub" },
                { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.contact.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* At a glance */}
        <div className="surface p-6">
          <p className="eyebrow text-muted-foreground">At a glance</p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {STAT_ITEMS.map((s) => (
              <div key={s.label} className="rounded-xl bg-secondary/60 p-4">
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-3xl font-bold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 space-y-3 border-t pt-5 text-sm">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-academic" />
              <p>
                <span className="font-semibold">Now:</span>{" "}
                <span className="text-muted-foreground">{academic.role}</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-engineering" />
              <p>
                <span className="font-semibold">Before:</span>{" "}
                <span className="text-muted-foreground">{engineering.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
