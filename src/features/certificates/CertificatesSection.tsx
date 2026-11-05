import { useMemo, useState } from "react";
import { ImageIcon } from "lucide-react";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { certificates } from "@/data";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types";
import CertificateDetail from "./CertificateDetail";
import { certificateYear, parseCertificateDate, UNDATED } from "./certificateUtils";

const PAGE = 12;

const CertificateCard = ({ cert }: { cert: Certificate }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button type="button" className="surface surface-hover group flex h-full flex-col overflow-hidden text-left">
        <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
          {cert.image ? (
            <img
              src={cert.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs text-muted-foreground">
            {cert.type} · {cert.issued_date}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">{cert.course_name}</h3>
          <p className="mt-auto truncate pt-2 text-xs text-muted-foreground">{cert.organization}</p>
        </div>
      </button>
    </DialogTrigger>
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
      <CertificateDetail cert={cert} />
    </DialogContent>
  </Dialog>
);

const CertificatesSection = () => {
  // Year tabs, newest first; certificates without a readable date go last.
  const byYear = useMemo(() => {
    const map = new Map<string, Certificate[]>();
    for (const c of certificates) {
      const y = certificateYear(c.issued_date);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(c);
    }
    map.forEach((list) => list.sort((a, b) => parseCertificateDate(b.issued_date) - parseCertificateDate(a.issued_date)));
    return [...map.entries()].sort(([a], [b]) => {
      if (a === UNDATED) return 1;
      if (b === UNDATED) return -1;
      return Number(b) - Number(a);
    });
  }, []);

  const [year, setYear] = useState(byYear[0]?.[0] ?? UNDATED);
  const [count, setCount] = useState(PAGE);
  const list = byYear.find(([y]) => y === year)?.[1] ?? [];

  const select = (y: string) => {
    setYear(y);
    setCount(PAGE);
  };

  return (
    <Section
      id="certificates"
      eyebrow="Background"
      title="Certificates"
      description={`${certificates.length} certificates from courses, competitions and events, grouped by year. Click any card for details.`}
    >
      <div
        className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        role="tablist"
        aria-label="Certificate year"
      >
        {byYear.map(([y, items]) => (
          <button
            key={y}
            type="button"
            role="tab"
            aria-selected={year === y}
            onClick={() => select(y)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium tabular-nums transition-colors",
              year === y ? "border-foreground bg-foreground text-background" : "bg-card hover:bg-secondary",
            )}
          >
            {y}
            <span className={cn("text-xs", year === y ? "opacity-70" : "text-muted-foreground")}>{items.length}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="tabpanel">
        {list.slice(0, count).map((c) => (
          <CertificateCard key={c.id} cert={c} />
        ))}
      </div>

      {count < list.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((n) => n + PAGE)}
            className="rounded-full border bg-card px-5 py-2 text-sm font-medium shadow-sm hover:bg-secondary"
          >
            Load more <Tag className="ml-1">{list.length - count}</Tag>
          </button>
        </div>
      )}
    </Section>
  );
};

export default CertificatesSection;
