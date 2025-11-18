
import { ArrowDown, Github, Linkedin } from "lucide-react";

const Hero = ({ name, title }: { name: string; title: string }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            {title}
          </h2>
          <div className="text-lg md:text-xl text-emerald-400 mb-8">
            @ Streams Tech Ltd. • Dhaka, Bangladesh
          </div>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about DevOps automation, scalable systems, and software reconstruction using AI. 
            Skilled in cloud infrastructure, scripting, and backend services.
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/rakib3004"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-secondary/80 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rakib-iit/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>

          <button
            onClick={scrollToAbout}
            className="animate-pulse text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
