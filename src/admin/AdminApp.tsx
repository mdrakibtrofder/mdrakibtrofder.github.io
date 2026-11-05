import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FolderOpen,
  Image as ImageIcon,
  Layers,
  Loader2,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Rocket,
  Settings as SettingsIcon,
  Trash2,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  API_URL,
  api,
  getToken,
  json,
  setToken,
  setUnauthorizedHandler,
  uploadMedia,
  type AdminItem,
  type AdminSection,
  type AdminSettings,
  type MediaFile,
} from "./api";
import { FieldsForm, cleanLists, inputClass } from "./fields";
import { CHAPTER_FIELDS, KINDS, PROFILE_FIELDS, SECTION_FIELDS, itemLabel, itemSubLabel } from "./schemas";

// ---------- small UI pieces ----------

type Notice = { kind: "ok" | "error"; text: string } | null;

const Btn = ({
  children,
  variant = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" | "danger" | "ghost" }) => (
  <button
    type="button"
    {...props}
    className={cn(
      "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
      variant === "primary" && "bg-foreground text-background hover:opacity-90",
      variant === "default" && "border bg-card hover:bg-secondary",
      variant === "danger" && "border border-red-300 bg-card text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950",
      variant === "ghost" && "hover:bg-secondary",
      className,
    )}
  >
    {children}
  </button>
);

const IconBtn = ({ label, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    {...props}
    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30"
  >
    {children}
  </button>
);

/** Two-step delete: first click arms it, second click within 4s confirms. */
const DeleteBtn = ({ onConfirm, label = "Delete", small }: { onConfirm: () => void; label?: string; small?: boolean }) => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  if (small && !armed)
    return (
      <IconBtn label={label} onClick={() => setArmed(true)}>
        <Trash2 className="h-4 w-4" />
      </IconBtn>
    );
  return (
    <Btn variant="danger" className={small ? "h-8 px-2 text-xs" : ""} onClick={() => (armed ? onConfirm() : setArmed(true))}>
      <Trash2 className="h-4 w-4" /> {armed ? "Click again to confirm" : label}
    </Btn>
  );
};

const Card = ({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) => (
  <section className="rounded-2xl border bg-card p-5 shadow-sm">
    {(title || actions) && (
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        {title && <h2 className="font-semibold">{title}</h2>}
        {actions}
      </div>
    )}
    {children}
  </section>
);

const move = <T,>(arr: T[], i: number, d: -1 | 1): T[] => {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

// ---------- login ----------

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await api<{ token: string }>("/auth/login", json("POST", { email, password }));
      setToken(res.token);
      onLogin();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
        <div>
          <p className="eyebrow text-muted-foreground">Site admin</p>
          <h1 className="mt-1 text-2xl font-bold">Log in</h1>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" type="email" autoComplete="username" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" type="password" autoComplete="current-password" required className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>}
        <Btn variant="primary" className="w-full" disabled={busy} type="submit">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Log in
        </Btn>
        <p className="text-xs text-muted-foreground">API: {API_URL}</p>
      </form>
    </main>
  );
};

// ---------- views ----------

type View = { type: "settings" } | { type: "chapters" } | { type: "media" } | { type: "new" } | { type: "section"; id: string };

const SettingsView = ({ settings, onSaved, notify }: { settings: AdminSettings; onSaved: (s: AdminSettings) => void; notify: (n: Notice) => void }) => {
  const [profile, setProfile] = useState(settings.profile);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    try {
      onSaved(await api<AdminSettings>("/admin/settings", json("PUT", { profile: cleanLists(PROFILE_FIELDS, profile) })));
      notify({ kind: "ok", text: "Profile saved. Publish to update the website." });
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Card title="Profile" actions={<Btn variant="primary" onClick={save} disabled={busy}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Save</Btn>}>
      <p className="mb-4 text-sm text-muted-foreground">Used in the header, hero, about, contact and footer.</p>
      <FieldsForm fields={PROFILE_FIELDS} value={profile} onChange={setProfile} folder="profile" />
    </Card>
  );
};

