import { ImageIcon } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Certificate } from "@/types";

const Field = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <dt className="eyebrow text-[10px] text-muted-foreground">{label}</dt>
    <dd className={mono ? "break-all font-mono text-sm" : "text-sm"}>{value}</dd>
  </div>
);

const CertificateDetail = ({ cert }: { cert: Certificate }) => (
  <div className="flex flex-col gap-6 md:flex-row">
    <DialogHeader className="flex-1 space-y-3 text-left">
      <DialogTitle className="text-xl leading-snug">{cert.course_name}</DialogTitle>
      <DialogDescription>{cert.organization}</DialogDescription>
      <dl className="grid grid-cols-2 gap-4 pt-2">
        <Field label="Type" value={cert.type} />
        <Field label="Issued" value={cert.issued_date} />
        <div className="col-span-2">
          <Field label="Signed by" value={cert.signed_by || "N/A"} />
        </div>
        {cert.credential_id && (
          <div className="col-span-2">
            <Field label="Credential ID" value={cert.credential_id} mono />
          </div>
        )}
      </dl>
    </DialogHeader>
    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border bg-secondary md:w-1/2">
      {cert.image ? (
        <img src={cert.image} alt={cert.course_name} className="h-full w-full object-contain" />
      ) : (
        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
      )}
    </div>
  </div>
);

export default CertificateDetail;
