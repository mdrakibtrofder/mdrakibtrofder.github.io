
const Experience = ({ professional, internship }: {
  professional: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
  internship: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
}) => {
  const experiences = [...professional, ...internship].map(exp => ({
    title: exp.role,
    company: exp.company,
    location: "Dhaka, Bangladesh", // This can be added to JSON if needed
    period: exp.duration,
    type: professional.includes(exp as any) ? "Full-time" : "Internship",
    achievements: exp.responsibilities,
    logo: "/placeholder.svg" // This can be added to JSON if needed
  }));

  return (
    <div className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Work Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-800/40 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-12 h-12 rounded-lg object-contain bg-white/10 p-2"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400">{exp.title}</h3>
                    <h4 className="text-lg text-gray-300">{exp.company}</h4>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    {exp.type}
                  </span>
                  <p className="text-gray-400 mt-2">{exp.period}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start space-x-2 text-gray-300">
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
