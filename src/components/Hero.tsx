import { ArrowDown, Github, Linkedin, Mail, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = ({ name, title }: { name: string; title: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const taglines = [
    "Software Engineer & AI Researcher",
    "Building Scalable Systems",
    "DevOps Enthusiast",
    "Educator & Mentor",
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const currentText = taglines[currentTagline];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`particle`} />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status Badge */}

        {/* Name */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="gradient-text">{name}</span>
        </h1>

        {/* Title */}
        <h2 className={`text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4 font-medium transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {title}
        </h2>

        {/* Rotating Tagline */}
        <div className={`h-12 mb-8 transition-all duration-700 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
            {displayText}
            <span className="inline-block w-0.5 h-8 bg-emerald-500 ml-1 animate-pulse" />
          </span>
        </div>

        {/* Location & Date */}
        <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-400 text-sm">
            <MapPin size={16} className="text-emerald-500" />
            <span>Bangladesh Army University of Science and Technology</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full text-slate-600 dark:text-slate-400 text-sm">
            <Calendar size={16} className="text-emerald-500" />
            <span>Joined: January 2026</span>
          </div>
        </div>

        {/* Bio */}
        <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Advancing research in <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Software Engineering</span> and 
          <span className="text-blue-600 dark:text-blue-400 font-semibold"> Artificial Intelligence</span>. 
          Passionate about building scalable microservice architectures, automating DevOps pipelines, 
          and bridging the gap between theoretical concepts and practical software development.
        </p>

        {/* Action Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="https://github.com/mdrakibtrofder"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/20 dark:hover:shadow-white/20"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mdrakibtrofder/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href="mailto:mdrakibtrofder@gmail.com"
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            <Mail size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Contact Me</span>
          </a>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-emerald-500/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-blue-500/20 rounded-br-3xl" />
    </div>
  );
};

export default Hero;
