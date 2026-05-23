import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Certificates from "../components/Certificates";
import Teaching from "../components/Teaching";
import Mentorship from "../components/Mentorship";
import Workshops from "../components/Workshops";
import Volunteer from "../components/Volunteer";
import Supervision from "../components/Supervision";
import NonAcademicProgram from "../components/NonAcademicProgram";
import ContentMedia from "../components/ContentMedia";
import portfolioData from "../../portfolio.json";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // Handle hash-based navigation on mount and hash change
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").replace("/", "");
    if (hash && hash !== "") {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home", 
        "about", 
        "skills", 
        "certificates", 
        "experience", 
        "education", 
        "non-academic-program",
        "vlogs",
        "writings",
        "technical-content",
        "contact"
      ];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} />
      <main>
        <section id="home">
          <Hero name={portfolioData.name} title={portfolioData.title} />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills skills={portfolioData.technical_skills} certificates={portfolioData.certificates} />
        </section>
        
        <section id="experience">
          <Experience professional={portfolioData.professional_experience} internship={portfolioData.internship_experience} />
        </section>
        
        <section id="education">
          <Education education={portfolioData.education} />
        </section>

        <NonAcademicProgram tracks={(portfolioData as any).diploma_career_tracks} />
        
        <section id="projects">
          <Projects projects={portfolioData.projects} />
        </section>
        
        <Teaching />
        <Mentorship />
        <Workshops />
        <Supervision />
        
        <Volunteer volunteer={(portfolioData as any).volunteer_experience} />
        
        <Certificates />

        <ContentMedia 
          vlogs={(portfolioData as any).vlog_local_guide}
          writings={(portfolioData as any).writings}
          technical={(portfolioData as any).technical_content}
        />

        <section id="contact">
          <Contact contact={portfolioData.contact} links={portfolioData.links} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
