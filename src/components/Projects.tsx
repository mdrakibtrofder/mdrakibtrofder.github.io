
const Projects = ({ projects }: {
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}) => {
  const getTypeColor = (type: string) => {
    const colors = {
      "Research Project": "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
      "Web Application": "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
      "Full-Stack Application": "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400"
    };
    return colors[type as keyof typeof colors] || colors["Web Application"];
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-secondary/40 rounded-lg p-6 border border hover:border-primary transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                <span className={`bg-gradient-to-r ${getTypeColor("Web Application")} px-3 py-1 rounded-full text-sm font-medium border`}>
                  Project
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary/50 px-2 py-1 rounded text-xs text-muted-foreground border border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
