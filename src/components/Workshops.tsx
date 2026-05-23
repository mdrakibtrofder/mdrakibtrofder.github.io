import { Presentation, Calendar, MapPin, Zap, Rocket, Terminal, ExternalLink } from "lucide-react";

interface WorkshopItem {
  title: string;
  org: string;
  dept?: string;
  date: string;
  program: string;
  description: string;
  tags?: string[];
  url?: string;
}

const workshopData: WorkshopItem[] = [
  {
    title: "DevOps Workflow Implementation",
    org: "East West University (EWU)",
    dept: "CSE Department",
    date: "October 19, 2025",
    program: "Day Long Industrial Visit",
    description: "Hands-on session on modern DevOps practices, focusing on version control, automated testing, and containerization using Docker and GitHub Actions.",
    tags: ["Docker", "GitHub Actions", "Modern DevOps"]
  },
  {
    title: "Project Deployments from Scratch",
    org: "Chittagong University of Engineering and Technology (CUET)",
    dept: "ETE Department",
    date: "May 27, 2025",
    program: "Industrial Attachment Program",
    description: "A comprehensive deep-dive into full-stack application deployment strategies, cloud infrastructure, and CI/CD pipelines for ETE students.",
    tags: ["Cloud Infrastructure", "CI/CD", "Application Lifecycle"]
  },
];

const Workshops = ({ workshops }: { workshops?: WorkshopItem[] }) => {
  const data = workshops || workshopData;

  const renderWorkshopTimelineItem = (workshop: WorkshopItem, index: number) => (
    <div key={index} className="relative pl-16">
      <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-orange-400 bg-secondary shadow-xl" />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-orange-400/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-3xl bg-orange-500/10 border border-orange-500/20">
              {index === 0 ? (
                <Rocket className="w-8 h-8 text-orange-500 -rotate-12" />
              ) : (
                <Terminal className="w-8 h-8 text-orange-500" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {workshop.date}
              </div>
              <h3 className="text-xl font-semibold text-orange-400 mb-1">{workshop.title}</h3>
              <div className="flex items-center text-sm font-medium mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1.5 text-orange-500" />
                {workshop.org}
              </div>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
              {workshop.program}
            </span>
          </div>
        </div>

        <p className="mt-6 text-muted-foreground text-sm leading-relaxed">
          {workshop.description}
        </p>

        {workshop.tags && workshop.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {workshop.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/80 text-xs font-medium text-muted-foreground border border-border/50">
                <Zap className="h-3 w-3 text-orange-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="py-20 px-4 bg-slate-50/50 dark:bg-slate-900/20 relative overflow-hidden" id="workshops">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Technical Workshops
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-orange-500/30" />
          <div className="space-y-10">
            {data.map((workshop, index) => renderWorkshopTimelineItem(workshop, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
