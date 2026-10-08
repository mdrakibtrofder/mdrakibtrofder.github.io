import { ArrowUpRight } from "lucide-react";
import Section from "@/components/common/Section";
import { content } from "@/data";
import { getIcon } from "@/lib/icons";
import type { ContentLink } from "@/types";

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
      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </a>
  );
};

const GROUPS = [
  {
    id: "technical-content",
    title: "Technical content",
    description: "Tutorials, articles and case studies on programming and software engineering.",
    items: content.technical,
  },
  {
    id: "writings",
    title: "Writings",
    description: "Personal blogs on life, ideas and daily inspiration.",
    items: content.writings,
  },
  {
    id: "vlogs",
    title: "Vlogs & local guide",
    description: "Travel vlogs and place reviews as a Google Local Guide.",
    items: content.vlogs,
  },
];

const ContentSection = () => (
  <>
    {GROUPS.map((g) => (
      <Section key={g.id} id={g.id} eyebrow="Content" title={g.title} description={g.description} className="py-10 md:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {g.items.map((item) => (
            <ChannelCard key={item.url} item={item} />
          ))}
        </div>
      </Section>
    ))}
  </>
);

export default ContentSection;
