// Single entry point for all site content.
// Later, any of these can be swapped for an API call (see services/ when added)
// without touching the components that display them.
import type {
  Certificate,
  ContentChannels,
  Education,
  Experience,
  Mentorship,
  Profile,
  Program,
  Project,
  Skills,
  Supervision,
  Teaching,
  Volunteer,
  Workshop,
} from "@/types";

import profileJson from "./profile.json";
import experienceJson from "./experience.json";
import educationJson from "./education.json";
import projectsJson from "./projects.json";
import skillsJson from "./skills.json";
import teachingJson from "./teaching.json";
import supervisionJson from "./supervision.json";
import mentorshipJson from "./mentorship.json";
import workshopsJson from "./workshops.json";
import programsJson from "./programs.json";
import volunteerJson from "./volunteer.json";
import contentJson from "./content.json";
// Certificate images and PDFs live in public/certificates, so the details file stays next to them.
import certificatesJson from "../../public/certificates/certificate_details.json";

export const profile = profileJson as Profile;
export const experience = experienceJson as Experience[];
export const education = educationJson as Education[];
export const projects = projectsJson as Project[];
export const skills = skillsJson as Skills;
export const teaching = teachingJson as Teaching;
export const supervision = supervisionJson as Supervision[];
export const mentorship = mentorshipJson as Mentorship[];
export const workshops = workshopsJson as Workshop[];
export const programs = programsJson as Program[];
export const volunteer = volunteerJson as Volunteer[];
export const content = contentJson as ContentChannels;
export const certificates = (certificatesJson as Certificate[]).filter(
  (c) => !c.is_sensitive_certificate,
);
