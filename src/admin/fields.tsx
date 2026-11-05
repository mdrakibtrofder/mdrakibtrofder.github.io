import { useId, useRef, useState } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { ICON_NAMES, getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { uploadMedia } from "./api";
import { getPath, setPath, type Field } from "./schemas";

export const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10";

const Upload_ = ({
  accept,
  folder,
  onUploaded,
  onError,
}: {
  accept: string;
  folder: string;
  onUploaded: (url: string) => void;
  onError: (msg: string) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          setBusy(true);
          try {
            onUploaded((await uploadMedia(f, folder)).url);
          } catch (err) {
            onError((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-60"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {busy ? "Uploading" : "Upload"}
      </button>
    </>
  );
};

export const FieldInput = ({
  field,
  value,
  onChange,
  folder = "uploads",
  idPrefix = "f",
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  folder?: string;
  idPrefix?: string;
}) => {
  const [error, setError] = useState("");
  const str = typeof value === "string" ? value : value == null ? "" : String(value);
  const id = `${idPrefix}-${field.name.replace(/\./g, "-")}`;

  let control: React.ReactNode;
  switch (field.type) {
    case "textarea":
      control = <textarea id={id} rows={4} className={inputClass} value={str} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "list": {
      const lines = Array.isArray(value) ? (value as string[]).join("\n") : str;
      control = (
        <textarea
          id={id}
          rows={Math.min(10, Math.max(3, lines.split("\n").length + 1))}
          className={inputClass}
          value={lines}
          placeholder="One per line"
          onChange={(e) => onChange(e.target.value.split("\n"))}
          onBlur={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        />
      );
      break;
    }
    case "select":
      control = (
        <select id={id} className={inputClass} value={str} onChange={(e) => onChange(e.target.value)}>
          {!field.options?.includes(str) && <option value={str}>{str || "—"}</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case "bool":
      control = (
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
          {field.label}
        </label>
      );
      break;
    case "icon": {
      const Icon = getIcon(str);
      control = (
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-secondary">
            <Icon className="h-4 w-4" />
          </span>
          <select id={id} className={inputClass} value={str} onChange={(e) => onChange(e.target.value)}>
            <option value="">(default)</option>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    }
    case "image":
    case "file":
      control = (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input id={id} className={inputClass} value={str} placeholder="https://…" onChange={(e) => onChange(e.target.value)} />
            <Upload_
              accept={field.type === "image" ? "image/*" : "application/pdf,image/*"}
              folder={field.type === "file" ? folder.replace(/images$/, "pdfs") : folder}
              onUploaded={(url) => {
                setError("");
                onChange(url);
              }}
              onError={setError}
            />
            {str && (
              <button type="button" aria-label="Clear" onClick={() => onChange("")} className="rounded-lg border px-2 hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {str && field.type === "image" && (
            <img src={str} alt="" className="h-24 max-w-[200px] rounded-lg border bg-white object-contain p-1" />
          )}
          {str && field.type === "file" && (
            <a href={str} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs underline">
              <FileText className="h-3.5 w-3.5" /> Open file
            </a>
          )}
        </div>
      );
      break;
    default:
      control = (
        <input
          id={id}
          type={field.type === "url" ? "url" : "text"}
          className={inputClass}
          value={str}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }

  return (
    <div className={cn("space-y-1.5", (field.type === "textarea" || field.type === "list") && "sm:col-span-2")}>
      {field.type !== "bool" && (
        <label htmlFor={id} className="block text-sm font-medium">
          {field.label}
        </label>
      )}
      {control}
      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

/** Renders fields bound to (nested) keys of one object. */
export const FieldsForm = ({
  fields,
  value,
  onChange,
  folder,
}: {
  fields: Field[];
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
  folder?: string;
}) => {
  const prefix = useId().replace(/:/g, "");
  return (
  <div className="grid gap-4 sm:grid-cols-2">
    {fields.map((f) => (
      <FieldInput
        key={f.name}
        field={f}
        idPrefix={prefix}
        folder={folder}
        value={getPath(value, f.name)}
        onChange={(v) => onChange(setPath(value, f.name, v))}
      />
    ))}
  </div>
  );
};

/** Trims list fields (a textarea mid-edit may hold blank lines). */
export const cleanLists = (fields: Field[], value: Record<string, unknown>) =>
  fields
    .filter((f) => f.type === "list")
    .reduce((acc, f) => {
      const v = getPath(acc, f.name);
      return Array.isArray(v) ? setPath(acc, f.name, v.map((s) => String(s).trim()).filter(Boolean)) : acc;
    }, value);
