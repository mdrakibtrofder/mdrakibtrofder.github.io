// Small client for the content API. The API address is public (VITE_API_URL);
// the login token lives only in this browser tab's sessionStorage.

export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") || "http://localhost:3000";

const TOKEN_KEY = "admin-token";

export const getToken = (): string | null => {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string | null) => {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: stay logged in for this page load only */
  }
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

let onUnauthorized: () => void = () => undefined;
export const setUnauthorizedHandler = (fn: () => void) => {
  onUnauthorized = fn;
};

export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const isForm = init.body instanceof FormData;
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      ...init,
      headers: {
        ...(isForm ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError(
      `Can't reach the API at ${API_URL}. It may be waking up (free hosting sleeps when idle) — try again in a minute.`,
      0,
    );
  }
  if (res.status === 401 && path !== "/auth/login") {
    setToken(null);
    onUnauthorized();
  }
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = Array.isArray(body?.message) ? body.message.join(", ") : body?.message;
    throw new ApiError(msg || `Request failed (${res.status})`, res.status);
  }
  return body as T;
}

export const json = (method: string, body: unknown): RequestInit => ({ method, body: JSON.stringify(body) });

// ---------- types returned by the admin API ----------

export interface AdminSection {
  _id: string;
  key: string;
  kind: string;
  chapter: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "neutral" | "academic" | "engineering";
  order: number;
  visible: boolean;
  options: Record<string, unknown>;
  itemCount?: number;
}

export interface AdminItem {
  _id: string;
  section: string;
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
}

export interface AdminSettings {
  profile: Record<string, unknown>;
  chapters: Record<string, unknown>[];
}

export interface MediaFile {
  _id: string;
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
  bytes: number;
  originalName: string;
  createdAt: string;
}

export const uploadMedia = (file: File, folder = "uploads") => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  return api<MediaFile>("/admin/media", { method: "POST", body: fd });
};
