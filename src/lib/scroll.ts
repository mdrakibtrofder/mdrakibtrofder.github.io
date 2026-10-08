import { HEADER_OFFSET } from "@/config/site";

export const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior });
};
