import { Github, Linkedin, Youtube } from "lucide-react";
import { profile } from "@/data";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
      <div className="flex gap-2">
        {[
          { href: profile.socials.github, icon: Github, label: "GitHub" },
          { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
          { href: profile.socials.youtube, icon: Youtube, label: "YouTube" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
