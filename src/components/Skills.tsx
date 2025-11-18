
const Skills = ({ skills, certificates }: {
  skills: {
    languages_frameworks: string[];
    tools_technologies: string[];
  };
  certificates: {
    AI_ML: { name: string; url: string }[];
    frameworks: { name: string; url: string }[];
    devops: { name: string; url: string }[];
  };
}) => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: skills.languages_frameworks,
      color: "emerald"
    },
    {
      title: "Tools & Technologies",
      skills: skills.tools_technologies,
      color: "blue"
    }
  ];

  const allCertificates = [
    ...certificates.AI_ML,
    ...certificates.frameworks,
    ...certificates.devops,
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400",
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
      purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
      cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400",
      pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={`bg-gradient-to-br ${getColorClasses(category.color)} rounded-lg p-6 border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
            >
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-secondary/50 px-3 py-1 rounded-full text-sm text-muted-foreground border border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-muted-foreground">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {allCertificates.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary/30 border border px-4 py-2 rounded-lg text-emerald-400 font-medium hover:bg-secondary/50 hover:underline transition-colors"
              >
                {cert.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
