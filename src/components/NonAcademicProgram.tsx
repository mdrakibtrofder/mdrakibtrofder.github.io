import { Award, Terminal, Cpu, Layout, BookOpen, Clock } from "lucide-react";

interface Track {
  title: string;
  organization: string;
  duration: string;
  icon?: string;
}

const iconMap: Record<string, any> = {
  award: Award,
  terminal: Terminal,
  cpu: Cpu,
  layout: Layout,
  book: BookOpen
};

const NonAcademicProgram = ({ tracks }: { tracks: Track[] }) => {
  const renderTrackTimelineItem = (track: any, index: number) => {
    const IconComponent = iconMap[track.icon || "award"] || Award;
    
    return (
      <div key={index} className="relative pl-16">
        <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-purple-400 bg-secondary shadow-xl" />
        <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-purple-400/40">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-2 border border-slate-600">
                {track.logo ? (
                  <img
                    src={track.logo}
                    alt={`${track.organization} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <IconComponent className="w-12 h-12 text-purple-400" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-1">
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {track.organization}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="inline-flex rounded-full bg-purple-400/10 px-3 py-1 text-sm font-medium text-purple-400">
                Non-Academic
              </span>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-purple-400/70">
                {track.duration}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="diploma" className="py-24 px-4 bg-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Non-Academic Program
          </h2>
          <div className="h-1.5 w-24 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-purple-500/30" />
          <div className="space-y-10">
            {tracks.map((track, index) => renderTrackTimelineItem(track, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAcademicProgram;
