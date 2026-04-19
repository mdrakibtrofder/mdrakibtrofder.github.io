
import { BookOpen, Monitor, Shield, Users, Code, Terminal, Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const courses = [
  {
    code: "CSE 2123",
    title: "Introduction to Computer Programming",
    semester: "Winter 2026",
    type: "Theory",
    icon: Code,
    color: "blue",
    description: "Covering the core concepts of procedural programming, data types, control flow, and algorithmic thinking."
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
    code: "CSE 2109",
    title: "Computer Fundamentals",
    semester: "Winter 2026",
    type: "Theory",
    icon: Monitor,
    color: "purple",
    description: "Undergraduate foundational course on computer architecture, operating systems, and digital logic design."
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
    code: "CSE 1204",
    title: "Computer Applications for Business",
    semester: "Winter 2026",
    type: "Theory",
    icon: Briefcase,
    color: "orange",
    description: "Bridging technology and business with advanced spreadsheet modeling, database management, and IT workflows."
  },
  {
    code: "CSE 4215",
    title: "Professional Issues and Ethics",
    semester: "Winter 2026",
    type: "Theory",
    icon: Users,
    color: "rose",
    description: "Examining the social impact of technology, ethical frameworks for developers, and legal issues in computing."
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

const Teaching = () => {
  return (
    <section id="teaching" className="relative py-24 px-4 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-4 text-center">
          <Badge variant="outline" className="px-4 py-1 border-violet-500/30 text-violet-500 bg-violet-500/5">
            Academic Contributions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Teaching & <span className="text-violet-500">Mentorship</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const Icon = course.icon;
            
            // Generate color classes based on the course's assigned color
            const colorClasses: Record<string, string> = {
              blue: "group-hover:text-blue-500 bg-blue-500/10 text-blue-500",
              emerald: "group-hover:text-emerald-500 bg-emerald-500/10 text-emerald-500",
              purple: "group-hover:text-purple-500 bg-purple-500/10 text-purple-500",
              indigo: "group-hover:text-indigo-500 bg-indigo-500/10 text-indigo-500",
              orange: "group-hover:text-orange-500 bg-orange-500/10 text-orange-500",
              rose: "group-hover:text-rose-500 bg-rose-500/10 text-rose-500",
              cyan: "group-hover:text-cyan-500 bg-cyan-500/10 text-cyan-500",
            };

            const borderClasses: Record<string, string> = {
              blue: "group-hover:border-blue-500/30",
              emerald: "group-hover:border-emerald-500/30",
              purple: "group-hover:border-purple-500/30",
              indigo: "group-hover:border-indigo-500/30",
              orange: "group-hover:border-orange-500/30",
              rose: "group-hover:border-rose-500/30",
              cyan: "group-hover:border-cyan-500/30",
            };

            return (
              <Card 
                key={course.code} 
                className={`group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${borderClasses[course.color]}`}
              >
                {/* Visual accent top edge */}
                <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  course.color === 'blue' ? 'bg-blue-500' : 
                  course.color === 'emerald' ? 'bg-emerald-500' : 
                  course.color === 'purple' ? 'bg-purple-500' : 
                  course.color === 'indigo' ? 'bg-indigo-500' : 
                  course.color === 'orange' ? 'bg-orange-500' : 
                  course.color === 'rose' ? 'bg-rose-500' : 'bg-cyan-500'
                }`} />

                <CardHeader className="p-6 pb-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl transition-colors duration-500 ${colorClasses[course.color]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/50 text-[10px] font-bold uppercase tracking-wider">
                      {course.semester}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{course.code}</span>
                    <CardTitle className="text-xl leading-tight group-hover:text-foreground transition-colors">
                      {course.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-2">
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        course.type === 'Theory' ? 'bg-blue-400' : 'bg-emerald-400'
                      }`} />
                      {course.type}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <GraduationCap className="w-3 h-3" />
                      Instructor
                    </div>
                  </div>
                </CardContent>
                
                {/* Subtle background icon for design depth */}
                <Icon className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 -rotate-12" />
              </Card>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Teaching;
