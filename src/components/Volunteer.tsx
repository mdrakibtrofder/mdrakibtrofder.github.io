
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

const clubLogoMap: Record<string, string> = {
  "Somoyon": "/clubs/somoyon.jpeg",
  "IIT Software Engineers' Community": "/clubs/iitsec.jpg",
  "Khilkhet Pathagar": "/clubs/khilkhet-pathagar.jpg",
  "CUET Computer Club": "/clubs/cuet-computer-club.jpg",
  "IITDU Debating Club": "/clubs/iitdc.png",
  "Dhaka University Research Society (DURS)": "/clubs/dhaka-university-research-society.jpg",
  "Dhaka University Research Society": "/clubs/dhaka-university-research-society.jpg",
  "Notre Dame Science Club": "/clubs/notre-dame-science-club.jpg",
  "Notre Dame Writers' Club": "/clubs/notre-dame-writers-club.jpg",
  "Bishwa Sahitto Kendra": "/clubs/bishwa-sahitto-kendra.png"
};

const getClubLogo = (organization: string, fallback?: string) => {
  if (clubLogoMap[organization]) return clubLogoMap[organization];
  const key = organization.toLowerCase();
  if (key.includes("somoyon")) return "/clubs/somoyon.jpeg";
  if (key.includes("iit software engineers")) return "/clubs/iitsec.jpg";
  if (key.includes("khilkhet pathagar")) return "/clubs/khilkhet-pathagar.jpg";
  if (key.includes("cuet computer")) return "/clubs/cuet-computer-club.jpg";
  if (key.includes("iitdu debating")) return "/clubs/iitdc.png";
  if (key.includes("dhaka university research")) return "/clubs/dhaka-university-research-society.jpg";
  if (key.includes("notre dame science")) return "/clubs/notre-dame-science-club.jpg";
  if (key.includes("notre dame writers")) return "/clubs/notre-dame-writers-club.jpg";
  if (key.includes("bishwa sahitto")) return "/clubs/bishwa-sahitto-kendra.png";
  return fallback || "/placeholder.svg";
};

interface VolunteerGroup {
  organization: string;
  category: string;
  logo?: string;
  link?: string;
  roles: Volunteer[];
}

const Volunteer = ({ volunteer }: { volunteer: Volunteer[] }) => {
  const [showAll, setShowAll] = useState(false);

  const volunteerGroups: VolunteerGroup[] = Object.values(
    volunteer.reduce<Record<string, VolunteerGroup>>((groups, item) => {
      const key = item.organization.trim();

      if (!groups[key]) {
        groups[key] = {
          organization: item.organization,
          category: item.category,
          logo: item.logo,
          link: item.link,
          roles: []
        };
      }

      groups[key].roles.push(item);
      return groups;
    }, {})
  );

  const visibleGroups = showAll ? volunteerGroups : volunteerGroups.slice(0, 4);
  const remainingCount = Math.max(0, volunteerGroups.length - 4);

  const renderRoleTimelineItem = (item: Volunteer, index: number) => (
    <div key={`${item.organization}-${item.role}-${index}`} className="relative pl-12">
      <span className="absolute left-0 top-5 h-3 w-3 rounded-full bg-emerald-400 shadow-sm" />
      <div className="ml-6 rounded-2xl border border-slate-700/60 bg-secondary/30 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h4 className="text-base font-semibold text-foreground">{item.role}</h4>
            <p className="text-sm text-muted-foreground mt-1">{item.duration}</p>
          </div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/70">{item.category}</p>
        </div>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
            View Details
          </a>
        )}
      </div>
    </div>
  );

  const renderVolunteerGroup = (group: VolunteerGroup, index: number) => {
    const logoSrc = getClubLogo(group.organization, group.logo);

    return (
      <div key={group.organization} className="relative pl-16">
        <span className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-emerald-400 bg-secondary shadow-xl" />
        <div className="rounded-3xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-400/40">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-3xl bg-white/5 p-2 border border-slate-600">
                <img
                  src={logoSrc}
                  alt={`${group.organization} logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-400">{group.organization}</h3>
                <p className="text-muted-foreground mt-1">{group.category}</p>
                {group.roles.length > 1 && (
                  <p className="mt-2 text-sm text-emerald-400/70">{group.roles.length} roles across club involvement</p>
                )}
              </div>
            </div>

            {group.link && (
              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Visit Club
              </a>
            )}
          </div>

          <div className="mt-8 relative">
            <div className="absolute top-0 bottom-0 left-3 w-px bg-slate-600/40" />
            <div className="space-y-6">
              {group.roles.map((item, index) => renderRoleTimelineItem(item, index))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            {visibleGroups.map((group, index) => renderVolunteerGroup(group, index))}
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
