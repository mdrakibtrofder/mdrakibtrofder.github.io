
import { useState } from "react";
import { Menu, X, ChevronDown, User, Book, Briefcase, Heart, PlayCircle, Mail, Code } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  const menuGroups = [
    {
      label: "Profile",
      icon: <User className="w-4 h-4 mr-2" />,
      items: [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" },
      ]
    },
    {
      label: "Professional",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
      items: [
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
      ]
    },
    {
      label: "Academic",
      icon: <Book className="w-4 h-4 mr-2" />,
      items: [
        { id: "education", label: "Education" },
        { id: "certificates", label: "Certificates" },
        { id: "diploma", label: "Diploma & Career" },
      ]
    },
    {
      label: "Community",
      icon: <Heart className="w-4 h-4 mr-2" />,
      items: [
        { id: "volunteer", label: "Volunteer" },
        { id: "teaching", label: "Teaching" },
        { id: "mentorship", label: "Mentorship" },
        { id: "workshops", label: "Workshops" },
      ]
    },
    {
      label: "Content",
      icon: <PlayCircle className="w-4 h-4 mr-2" />,
      items: [
        { id: "technical-content", label: "Technical Content" },
        { id: "writings", label: "Writings" },
        { id: "vlogs", label: "Vlogs & Local Guide" },
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div 
              className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => scrollToSection("home")}
            >
              TROFDER
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuGroups.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 outline-none
                  ${group.items.some(item => activeSection === item.id) 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                >
                  {group.label}
                  <ChevronDown className="ml-1 w-4 h-4 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-white/10 rounded-2xl p-2 min-w-[200px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors mb-1 last:mb-0
                        ${activeSection === item.id 
                          ? "bg-emerald-400/20 text-emerald-400" 
                          : "hover:bg-emerald-400/10 hover:text-emerald-400"}`}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground hover:bg-emerald-400/10 hover:text-emerald-400 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-white/5 py-6 px-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-6">
              {menuGroups.map((group) => (
                <div key={group.label} className="space-y-3">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-emerald-500/50 px-3">
                    {group.icon}
                    {group.label}
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center px-4 py-3 rounded-2xl text-base font-semibold w-full text-left transition-all
                          ${activeSection === item.id
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
