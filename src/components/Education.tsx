
import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

const Education = ({ education }: {
  education: {
    degree: string;
    institute: string;
    duration: string;
    result?: string;
    cgpa?: string;
    achievements: string[];
    logo?: string;
    link?: string;
    isMore?: boolean;
  }[];
}) => {
  const [showMore, setShowMore] = useState(false);

  const mainEducation = education.filter(edu => !edu.isMore);
  const moreEducation = education.filter(edu => edu.isMore);

  const renderEduTimelineItem = (edu: any, index: number) => (
    <div key={index} className="relative pl-16">
      <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-emerald-400 bg-secondary shadow-xl" />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-400/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-2 border border-slate-600">
              {edu.logo ? (
                edu.link ? (
                  <a href={edu.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={edu.logo}
                      alt={`${edu.institute} logo`}
                      className="max-w-full max-h-full object-contain hover:opacity-80 transition-opacity"
                    />
                  </a>
                ) : (
                  <img
                    src={edu.logo}
                    alt={`${edu.institute} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                )
              ) : (
                <GraduationCap className="w-12 h-12 text-emerald-400" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-1">{edu.degree}</h3>
              {edu.link ? (
                <a href={edu.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  <h4 className="text-lg font-medium text-foreground">{edu.institute}</h4>
                </a>
              ) : (
                <h4 className="text-lg font-medium text-foreground">{edu.institute}</h4>
              )}
              {edu.achievements.length > 0 && (
                <p className="mt-2 text-muted-foreground">{edu.achievements.join(", ")}</p>
              )}
            </div>
          </div>

          <div className="text-left lg:text-right">
            {(edu.cgpa || edu.result) && (
              <span className="inline-flex rounded-full bg-indigo-400/10 px-3 py-1 text-sm font-medium text-indigo-400">
                {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.result}
              </span>
            )}
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-emerald-400/70">{edu.duration}</p>
          </div>
        </div>

        {(edu.cgpa || edu.result) && (
          <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-emerald-400 font-semibold">Academic Performance:</span>
              <span className="text-foreground font-bold text-lg">{edu.cgpa ? edu.cgpa : edu.result}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-24 px-4 bg-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-slate-600/40" />
          <div className="space-y-10">
            {mainEducation.map((edu, index) => renderEduTimelineItem(edu, index))}
            {showMore && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                {moreEducation.map((edu, index) => renderEduTimelineItem(edu, index + 100))}
              </div>
            )}
          </div>
        </div>

        {moreEducation.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowMore(!showMore)}
              className="group border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10"
            >
              {showMore ? "See Less Education" : "See More Education"}
              {showMore ? (
                <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
