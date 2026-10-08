# mdrakibtrofder.github.io

Personal site of **Md. Rakib Trofder**, covering teaching, software engineering and background.
Built with Vite, React, TypeScript, Tailwind CSS and a few shadcn/ui components. Deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Run locally

```sh
npm ci
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
npm run typecheck  # TypeScript check
npm run lint
```

## Updating content

All content lives in `src/data/`. You should not need to edit components to add a course, project or role.

| What to update | File |
| --- | --- |
| Name, headline, summary, the two "tracks", research interests, contact | `src/data/profile.json` |
| Courses and counseling hours | `src/data/teaching.json` |
| Jobs and internships (`track`: `academic` or `engineering`) | `src/data/experience.json` |
| Projects | `src/data/projects.json` |
| Skills and certification links | `src/data/skills.json` |
| Student mentorship / FYP supervision | `src/data/mentorship.json` |
| Workshops | `src/data/workshops.json` |
| Education (`isMore: true` hides it behind "Show") | `src/data/education.json` |
| Professional programs | `src/data/programs.json` |
| Your supervisors and mentors | `src/data/supervision.json` |
| Volunteer roles | `src/data/volunteer.json` |
| Blogs, YouTube, Medium, Local Guide | `src/data/content.json` |
| Certificates (images in the same folder) | `public/certificates/certificate_details.json` |

Icons in the JSON are referenced by name (for example `"icon": "database"`). The available names are in
`src/lib/icons.ts`. The "At a glance" numbers in the hero are calculated from these files automatically.

## Project structure

```
src/
├── app/            App.tsx (routes) and providers.tsx (theme, React Query)
├── pages/          HomePage, SectionRoute (/teaching etc.), NotFoundPage
├── features/       one folder per section: hero, about, experience, teaching, mentorship,
│                   workshops, projects, skills, education, programs, certificates,
│                   supervision, volunteer, content, contact
├── components/
│   ├── layout/     Navigation, Footer, BackToTop, ThemeToggle
│   ├── common/     Section, ChapterHeader, LogoBox, Tag, ShowMoreButton, ExternalLink
│   └── ui/         shadcn/ui components actually in use
├── data/           JSON content + index.ts (typed exports)
├── types/          TypeScript types for all content
├── config/site.ts  navigation groups and section ids
├── hooks/          useActiveSection, useScrollToHash
└── lib/            utils, icons, scroll, stats
```

Every section reads its data from `@/data`. To move a section to an API later, replace its import with a
React Query hook (React Query is already set up in `app/providers.tsx`); the component markup stays the same.

## Design

- Light theme by default with a dark mode toggle.
- Two accent colours: indigo for teaching and research (`academic`), emerald for software work (`engineering`).
  They are defined as CSS variables in `src/index.css` and as Tailwind colours in `tailwind.config.ts`.
- The page is grouped into parts: About & Experience, Teaching, Software Engineering, Background, Beyond Work, Contact.
- Section anchors (`/#teaching`, `/#projects`, ...) and paths (`/teaching`) are unchanged from the previous version.