const ChaptersView = ({ settings, sections, onSaved, notify }: { settings: AdminSettings; sections: AdminSection[]; onSaved: (s: AdminSettings) => void; notify: (n: Notice) => void }) => {
  const [chapters, setChapters] = useState(settings.chapters);
  const [open, setOpen] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    const ids = chapters.map((c) => String(c.id ?? ""));
    if (ids.some((id) => !/^[a-z0-9-]+$/.test(id)) || new Set(ids).size !== ids.length) {
      notify({ kind: "error", text: "Every chapter needs a unique id made of lowercase letters, numbers and dashes." });
      return;
    }
    setBusy(true);
    try {
      onSaved(await api<AdminSettings>("/admin/settings", json("PUT", { chapters })));
      notify({ kind: "ok", text: "Chapters saved. Publish to update the website." });
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card
      title="Chapters (menu groups)"
      actions={
        <div className="flex gap-2">
          <Btn
            onClick={() => {
              setChapters([...chapters, { id: `chapter-${chapters.length + 1}`, navLabel: "New menu", showHeader: false, accent: "neutral" }]);
              setOpen(chapters.length);
            }}
          >
            <Plus className="h-4 w-4" /> Add chapter
          </Btn>
          <Btn variant="primary" onClick={save} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Save
          </Btn>
        </div>
      }
    >
      <p className="mb-4 text-sm text-muted-foreground">
        Each chapter is one menu in the navigation bar and can open with a “Part N” divider. Assign sections to chapters from each section's settings.
      </p>
      <ul className="divide-y rounded-xl border">
        {chapters.map((c, i) => {
          const count = sections.filter((s) => s.chapter === c.id).length;
          return (
            <li key={i} className="p-3">
              <div className="flex items-center gap-2">
                <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-medium">{String(c.navLabel || c.title || c.id)}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    id: {String(c.id)} · {count} section{count === 1 ? "" : "s"}
                  </span>
                </button>
                <IconBtn label="Move up" disabled={i === 0} onClick={() => setChapters(move(chapters, i, -1))}><ArrowUp className="h-4 w-4" /></IconBtn>
                <IconBtn label="Move down" disabled={i === chapters.length - 1} onClick={() => setChapters(move(chapters, i, 1))}><ArrowDown className="h-4 w-4" /></IconBtn>
                <IconBtn label="Edit" onClick={() => setOpen(open === i ? null : i)}><Pencil className="h-4 w-4" /></IconBtn>
                <DeleteBtn small label="Remove chapter" onConfirm={() => setChapters(chapters.filter((_, j) => j !== i))} />
              </div>
              {open === i && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  <FieldsForm
                    fields={[{ name: "id", label: "Id", help: count ? "Sections point to this id; renaming it detaches them." : "Lowercase, e.g. research" }, ...CHAPTER_FIELDS]}
                    value={c}
                    onChange={(v) => setChapters(chapters.map((x, j) => (j === i ? v : x)))}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

const NewSectionView = ({ chapters, onCreated, notify }: { chapters: AdminSettings["chapters"]; onCreated: (s: AdminSection) => void; notify: (n: Notice) => void }) => {
  const [kind, setKind] = useState("timeline");
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [chapter, setChapter] = useState(String(chapters[chapters.length - 1]?.id ?? ""));
  const [busy, setBusy] = useState(false);
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const create = async () => {
    setBusy(true);
    try {
      const s = await api<AdminSection>("/admin/sections", json("POST", { kind, title, key: key || slug(title), chapter, navLabel: title }));
      notify({ kind: "ok", text: `Section “${title}” created. Add items below.` });
      onCreated(s);
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title="New section">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-medium">Layout</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(KINDS).map(([k, info]) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn("rounded-xl border p-3 text-left text-sm transition-colors", kind === k ? "border-foreground bg-secondary" : "hover:bg-secondary/60")}
              >
                <span className="font-medium">{info.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{info.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="ns-title">Title</label>
            <input id="ns-title" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Awards" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="ns-key">URL anchor</label>
            <input id="ns-key" className={inputClass} value={key} onChange={(e) => setKey(slug(e.target.value))} placeholder={slug(title) || "awards"} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="ns-ch">Menu (chapter)</label>
            <select id="ns-ch" className={inputClass} value={chapter} onChange={(e) => setChapter(e.target.value)}>
              {chapters.map((c) => (
                <option key={String(c.id)} value={String(c.id)}>{String(c.navLabel || c.id)}</option>
              ))}
            </select>
          </div>
        </div>
        <Btn variant="primary" onClick={create} disabled={busy || !title.trim()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Create section
        </Btn>
      </div>
    </Card>
  );
};

const ItemEditor = ({
  kind,
  item,
  onClose,
  onSave,
}: {
  kind: string;
  item: { data: Record<string, unknown>; _id?: string };
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => Promise<void>;
}) => {
  const info = KINDS[kind] ?? KINDS.timeline;
  const [data, setData] = useState(item.data);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const known = new Set(info.item.map((f) => f.name.split(".")[0]));
  const extra = Object.keys(data).filter((k) => !known.has(k) && k !== "_id");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogTitle>{item._id ? "Edit item" : "New item"}</DialogTitle>
        <FieldsForm fields={info.item} value={data} onChange={setData} folder={info.folder} />
        {extra.length > 0 && <p className="text-xs text-muted-foreground">Also stored (kept as is): {extra.join(", ")}</p>}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{error}</p>}
        <div className="flex justify-end gap-2 border-t pt-4">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn
            variant="primary"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                await onSave(cleanLists(info.item, data));
              } catch (e) {
                setError((e as Error).message);
                setBusy(false);
              }
            }}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Save item
          </Btn>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SectionView = ({
  section,
  chapters,
  onChanged,
  onDeleted,
  notify,
}: {
  section: AdminSection;
  chapters: AdminSettings["chapters"];
  onChanged: (s: AdminSection) => void;
  onDeleted: () => void;
  notify: (n: Notice) => void;
}) => {
  const info = KINDS[section.kind] ?? KINDS.timeline;
  const [meta, setMeta] = useState<Record<string, unknown>>(section as unknown as Record<string, unknown>);
  const [items, setItems] = useState<AdminItem[] | null>(null);
  const [editing, setEditing] = useState<{ data: Record<string, unknown>; _id?: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setMeta(section as unknown as Record<string, unknown>);
    setItems(null);
    api<AdminItem[]>(`/admin/sections/${section._id}/items`).then(setItems, (e) => notify({ kind: "error", text: e.message }));
  }, [section, notify]);

  const saveMeta = async () => {
    setBusy(true);
    try {
      const body = {
        key: meta.key, title: meta.title, eyebrow: meta.eyebrow, description: meta.description, navLabel: meta.navLabel,
        accent: meta.accent, chapter: meta.chapter, visible: meta.visible,
        options: info.options ? cleanLists(info.options, (meta.options ?? {}) as Record<string, unknown>) : meta.options,
      };
      onChanged(await api<AdminSection>(`/admin/sections/${section._id}`, json("PATCH", body)));
      notify({ kind: "ok", text: "Section saved. Publish to update the website." });
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const reorder = async (next: AdminItem[]) => {
    setItems(next);
    try {
      setItems(await api<AdminItem[]>(`/admin/sections/${section._id}/items/order`, json("PUT", { ids: next.map((i) => i._id) })));
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    }
  };

  const patchItem = async (id: string, body: Partial<AdminItem>) => {
    const updated = await api<AdminItem>(`/admin/items/${id}`, json("PATCH", body));
    setItems((list) => list?.map((i) => (i._id === id ? updated : i)) ?? null);
  };

  const shown = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return (items ?? []).map((it, index) => ({ it, index })).filter(({ it }) => !q || JSON.stringify(it.data).toLowerCase().includes(q));
  }, [items, filter]);

  return (
    <div className="space-y-5">
      <Card
        title={`Section · ${info.label}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Btn onClick={() => setMeta({ ...meta, visible: !meta.visible })}>
              {meta.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} {meta.visible ? "Visible" : "Hidden"}
            </Btn>
            <Btn variant="primary" onClick={saveMeta} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Save section
            </Btn>
          </div>
        }
      >
        <FieldsForm
          fields={[...SECTION_FIELDS, { name: "chapter", label: "Menu (chapter)", type: "select", options: chapters.map((c) => String(c.id)) }]}
          value={meta}
          onChange={setMeta}
        />
        {info.options && (
          <div className="mt-6 border-t pt-5">
            <h3 className="mb-4 text-sm font-semibold">Section options</h3>
            <FieldsForm
              fields={info.options}
              value={(meta.options ?? {}) as Record<string, unknown>}
              onChange={(o) => setMeta({ ...meta, options: o })}
            />
          </div>
        )}
        <div className="mt-6 flex justify-end border-t pt-4">
          <DeleteBtn
            label={`Delete section and its ${items?.length ?? 0} items`}
            onConfirm={async () => {
              try {
                await api(`/admin/sections/${section._id}`, { method: "DELETE" });
                notify({ kind: "ok", text: "Section deleted." });
                onDeleted();
              } catch (e) {
                notify({ kind: "error", text: (e as Error).message });
              }
            }}
          />
        </div>
      </Card>

      {section.kind !== "about" && (
        <Card
          title={`Items${items ? ` (${items.length})` : ""}`}
          actions={
            <div className="flex gap-2">
              {(items?.length ?? 0) > 8 && (
                <input className={cn(inputClass, "w-44")} placeholder="Search items" value={filter} onChange={(e) => setFilter(e.target.value)} />
              )}
              <Btn variant="primary" onClick={() => setEditing({ data: {} })}>
                <Plus className="h-4 w-4" /> Add item
              </Btn>
            </div>
          }
        >
          {!items ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items yet.</p>
          ) : (
            <ul className="divide-y rounded-xl border">
              {shown.map(({ it, index }) => (
                <li key={it._id} className={cn("flex items-center gap-2 px-3 py-2", !it.visible && "opacity-50")}>
                  <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setEditing({ data: it.data, _id: it._id })}>
                    <p className="truncate text-sm font-medium">{itemLabel(section.kind, it.data)}</p>
                    <p className="truncate text-xs text-muted-foreground">{itemSubLabel(it.data)}</p>
                  </button>
                  <IconBtn label={it.visible ? "Hide from site" : "Show on site"} onClick={() => patchItem(it._id, { visible: !it.visible }).catch((e) => notify({ kind: "error", text: e.message }))}>
                    {it.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </IconBtn>
                  <IconBtn label="Move up" disabled={index === 0 || !!filter} onClick={() => reorder(move(items, index, -1))}><ArrowUp className="h-4 w-4" /></IconBtn>
                  <IconBtn label="Move down" disabled={index === items.length - 1 || !!filter} onClick={() => reorder(move(items, index, 1))}><ArrowDown className="h-4 w-4" /></IconBtn>
                  <IconBtn label="Edit" onClick={() => setEditing({ data: it.data, _id: it._id })}><Pencil className="h-4 w-4" /></IconBtn>
                  <DeleteBtn
                    small
                    onConfirm={async () => {
                      try {
                        await api(`/admin/items/${it._id}`, { method: "DELETE" });
                        setItems(items.filter((x) => x._id !== it._id));
                      } catch (e) {
                        notify({ kind: "error", text: (e as Error).message });
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      {editing && (
        <ItemEditor
          kind={section.kind}
          item={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            if (editing._id) {
              await patchItem(editing._id, { data });
            } else {
              const created = await api<AdminItem>(`/admin/sections/${section._id}/items`, json("POST", { data, order: 0 }));
              setItems((list) => [created, ...(list ?? [])]);
            }
            setEditing(null);
            notify({ kind: "ok", text: "Item saved. Publish to update the website." });
          }}
        />
      )}
    </div>
  );
};

const MediaView = ({ notify }: { notify: (n: Notice) => void }) => {
  const [files, setFiles] = useState<MediaFile[] | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    api<MediaFile[]>("/admin/media").then(setFiles, (e) => notify({ kind: "error", text: e.message }));
  }, [notify]);

  return (
    <Card
      title="Media library (Cloudinary)"
      actions={
        <label className={cn("inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background", busy && "opacity-60")}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Upload
          <input
            type="file"
            accept="image/*,application/pdf"
            multiple
            className="hidden"
            onChange={async (e) => {
              const list = [...(e.target.files ?? [])];
              e.target.value = "";
              setBusy(true);
              for (const f of list) {
                try {
                  const m = await uploadMedia(f, "uploads");
                  setFiles((fs) => [m, ...(fs ?? [])]);
                } catch (err) {
                  notify({ kind: "error", text: `${f.name}: ${(err as Error).message}` });
                }
              }
              setBusy(false);
            }}
          />
        </label>
      }
    >
      <p className="mb-4 text-sm text-muted-foreground">Files uploaded here or from any item form. Copy a link to use it anywhere.</p>
      {!files ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <div key={f._id} className="overflow-hidden rounded-xl border">
              <div className="flex aspect-[4/3] items-center justify-center bg-secondary">
                {f.format === "pdf" ? (
                  <FolderOpen className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <img src={f.url} alt="" loading="lazy" className="h-full w-full object-contain" />
                )}
              </div>
              <div className="space-y-1 p-2">
                <p className="truncate text-xs" title={f.publicId}>{f.originalName || f.publicId}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{(f.bytes / 1024).toFixed(0)} KB</span>
                  <div className="flex">
                    <IconBtn
                      label="Copy link"
                      onClick={() => navigator.clipboard?.writeText(f.url).then(() => notify({ kind: "ok", text: "Link copied." }))}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </IconBtn>
                    <DeleteBtn
                      small
                      onConfirm={async () => {
                        try {
                          await api(`/admin/media/${f._id}`, { method: "DELETE" });
                          setFiles(files.filter((x) => x._id !== f._id));
                        } catch (e) {
                          notify({ kind: "error", text: (e as Error).message });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// ---------- publish ----------

interface RunStatus {
  status?: string;
  conclusion?: string | null;
  url?: string;
}

const PublishButton = ({ notify }: { notify: (n: Notice) => void }) => {
  const [run, setRun] = useState<RunStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const active = run?.status === "queued" || run?.status === "in_progress";

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => api<RunStatus>("/admin/publish/status").then(setRun).catch(() => undefined), 8000);
    return () => clearInterval(t);
  }, [active]);

  useEffect(() => {
    if (run?.status === "completed") {
      notify(run.conclusion === "success" ? { kind: "ok", text: "Website updated." } : { kind: "error", text: `Publish ${run.conclusion}. Open the GitHub run for details.` });
    }
  }, [run?.status, run?.conclusion, notify]);

  return (
    <div className="flex items-center gap-2">
      {run?.url && (
        <a href={run.url} target="_blank" rel="noopener noreferrer" className="hidden text-xs text-muted-foreground underline sm:inline">
          {active ? "Building…" : run.conclusion ?? run.status}
        </a>
      )}
      <Btn
        variant="primary"
        disabled={busy || active}
        onClick={async () => {
          setBusy(true);
          try {
            await api("/admin/publish", { method: "POST" });
            notify({ kind: "ok", text: "Publishing… the site updates in about 2 minutes." });
            setRun({ status: "queued" });
            setTimeout(() => api<RunStatus>("/admin/publish/status").then(setRun).catch(() => undefined), 4000);
          } catch (e) {
            notify({ kind: "error", text: (e as Error).message });
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy || active ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />} Publish
      </Btn>
    </div>
  );
};

// ---------- shell ----------

const Shell = ({ onLogout }: { onLogout: () => void }) => {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [sections, setSections] = useState<AdminSection[] | null>(null);
  const [view, setView] = useState<View>({ type: "settings" });
  const [notice, setNotice] = useState<Notice>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [loadError, setLoadError] = useState("");

  const notify = useCallback((n: Notice) => setNotice(n), []);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), notice.kind === "ok" ? 4000 : 9000);
    return () => clearTimeout(t);
  }, [notice]);

  const load = useCallback(async () => {
    setLoadError("");
    try {
      const [st, sc] = await Promise.all([api<AdminSettings>("/admin/settings"), api<AdminSection[]>("/admin/sections")]);
      setSettings(st);
      setSections(sc);
    } catch (e) {
      setLoadError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const go = (v: View) => {
    setView(v);
    setNavOpen(false);
    window.scrollTo({ top: 0 });
  };

  const reorderSections = async (next: AdminSection[]) => {
    setSections(next);
    try {
      setSections(await api<AdminSection[]>("/admin/sections/order", json("PUT", { ids: next.map((s) => s._id) })));
    } catch (e) {
      notify({ kind: "error", text: (e as Error).message });
    }
  };

  if (loadError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="max-w-md text-sm">{loadError}</p>
        <Btn onClick={load}>Try again</Btn>
      </main>
    );
  if (!settings || !sections)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );

  const chapters = settings.chapters;
  const current = view.type === "section" ? sections.find((s) => s._id === view.id) : undefined;
  const chapterName = (id: string) => String(chapters.find((c) => c.id === id)?.navLabel ?? "No menu");

  const navItem = (active: boolean, onClick: () => void, children: React.ReactNode) => (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm", active ? "bg-secondary font-medium" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground")}
    >
      {children}
    </button>
  );

  const sidebar = (
    <nav className="space-y-6">
      <div className="space-y-1">
        {navItem(view.type === "settings", () => go({ type: "settings" }), <><SettingsIcon className="h-4 w-4" /> Profile</>)}
        {navItem(view.type === "chapters", () => go({ type: "chapters" }), <><Layers className="h-4 w-4" /> Chapters & menus</>)}
        {navItem(view.type === "media", () => go({ type: "media" }), <><ImageIcon className="h-4 w-4" /> Media library</>)}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between px-3">
          <p className="eyebrow text-muted-foreground">Sections</p>
          <button type="button" onClick={() => go({ type: "new" })} className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <ul className="space-y-0.5">
          {sections.map((s, i) => (
            <li key={s._id} className="group flex items-center">
              <div className="min-w-0 flex-1">
                {navItem(
                  view.type === "section" && view.id === s._id,
                  () => go({ type: "section", id: s._id }),
                  <span className={cn("min-w-0 flex-1", !s.visible && "line-through opacity-60")}>
                    <span className="block truncate">{s.title}</span>
                    <span className="block truncate text-[11px] font-normal text-muted-foreground">
                      {chapterName(s.chapter)} · {s.itemCount ?? 0}
                    </span>
                  </span>,
                )}
              </div>
              <div className="flex opacity-0 transition-opacity group-hover:opacity-100 max-lg:opacity-100">
                <IconBtn label="Move up" disabled={i === 0} onClick={() => reorderSections(move(sections, i, -1))}><ArrowUp className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn label="Move down" disabled={i === sections.length - 1} onClick={() => reorderSections(move(sections, i, 1))}><ArrowDown className="h-3.5 w-3.5" /></IconBtn>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Menu" onClick={() => setNavOpen((v) => !v)} className="flex h-9 w-9 items-center justify-center rounded-lg border lg:hidden">
              {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <a href="/" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
              <ChevronLeft className="h-4 w-4" /> Site
            </a>
            <span className="font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <PublishButton notify={notify} />
            <IconBtn label="Log out" onClick={onLogout}><LogOut className="h-4 w-4" /></IconBtn>
          </div>
        </div>
      </header>

      {notice && (
        <div
          role="status"
          className={cn(
            "fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-sm shadow-lg",
            notice.kind === "ok" ? "bg-foreground text-background" : "bg-red-600 text-white",
          )}
        >
          {notice.text}
          <button type="button" aria-label="Dismiss" onClick={() => setNotice(null)}><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className={cn("w-64 shrink-0 lg:block", navOpen ? "fixed inset-x-0 top-14 z-30 block h-[calc(100vh-3.5rem)] w-full overflow-y-auto bg-background p-4" : "hidden")}>
          <div className="lg:sticky lg:top-20">{sidebar}</div>
        </aside>
        <main className="min-w-0 flex-1">
          {view.type === "settings" && <SettingsView settings={settings} onSaved={setSettings} notify={notify} />}
          {view.type === "chapters" && <ChaptersView settings={settings} sections={sections} onSaved={setSettings} notify={notify} />}
          {view.type === "media" && <MediaView notify={notify} />}
          {view.type === "new" && (
            <NewSectionView
              chapters={chapters}
              notify={notify}
              onCreated={(s) => {
                setSections([...sections, { ...s, itemCount: 0 }]);
                go({ type: "section", id: s._id });
              }}
            />
          )}
          {current && (
            <SectionView
              key={current._id}
              section={current}
              chapters={chapters}
              notify={notify}
              onChanged={(s) => setSections(sections.map((x) => (x._id === s._id ? { ...s, itemCount: x.itemCount } : x)))}
              onDeleted={() => {
                setSections(sections.filter((x) => x._id !== current._id));
                go({ type: "settings" });
              }}
            />
          )}
          <p className="mt-8 flex items-center gap-1 text-xs text-muted-foreground">
            Changes are saved to the database right away; the public site changes after you press Publish.
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline">
              View site <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </main>
      </div>
    </div>
  );
};

const AdminApp = () => {
  const [authed, setAuthed] = useState(() => !!getToken());
  useEffect(() => {
    setUnauthorizedHandler(() => setAuthed(false));
    document.title = "Admin";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  return authed ? (
    <Shell
      onLogout={() => {
        setToken(null);
        setAuthed(false);
      }}
    />
  ) : (
    <Login onLogin={() => setAuthed(true)} />
  );
};

export default AdminApp;
