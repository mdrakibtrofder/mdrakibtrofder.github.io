import { useState } from "react";
import { ExternalLink, Users, Calendar, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";

interface Supervision {
  institutes: string[];
  supervisionType: string;
  duration: string;
  projectName: string;
  supervisor?: {
    name: string;
    url: string;
  };
  coSupervisor?: {
    name: string;
    url: string;
  };
  mentor?: {
    name: string;
    url: string;
  };
}

const Supervision = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const supervisionData: Supervision[] = [
    {
      institutes: ["IIT, University of Dhaka"],
      supervisionType: "Project Software Project Lab 1",
      duration: "January 2020 - August 2021",
      projectName: "Library Recommendation System",
      supervisor: {
        name: "Assistant Professor Kishan Kumar Ganguly",
        url: "https://www.linkedin.com/in/kkganguly/"
      },
      coSupervisor: {
        name: "Professor Dr. Kazi Muheymin Us Sakib",
        url: "https://www.linkedin.com/in/kazi-muheymin-us-sakib-5871a535b/"
      }
    },
    {
      institutes: ["IIT, University of Dhaka"],
      supervisionType: "Project Software Project Lab 2",
      duration: "January 2022 - June 2022",
      projectName: "Blog Bee: AI-Powered Video-Blog Creation Platform",
      supervisor: {
        name: "Assistant Professor Kishan Kumar Ganguly",
        url: "https://www.linkedin.com/in/kkganguly/"
      }
    },
    {
      institutes: ["IIT, University of Dhaka", "College of William & Mary"],
      supervisionType: "Project Software Project Lab 3",
      duration: "August 2023 - December 2023",
      projectName: "Software System Reconstruction Tool",
      supervisor: {
        name: "Professor Dr. Denys Poshyvanyk",
        url: "https://www.linkedin.com/in/denys-poshyvanyk-784ab33/"
      },
      coSupervisor: {
        name: "Associate Professor Dr. Ahmedul Kabir",
        url: "https://www.linkedin.com/in/ahmedul-kabir-90469134/"
      },
      mentor: {
        name: "Daniel Rodriguez Cardenas",
        url: "https://www.linkedin.com/in/daniel-rodriguez-cardenas/"
      }
    },
    {
      institutes: ["Cefalo Bangladesh Ltd."],
      supervisionType: "Industry Internship",
      duration: "January 2023 - June 2023",
      projectName: "BeyondThePage",
      mentor: {
        name: "Simanta Deb Turja",
        url: "https://www.linkedin.com/in/simantaturja/"
      }
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getTypeColor = (type: string) => {
    if (type.includes("Industry")) return "bg-orange-500/10 text-orange-400 border-orange-500/30";
    if (type.includes("Lab 3")) return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    if (type.includes("Lab 2")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("Industry")) return <BookOpen className="w-4 h-4" />;
    if (type.includes("Lab 3")) return <Users className="w-4 h-4" />;
    if (type.includes("Lab 2")) return <Users className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  return (
    <div id="supervision" className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-1/4 w-80 h-80 bg-purple-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 -translate-y-1/4 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
            Supervision
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Mentored students through academic projects and industry internships
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500" />
          
          <div className="space-y-8">
            {supervisionData.map((item, index) => {
              const isExpanded = expandedCards.has(index);
              const hasMultiplePeople = (item.supervisor ? 1 : 0) + (item.coSupervisor ? 1 : 0) + (item.mentor ? 1 : 0) > 1;
              
              return (
                <div key={index} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-3 top-6 w-6 h-6 rounded-full border-4 ${
                    index === 0 ? 'bg-purple-400 border-purple-400' :
                    index === 1 ? 'bg-blue-400 border-blue-400' :
                    index === 2 ? 'bg-purple-400 border-purple-400' :
                    'bg-orange-400 border-orange-400'
                  } shadow-lg`} />
                  
                  {/* Main card */}
                  <div className={`rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-purple-500/40 group cursor-pointer ${
                    isExpanded ? 'border-purple-500/50 shadow-purple-500/10' : ''
                  }`} onClick={() => toggleCard(index)}>
                    
                    {/* Header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        {/* Institute tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.institutes.map((institute, i) => (
                            <span key={i} className="text-xs font-medium text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                              {institute}
                            </span>
                          ))}
                        </div>
                        
                        {/* Project name */}
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-purple-400 transition-colors">
                          {item.projectName}
                        </h3>
                        
                        {/* Duration and type */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {item.duration}
                          </span>
                          <Badge className={`${getTypeColor(item.supervisionType)} border font-medium`}>
                            {getTypeIcon(item.supervisionType)}
                            <span className="ml-1.5">{item.supervisionType}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Expand indicator */}
                      <div className="flex items-center gap-2 text-sm text-purple-400/70 group-hover:text-purple-400 transition-colors">
                        <span className="hidden md:inline">View {isExpanded ? 'less' : 'more'}</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Expandable details */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-6 border-t border-slate-700/40">
                        <div className="space-y-4">
                          {item.supervisor && (
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-purple-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wider text-purple-400/70 mb-1">Supervisor</p>
                                <p className="text-foreground font-medium truncate">{item.supervisor.name}</p>
                              </div>
                              <a
                                href={item.supervisor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-shrink-0 p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                          
                          {item.coSupervisor && (
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wider text-blue-400/70 mb-1">Co-Supervisor</p>
                                <p className="text-foreground font-medium truncate">{item.coSupervisor.name}</p>
                              </div>
                              <a
                                href={item.coSupervisor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-shrink-0 p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                          
                          {item.mentor && (
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-emerald-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/70 mb-1">Mentor</p>
                                <p className="text-foreground font-medium truncate">{item.mentor.name}</p>
                              </div>
                              <a
                                href={item.mentor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-shrink-0 p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supervision;