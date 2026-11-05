import { ArrowUpRight } from "lucide-react";
import Section, { sectionProps } from "@/components/common/Section";
import { getIcon } from "@/lib/icons";
import type { ContentLink, SiteSection } from "@/types";

const ChannelCard = ({ item }: { item: ContentLink }) => {
  const Icon = getIcon(item.icon);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface surface-hover group flex h-full flex-col p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <h3 className="mt-4 font-semibold">{item.title}</h3>
      {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
      {item.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
    </a>
  );
};

/** A grid of outbound links (blogs, channels, profiles). */
const LinksSection = ({ section }: { section: SiteSection<ContentLink> }) => (
  <Section {...sectionProps(section)} className="py-10 md:py-12">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {section.items.map((item, i) => (
        <ChannelCard key={item._id ?? `${item.url}-${i}`} item={item} />
      ))}
    </div>
  </Section>
);

export default LinksSection;
