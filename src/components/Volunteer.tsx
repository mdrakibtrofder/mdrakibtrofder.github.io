
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleVolunteer.map((item, index) => (
            <div
              key={index}
              className="group relative bg-secondary/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:bg-secondary/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.organization}
                        className="max-w-[70%] max-h-[70%] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    ) : (
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-background scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="flex-grow pt-1">
                  <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {item.role}
                  </h3>
                  <p className="text-sm text-emerald-500/80 font-medium">
                    {item.organization}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                  {item.duration}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                  {item.category}
                </div>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  View Details <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              )}

              {/* Decorative line */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
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
