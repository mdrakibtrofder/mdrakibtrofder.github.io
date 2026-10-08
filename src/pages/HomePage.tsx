import { Briefcase, GraduationCap, Layers, PlayCircle } from "lucide-react";
import ChapterHeader from "@/components/common/ChapterHeader";
import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { SECTION_IDS } from "@/config/site";
import About from "@/features/about/About";
import CertificatesSection from "@/features/certificates/CertificatesSection";
import ContactSection from "@/features/contact/ContactSection";
import ContentSection from "@/features/content/ContentSection";
import EducationSection from "@/features/education/EducationSection";
import ExperienceSection from "@/features/experience/ExperienceSection";
import Hero from "@/features/hero/Hero";
import MentorshipSection from "@/features/mentorship/MentorshipSection";
import ProgramsSection from "@/features/programs/ProgramsSection";
import ProjectsSection from "@/features/projects/ProjectsSection";
import SkillsSection from "@/features/skills/SkillsSection";
import SupervisionSection from "@/features/supervision/SupervisionSection";
import TeachingSection from "@/features/teaching/TeachingSection";
import VolunteerSection from "@/features/volunteer/VolunteerSection";
import WorkshopsSection from "@/features/workshops/WorkshopsSection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const HomePage = () => {
  const activeSection = useActiveSection(SECTION_IDS);
  useScrollToHash();

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <ExperienceSection />

        <ChapterHeader
          icon={GraduationCap}
          accent="academic"
          label="Part 1"
          title="Teaching & mentorship"
          description="Courses I teach, students I supervise, and workshops I run."
        />
        <TeachingSection />
        <MentorshipSection />
        <WorkshopsSection />

        <ChapterHeader
          icon={Briefcase}
          accent="engineering"
          label="Part 2"
          title="Software engineering"
          description="Things I have built and the tools I build them with."
        />
        <ProjectsSection />
        <SkillsSection />

        <ChapterHeader
          icon={Layers}
          accent="neutral"
          label="Part 3"
          title="Background"
          description="Education, programs, certificates, the people who guided me, and community work."
        />
        <EducationSection />
        <ProgramsSection />
        <CertificatesSection />
        <SupervisionSection />
        <VolunteerSection />

        <ChapterHeader
          icon={PlayCircle}
          accent="neutral"
          label="Part 4"
          title="Beyond work"
          description="Where I write, teach online, and share places I visit."
        />
        <ContentSection />

        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomePage;
