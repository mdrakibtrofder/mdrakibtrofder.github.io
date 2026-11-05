// Which fields the admin panel shows for each kind of section.
// "name" can be a dotted path (e.g. "supervisor.name") for nested values.

export type FieldType = "text" | "textarea" | "list" | "select" | "bool" | "image" | "file" | "url" | "icon";

export interface Field {
  name: string;
  label: string;
  type?: FieldType;
  options?: string[];
  help?: string;
  /** Shown as the item's name in lists. */
  primary?: boolean;
}

export interface KindInfo {
  label: string;
  description: string;
  item: Field[];
  options?: Field[];
  /** Cloudinary folder for uploads from this kind. */
  folder: string;
}

const GENERIC_ITEM: Field[] = [
  { name: "title", label: "Title", primary: true },
  { name: "subtitle", label: "Subtitle" },
  { name: "date", label: "Date / duration", help: 'e.g. "Jan 2024 - Present"' },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image / logo", type: "image" },
  { name: "url", label: "Link", type: "url" },
  { name: "linkLabel", label: "Link text", help: 'Defaults to "Details"' },
  { name: "tags", label: "Tags", type: "list" },
];

export const KINDS: Record<string, KindInfo> = {
  timeline: {
    label: "Timeline (custom)",
    description: "Entries on a vertical axis, like Education. Good for awards, talks, publications.",
    item: GENERIC_ITEM,
    folder: "sections",
  },
  cards: {
    label: "Cards (custom)",
    description: "A grid of cards with an optional picture on top. Good for galleries or highlights.",
    item: GENERIC_ITEM,
    folder: "sections",
  },
  links: {
    label: "Links",
    description: "A grid of outbound links with an icon (blogs, channels, profiles).",
    item: [
      { name: "title", label: "Title", primary: true },
      { name: "subtitle", label: "Subtitle" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "url", label: "Link", type: "url" },
      { name: "icon", label: "Icon", type: "icon" },
    ],
    folder: "links",
  },
  about: {
    label: "About (profile tracks)",
    description: "Shows the two tracks and research interests from Site settings. Has no items.",
    item: [],
    folder: "about",
  },
  experience: {
    label: "Experience",
    description: "Jobs on a timeline; internships listed separately.",
    item: [
      { name: "role", label: "Role", primary: true },
      { name: "company", label: "Company" },
      { name: "duration", label: "Duration", help: 'e.g. "January 2024 - Present"' },
      { name: "location", label: "Location" },
      { name: "type", label: "Type", type: "select", options: ["Full-time", "Internship"] },
      { name: "track", label: "Track", type: "select", options: ["academic", "engineering"] },
      { name: "logo", label: "Logo", type: "image" },
      { name: "link", label: "Company website", type: "url" },
      { name: "responsibilities", label: "Responsibilities", type: "list" },
    ],
    options: [{ name: "internshipsLabel", label: "Heading above internships" }],
    folder: "organizations",
  },
  teaching: {
    label: "Courses",
    description: "Courses grouped by semester, with counseling hours.",
    item: [
      { name: "code", label: "Course code" },
      { name: "title", label: "Title", primary: true },
      { name: "semester", label: "Semester", help: 'e.g. "Summer 2026". The first semester listed opens by default.' },
      { name: "type", label: "Type", type: "select", options: ["Theory", "Sessional"] },
      { name: "icon", label: "Icon", type: "icon" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "url", label: "Course site", type: "url" },
    ],
    options: [
      { name: "counseling.hours", label: "Counseling hours", type: "list" },
      { name: "counseling.room", label: "Room" },
      { name: "counseling.institution", label: "Institution" },
    ],
    folder: "courses",
  },
  mentorship: {
    label: "Student mentorship",
    description: "Supervision and mentoring roles.",
    item: [
      { name: "role", label: "Role", primary: true },
      { name: "institution", label: "Institution" },
      { name: "period", label: "Period" },
      { name: "studentCount", label: "Students", help: 'e.g. "3 Students" (the number is added to the stats)' },
      { name: "location", label: "Location" },
      { name: "projects", label: "Projects", type: "list" },
      { name: "notes", label: "Private notes", type: "textarea", help: "Never shown on the website." },
    ],
    folder: "mentorship",
  },
  workshops: {
    label: "Workshops",
    description: "Workshops and talks on a timeline.",
    item: [
      { name: "title", label: "Title", primary: true },
      { name: "org", label: "Organisation" },
      { name: "dept", label: "Department" },
      { name: "date", label: "Date" },
      { name: "program", label: "Program" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "tags", label: "Tags", type: "list" },
      { name: "url", label: "Link", type: "url" },
    ],
    folder: "workshops",
  },
  projects: {
    label: "Projects",
    description: "Projects with category tabs.",
    item: [
      { name: "name", label: "Name", primary: true },
      { name: "type", label: "Category", help: 'Projects with the same category share a tab, e.g. "Hackathon Project"' },
      { name: "description", label: "Description", type: "textarea" },
      { name: "technologies", label: "Technologies", type: "list" },
      { name: "url", label: "Link (site or GitHub)", type: "url" },
    ],
    folder: "projects",
  },
  skills: {
    label: "Skills",
    description: "Skill lists, plus certifications as items.",
    item: [
      { name: "name", label: "Certification", primary: true },
      { name: "tag", label: "Group", help: 'e.g. "AI & ML"' },
      { name: "url", label: "Credential link", type: "url" },
    ],
    options: [
      { name: "languagesLabel", label: "First list heading", help: 'Default "Languages & frameworks"' },
      { name: "languages_frameworks", label: "Languages & frameworks", type: "list" },
      { name: "toolsLabel", label: "Second list heading", help: 'Default "Tools & platforms"' },
      { name: "tools_technologies", label: "Tools & platforms", type: "list" },
      { name: "certificationsLabel", label: "Certifications heading" },
    ],
    folder: "skills",
  },
  education: {
    label: "Education",
    description: "Degrees on a timeline.",
    item: [
      { name: "degree", label: "Degree", primary: true },
      { name: "institute", label: "Institute" },
      { name: "duration", label: "Duration" },
      { name: "result", label: "Result" },
      { name: "achievements", label: "Achievements", type: "list" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "link", label: "Website", type: "url" },
      { name: "isMore", label: "Hide behind “show more”", type: "bool" },
    ],
    options: [{ name: "moreLabel", label: "“Show more” button text" }],
    folder: "organizations",
  },
  programs: {
    label: "Programs",
    description: "Professional programs on a timeline.",
    item: [
      { name: "title", label: "Title", primary: true },
      { name: "organization", label: "Organisation" },
      { name: "duration", label: "Duration" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "icon", label: "Fallback icon", type: "icon" },
    ],
    folder: "organizations",
  },
  certificates: {
    label: "Certificates",
    description: "Certificates in year tabs.",
    item: [
      { name: "course_name", label: "Title", primary: true },
      { name: "type", label: "Type", help: 'e.g. "Certificate of Completion"' },
      { name: "organization", label: "Issued by" },
      { name: "issued_date", label: "Issue date", help: 'e.g. "July 26, 2026". The year decides its tab.' },
      { name: "issued_to", label: "Issued to" },
      { name: "signed_by", label: "Signed by" },
      { name: "credential_id", label: "Credential ID" },
      { name: "image", label: "Certificate image", type: "image" },
      { name: "pdf", label: "PDF", type: "file" },
      { name: "is_sensitive_certificate", label: "Private (never shown on the site)", type: "bool" },
      { name: "id", label: "Internal id" },
    ],
    folder: "certificates/images",
  },
  supervision: {
    label: "Supervision",
    description: "Supervisors and mentors.",
    item: [
      { name: "supervisionType", label: "Type", primary: true, help: 'e.g. "M.Sc. Thesis"' },
      { name: "institutes", label: "Institutes", type: "list" },
      { name: "department", label: "Department" },
      { name: "duration", label: "Duration" },
      { name: "supervisor.name", label: "Supervisor" },
      { name: "supervisor.role", label: "Supervisor's role" },
      { name: "supervisor.url", label: "Supervisor's profile", type: "url" },
      { name: "coSupervisor.name", label: "Co-supervisor" },
      { name: "coSupervisor.role", label: "Co-supervisor's role" },
      { name: "coSupervisor.url", label: "Co-supervisor's profile", type: "url" },
      { name: "mentor.name", label: "Mentor" },
      { name: "mentor.role", label: "Mentor's role" },
      { name: "mentor.url", label: "Mentor's profile", type: "url" },
    ],
    folder: "supervision",
  },
  volunteer: {
    label: "Volunteer",
    description: "One card per organisation, listing every role.",
    item: [
      { name: "role", label: "Role", primary: true },
      { name: "organization", label: "Organisation", help: "Roles with the same organisation are grouped." },
      { name: "duration", label: "Duration", help: 'e.g. "Jan 2024 - Present" (used for ordering)' },
      { name: "category", label: "Category" },
      { name: "logo", label: "Logo", type: "image" },
      { name: "link", label: "Details link", type: "url" },
    ],
    folder: "clubs",
  },
};

