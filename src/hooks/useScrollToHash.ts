import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll";

/** Scrolls to /#section or /section on first load and when the URL changes. */
export const useScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash.replace("#", "").replace("/", "") || pathname.replace(/^\//, "");
    if (!target) return;
    const t = window.setTimeout(() => scrollToSection(target), 100);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
};
