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
  return (
    <div id="diploma" className="py-24 px-4 bg-secondary/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Non-Academic Program
          </h2>
          <div className="h-1.5 w-24 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, index) => {
            const IconComponent = iconMap[track.icon || "award"] || Award;
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-secondary/30 border border-white/5 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors"></div>
                
                <div className="flex items-start space-x-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-7 h-7 text-purple-400" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium mb-4">
                      {track.organization}
                    </p>
                    <div className="flex items-center text-sm text-purple-400/80 font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {track.duration}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-2">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-purple-500/50 group-hover:w-full transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NonAcademicProgram;
