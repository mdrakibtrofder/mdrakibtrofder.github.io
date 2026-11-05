// All site content comes from one snapshot file. In production GitHub Actions
// replaces site.json with the latest content from the API before building,
// so edits made in the admin panel appear after "Publish".
import type {
  Certificate,
  Course,
  Experience,
  Mentorship,
  Project,
  SiteSection,
  SiteSnapshot,
} from "@/types";
import siteJson from "./site.json";

export const site = siteJson as unknown as SiteSnapshot;
export const profile = site.settings.profile;
export const chapters = site.settings.chapters;
export const sections = site.sections;

/** Every item across all sections of one kind (used for headline stats). */
const itemsOfKind = <T,>(kind: SiteSection["kind"]) =>
  sections.filter((s) => s.kind === kind).flatMap((s) => s.items) as unknown as T[];

export const experience = itemsOfKind<Experience>("experience");
export const mentorship = itemsOfKind<Mentorship>("mentorship");
export const projects = itemsOfKind<Project>("projects");
export const courses = itemsOfKind<Course>("teaching");
export const certificates = itemsOfKind<Certificate>("certificates").filter((c) => !c.is_sensitive_certificate);
