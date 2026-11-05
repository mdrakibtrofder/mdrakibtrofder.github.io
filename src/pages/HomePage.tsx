import { Fragment } from "react";
import ChapterHeader from "@/components/common/ChapterHeader";
import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { SECTION_IDS } from "@/config/site";
import { chapters, sections } from "@/data";
import ContactSection from "@/features/contact/ContactSection";
import Hero from "@/features/hero/Hero";
import { SectionRenderer } from "@/features/registry";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { getIcon } from "@/lib/icons";

const chapterIds = new Set(chapters.map((c) => c.id));
/** Sections whose chapter was deleted still show, at the end. */
const orphans = sections.filter((s) => !chapterIds.has(s.chapter));

const HomePage = () => {
  const activeSection = useActiveSection(SECTION_IDS);
  useScrollToHash();

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} />
      <main>
        <Hero />

        {chapters.map((chapter) => {
          const inChapter = sections.filter((s) => s.chapter === chapter.id);
          if (inChapter.length === 0) return null;
          return (
            <Fragment key={chapter.id}>
              {chapter.showHeader && (
                <ChapterHeader
                  icon={getIcon(chapter.icon)}
                  accent={chapter.accent}
                  label={chapter.label}
                  title={chapter.title}
                  description={chapter.description}
                />
              )}
              {inChapter.map((s) => (
                <SectionRenderer key={s._id} section={s} />
              ))}
            </Fragment>
          );
        })}
        {orphans.map((s) => (
          <SectionRenderer key={s._id} section={s} />
        ))}

        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomePage;
