// Navigation and section ids. Section ids are also URL anchors (e.g. /#teaching),
// so keep them stable once published.

export interface NavItem {
  id: string;
  label: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "About",
    items: [
      { id: "about", label: "Overview" },
      { id: "experience", label: "Experience" },
    ],
  },
  {
    label: "Teaching",
    items: [
      { id: "teaching", label: "Courses" },
      { id: "mentorship", label: "Student Mentorship" },
      { id: "workshops", label: "Workshops" },
    ],
  },
  {
    label: "Engineering",
    items: [
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
    ],
  },
  {
    label: "Background",
    items: [
      { id: "education", label: "Education" },
      { id: "non-academic-program", label: "Programs" },
      { id: "certificates", label: "Certificates" },
      { id: "supervision", label: "Supervision" },
      { id: "volunteer", label: "Volunteer" },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "technical-content", label: "Technical Content" },
      { id: "writings", label: "Writings" },
      { id: "vlogs", label: "Vlogs & Local Guide" },
    ],
  },
];

export const SECTION_IDS = [
  "home",
  ...NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id)),
  "contact",
];

/** Height of the fixed header, used when scrolling to a section. */
export const HEADER_OFFSET = 72;
