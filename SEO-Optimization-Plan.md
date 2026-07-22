# SEO Optimization Plan — mdrakibtrofder.github.io

**Site type:** Single-page React (Vite + React Router) portfolio for Md. Rakib Trofder — Lecturer, CSE, BAUST; researcher in Software Engineering, ML, and NLP.

**Note on scope:** This is an academic/professional profile site, not a design portfolio. Two adjustments from a generic template are made throughout: (1) "off-page" targets are academic/developer platforms (Google Scholar, ResearchGate, ORCID, GitHub, LinkedIn) rather than Behance/Dribbble, and (2) because the site currently has a single route (`/`) with in-page anchor sections rather than separate project pages, several on-page and technical tasks require adding routes before they can be fully implemented — this is called out where relevant.

**Baseline facts already confirmed by reviewing the repo:**
- `index.html` has a title, meta description, keywords, OG/Twitter tags, canonical URL, and a `Person` JSON-LD schema — a stronger starting point than most portfolios.
- Meta description is currently ~520 characters — far over the 150–160 char target.
- No `sitemap.xml` exists in `public/` or `dist/`.
- `robots.txt` allows all crawlers, no disallow rules — fine for now, but not yet pointing to a sitemap.
- `App.tsx` defines only two routes: `/` (Index) and a catch-all `NotFound`. All content (education, experience, projects) lives in one page via scroll-to-anchor sections, not distinct URLs.
- No blog, no case-study pages, no `<details>`-based content structuring yet.

---

## Phase 1: Initial SEO Audit & Baseline Assessment

| Task | Action | Tool | Owner |
|---|---|---|---|
| Core Web Vitals | Run the live URL through PageSpeed Insights (mobile + desktop) and record LCP, INP (replaces FID), CLS | pagespeed.web.dev | You |
| Keyword baseline | Record current rank (or "not ranking") for 20 target terms — see list below | Google Search Console + manual incognito search | You |
| Site structure | Confirm current architecture is one route + anchors; decide whether to introduce routed sections (see Phase 2) | Manual + repo review (done) | Done |
| Mobile-friendliness | Run Google's Mobile-Friendly Test; confirm Tailwind responsive breakpoints render correctly on 375px/768px/1024px | search.google.com/test/mobile-friendly | You |
| Indexation & crawl errors | Add property in Search Console (if not already verified), check Coverage report and Page Indexing report | Search Console | You |
| Metadata audit | Confirm: title 40 chars (room to add keywords), description ~520 chars (needs cutting to ≤160), one `<title>`/`<meta description>` pair since there's only one route | Manual (done) | Done |
| Backlink profile | Pull current backlinks/domain rating baseline | Google Search Console "Links" report, or Ahrefs/Moz free tier | You |

**20 target keywords to baseline** (branded + intent-based mix, appropriate for an academic profile):
1. Md. Rakib Trofder
2. Rakib Trofder
3. Rakib Trofder BAUST
4. Rakib Trofder lecturer CSE
5. Rakib Trofder portfolio
6. Rakib Trofder researcher
7. BAUST CSE lecturer
8. BAUST Saidpur CSE faculty
9. Rakib Trofder machine learning
10. Rakib Trofder NLP research
11. Rakib Trofder software engineering research
12. Rakib Trofder Streams Tech
13. Rakib Trofder Cefalo
14. Rakib Trofder William & Mary research intern
15. Rakib Trofder IIT Dhaka University
16. Rakib Trofder Rajshahi University of Science and Technology
17. software engineer to lecturer Bangladesh
18. NLP researcher Bangladesh
19. software reconstruction research LLM
20. CSE lecturer portfolio Bangladesh
21. Rakib BAUST
22. Trofder BAUST
23. Rakib IIT
24. Rakib Trofder IIT
25. Rakib Trofder BAUST

**Baseline deliverable:** a single spreadsheet (or the audit doc itself) recording current value for each row above, so Phase 6 can measure against it.

---

## Phase 2: On-Page SEO Implementation

- **Titles/descriptions:** Rewrite `index.html` meta description to ≤160 characters, keep the primary keyword ("Lecturer, CSE, BAUST" + "Machine Learning" or "NLP") near the front. Keep title at 50–60 characters by adding one differentiator, e.g. `Md. Rakib Trofder | CSE Lecturer, BAUST | ML & NLP Researcher`.
- **Multi-page titles:** Since the site is currently one route, unique per-page titles aren't possible yet. Recommend adding routed pages for at least `/research`, `/projects`, `/teaching` (or similar) so each gets its own title/description/H1 — otherwise "unique metadata per page" can't be achieved.
- **Header hierarchy:** Audit `Index.tsx` and child components for one `<h1>` (should be the name/hero heading) and consistent `<h2>` per section (Education, Experience, Research, Projects, Contact), `<h3>` for sub-items (each degree/role/project).
- **Image alt text:** Add descriptive, keyword-aware alt text to all logos in `/organizations/*.png` (e.g., `alt="Bangladesh Army University of Science and Technology (BAUST) logo"`) and any project screenshots.
- **`<details>` for case studies:** For each project entry, wrap extended write-ups (methodology, challenges, results) in `<details><summary>` blocks so crawlers can index full text while the UI stays compact.
- **URL slugs:** If routed sub-pages are added (per above), use short slugs: `/research`, `/projects/agro-satellite-pipeline`, not query strings or IDs.
- **Schema markup:** `Person` schema already exists — extend it with `CreativeWork`/`ScholarlyArticle` or `SoftwareSourceCode` schema for individual projects/publications once they have their own routes, plus `BreadcrumbList` if sub-pages are added.
- **Content refresh:** Expand thin sections (e.g., placeholder `"cgpa": "---"` fields in `portfolio.json`, `isMore` primary-school entries that add no SEO value and could be trimmed from crawlable content) and add real project/research descriptions with specifics (tools, outcomes, metrics).
- **Internal linking:** Once sub-pages exist, cross-link related projects/publications (e.g., the satellite/geospatial project ↔ the ML/NLP research write-up).

