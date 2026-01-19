
const Experience = ({ professional, internship }: {
  professional: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
    logo?: string; // Added logo field
    link?: string;
  }[];
  internship: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
    logo?: string; // Added logo field
    link?: string;
  }[];
}) => {
  const experiences = [...professional, ...internship].map(exp => ({
    title: exp.role,
    company: exp.company,
    location: "Dhaka, Bangladesh", // This can be added to JSON if needed
    period: exp.duration,
    type: professional.includes(exp as any) ? "Full-time" : "Internship",
    achievements: exp.responsibilities,
    logo: exp.logo || "/placeholder.svg", // Use logo if available, else placeholder
    link: exp.link
  }));

  return (
    <div className="py-12 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Work Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-secondary/40 rounded-lg p-6 border border hover:border-primary transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 p-2">
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="max-w-full max-h-full object-contain hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400">{exp.title}</h3>
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                        <h4 className="text-lg text-muted-foreground">{exp.company}</h4>
                      </a>
                    ) : (
                      <h4 className="text-lg text-muted-foreground">{exp.company}</h4>
                    )}
                    <p className="text-muted-foreground">{exp.location}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    {exp.type}
                  </span>
                  <p className="text-muted-foreground mt-2">{exp.period}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start space-x-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
