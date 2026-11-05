// Navigation is built from the content: each chapter is a menu, each section
// in it is an entry. Section keys are also URL anchors (e.g. /#teaching), so
// keep them stable once published.
import { chapters, sections } from "@/data";

export interface NavItem {
  id: string;
  label: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = chapters
  .map((c) => ({
    label: c.navLabel || c.title,
    items: sections
      .filter((s) => s.chapter === c.id)
      .map((s) => ({ id: s.key, label: s.navLabel || s.title })),
  }))
  .filter((g) => g.items.length > 0);

export const SECTION_IDS = ["home", ...sections.map((s) => s.key), "contact"];

/** Height of the fixed header, used when scrolling to a section. */
export const HEADER_OFFSET = 72;
