import { parse } from "date-fns";

const FORMATS = ["MMM d, yyyy", "MMMM d, yyyy", "d MMMM, yyyy", "dd/MM/yy", "MM/dd/yyyy", "d MMM yyyy", "MMM yyyy", "dd.MM.yyyy", "yyyy"];

export const UNDATED = "Undated";

/** Certificate dates come in many formats; unknown ones sort to the end. */
export const parseCertificateDate = (value: string): number => {
  if (!value || value === "N/A") return 0;
  for (const f of FORMATS) {
    const d = parse(value, f, new Date());
    if (!isNaN(d.getTime())) return d.getTime();
  }
  return 0;
};

/** Year label for the certificate tabs, e.g. "2021", or "Undated". */
export const certificateYear = (value: string): string => {
  const t = parseCertificateDate(value);
  if (t) return String(new Date(t).getFullYear());
  const m = value?.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : UNDATED;
};
