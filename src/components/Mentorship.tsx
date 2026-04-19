
import { GraduationCap, Users, Calendar, CheckCircle2, Building2, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

const mentorships = [
  {
    institution: "IIT, University of Dhaka",
    role: "Internship Supervisor @ Streams Tech Ltd.",
    period: "October 2025 - January 2026",
    studentCount: "3 Students",
    location: "Office",
    programType: "6 Month Long Academic Industrial Internship",
    projects: [
      "Meeting Summarizer (AI Transcription)",
      "Call Center AI Agents",
      "CCTV Attendance & Anomaly Detection",
      "Cattle Management Detection System",
      "Election Commission Analytics Dashboard"
    ],
    color: "blue"
  },
  {
    institution: "CSE, Bangladesh University of Engineering and Technology",
    role: "Industry Mentor @ Streams Tech Ltd.",
    period: "December 2025 - January 2026",
    studentCount: "5 Students",
    location: "Online",
    programType: "Final Year Capstone Project with Industry Collaboration",
    projects: [
      "Satellite Imagery Analysis for Deforestation",
      "River Bank Erosion & Delta Land-cover Tracking",
      "Multi-spectral Data Processing Workflows"
    ],
    color: "emerald"
  }
];

const Mentorship = () => {
  return (
    <section id="mentorship" className="py-24 px-4 bg-slate-50/50 dark:bg-slate-900/20 relative overflow-hidden">
      {/* Design elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none px-4 mb-2">
              Mentorship & Guidance
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-blue-500 italic">Mentorship</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {mentorships.map((mentor, index) => (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row gap-8 md:gap-16 p-8 rounded-[2rem] bg-background border border-border/40 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              {/* Vertical accent */}
              <div className={`absolute left-0 top-12 bottom-12 w-1.5 rounded-r-full transition-all duration-500 ${mentor.color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
                } opacity-50 group-hover:opacity-100 group-hover:w-2`} />

              <div className="md:w-1/3 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
                    <Calendar className="h-3.5 w-3.5" />
                    {mentor.period}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-500 transition-colors">
                    {mentor.institution}
                  </h3>
                  <p className="text-lg font-medium text-foreground/80 lowercase italic font-serif">
                    {mentor.role}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 transparent rounded-full bg-secondary/80 text-xs font-semibold text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {mentor.studentCount}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 transparent rounded-full bg-secondary/80 text-xs font-semibold text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {mentor.location}
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="bg-secondary/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <Building2 className="h-32 w-32 -rotate-12" />
                  </div>

                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    Core Project Contributions
                  </h4>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {mentor.projects.map((proj, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 group/item">
                        <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/item:bg-white" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">
                          {proj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
