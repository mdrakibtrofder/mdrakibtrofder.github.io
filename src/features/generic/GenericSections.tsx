import { ArrowUpRight } from "lucide-react";
import LogoBox from "@/components/common/LogoBox";
import Section, { sectionProps } from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { GenericItem, SiteSection } from "@/types";

const tone = (accent: string) => (accent === "academic" || accent === "engineering" ? accent : "neutral");

const ItemLink = ({ item }: { item: GenericItem }) =>
  item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
    >
      {item.linkLabel || "Details"} <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  ) : null;

const Tags = ({ tags }: { tags?: string[] }) =>
  tags && tags.length > 0 ? (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  ) : null;

/** For sections you add yourself: entries on a vertical axis, newest first. */
export const TimelineSection = ({ section }: { section: SiteSection<GenericItem> }) => (
  <Section {...sectionProps(section)}>
    <Timeline>
      {section.items.map((item, i) => (
        <TimelineItem key={item._id ?? i} tone={tone(section.accent)}>
          <article className="surface p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              {item.image && <LogoBox src={item.image} alt="" size="sm" />}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:justify-between md:gap-4">
                  <div>
                    <h3 className="font-semibold leading-snug">{item.title}</h3>
                    {item.subtitle && <p className="text-sm text-muted-foreground">{item.subtitle}</p>}
                  </div>
                  {item.date && <p className="shrink-0 text-sm tabular-nums text-muted-foreground">{item.date}</p>}
                </div>
                {item.description && (
                  <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <Tags tags={item.tags} />
                <ItemLink item={item} />
              </div>
            </div>
          </article>
        </TimelineItem>
      ))}
    </Timeline>
  </Section>
);

/** For sections you add yourself: a grid of cards with an optional picture. */
export const CardsSection = ({ section }: { section: SiteSection<GenericItem> }) => (
  <Section {...sectionProps(section)}>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {section.items.map((item, i) => (
        <article key={item._id ?? i} className="surface surface-hover flex flex-col overflow-hidden">
          {item.image ? (
            <div className="aspect-video w-full overflow-hidden bg-secondary">
              <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col p-5">
            {item.date && <p className="text-xs tabular-nums text-muted-foreground">{item.date}</p>}
            <h3 className="mt-1 text-lg font-semibold leading-snug">{item.title}</h3>
            {item.subtitle && <p className="text-sm text-muted-foreground">{item.subtitle}</p>}
            {item.description && (
              <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}
            <Tags tags={item.tags} />
            <ItemLink item={item} />
          </div>
        </article>
      ))}
    </div>
  </Section>
);
