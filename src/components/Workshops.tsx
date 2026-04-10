
import { Presentation, Calendar, MapPin, ExternalLink, Zap, Terminal, Rocket } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const workshopData = [
  {
    title: "Project Deployments from Scratch",
    org: "Chittagong University of Engineering and Technology (CUET)",
    dept: "ETE Department",
    date: "May 27, 2025",
    program: "Industrial Attachment Program",
    description: "A comprehensive deep-dive into full-stack application deployment strategies, cloud infrastructure, and CI/CD pipelines for ETE students.",
    icon: Rocket,
    tags: ["Cloud Infrastructure", "CI/CD", "Application Lifecycle"]
  },
  {
    title: "DevOps Workflow Implementation",
    org: "East West University (EWU)",
    dept: "CSE Department",
    date: "October 19, 2025",
    program: "Guest Speaker Session",
    description: "Hands-on session on modern DevOps practices, focusing on version control, automated testing, and containerization using Docker and GitHub Actions.",
    icon: Terminal,
    tags: ["Docker", "GitHub Actions", "Modern DevOps"]
  }
];

const Workshops = () => {
  return (
    <section id="workshops" className="py-24 px-4 bg-slate-50 dark:bg-slate-950/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 border-orange-500/30 text-orange-500 bg-orange-500/5">
              Knowledge Sharing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Technical <span className="text-orange-500">Workshops</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Invited sessions and industrial training programs where I share insights on modern software engineering and DevOps paradigms.
            </p>
          </div>
          <div className="flex gap-4 p-1 bg-secondary rounded-xl border border-border/50 hidden md:flex">
             <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background text-orange-500 shadow-sm">
                <Presentation className="h-6 w-6" />
             </div>
             <div className="pr-6">
                <p className="text-xs font-bold text-muted-foreground uppercase mt-1">Total Impact</p>
                <p className="text-xl font-bold">2 Major Events</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workshopData.map((workshop, idx) => {
            const Icon = workshop.icon;
            return (
              <Card key={idx} className="overflow-hidden border-none bg-background shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-16 bg-orange-500/10 flex items-center justify-center p-4 border-r border-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                     <Icon className="h-8 w-8 text-orange-500 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
                          {workshop.program}
                        </Badge>
                        <div className="flex items-center text-xs font-medium text-muted-foreground whitespace-nowrap">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {workshop.date}
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-orange-500 transition-colors leading-tight">
                        {workshop.title}
                      </CardTitle>
                      <div className="flex items-center text-sm font-medium mt-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1.5 text-orange-500" />
                        {workshop.org}
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 flex-grow">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {workshop.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {workshop.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/80 text-xs font-medium text-muted-foreground border border-border/50">
                            <Zap className="h-3 w-3 text-orange-400" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
