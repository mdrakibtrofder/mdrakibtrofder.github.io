import { useMemo, useState } from "react";
import { Award, Grid2X2, ImageIcon, List, Search } from "lucide-react";
import Section from "@/components/common/Section";
import Tag from "@/components/common/Tag";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { certificates } from "@/data";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types";
import CertificateDetail from "./CertificateDetail";
import { CERTIFICATE_TYPES, issuerGroup, parseCertificateDate } from "./certificateUtils";

const PAGE = 12;
const ALL = "All";

const CertificateCard = ({ cert, view }: { cert: Certificate; view: "grid" | "list" }) => (
  <Dialog>
    <DialogTrigger asChild>
      {view === "grid" ? (
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
      ) : (
        <button type="button" className="surface surface-hover flex w-full items-center gap-4 p-4 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Award className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{cert.course_name}</h3>
            <p className="truncate text-xs text-muted-foreground">
              {cert.organization} · {cert.type}
            </p>
          </div>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{cert.issued_date}</span>
        </button>
      )}
    </DialogTrigger>
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
      <CertificateDetail cert={cert} />
    </DialogContent>
  </Dialog>
);

const CertificatesSection = () => {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [count, setCount] = useState(PAGE);

  const issuers = useMemo(() => [...new Set(certificates.map(issuerGroup))].sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates
      .filter((c) => !q || c.course_name.toLowerCase().includes(q) || c.organization.toLowerCase().includes(q))
      .filter((c) => issuer === ALL || issuerGroup(c) === issuer)
      .filter((c) => type === ALL || c.type.toLowerCase().includes(type.toLowerCase()))
      .sort((a, b) => {
        const diff = parseCertificateDate(b.issued_date) - parseCertificateDate(a.issued_date);
        return sort === "newest" ? diff : -diff;
      });
  }, [query, issuer, type, sort]);

  const hasFilters = query || issuer !== ALL || type !== ALL;
  const reset = () => {
    setQuery("");
    setIssuer(ALL);
    setType(ALL);
    setCount(PAGE);
  };

  return (
    <Section
      id="certificates"
      eyebrow="Background"
      title="Certificates"
      description={`${certificates.length} certificates from courses, competitions and events. Click any card for details.`}
    >
      {/* Controls */}
      <div className="surface mb-6 grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search certificates"
            aria-label="Search certificates"
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCount(PAGE);
            }}
          />
        </div>
        <Select value={issuer} onValueChange={(v) => { setIssuer(v); setCount(PAGE); }}>
          <SelectTrigger aria-label="Issuer"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All issuers</SelectItem>
            {issuers.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={(v) => { setType(v); setCount(PAGE); }}>
          <SelectTrigger aria-label="Type"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            {CERTIFICATE_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as "newest" | "oldest")}>
          <SelectTrigger aria-label="Sort"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex rounded-md border p-0.5">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-label={`${v} view`}
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("flex h-9 flex-1 items-center justify-center rounded px-3", view === v && "bg-secondary")}
            >
              {v === "grid" ? <Grid2X2 className="h-4 w-4" /> : <List className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {Math.min(count, filtered.length)} of {filtered.length}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="font-medium text-foreground hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
          <p className="font-medium">No certificates match these filters.</p>
          <button type="button" onClick={reset} className="mt-2 text-sm underline">
            Reset filters
          </button>
        </div>
      ) : (
        <div className={view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" : "space-y-2"}>
          {filtered.slice(0, count).map((c) => (
            <CertificateCard key={c.id} cert={c} view={view} />
          ))}
        </div>
      )}

      {count < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((n) => n + PAGE)}
            className="rounded-full border bg-card px-5 py-2 text-sm font-medium shadow-sm hover:bg-secondary"
          >
            Load more <Tag className="ml-1">{filtered.length - count}</Tag>
          </button>
        </div>
      )}
    </Section>
  );
};

export default CertificatesSection;
