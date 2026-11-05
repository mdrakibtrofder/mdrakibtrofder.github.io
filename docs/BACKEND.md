# Content backend: how the site is edited and deployed

The website stays a static site on GitHub Pages. Its content now lives in
MongoDB, its files in Cloudinary, and you edit both from an admin panel at
`/admin`. A small NestJS API in `backend/` sits between them.

```
 You ──► /admin (on GitHub Pages) ──login──► NestJS API (Render) ──► MongoDB Atlas
                                                 │                └─► Cloudinary
                                    "Publish" ───┘
                                                 ▼
                         GitHub Actions: GET /api/public/site → build → GitHub Pages
 Visitors ──► GitHub Pages (static HTML + content baked in; never calls the API)
```

## Where each secret lives

| Secret | Your Mac | Render (API host) | GitHub | Website |
|---|---|---|---|---|
| MongoDB user/password | `backend/.env` (git-ignored) | Environment variables | — | — |
| `CLOUDINARY_URL` | `backend/.env` | Environment variables | — | — |
| Admin password hash, `JWT_SECRET` | `backend/.env` | Environment variables | — | — |
| `GITHUB_TOKEN` (for Publish) | optional | Environment variables | — | — |
| `API_URL` (not secret) | — | — | Actions **variable** | baked in |

Nothing secret is committed, sent to GitHub Actions, or bundled into the website.
`.gitignore` blocks every `.env` file; only `backend/.env.example` (placeholders) is committed.

## One-time setup

1. **Rotate the credentials that were shared in chat.** Create a new database user
   password in MongoDB Atlas (Database Access) and regenerate the Cloudinary API
   secret (Settings → API Keys). Put the new values in `backend/.env`.
2. **MongoDB Atlas → Network Access:** add `0.0.0.0/0`. Render's free plan has no
   fixed IP address, so the API can't be allow-listed by IP. The password protects the database.
3. **Cloudinary → Settings → Security:** turn on *Allow delivery of PDF and ZIP files*,
   otherwise certificate PDFs return 401.
4. **Migrate the content** (from your Mac, inside the repository):
   ```bash
   cd backend
   npm ci
   npm run migrate -- --dry-run   # checks the connection and counts files
   npm run migrate                # uploads ~470 files to Cloudinary, loads MongoDB
   ```
   Re-running is safe: files already uploaded are skipped. Use `--reset` to replace
   the database content. Check `backend/migration-report.json` for any failures.
   Sensitive certificates are uploaded as *private* Cloudinary files and are never
   included in the public site.
5. **Deploy the API on Render:** New → Blueprint → choose this repository.
   `render.yaml` sets everything up; Render asks for the secret values
   (copy them from `backend/.env`). When it's live, open
   `https://<your-service>.onrender.com/api/health` — it should say `{"ok":true}`.
6. **GitHub → repository Settings → Secrets and variables → Actions → Variables:**
   add `API_URL` = `https://<your-service>.onrender.com` (a variable, not a secret).
7. **Publish button:** create a fine-grained token at GitHub → Settings → Developer
   settings → Personal access tokens → Fine-grained. Repository access: only
   `mdrakibtrofder.github.io`. Permission: **Actions → Read and write**. Put it in
   Render as `GITHUB_TOKEN`.
8. Merge to `main`. The site builds from the API's content.
9. **After you've checked the live site**, delete `public/certificates/images`,
   `public/certificates/pdfs`, `public/organizations` and `public/clubs` from the
   repository — they are now served from Cloudinary. Note that files already
   committed stay in Git history; the 4 sensitive certificates have been public in
   this repository, so treat anything in them as already exposed.

## Day to day

1. Open `https://mdrakibtrofder.github.io/admin` and log in.
2. Edit the profile, menus (chapters), sections and items; upload images/PDFs.
   Changes save to the database immediately.
3. Press **Publish**. About two minutes later the website shows the changes.

The first request after the API has been idle for 15 minutes takes up to a minute
(free Render plan). The public site is unaffected because it never calls the API.

Change the admin password with `npm run hash-password -- "new password"` and put
the output in `ADMIN_PASSWORD_HASH` (in `.env` and on Render).

## What you can change

- **Profile:** name, headline, summary, tracks, research interests, contact, socials.
- **Chapters:** the navigation menus and the "Part N" dividers; add, rename, reorder, remove.
- **Sections:** title, small label, description, menu label, URL anchor, colour,
  which menu it belongs to, order, visibility, delete. Built-in layouts have extra
  options (e.g. counseling hours for Courses, skill lists for Skills).
- **New sections:** *Timeline* (like Education), *Cards* (with pictures) or *Links*.
- **Items:** add, edit, reorder, hide, delete in any section.

## Local development

```bash
npm run dev:all   # starts both (also: npm run project); Ctrl+C stops both
```

Or run them separately:

```bash
# terminal 1 — API on http://localhost:3000
cd backend && npm ci && npm run start:dev
# terminal 2 — site on http://localhost:8080 (admin at /admin)
npm run dev
# refresh the local snapshot from your local API
curl -s http://localhost:3000/api/public/site -o src/data/site.json
```

## API reference

All admin routes need `Authorization: Bearer <token>` from `POST /api/auth/login`.

| Method | Path | |
|---|---|---|
| GET | `/api/health` | liveness |
| GET | `/api/public/site` | public snapshot (visible, non-private content) |
| POST | `/api/auth/login` | `{email, password}` → `{token}` (5 tries/minute) |
| GET/PUT | `/api/admin/settings` | profile and chapters |
| GET/POST | `/api/admin/sections` | list / create |
| PUT | `/api/admin/sections/order` | `{ids}` |
| GET/PATCH/DELETE | `/api/admin/sections/:id` | |
| GET/POST | `/api/admin/sections/:id/items` | |
| PUT | `/api/admin/sections/:id/items/order` | `{ids}` |
| PATCH/DELETE | `/api/admin/items/:id` | |
| GET/POST | `/api/admin/media` | list / upload (multipart `file`, `folder`) |
| DELETE | `/api/admin/media/:id` | also deletes from Cloudinary |
| POST | `/api/admin/publish` | starts the GitHub Pages workflow |
| GET | `/api/admin/publish/status` | latest workflow run |
| GET | `/api/admin/preview` | what the next publish will contain |
