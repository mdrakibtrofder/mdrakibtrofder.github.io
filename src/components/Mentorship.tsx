import { GraduationCap, Users, Calendar, CheckCircle2, Building2, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

interface MentorshipItem {
  institution: string;
  role: string;
  period: string;
  studentCount: string;
  location: string;
  projects: string[];
  color: string;
  logo?: string;
  link?: string;
}

const mentorshipData: MentorshipItem[] = [
  {
    institution: "CSE, Banggladesh Army University of Science and Technology (BAUST)",
    role: "Final Year Project Co-Supervisor",
    period: "February 2026 - Present",
    studentCount: "3 Students",
    location: "University Campus",
    projects: [
      "Rerival Augmentation Generation (RAG)",
      "Vector Database",
      "Large Language Models in Education Section",
      "Reinforcement Learning Based Educational Content Improvement",
    ],
    color: "blue"
  },
  {
    institution: "CSE, Bangladesh University of Engineering and Technology (BUET)",
    role: "Industry Mentor @ Streams Tech Ltd.",
    period: "December 2025 - January 2026",
    studentCount: "5 Students",
    location: "Online",
    projects: [
      "Satellite Imagery Analysis for Deforestation",
      "River Bank Erosion & Delta Land-cover Tracking",
      "Multi-spectral Data Processing Workflows"
    ],
    color: "emerald"
  },
  {
    institution: "IIT, University of Dhaka (DU)",
    role: "Internship Supervisor @ Streams Tech Ltd.",
    period: "October 2025 - January 2026",
    studentCount: "3 Students",
    location: "Office",
    projects: [
      "Meeting Summarizer (AI Transcription)",
      "Call Center AI Agents",
      "CCTV Attendance & Anomaly Detection",
      "Cattle Management Detection System",
      "Election Commission Analytics Dashboard"
    ],
    color: "blue"
  },
];

const Mentorship = ({ mentorships }: { mentorships?: MentorshipItem[] }) => {
  const data = mentorships || mentorshipData;

  const renderMentorTimelineItem = (mentor: MentorshipItem, index: number) => (
    <div key={index} className="relative pl-16">
      <span className={`absolute left-4 top-6 h-4 w-4 rounded-full border-4 ${mentor.color === 'blue' ? 'border-blue-500' : 'border-emerald-400'} bg-secondary shadow-xl`} />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-blue-500/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-3 border border-slate-600">
              <Building2 className="w-10 h-10 text-blue-500" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {mentor.period}
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-1">{mentor.institution}</h3>
              <p className="text-base font-medium text-foreground/80 italic font-serif">{mentor.role}</p>
            </div>
          </div>

          <div className="text-left lg:text-right flex flex-wrap gap-3 lg:justify-end">
            <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {mentor.studentCount}
            </span>
            <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {mentor.location}
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 p-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            Core Project Contributions
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
            {mentor.projects.map((proj, pIdx) => (
              <li key={pIdx} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {proj}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20 px-4 relative overflow-hidden" id="mentorship">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent">
            Mentorship
          </h2>
          <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-blue-500/30" />
          <div className="space-y-10">
            {data.map((mentor, index) => renderMentorTimelineItem(mentor, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
