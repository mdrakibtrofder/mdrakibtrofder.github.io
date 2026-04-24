
import { useState } from "react";
import { ShieldCheck, Calendar, MapPin, Link as LinkIcon, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface Volunteer {
  role: string;
  organization: string;
  duration: string;
  category: string;
  logo?: string;
  link?: string;
}

const Volunteer = ({ volunteer }: { volunteer: Volunteer[] }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleVolunteer = showAll ? volunteer : volunteer.slice(0, 4);
  const remainingCount = volunteer.length - 4;

  const renderVolunteerTimelineItem = (item: Volunteer, index: number) => (
    <div key={index} className="relative pl-16">
      <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-emerald-400 bg-secondary shadow-xl" />
      <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-400/40">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-2 border border-slate-600">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.organization}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              ) : (
                <ShieldCheck className="w-12 h-12 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-400">{item.role}</h3>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  <h4 className="text-lg text-foreground">{item.organization}</h4>
                </a>
              ) : (
                <h4 className="text-lg text-foreground">{item.organization}</h4>
              )}
              <p className="text-muted-foreground mt-1">{item.category}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/70">{item.duration}</p>
          </div>
        </div>

        {item.link && (
          <div className="mt-6">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View Details <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div id="volunteer" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text text-transparent">
            Volunteer Experience
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            Giving back to the community and contributing to social and technical growth.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-emerald-500/30" />
          <div className="space-y-10">
            {visibleVolunteer.map((item, index) => renderVolunteerTimelineItem(item, index))}
          </div>
        </div>

        {remainingCount > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500/50"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Show More ({remainingCount}) <ChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer;
