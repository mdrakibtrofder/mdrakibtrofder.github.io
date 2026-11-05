import { existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

/**
 * Builds the initial site content from the JSON files that used to live in the
 * frontend (now backend/src/seed/legacy/*.json, plus public/certificates/certificate_details.json).
 * Used once by the migration, and to write the first snapshot for the frontend.
 */

export const REPO_ROOT = resolve(__dirname, "../../..");

const readJson = <T = any>(rel: string): T => JSON.parse(readFileSync(join(REPO_ROOT, rel), "utf8"));

export interface SeedSection {
  key: string;
  kind: string;
  chapter: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "neutral" | "academic" | "engineering";
  options?: Record<string, unknown>;
  items: Record<string, unknown>[];
}

export interface Seed {
  settings: { profile: Record<string, unknown>; chapters: Record<string, unknown>[] };
  sections: SeedSection[];
}

export const CHAPTERS = [
  { id: "about", navLabel: "About", label: "", title: "", description: "", icon: "", accent: "neutral", showHeader: false },
  {
    id: "teaching",
    navLabel: "Teaching",
    label: "Part 1",
    title: "Teaching & mentorship",
    description: "Courses I teach, students I supervise, and workshops I run.",
    icon: "graduation-cap",
    accent: "academic",
    showHeader: true,
  },
  {
    id: "engineering",
    navLabel: "Engineering",
    label: "Part 2",
    title: "Software engineering",
    description: "Things I have built and the tools I build them with.",
    icon: "briefcase",
    accent: "engineering",
    showHeader: true,
  },
  {
    id: "background",
    navLabel: "Background",
    label: "Part 3",
    title: "Background",
    description: "Education, programs, certificates, the people who guided me, and community work.",
    icon: "layers",
    accent: "neutral",
    showHeader: true,
  },
  {
    id: "content",
    navLabel: "Content",
    label: "Part 4",
    title: "Beyond work",
    description: "Where I write, teach online, and share places I visit.",
    icon: "play-circle",
    accent: "neutral",
    showHeader: true,
  },
];

export const buildSeed = (): Seed => {
  const profile = readJson("backend/src/seed/legacy/profile.json");
  const teaching = readJson("backend/src/seed/legacy/teaching.json");
  const skills = readJson("backend/src/seed/legacy/skills.json");
  const content = readJson("backend/src/seed/legacy/content.json");
  const certificates = readJson<Record<string, unknown>[]>("public/certificates/certificate_details.json");

  // Certificates: attach the matching PDF when one exists (public/certificates/pdfs/<id>.pdf).
  const certItems = certificates.map((c) => {
    const pdf = `/certificates/pdfs/${c.id}.pdf`;
    return existsSync(join(REPO_ROOT, "public", pdf)) ? { ...c, pdf } : c;
  });

  const sections: SeedSection[] = [
    {
      key: "about", kind: "about", chapter: "about", navLabel: "Overview",
      eyebrow: "About", title: "Two sides of my work",
      description:
        "I teach what I have built. My classroom draws on real engineering practice, and my engineering is shaped by research.",
      accent: "neutral", items: [],
    },
    {
      key: "experience", kind: "experience", chapter: "about", navLabel: "Experience",
      eyebrow: "Career", title: "Experience",
      description: "From software engineering to the lecture hall. Bars mark academic and industry roles.",
      accent: "neutral", options: { internshipsLabel: "Internships & research" },
      items: readJson("backend/src/seed/legacy/experience.json"),
    },
    {
      key: "teaching", kind: "teaching", chapter: "teaching", navLabel: "Courses",
      eyebrow: "Teaching", title: "Courses",
      description:
        "Undergraduate theory and lab courses I teach at the Department of CSE, BAUST. Several have their own interactive course sites.",
      accent: "academic", options: { counseling: teaching.counseling }, items: teaching.courses,
    },
    {
      key: "mentorship", kind: "mentorship", chapter: "teaching", navLabel: "Student Mentorship",
      eyebrow: "Teaching", title: "Student mentorship",
      description: "Final-year projects I co-supervise and student interns I have mentored in industry.",
      accent: "academic", items: readJson("backend/src/seed/legacy/mentorship.json"),
    },
    {
      key: "workshops", kind: "workshops", chapter: "teaching", navLabel: "Workshops",
      eyebrow: "Teaching", title: "Technical workshops",
      description: "Hands-on sessions where I bring industry practice to university students.",
      accent: "academic", items: readJson("backend/src/seed/legacy/workshops.json"),
    },
    {
      key: "projects", kind: "projects", chapter: "engineering", navLabel: "Projects",
      eyebrow: "Engineering", title: "Projects",
      description: "Course tools, concept visualizers, capstones and engineering work. Many are live and free to use.",
      accent: "engineering", items: readJson("backend/src/seed/legacy/projects.json"),
    },
    {
      key: "skills", kind: "skills", chapter: "engineering", navLabel: "Skills",
      eyebrow: "Engineering", title: "Skills",
      description: "The stack I use day to day, and the certifications behind it.",
      accent: "engineering",
      options: { languages_frameworks: skills.languages_frameworks, tools_technologies: skills.tools_technologies },
      items: skills.certifications,
    },
    {
      key: "education", kind: "education", chapter: "background", navLabel: "Education",
      eyebrow: "Background", title: "Education", description: "", accent: "neutral",
      options: { moreLabel: "Show primary education" }, items: readJson("backend/src/seed/legacy/education.json"),
    },
    {
      key: "non-academic-program", kind: "programs", chapter: "background", navLabel: "Programs",
      eyebrow: "Background", title: "Professional programs",
      description: "Career tracks and leadership programs outside formal degrees.",
      accent: "neutral", items: readJson("backend/src/seed/legacy/programs.json"),
    },
    {
      key: "certificates", kind: "certificates", chapter: "background", navLabel: "Certificates",
      eyebrow: "Background", title: "Certificates",
      description: "Certificates from courses, competitions and events, grouped by year. Click any card for details.",
      accent: "neutral", items: certItems,
    },
    {
      key: "supervision", kind: "supervision", chapter: "background", navLabel: "Supervision",
      eyebrow: "Background", title: "Supervision",
      description: "Supervisors and mentors who guided my work across academia and industry.",
      accent: "neutral", items: readJson("backend/src/seed/legacy/supervision.json"),
    },
    {
      key: "volunteer", kind: "volunteer", chapter: "background", navLabel: "Volunteer",
      eyebrow: "Background", title: "Volunteer experience",
      description: "Clubs and community organisations I have served.",
      accent: "neutral", items: readJson("backend/src/seed/legacy/volunteer.json"),
    },
    {
      key: "technical-content", kind: "links", chapter: "content", navLabel: "Technical Content",
      eyebrow: "Content", title: "Technical content",
      description: "Tutorials, articles and case studies on programming and software engineering.",
      accent: "neutral", items: content.technical,
    },
    {
      key: "writings", kind: "links", chapter: "content", navLabel: "Writings",
      eyebrow: "Content", title: "Writings", description: "Personal blogs on life, ideas and daily inspiration.",
      accent: "neutral", items: content.writings,
    },
    {
      key: "vlogs", kind: "links", chapter: "content", navLabel: "Vlogs & Local Guide",
      eyebrow: "Content", title: "Vlogs & local guide",
      description: "Travel vlogs and place reviews as a Google Local Guide.",
      accent: "neutral", items: content.vlogs,
    },
  ];

  return {
    settings: { profile: { initials: "RT", ...profile }, chapters: CHAPTERS },
    sections,
  };
};

/** Same shape as GET /api/public/site, built straight from the seed (no database). */
export const seedSnapshot = (seed: Seed) => ({
  generatedAt: new Date().toISOString(),
  settings: seed.settings,
  sections: seed.sections.map((s, i) => ({
    _id: `seed-${i}`,
    key: s.key,
    kind: s.kind,
    chapter: s.chapter,
    navLabel: s.navLabel,
    eyebrow: s.eyebrow,
    title: s.title,
    description: s.description,
    accent: s.accent,
    options: s.options ?? {},
    items: s.items
      .filter((it) => it.is_sensitive_certificate !== true)
      .map(({ notes: _n, ...it }, j) => ({ _id: `seed-${i}-${j}`, ...it })),
  })),
});
