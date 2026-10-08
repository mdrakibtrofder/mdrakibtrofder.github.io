import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_GROUPS } from "@/config/site";
import { profile } from "@/data";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const Navigation = ({ activeSection }: { activeSection: string }) => {
  const [open, setOpen] = useState(false);

  const go = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    history.replaceState(null, "", `#${id}`);
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" onClick={(e) => go("home", e)} className="flex items-center gap-2.5 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-sm text-background">
            RT
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_GROUPS.map((group) => {
            const isActive = group.items.some((i) => i.id === activeSection);
            return (
              <DropdownMenu key={group.label} modal={false}>
                <DropdownMenuTrigger
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[200px] rounded-xl p-1.5">
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => go(item.id, e)}
                        className={cn(
                          "cursor-pointer rounded-lg px-3 py-2 text-sm",
                          activeSection === item.id && "bg-secondary font-medium",
                        )}
                      >
                        {item.label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => go("contact", e)}
            className="hidden rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Contact
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t bg-background px-4 pb-6 pt-4 lg:hidden">
          <div className="grid gap-6 sm:grid-cols-2">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="eyebrow mb-2 px-3 text-muted-foreground">{group.label}</p>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => go(item.id, e)}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium",
                      activeSection === item.id ? "bg-secondary" : "text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
            <a
              href="#contact"
              onClick={(e) => go("contact", e)}
              className="rounded-lg bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background sm:col-span-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
