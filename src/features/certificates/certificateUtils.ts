import { parse } from "date-fns";
import type { Certificate } from "@/types";

const FORMATS = ["MMM d, yyyy", "MMMM d, yyyy", "d MMMM, yyyy", "dd/MM/yy", "MM/dd/yyyy", "d MMM yyyy", "MMM yyyy", "dd.MM.yyyy", "yyyy"];

/** Certificate dates come in many formats; unknown ones sort to the end. */
export const parseCertificateDate = (value: string): number => {
  if (!value || value === "N/A") return 0;
  for (const f of FORMATS) {
    const d = parse(value, f, new Date());
    if (!isNaN(d.getTime())) return d.getTime();
  }
  return 0;
};

/** Groups similar issuer names under one filter label. */
export const issuerGroup = (c: Certificate): string => {
  const o = c.organization;
  if (o.includes("Google")) return "Google";
  if (o.includes("IBM")) return "IBM";
  if (o.includes("Michigan")) return "University of Michigan";
  if (o.includes("HackerRank")) return "HackerRank";
  if (o.includes("Coursera")) return "Coursera";
  if (o.includes("Ministry")) return "Ministry of Education";
  return o.split(",")[0].trim();
};

export const CERTIFICATE_TYPES = ["Course", "Participation", "Achievement", "Honour", "Excellence"];
