import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowMoreButtonProps {
  expanded: boolean;
  onToggle: () => void;
  /** Number of hidden items, shown when collapsed. */
  hiddenCount?: number;
  label?: string;
}

const ShowMoreButton = ({ expanded, onToggle, hiddenCount, label = "Show more" }: ShowMoreButtonProps) => (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
    >
      {expanded ? "Show less" : `${label}${hiddenCount ? ` (${hiddenCount})` : ""}`}
      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
    </button>
  </div>
);

export default ShowMoreButton;
