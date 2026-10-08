import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ExternalLink = ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "text-sm font-medium underline-offset-4 hover:underline",
      className,
    )}
  >
    {children}
    <ArrowUpRight className="ml-0.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
  </a>
);

export default ExternalLink;
