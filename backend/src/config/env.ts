// Reads and checks environment variables once at startup.
// Secrets only ever come from the environment (.env locally, the host's dashboard in production).

const required = (name: string): string => {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing required environment variable ${name}. See backend/.env.example.`);
  return v;
};

export const mongoUri = (): string => {
  const direct = process.env.MONGODB_URI?.trim();
  if (direct) return direct;
  const host = required("MONGODB_HOST");
  const user = encodeURIComponent(required("MONGODB_USER"));
  const pass = encodeURIComponent(required("MONGODB_PASSWORD"));
  const db = process.env.MONGODB_DATABASE?.trim() || "portfolio";
  return `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;
};

export const corsOrigins = (): string[] | "*" => {
  const raw = process.env.CORS_ORIGIN?.trim() || "*";
  if (raw === "*") return "*";
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
};

export const cloudinaryFolder = (): string => process.env.CLOUDINARY_FOLDER?.trim() || "portfolio";

export const jwtSecret = (): string => {
  const s = required("JWT_SECRET");
  if (s.length < 32) throw new Error("JWT_SECRET must be at least 32 characters.");
  return s;
};

export { required };
