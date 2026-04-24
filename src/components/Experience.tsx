
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [showMore, setShowMore] = useState(false);
  
  const experiences = [...professional, ...internship].map(exp => ({
    title: exp.role,
    company: exp.company,
    location: "Dhaka, Bangladesh",
    period: exp.duration,
    type: professional.includes(exp as any) ? "Full-time" : "Internship",
    achievements: exp.responsibilities,
    logo: exp.logo || "/placeholder.svg",
    link: exp.link
  }));

  const mainExperiences = experiences.slice(0, -2);
  const moreExperiences = experiences.slice(-2);

  const renderExperienceTimelineItem = (exp: any, index: number) => (
    <div key={index} className="relative pl-16">
      <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-emerald-400 bg-secondary shadow-xl" />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-400/40">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-2 border border-slate-600">
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
                  <h4 className="text-lg text-foreground">{exp.company}</h4>
                </a>
              ) : (
                <h4 className="text-lg text-foreground">{exp.company}</h4>
              )}
              <p className="text-muted-foreground mt-1">{exp.location}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-400">
              {exp.type}
            </span>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-emerald-400/70">{exp.period}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {exp.achievements.map((achievement: string, achIndex: number) => (
            <li key={achIndex} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Work Experience
        </h2>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-emerald-500/30" />
          <div className="space-y-10">
            {mainExperiences.map((exp, index) => renderExperienceTimelineItem(exp, index))}
            {showMore && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                {moreExperiences.map((exp, index) => renderExperienceTimelineItem(exp, index + 100))}
              </div>
            )}
          </div>
        </div>

        {moreExperiences.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="group inline-flex items-center px-6 py-2 rounded-full border border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 font-medium transition-all"
            >
              {showMore ? "See Less Work Experience" : "See More Work Experience"}
              {showMore ? (
                <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
