import { 
  Code, 
  Monitor, 
  Shield, 
  Briefcase, 
  Terminal, 
  GraduationCap, 
  ExternalLink, 
  Clock, 
  MapPin
} from "lucide-react";
import { Badge } from "./ui/badge";

interface Course {
  code: string;
  title: string;
  semester: string;
  type: "Theory" | "Sessional";
  icon: React.ElementType;
  color: string;
  description: string;
  url?: string;
}

const courses: Course[] = [
  {
    code: "CSE 2123",
    title: "Introduction to Computer Programming",
    semester: "Winter 2026",
    type: "Theory",
    icon: Code,
    color: "blue",
    description: "Covering the core concepts of procedural programming, data types, control flow, and algorithmic thinking.",
    url: "https://mdrakibtrofder.github.io/introduction-to-computer-programming"
  },
  {
    code: "CSE 2109",
    title: "Computer Fundamentals",
    semester: "Winter 2026",
    type: "Theory",
    icon: Monitor,
    color: "purple",
    description: "Undergraduate foundational course on computer architecture, operating systems, and digital logic design.",
    url: "https://mdrakibtrofder.github.io/computer-fundamentals"
  },
  {
    code: "CSE 4215",
    title: "Professional Issues and Ethics for Computer Science",
    semester: "Winter 2026",
    type: "Theory",
    icon: Shield,
    color: "rose",
    description: "Examining the social impact of technology, ethical frameworks for developers, and legal issues in computing.",
    url: "https://mdrakibtrofder.github.io/professional-issues-and-ethics-for-computer-science/"
  },
  {
    code: "CSE 1204",
    title: "Computer Applications for Business",
    semester: "Winter 2026",
    type: "Sessional",
    icon: Briefcase,
    color: "orange",
    description: "Bridging technology and business with advanced spreadsheet modeling, database management, and IT workflows."
  },
  {
    code: "CSE 2124",
    title: "Introduction to Computer Programming Sessional",
    semester: "Winter 2026",
    type: "Sessional",
    icon: Terminal,
    color: "emerald",
    description: "Hands-on implementation of programming concepts through weekly lab exercises and project-based learning."
  },
  {
    code: "CSE 2110",
    title: "Computer Fundamentals Sessional",
    semester: "Winter 2026",
    type: "Sessional",
    icon: Monitor,
    color: "indigo",
    description: "Practical exploration of hardware components, peripheral interfacing, and system software configuration."
  },
  {
    code: "CSE 4102",
    title: "Computer Security Sessional",
    semester: "Winter 2026",
    type: "Sessional",
    icon: Shield,
    color: "cyan",
    description: "Advanced lab focused on penetration testing, security auditing, and implementing robust cryptographic protocols."
  }
];

const colorClasses: Record<string, string> = {
  blue: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  emerald: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  purple: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  indigo: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  orange: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  rose: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  cyan: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
};

const dotColors: Record<string, string> = {
  blue: "border-blue-500 bg-blue-400",
  emerald: "border-emerald-500 bg-emerald-400",
  purple: "border-purple-500 bg-purple-400",
  indigo: "border-indigo-500 bg-indigo-400",
  orange: "border-orange-500 bg-orange-400",
  rose: "border-rose-500 bg-rose-400",
  cyan: "border-cyan-500 bg-cyan-400",
};

const getCourseTypeColor = (type: string) => {
  return type === "Theory" ? "bg-blue-500" : "bg-emerald-500";
};

const Teaching = () => {
  return (
    <div className="py-20 px-4 relative overflow-hidden" id="teaching">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Teaching
          </h2>
          <div className="h-1.5 w-24 bg-violet-500 mx-auto rounded-full"></div>
        </div>

        {/* Counseling Info Card */}
        <div className="mb-12 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-violet-500/10">
                <Clock className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="font-semibold text-violet-500">Counseling Time</p>
                <p className="text-sm text-muted-foreground">9:00 - 11:00 PM (Sunday, Monday, Thursday)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-violet-500/10">
                <MapPin className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="font-semibold text-violet-500">Room No - 303 (C), Department of CSE</p>
                <p className="text-sm text-muted-foreground">Bangladesh Army University of Science and Technology</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-violet-500/30" />
          <div className="space-y-10">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div key={course.code} className="relative pl-16">
                  <span className={`absolute left-4 top-6 h-4 w-4 rounded-full border-4 ${dotColors[course.color]} bg-secondary shadow-xl`} />
                  <div className={`rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-violet-500/40`}>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl ${colorClasses[course.color]}`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                            <GraduationCap className="h-3.5 w-3.5" />
                            {course.semester}
                          </div>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">{course.code}</span>
                          <h3 className="text-xl font-bold text-foreground mb-1">{course.title}</h3>
                          
                          <div className="flex items-center gap-3 mt-3">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${colorClasses[course.color]}`}>
                              <div className={`w-2 h-2 rounded-full ${getCourseTypeColor(course.type)}`} />
                              {course.type}
                            </span>
                            <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-400">
                              Instructor
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {course.url && (
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium hover:bg-violet-500/20 hover:border-violet-400/50 transition-all"
                        >
                          View Material
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      {course.description}
                    </p>
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

export default Teaching;
