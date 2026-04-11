
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

  const renderEduCard = (edu: any, index: number) => (
    <div
      key={index}
      className="bg-secondary/40 rounded-lg p-6 border border-transparent hover:border-primary transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-lg bg-white/5 p-2 border border-slate-600">
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

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-1">
                {edu.degree}
              </h3>
              {edu.link ? (
                <a href={edu.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  <h4 className="text-lg font-medium text-foreground">
                    {edu.institute}
                  </h4>
                </a>
              ) : (
                <h4 className="text-lg font-medium text-foreground">
                  {edu.institute}
                </h4>
              )}
              {edu.achievements.length > 0 && (
                <p className="text-muted-foreground">
                  {edu.achievements.join(", ")}
                </p>
              )}
            </div>

            <div className="mt-2 md:mt-0 text-left md:text-right">
              { (edu.cgpa || edu.result) && (
                <span className="bg-indigo-400/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                  {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.result}
                </span>
              )}
              <p className="text-muted-foreground mt-2">{edu.duration}</p>
            </div>
          </div>

          {(edu.cgpa || edu.result) && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-500/20 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-semibold">Academic Performance:</span>
                <span className="text-foreground font-bold text-lg">{edu.cgpa ? edu.cgpa : edu.result}</span>
              </div>
            </div>
          )}
        </div>
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
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto italic">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>

        <div className="space-y-6">
          {mainEducation.map((edu, index) => renderEduCard(edu, index))}

          {showMore && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              {moreEducation.map((edu, index) => renderEduCard(edu, index + 100))}
            </div>
          )}

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
    </div>
  );
};

export default Education;
