// Shared types for everything in src/data. Edit the JSON files, not the components.

export type Track = "academic" | "engineering";

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  affiliation: { name: string; url: string };
  location: string;
  summary: string;
  tracks: Record<Track, { title: string; role: string; points: string[] }>;
  researchInterests: string[];
  contact: { email: string; phone: string; website: string };
  socials: { github: string; linkedin: string; youtube: string };
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  logo?: string;
  link?: string;
  type: "Full-time" | "Internship";
  track: Track;
}

export interface Education {
  degree: string;
  institute: string;
  duration: string;
  result?: string;
  achievements: string[];
  logo?: string;
  link?: string;
  isMore?: boolean;
}

export interface Project {
  name: string;
  type: string;
  technologies: string[];
  description: string;
  url?: string;
}

export interface Certification {
  name: string;
  url: string;
  tag: string;
}

export interface Skills {
  languages_frameworks: string[];
  tools_technologies: string[];
  certifications: Certification[];
}

export interface Course {
  code: string;
  title: string;
  semester: string;
  type: "Theory" | "Sessional";
  icon: string;
  description: string;
  url?: string;
}

export interface Teaching {
  counseling: { hours: string[]; room: string; institution: string };
  courses: Course[];
}

export interface Person {
  name: string;
  url?: string;
  role?: string;
}

export interface Supervision {
  institutes: string[];
  department?: string;
  supervisionType: string;
  duration: string;
  supervisor?: Person;
  coSupervisor?: Person;
  mentor?: Person;
}

export interface Mentorship {
  institution: string;
  role: string;
  period: string;
  studentCount: string;
  location: string;
  projects: string[];
  /** Internal note, not shown on the site. */
  notes?: string;
}

export interface Workshop {
  title: string;
  org: string;
  dept?: string;
  date: string;
  program: string;
  description: string;
  tags?: string[];
  url?: string;
}

export interface Program {
  title: string;
  organization: string;
  duration: string;
  icon?: string;
  logo?: string;
}

export interface Volunteer {
  role: string;
  organization: string;
  duration: string;
  category: string;
  logo?: string;
  link?: string;
}

export interface ContentLink {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  icon: string;
}

export interface ContentChannels {
  vlogs: ContentLink[];
  writings: ContentLink[];
  technical: ContentLink[];
}

export interface Certificate {
  id: string;
  type: string;
  issued_to: string;
  organization: string;
  course_name: string;
  signed_by: string;
  issued_date: string;
  credential_id: string | null;
  is_sensitive_certificate: boolean;
  image: string | null;
}
