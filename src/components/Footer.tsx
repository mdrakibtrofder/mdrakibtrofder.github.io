import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-slate-800">
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Md. Rrakib Trofder. All Rights Reserved.
        </p>

        <div className="flex space-x-4">
          <a
            href="https://github.com/mdrakibtrofder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-emerald-400 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mdrakibtrofder/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-emerald-400 transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
