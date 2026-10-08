import { certificates, experience, mentorship, projects, teaching } from "@/data";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Parses "January 2024" / "Jan 2024" / "Present" into a Date. */
const parseMonthYear = (text: string): Date | null => {
  const t = text.trim().toLowerCase();
  if (t === "present") return new Date();
  const [month, year] = t.split(/\s+/);
  const m = MONTHS.indexOf(month?.slice(0, 3));
  const y = Number(year);
  return m >= 0 && y ? new Date(y, m, 1) : null;
};

/** Length of a "Start - End" range in months. */
export const monthsInRange = (range: string): number => {
  const [start, end] = range.split(/\s+[-–]\s+/);
  const a = parseMonthYear(start ?? "");
  const b = parseMonthYear(end ?? "");
  if (!a || !b) return 0;
  return Math.max(0, (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth());
};

const industryMonths = experience
  .filter((e) => e.track === "engineering" && e.type === "Full-time")
  .reduce((sum, e) => sum + monthsInRange(e.duration), 0);

export const stats = {
  courses: new Set(teaching.courses.map((c) => c.code)).size,
  studentsMentored: mentorship.reduce((sum, m) => sum + (parseInt(m.studentCount, 10) || 0), 0),
  industryYears: Math.floor(industryMonths / 12),
  projects: projects.length,
  certificates: certificates.length,
};
