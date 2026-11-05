import type { ComponentType } from "react";
import About from "@/features/about/About";
import CertificatesSection from "@/features/certificates/CertificatesSection";
import LinksSection from "@/features/content/LinksSection";
import EducationSection from "@/features/education/EducationSection";
import ExperienceSection from "@/features/experience/ExperienceSection";
import { CardsSection, TimelineSection } from "@/features/generic/GenericSections";
import MentorshipSection from "@/features/mentorship/MentorshipSection";
import ProgramsSection from "@/features/programs/ProgramsSection";
import ProjectsSection from "@/features/projects/ProjectsSection";
import SkillsSection from "@/features/skills/SkillsSection";
import SupervisionSection from "@/features/supervision/SupervisionSection";
import TeachingSection from "@/features/teaching/TeachingSection";
import VolunteerSection from "@/features/volunteer/VolunteerSection";
import WorkshopsSection from "@/features/workshops/WorkshopsSection";
import type { SectionKind, SiteSection } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionComponent = ComponentType<{ section: SiteSection<any> }>;

/** Which layout renders each section kind. */
const RENDERERS: Record<SectionKind, SectionComponent> = {
  about: About,
  experience: ExperienceSection,
  teaching: TeachingSection,
  mentorship: MentorshipSection,
  workshops: WorkshopsSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  education: EducationSection,
  programs: ProgramsSection,
  certificates: CertificatesSection,
  supervision: SupervisionSection,
  volunteer: VolunteerSection,
  timeline: TimelineSection,
  cards: CardsSection,
  links: LinksSection,
};

export const SectionRenderer = ({ section }: { section: SiteSection }) => {
  const Component: SectionComponent = RENDERERS[section.kind] ?? TimelineSection;
  return <Component section={section} />;
};
