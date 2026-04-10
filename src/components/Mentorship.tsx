
import { Users, GraduationCap, Map, Cpu, Activity, LayoutDashboard, Binary, Trees, Waves } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const mentorshipData = [
  {
    institution: "IIT, University of Dhaka",
    students: 3,
    period: "October 2025 - January 2026",
    role: "Industry Mentor @ Streams Tech Ltd.",
    projects: [
      {
        title: "Meeting Summarizer",
        description: "AI-driven transcription and summarization platform for corporate meetings.",
        icon: Binary
      },
      {
        title: "Call Center AI Agents",
        description: "Intelligent voice and text agents for automated customer support workflows.",
        icon: Cpu
      },
      {
        title: "CCTV Anomaly Detection",
        description: "Real-time person detection and anomaly identification from surveillance footage.",
        icon: Activity
      },
      {
        title: "Cattle Detection System",
        description: "Computer vision based livestock management and health monitoring system.",
        icon: Binary
      },
      {
        title: "Election Analytics Dashboard",
        description: "Data visualization for EC vote casting patterns and real-time analytics.",
        icon: LayoutDashboard
      }
    ]
  },
  {
    institution: "CSE, Bangladesh University of Engineering and Technology (BUET)",
    students: 5,
    period: "December 2025 - January 2026",
    role: "Project Mentor",
    projects: [
      {
        title: "Deforestation & River Bank Erosion Analysis",
        description: "Leveraging multi-spectral satellite imagery to analyze deforestation patterns and river bank land-cover changes.",
        icon: Map,
        tags: ["Satellite Imagery", "Remote Sensing", "Environmental Analysis"]
      }
    ]
  }
];

const Mentorship = () => {
  return (
    <section id="mentorship" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col items-center mb-16 space-y-4 text-center">
          <Badge variant="outline" className="px-4 py-1 border-blue-500/30 text-blue-500 bg-blue-500/5">
            Guidance & Leadership
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mentorship <span className="text-blue-500">& Coaching</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Guiding undergraduate students through complex industrial projects, bridging the gap between academic theory and real-world engineering challenges.
          </p>
        </div>

        <div className="space-y-12">
          {mentorshipData.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 sticky top-32">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                       <GraduationCap className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">{item.institution}</h3>
                    <div className="space-y-2">
                       <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                         <Users className="h-4 w-4" /> {item.students} Students
                       </p>
                       <p className="text-xs uppercase font-bold tracking-widest text-blue-500/70">{item.period}</p>
                       <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none">
                         {item.role}
                       </Badge>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.projects.map((proj, pIdx) => {
                    const ProjIcon = proj.icon;
                    return (
                      <Card key={pIdx} className="border-none bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="mb-4 p-2 rounded-lg bg-background w-fit group-hover:scale-110 transition-transform">
                            <ProjIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <h4 className="font-bold text-lg mb-2">{proj.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {proj.description}
                          </p>
                          {proj.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {proj.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/5 text-blue-500/70 font-semibold border border-blue-500/10">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              {idx === 0 && <div className="hidden md:block absolute -bottom-6 left-0 w-full border-b border-dashed border-border/50" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