---

## Phase 3: Technical SEO Refinement

- **Sitemap:** Generate `public/sitemap.xml` (start with `/` only; expand as routes are added) and submit to Search Console and Bing Webmaster Tools.
- **robots.txt:** Current file allows everything — fine, but add `Sitemap: https://mdrakibtrofder.github.io/sitemap.xml` line.
- **Broken links / redirects:** Crawl the live site (Screaming Frog free tier or Search Console Coverage) for 4xx; the existing `NotFound.tsx` route should render a proper 404 status via GitHub Pages config, and any renamed sections should 301-redirect.
- **HTTPS:** GitHub Pages serves HTTPS by default for this domain — confirm no mixed-content warnings (check that all image/script srcs are relative or `https://`, none `http://`).
- **Lazy loading:** Add `loading="lazy"` to below-the-fold images (organization logos, project screenshots) in the relevant components.
- **Pagination:** Not currently applicable (single page, no listing pagination) — revisit only if a blog or publications list is added with many entries.
- **Canonical tags:** Already set for `/` — extend to any new routes so each has a self-referencing canonical.

---

## Phase 4: Off-Page SEO & Authority Building

(Adjusted for an academic/research profile rather than a design portfolio)

- **Guest content:** Pitch short technical/research posts to relevant CS education or ML/NLP community blogs, dev.to, or Bangladesh tech community platforms, linking back to the portfolio.
- **Backlink targets:** University faculty directory listing (BAUST CSE department page), Rajshahi University of Science and Technology profile, alumni pages (Dhaka University IIT, RUET), Google Scholar profile, ORCID, ResearchGate — all high-trust, topically relevant links.
- **Platform profiles with canonical links back:** GitHub (already referenced in JSON-LD), LinkedIn (already referenced), Google Scholar, ResearchGate, ORCID — add/update each to link back to the portfolio URL.
- **Community engagement:** Participate in relevant CS/ML subreddits, Stack Overflow, ResearchGate Q&A, or Bangladesh CS academic forums with genuine contributions (not link-dropping).
- **Testimonials/endorsements:** Request short endorsements from Streams Tech Ltd., Cefalo, or SEMERU Lab (William & Mary) colleagues/supervisors for a testimonials section — adds trust signals and E-E-A-T value for an academic profile.

---

## Phase 5: Content Expansion Strategy (6-Month Calendar)

| Month | Focus |
|---|---|
| 1 | Publish 2–3 long-tail posts (e.g., "Lessons from Reconstructing Software Structures with LLMs") + finalize routed project/case-study pages |
| 2 | Add full case study for the agro/geospatial satellite data project (challenge, approach, tools, results) |
| 3 | Add full case study for the Cefalo social-media-platform internship project |
| 4 | Record 1–2 short video walkthroughs (research overview, one project demo), embed with transcript text for indexing |
| 5 | Publish research-adjacent long-tail post (e.g., NLP/ML topic tied to current M.Sc. work) |
| 6 | Quarterly content refresh: update experience/education sections, re-audit against Phase 1 baseline |

Realistic cadence note: weekly blog posts is an aggressive cadence for a one-person academic site — a bi-weekly or monthly cadence with higher depth per post is more sustainable and just as effective for long-tail SEO; adjust the calendar above if weekly isn't feasible.

---

## Phase 6: Tracking, Testing & Iteration

- **Analytics setup:** Install GA4 and verify Search Console (Domain or URL-prefix property for `mdrakibtrofder.github.io`).
- **Monthly review:** Re-check the 20 keywords from Phase 1, Core Web Vitals, and indexed-page count; log deltas against baseline.
- **A/B testing:** Limited value on a single-page personal site with modest traffic — instead, treat metadata/header changes as sequential experiments (change, wait 2–4 weeks, compare Search Console impressions/CTR) rather than true A/B split tests.
- **Quarterly plan update:** Revisit this plan each quarter against Google algorithm/guideline updates and against actual ranking movement.
- **Targets:** Top-10 rankings for 80% of the 20 target keywords and 50% organic traffic growth within 6 months are reasonable for the branded/name-based terms (1–16 in the list) given low competition; the broader intent terms (17–20) are more competitive and may take longer — track them separately so the aggregate target isn't skewed by the harder terms.

---

## Immediate Next Steps (highest impact, lowest effort)
1. Shorten the meta description in `index.html` to ≤160 characters.
2. Add `sitemap.xml` and reference it in `robots.txt`.
3. Add `loading="lazy"` to logo/project images.
4. Decide whether to introduce routed pages for research/projects — this unlocks most of Phase 2 and Phase 3's per-page items.
