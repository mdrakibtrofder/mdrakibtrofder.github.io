import { ExternalLink, Users, Calendar, Building2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface Person {
  name: string;
  url?: string;
  role?: string;
}

interface Supervision {
  institutes: string[];
  department?: string;
  supervisionType: string;
  duration: string;
  supervisor?: Person;
  coSupervisor?: Person;
  mentor?: Person;
}

const supervisionData: Supervision[] = [
  {
    institutes: ["Bangladesh Army University of Science and Technology", "Saidpur"],
    department: "Department of Computer Science",
    supervisionType: "Department Head",
    duration: "January 2026 - Present",
    supervisor: {
      name: "Associate Professor Dr. Md Nakib Hayat Chowdhury",
      role: "Head of the Department",
      url: "https://www.linkedin.com/in/md-nakib-hayat-chowdhury-phd-b23a8874/"
    }
  },
  {
    institutes: ["Streams Tech Ltd."],
    department: "Monitoring and Evaluation Project",
    supervisionType: "Project Lead",
    duration: "January 2024 - January 2026",
    supervisor: {
      name: "Mostafizur Rahman Monir",
      role: "Senior Software Engineer",
      url: "https://www.linkedin.com/in/mostafizur-rahman-monir-7ab95944/"
    }
  },
  {
    institutes: ["IIT, University of Dhaka", "William & Mary"],
    supervisionType: "Software Project Lab 3",
    duration: "August 2023 - December 2023",
    supervisor: {
      name: "Professor Dr. Denys Poshyvanyk",
      url: "https://www.linkedin.com/in/denys-poshyvanyk-784ab33/"
    },
    coSupervisor: {
      name: "Associate Professor Dr. Ahmedul Kabir",
      url: "https://www.linkedin.com/in/ahmedul-kabir-90469134/"
    },
    mentor: {
      name: "Daniel Rodriguez Cardenas",
      url: "https://www.linkedin.com/in/daniel-rodriguez-cardenas/"
    }
  },
  {
    institutes: ["Cefalo Bangladesh Ltd."],
    supervisionType: "Industry Trainer",
    duration: "January 2023 - June 2023",
    mentor: {
      name: "Simanta Deb Turja",
      url: "https://www.linkedin.com/in/simantaturja/"
    }
  },
  {
    institutes: ["IIT, University of Dhaka"],
    supervisionType: "Software Project Lab 2",
    duration: "January 2022 - June 2022",
    supervisor: {
      name: "Assistant Professor Kishan Kumar Ganguly",
      url: "https://www.linkedin.com/in/kkganguly/"
    }
  },
  {
    institutes: ["IIT, University of Dhaka"],
    supervisionType: "Software Project Lab 1",
    duration: "January 2020 - August 2021",
    supervisor: {
      name: "Assistant Professor Kishan Kumar Ganguly",
      url: "https://www.linkedin.com/in/kkganguly/"
    },
    coSupervisor: {
      name: "Professor Dr. Kazi Muheymin Us Sakib",
      url: "https://www.linkedin.com/in/kazi-muheymin-us-sakib-5871a535b/"
    }
  }
];

const typeColors: Record<string, string> = {
  "Department Head": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Project Lead": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Industry Trainer": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Software Project Lab 3": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Software Project Lab 2": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Software Project Lab 1": "bg-sky-500/10 text-sky-400 border-sky-500/30",
};

const dotColors = [
  "bg-emerald-400 border-emerald-400",
  "bg-orange-400 border-orange-400",
  "bg-purple-400 border-purple-400",
  "bg-amber-400 border-amber-400",
  "bg-blue-400 border-blue-400",
  "bg-sky-400 border-sky-400",
];

interface PersonRowProps {
  label: string;
  person: Person;
  accentClass: string;
  iconBg: string;
  linkHover: string;
}

const PersonRow = ({ label, person, accentClass, iconBg, linkHover }: PersonRowProps) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8`}>
    <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      <Users className={`w-4 h-4 ${accentClass}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-[11px] font-semibold uppercase tracking-widest ${accentClass} opacity-70 mb-0.5`}>{label}</p>
      <p className="text-sm font-semibold text-foreground leading-tight">{person.name}</p>
      {person.role && (
        <p className="text-xs text-muted-foreground mt-0.5">{person.role}</p>
      )}
    </div>
    {person.url && (
      <a
        href={person.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-shrink-0 p-1.5 rounded-lg ${linkHover} ${accentClass} transition-colors`}
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    )}
  </div>
);

const Supervision = () => {
  return (
    <div id="supervision" className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 -translate-x-1/2 translate-y-1/4 w-80 h-80 bg-purple-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 -translate-y-1/4 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
            Supervision
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Mentored students through academic projects and industry internships
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-emerald-500 via-purple-500 to-sky-500" />

          <div className="space-y-6">
            {supervisionData.map((item, index) => (
              <div key={index} className="relative pl-16">
                {/* Timeline dot */}
                <div className={`absolute left-3 top-7 w-6 h-6 rounded-full border-4 ${dotColors[index]} shadow-lg`} />

                {/* Card */}
                <div className="rounded-2xl border border-slate-700/60 bg-secondary/50 p-6 shadow-xl hover:border-purple-500/40 transition-all duration-300">

                  {/* Institute / Company — enlarged */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    {item.institutes.map((inst, i) => (
                      <span key={i} className="text-lg font-bold text-foreground leading-tight">
                        {inst}{i < item.institutes.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>

                  {/* Department */}
                  {item.department && (
                    <p className="text-sm font-medium text-purple-400/80 mb-3 pl-7">{item.department}</p>
                  )}

                  {/* Duration + type badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-5 pl-7">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {item.duration}
                    </span>
                    <Badge className={`${typeColors[item.supervisionType] ?? "bg-slate-500/10 text-slate-400 border-slate-500/30"} border font-medium text-xs`}>
                      {item.supervisionType}
                    </Badge>
                  </div>

                  {/* People — always visible */}
                  <div className="space-y-2">
                    {item.supervisor && (
                      <PersonRow
                        label="Supervisor"
                        person={item.supervisor}
                        accentClass="text-purple-400"
                        iconBg="bg-purple-500/20"
                        linkHover="hover:bg-purple-500/20"
                      />
                    )}
                    {item.coSupervisor && (
                      <PersonRow
                        label="Co-Supervisor"
                        person={item.coSupervisor}
                        accentClass="text-blue-400"
                        iconBg="bg-blue-500/20"
                        linkHover="hover:bg-blue-500/20"
                      />
                    )}
                    {item.mentor && (
                      <PersonRow
                        label="Mentor"
                        person={item.mentor}
                        accentClass="text-emerald-400"
                        iconBg="bg-emerald-500/20"
                        linkHover="hover:bg-emerald-500/20"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supervision;
