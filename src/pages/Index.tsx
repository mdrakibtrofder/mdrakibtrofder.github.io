
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import portfolioData from "../../portfolio.json";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "education", "contact"];
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
        <section id="projects">
          <Projects projects={portfolioData.projects} />
        </section>
        <section id="education">
          <Education education={portfolioData.education} />
        </section>
        <section id="contact">
          <Contact contact={portfolioData.contact} links={portfolioData.links} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
