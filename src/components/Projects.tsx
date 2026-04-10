import React, { useState } from "react";
import { 
  GraduationCap, 
  Lightbulb, 
  Trophy, 
  Presentation, 
  Building2, 
  BookOpen, 
  Microscope, 
  Cpu,
  Layers
} from "lucide-react";

interface Project {
  name: string;
  type: string;
  technologies: string[];
  description: string;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    "All",
    "University Capstone Project",
    "Idea Project",
    "Hackathon Project",
    "Concept Visualization Project",
    "Organization Portfolio Project",
    "Course Materials Oriented Project",
    "Research Oriented Project",
    "Advance Engineering Project"
  ];

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "University Capstone Project": return <GraduationCap size={18} />;
      case "Idea Project": return <Lightbulb size={18} />;
      case "Hackathon Project": return <Trophy size={18} />;
      case "Concept Visualization Project": return <Presentation size={18} />;
      case "Organization Portfolio Project": return <Building2 size={18} />;
      case "Course Materials Oriented Project": return <BookOpen size={18} />;
      case "Research Oriented Project": return <Microscope size={18} />;
      case "Advance Engineering Project": return <Cpu size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const getTypeStyles = (type: string) => {
    const styles = {
      "University Capstone Project": "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400 shadow-purple-500/10",
      "Idea Project": "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400 shadow-amber-500/10",
      "Hackathon Project": "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400 shadow-rose-500/10",
      "Concept Visualization Project": "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/10",
      "Organization Portfolio Project": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
      "Course Materials Oriented Project": "from-blue-600/20 to-indigo-600/20 border-blue-600/30 text-blue-400 shadow-blue-600/10",
      "Research Oriented Project": "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400 shadow-indigo-500/10",
      "Advance Engineering Project": "from-slate-500/20 to-zinc-500/20 border-slate-500/30 text-slate-300 shadow-slate-500/10"
    };
    return styles[type as keyof typeof styles] || "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400";
  };

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  return (
    <div className="py-20 px-4 relative overflow-hidden" id="projects">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Technical Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of academic research, engineering feats, and creative visualizations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md ${
                activeTab === cat
                  ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                  : "bg-secondary/20 border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-center gap-2">
                {cat !== "All" && getCategoryIcon(cat)}
                {cat === "All" ? "Show All Projects" : cat}
              </div>
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-500">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.name}-${index}`}
              className="group relative bg-secondary/20 backdrop-blur-xl rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Type Badge */}
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getTypeStyles(project.type)} px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6 border`}>
                {getCategoryIcon(project.type)}
                {project.type}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3 text-sm">
                {project.description}
              </p>
              
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/5 px-3 py-1 rounded-md text-[10px] uppercase font-bold text-muted-foreground border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] text-muted-foreground self-center ml-1">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Decorative Corner Highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-tr-2xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground italic">No projects found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
