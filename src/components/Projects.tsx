import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Lightbulb,
  Trophy,
  Presentation,
  Building2,
  BookOpen,
  Microscope,
  Cpu,
  Layers,
  Wrench,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Project {
  name: string;
  type: string;
  technologies: string[];
  description: string;
  url?: string;
}

const Projects = ({ projects }: { projects: Project[] }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = [
    "All",
    "Course Oriented Project",
    "Concept Visualization Project",
    "University Capstone Project",
    "Idea Project",
    "Hackathon Project",
    "Organization Portfolio Project",
    "Research Oriented Project",
    "Advance Engineering Project",
    "Utilities Project"
  ];

  // Get curated projects: first from each type, then fill to 5 from first type
  const curatedProjects = useMemo(() => {
    const typeOrder = categories.filter(c => c !== "All");
    const seenTypes = new Set<string>();
    const result: Project[] = [];
    
    // First pass: collect first project from each unique type
    for (const project of projects) {
      if (!seenTypes.has(project.type) && result.length < 5) {
        seenTypes.add(project.type);
        result.push(project);
      }
    }
    
    // Second pass: if less than 5, fill from first type's remaining projects
    if (result.length < 5) {
      const firstType = result[0]?.type;
      const firstTypeProjects = projects.filter(p => p.type === firstType);
      
      for (const project of firstTypeProjects) {
        if (!result.some(p => p.name === project.name) && result.length < 5) {
          result.push(project);
        }
      }
    }
    
    return result;
  }, [projects]);

  // Combined list: curated projects + "All" tab projects for filtered view
  const getDisplayProjects = () => {
    if (activeTab === "All") {
      return showAll ? projects : curatedProjects;
    }
    return projects.filter(p => p.type === activeTab);
  };

  const displayProjects = getDisplayProjects();
  const hasMoreToShow = activeTab === "All" && projects.length > curatedProjects.length;

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "Course Oriented Project": return <BookOpen size={18} />;
      case "Concept Visualization Project": return <Presentation size={18} />;
      case "University Capstone Project": return <GraduationCap size={18} />;
      case "Idea Project": return <Lightbulb size={18} />;
      case "Hackathon Project": return <Trophy size={18} />;
      case "Organization Portfolio Project": return <Building2 size={18} />;
      case "Research Oriented Project": return <Microscope size={18} />;
      case "Advance Engineering Project": return <Cpu size={18} />;
      case "Utilities Project": return <Wrench size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const getTypeStyles = (type: string) => {
    const styles = {
      "Course Oriented Project": "from-blue-600/20 to-indigo-600/20 border-blue-600/30 text-blue-400 shadow-blue-600/10",
      "Concept Visualization Project": "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/10",
      "University Capstone Project": "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400 shadow-purple-500/10",
      "Idea Project": "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400 shadow-amber-500/10",
      "Hackathon Project": "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400 shadow-rose-500/10",
      "Organization Portfolio Project": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
      "Research Oriented Project": "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400 shadow-indigo-500/10",
      "Advance Engineering Project": "from-yellow-400/30 via-amber-500/20 to-orange-600/30 border-yellow-500/50 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.15)] animate-pulse-slow",
      "Utilities Project": "from-slate-500/20 to-zinc-500/20 border-slate-500/30 text-slate-400 shadow-slate-500/10"
    };
    return styles[type as keyof typeof styles] || "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400";
  };

  const filteredProjects = activeTab === "All" 
    ? displayProjects 
    : projects.filter(p => p.type === activeTab);

  const renderProjectTimelineItem = (project: Project, index: number) => (
    <div key={`${project.name}-${index}`} className="relative pl-16">
      <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-emerald-400 bg-secondary shadow-xl" />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-400/40">
        <div className="flex flex-col gap-4">
          {/* Type Badge */}
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${getTypeStyles(project.type)} px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border w-fit`}>
            {getCategoryIcon(project.type)}
            {project.type}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-2 group">
              {project.url ? (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-2"
                >
                  {project.name}
                  <ExternalLink size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="bg-white/5 px-3 py-1 rounded-md text-[10px] uppercase font-bold text-muted-foreground border border-white/5"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-[10px] text-muted-foreground self-center ml-1">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20 px-4 relative overflow-hidden" id="projects">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            const catStyle = cat === "All" ? "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400" : getTypeStyles(cat);
            
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 border backdrop-blur-md ${
                  isActive
                    ? `bg-gradient-to-r ${catStyle} shadow-[0_0_25px_rgba(0,0,0,0.2)]`
                    : "bg-secondary/20 border-border/10 text-muted-foreground hover:border-white/20 hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  {cat !== "All" && getCategoryIcon(cat)}
                  {cat === "All" ? "All Projects" : cat}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Projects Timeline List */}
        {filteredProjects.length > 0 ? (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-emerald-500/30" />
            <div className="space-y-10">
              {filteredProjects.map((project, index) => renderProjectTimelineItem(project, index))}
            </div>
            
            {/* Show More/Less Button */}
            {hasMoreToShow && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                >
                  {showAll ? (
                    <>
                      <ChevronUp size={18} className="transition-transform group-hover:-translate-y-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="transition-transform group-hover:translate-y-1" />
                      Show More ({projects.length - curatedProjects.length} more)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground italic">No projects found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
