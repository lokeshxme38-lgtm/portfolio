# Lokesh Yadav — Portfolio

A dark, typography-first developer portfolio built with **React, TypeScript, Vite, Tailwind CSS v4, Motion for React, Lucide and React Router**.

Nothing on the site is invented: platform statistics only appear when a real account is connected, buttons for unconfigured items are disabled, and every project is labelled with its true status.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:5173
```

Other scripts: `npm run typecheck`, `npm run build`, `npm run preview`.

Requires Node 20+.

## Where to edit things

| What | File |
| --- | --- |
| Name, bio, hero text, About cards, topics, skills, timeline, services | `src/data/portfolio.ts` |
| Projects and case-study content, project images | `src/data/projects.ts` |
| Usernames, links, resume, email | `.env.local` (see `.env.example`) |
| Colours, fonts, spacing tokens | `src/index.css` (`@theme` block) |

### Keeping it honest
- **Timeline dates** are blank on purpose. Add `date: "Aug 2026"` to an item in `timeline` once you are sure of it.
- **Skill "related project" links** (HTML5/CSS3 → Maharashtra Carpet, ESP32/Embedded → ESP32 Lab) are suggestions. Remove the `project` field if they are not accurate.
- **Project technologies** are empty except `ESP32` until you decide on a stack. Fill `tech: [...]` only with things you actually used.
- When you have real screenshots, put them in `public/projects/`, point `hero.src` / `gallery[].src` at them (e.g. `/projects/carpet-1.jpg`), and set `illustrative: false`.

## Configuring coding platforms

All values are optional. Leave a value blank and the matching module shows a clear empty state.

| Variable | Used for |
| --- | --- |
| `VITE_GITHUB_USERNAME` | Repos, language mix, contribution heatmap (GitHub public API, no key) |
| `VITE_LEETCODE_USERNAME` | Solved counts, difficulty split, heatmap, recent submissions (via `/api/leetcode`) |
| `VITE_HACKERRANK_USERNAME` | Enables the "View Profile" button (HackerRank has no public stats API) |
| `VITE_CODEFORCES_HANDLE` | Optional rating / rank card (Codeforces public API) |
| `VITE_LINKEDIN_URL` | LinkedIn link |
| `VITE_CONTACT_EMAIL` | "Email me" button and form fallback |
| `VITE_RESUME_URL` | "Download Resume" button (e.g. `/resume.pdf` with the file in `public/`) |

Notes on data sources:
- **GitHub** — official REST API from the browser (60 requests/hour per visitor). The contribution calendar comes from the open `github-contributions-api.jogruber.de` service, because GitHub's REST API does not expose it. If it is down, the rest of the card still works.
- **LeetCode** — has no public CORS-enabled API, so `api/leetcode.ts` (a Vercel Function) queries LeetCode's GraphQL endpoint server-side. LeetCode can change that endpoint at any time; if it fails you will see an "unavailable" state, not fake numbers.
- **No private keys are used in the browser.** Anything starting with `VITE_` is public by design.

## Contact form

Pick one:

1. **Formspree (easiest):** create a form at formspree.io and set `VITE_FORMSPREE_ENDPOINT`.
2. **Resend via `/api/contact`:** create a Resend API key and set, in Vercel's environment variables (not `VITE_` prefixed): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

If neither is configured, the form validates, then tells the visitor it is not connected yet (and shows your email if `VITE_CONTACT_EMAIL` is set). It never pretends to have sent a message.

The form includes validation, sending/success/error states, and a honeypot field against bots.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Vite** (auto-detected; `vercel.json` already sets build/output and SPA rewrites).
3. Under **Settings → Environment Variables**, add the values from `.env.example` that you want.
4. Deploy. The `api/` folder is deployed automatically as Vercel Functions.
5. After you know your domain, replace `YOUR-DOMAIN.vercel.app` in `index.html`, `public/robots.txt` and `public/sitemap.xml`, and set `VITE_SITE_URL`.

To test the API routes locally, run `npx vercel dev` instead of `npm run dev`. With plain `npm run dev`, the LeetCode card shows its "unavailable" state and the contact form says it is not connected (both expected).

## Images

Project photos are illustrative Unsplash images (free licence). Every image has generated fallback artwork, so a failing URL never shows a broken image. Each card and case-study page labels these photos as illustrative, not as screenshots. Swap them for your own screenshots when you have them.

`public/og-image.png` is a simple generated preview card; replace it with a designed one when you like (1200×630).

## Project structure

```
api/                    Vercel Functions (leetcode, contact)
src/
  data/                 All editable content
  lib/                  env, platform loaders, contact logic, hooks
  components/
    layout/             Navbar, Footer, social links
    sections/           Hero, About, Skills, CodingDashboard, Timeline, Projects, Services, Contact
    dashboard/          HackerRank, LeetCode, GitHub, Codeforces cards, heatmap, ring
    ui/                 Button, Reveal, SmartImage, state views, brand icons
  pages/                Home, ProjectPage (case-study template), NotFound
```

## Accessibility and performance

Semantic landmarks and heading order, skip link, visible focus styles, keyboard-friendly menu (Esc closes), `prefers-reduced-motion` respected globally, lazy-loaded responsive images with fixed aspect ratios (no layout shift), self-hosted variable fonts, and code-split vendor chunks. Animations use only opacity and transform.
