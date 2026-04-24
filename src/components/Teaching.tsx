
import { useState } from "react";
import { BookOpen, Monitor, Shield, Users, Code, Terminal, Briefcase, GraduationCap, ExternalLink, Clock, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const theoryCourses = [
  {
    code: "CSE 2123",
    title: "Introduction to Computer Programming",
    semester: "Winter 2026",
    type: "Theory",
    icon: Code,
    color: "blue",
    description: "Covering the core concepts of procedural programming, data types, control flow, and algorithmic thinking.",
    url: "https://mdrakibtrofder.github.io/"
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
    icon: Users,
    color: "rose",
    description: "Examining the social impact of technology, ethical frameworks for developers, and legal issues in computing.",
    url: "https://mdrakibtrofder.github.io/professional-issues-and-ethics-for-computer-science/"
  },
];

const sessionalCourses = [
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

const getColorAccent = (color: string) => {
  switch(color) {
    case 'blue': return 'bg-blue-500';
    case 'emerald': return 'bg-emerald-500';
    case 'purple': return 'bg-purple-500';
    case 'indigo': return 'bg-indigo-500';
    case 'orange': return 'bg-orange-500';
    case 'rose': return 'bg-rose-500';
    case 'cyan': return 'bg-cyan-500';
    default: return 'bg-cyan-500';
  }
};

const CourseCard = ({ course }: { course: typeof theoryCourses[0] }) => {
  const Icon = course.icon;
  
  return (
    <Card 
      className={`group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${borderClasses[course.color]}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getColorAccent(course.color)}`} />

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
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {course.description}
        </p>
        
        {course.url && (
          <a 
            href={course.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-violet-500 hover:text-violet-600 mb-4 font-medium"
          >
            View Course Material
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}
        
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
      
      <Icon className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 -rotate-12" />
    </Card>
  );
};

const Teaching = () => {
  return (
    <section id="teaching" className="relative py-24 px-4 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
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

        <Card className="mb-8 bg-violet-500/5 border-violet-500/20">
          <CardContent className="p-6">
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
          </CardContent>
        </Card>

        <Tabs defaultValue="theory" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="theory" className="text-sm">Theory</TabsTrigger>
              <TabsTrigger value="sessional" className="text-sm">Sessional</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="theory" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {theoryCourses.map((course) => (
                <CourseCard key={course.code} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessional" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sessionalCourses.map((course) => (
                <CourseCard key={course.code} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
      </div>
    </section>
  );
};

export default Teaching;
