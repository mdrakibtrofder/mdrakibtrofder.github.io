import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoBoxProps {
  src?: string;
  alt: string;
  href?: string;
  fallbackIcon?: LucideIcon;
  size?: "sm" | "md";
}

const sizes = { sm: "h-11 w-11 p-1.5", md: "h-14 w-14 p-2" };

/** Organisation logo with an icon fallback when there is no image (or it fails to load). */
const LogoBox = ({ src, alt, href, fallbackIcon: Icon = Building2, size = "md" }: LogoBoxProps) => {
  const [failed, setFailed] = useState(false);
  const box = (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white",
        sizes[size],
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon className="h-1/2 w-1/2 text-slate-400" aria-hidden="true" />
      )}
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
      {box}
    </a>
  ) : (
    box
  );
};

export default LogoBox;
