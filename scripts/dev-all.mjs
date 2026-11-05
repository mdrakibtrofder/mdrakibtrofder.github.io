// Runs the backend API and the frontend together: `npm run dev:all`.
// Ctrl+C stops both. If one of them crashes, the other is stopped too.
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const backend = join(root, "backend");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

// First run: install dependencies where they are missing.
for (const dir of [root, backend]) {
  if (!existsSync(join(dir, "node_modules"))) {
    console.log(`Installing dependencies in ${dir === root ? "frontend" : "backend"}…`);
    const r = spawnSync(npm, ["install"], { cwd: dir, stdio: "inherit" });
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
}

if (!existsSync(join(backend, ".env"))) {
  console.warn("⚠  backend/.env not found — copy backend/.env.example to backend/.env and fill it in.");
}

const apps = [
  { name: "api", color: "\x1b[35m", cwd: backend, args: ["run", "start:dev"] },
  { name: "web", color: "\x1b[36m", cwd: root, args: ["run", "dev"] },
];

const children = [];
let stopping = false;

// Each app runs in its own process group so stopping it also stops what npm started
// (nest's watcher, the API itself, vite). On Windows, taskkill /T does the same.
const killTree = (child) => {
  if (child.exitCode !== null) return;
  try {
    if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"]);
    else process.kill(-child.pid, "SIGTERM");
  } catch {
    /* already gone */
  }
};

const stopAll = (code = 0) => {
  if (stopping) return;
  stopping = true;
  children.forEach(killTree);
  setTimeout(() => process.exit(code), 2000).unref();
};

for (const app of apps) {
  const tag = `${app.color}[${app.name}]\x1b[0m `;
  const child = spawn(npm, app.args, {
    cwd: app.cwd,
    env: { ...process.env, FORCE_COLOR: "1" },
    detached: process.platform !== "win32",
    shell: process.platform === "win32",
  });
  const pipe = (stream, out) => {
    let buf = "";
    stream.on("data", (d) => {
      buf += d.toString();
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) out.write(tag + line + "\n");
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on("exit", (code) => {
    if (!stopping) {
      console.log(`${tag}stopped (exit ${code}) — stopping the other one too.`);
      stopAll(code ?? 1);
    }
  });
  children.push(child);
}

console.log("\n  Website:  http://localhost:8080");
console.log("  Admin:    http://localhost:8080/admin");
console.log("  API:      http://localhost:3000/api/health  (first start takes ~30s to compile)\n  Press Ctrl+C to stop both.\n");

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