export const SECTION_FIELDS: Field[] = [
  { name: "title", label: "Title" },
  { name: "eyebrow", label: "Small label above the title" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "navLabel", label: "Menu label", help: "Defaults to the title" },
  { name: "key", label: "URL anchor", help: "Changing it breaks links people saved, e.g. /#projects" },
  { name: "accent", label: "Colour", type: "select", options: ["neutral", "academic", "engineering"] },
];

export const CHAPTER_FIELDS: Field[] = [
  { name: "navLabel", label: "Menu label", primary: true },
  { name: "showHeader", label: "Show a divider before these sections", type: "bool" },
  { name: "label", label: "Divider label", help: 'e.g. "Part 1"' },
  { name: "title", label: "Divider title" },
  { name: "description", label: "Divider description", type: "textarea" },
  { name: "icon", label: "Divider icon", type: "icon" },
  { name: "accent", label: "Colour", type: "select", options: ["neutral", "academic", "engineering"] },
];

export const PROFILE_FIELDS: Field[] = [
  { name: "name", label: "Full name" },
  { name: "shortName", label: "Short name" },
  { name: "initials", label: "Logo initials", help: 'e.g. "RT"' },
  { name: "headline", label: "Headline" },
  { name: "affiliation.name", label: "Affiliation" },
  { name: "affiliation.url", label: "Affiliation website", type: "url" },
  { name: "location", label: "Location" },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "tracks.academic.title", label: "Academic track: title" },
  { name: "tracks.academic.role", label: "Academic track: role" },
  { name: "tracks.academic.points", label: "Academic track: points", type: "list" },
  { name: "tracks.engineering.title", label: "Engineering track: title" },
  { name: "tracks.engineering.role", label: "Engineering track: role" },
  { name: "tracks.engineering.points", label: "Engineering track: points", type: "list" },
  { name: "researchInterests", label: "Research interests", type: "list" },
  { name: "contact.email", label: "Email" },
  { name: "contact.phone", label: "Phone" },
  { name: "contact.website", label: "Website", type: "url" },
  { name: "socials.github", label: "GitHub", type: "url" },
  { name: "socials.linkedin", label: "LinkedIn", type: "url" },
  { name: "socials.youtube", label: "YouTube", type: "url" },
];

// ---------- helpers for dotted paths ----------

export const getPath = (obj: Record<string, unknown>, path: string): unknown =>
  path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), obj);

export const setPath = (obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> => {
  const [head, ...rest] = path.split(".");
  if (rest.length === 0) return { ...obj, [head]: value };
  const child = (obj[head] && typeof obj[head] === "object" ? obj[head] : {}) as Record<string, unknown>;
  return { ...obj, [head]: setPath(child, rest.join("."), value) };
};

/** A readable name for an item in lists. */
export const itemLabel = (kind: string, data: Record<string, unknown>): string => {
  const fields = KINDS[kind]?.item ?? GENERIC_ITEM;
  const primary = fields.find((f) => f.primary)?.name;
  const v = (primary && getPath(data, primary)) || data.title || data.name || data.role || data.course_name;
  return typeof v === "string" && v.trim() ? v : "(untitled)";
};

export const itemSubLabel = (data: Record<string, unknown>): string =>
  [data.company, data.institute, data.organization, data.org, data.institution, data.subtitle, data.semester]
    .find((v) => typeof v === "string" && v) as string | undefined ??
  ((data.duration || data.date || data.period || data.issued_date || "") as string);
