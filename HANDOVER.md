# SEA Website — Tech Team Handover

## 1. Project summary

**SEA (Student Entrepreneurship Association)** is the University of Birmingham / UoB Dubai community marketing site. Tagline arc: Educate → Incubate (B-Labs) → Accelerate.

| Item | Detail |
|------|--------|
| Audience | Students, founders, sponsors, partners |
| Stack | Vite 7 + React 19 SPA, plain CSS, React Router 7 |
| Backend | Supabase (forms + blog CMS) via anon key |
| Hosting | Vercel (`vercel.json` SPA rewrite) |
| Preview | https://sea-website-blush.vercel.app/ |
| Repo | https://github.com/theSaksham02/SEA-Website.git · branch `main` |
| Routes | `/` landing (anchor sections), `/admin` CMS/dashboard, client `NotFound` |

---

## 2. Architecture & key files

```
Browser → Vite SPA on Vercel → Supabase
                ↑
         /admin password gate
                ↑
    Forms (Event / Apply / Sponsor / Newsletter)
    Blog (BlogNews + CMS)
```

| Area | File(s) |
|------|---------|
| Routes / layout | `src/App.jsx` |
| Supabase client + form helpers | `src/lib/supabase.js` |
| Admin CMS / dashboard | `src/components/AdminDashboard.jsx` |
| Hardcoded content | `MasonryTeam`, `TimelineEvents`, `CohortTicker`, `Partners`, `SwissHero` |
| SPA fallback (required) | `vercel.json` |

**Landing sections** (in order): Navbar → SwissHero → ProcessAbout → FoundersNote → MasonryTeam → TimelineEvents → CohortTicker → Partners → BlogNews → TerminalFooter.

**Hardcoded in components:** team, events, cohorts, partners, hero copy.

**Supabase tables:** `event_registrations`, `startup_team_applications`, `startup_applications`, `sponsor_inquiries`, `newsletter_subscribers`, `blog_posts`.

---

## 3. Local setup

```bash
npm ci
cp .env.example .env.local   # fill VITE_* vars
npm run dev
npm run build && npm run preview
```

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |

---

## 4. Environment variables (Vercel + local)

All `VITE_*` variables are **embedded in the client bundle** at build time. Treat them as public to the browser.

| Var | Purpose | Sensitivity |
|-----|---------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Public (client) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Public; protect via RLS |
| `VITE_ADMIN_PASSWORD` | Interim admin gate | **Not a secret** once shipped in JS — migrate off ASAP |

Set the same three vars in the Vercel project (Production / Preview / Development as needed). After changing env vars, trigger a redeploy so the build picks them up.

Local: copy `.env.example` → `.env.local` (gitignored). Do not commit real keys.

---

## 5. Supabase ownership checklist

- [ ] Confirm project URL and keys match Vercel + local env
- [ ] Document table schemas for the six tables listed above
- [ ] **RLS audit (blocking):**
  - Anon can **INSERT** on form tables only
  - Anon **cannot** SELECT / UPDATE / DELETE others’ submission rows
  - Blog writes restricted to authenticated admins (today admin is client-password only — Auth migration needed)
- [ ] No migrations in this repo yet — schema lives in the Supabase dashboard; export SQL into `supabase/migrations/` when possible

---

## 6. How to update content

| Content | Where |
|---------|--------|
| Blog posts | `/admin` → Blog CMS → `blog_posts` |
| Form submissions | `/admin` tabs (newsletter, events, apps, sponsors) |
| Team / events / cohorts / partners | Edit component JS arrays + assets under `public/` |
| Deploy | Push `main` → Vercel (confirm project link + env) |

---

## 7. Known risks & tech debt

- Client-side admin password (`VITE_ADMIN_PASSWORD`) is bundled into JS; insecure fallback exists in code — replace with Supabase Auth (or Edge Function + service role) ASAP
- No CI, no tests, no TypeScript
- Stale event dates / copyright year; relative OG URLs; large unoptimized `public/` assets (~36MB)
- Dead Formspree components (`JoinIdea`, `JoinStartup`); GA placeholder in `App.jsx`
- Possible form field ↔ schema mismatches (`studentId`, `linkedin`, `startupName`, etc.)
- Out of scope for this handover pass (future backlog): full TypeScript rewrite, Next.js SSR migration, redesign

---

## 8. Pre-deploy acceptance checklist

- [ ] RLS verified on all six tables
- [ ] Vercel env set; production domain / canonical decided
- [ ] `npm run build` + `npm run lint` green
- [ ] Smoke-test: home load, one form submit, blog load, admin login, 404
- [ ] OG preview (absolute image) checked
- [ ] Access: who owns Vercel, Supabase, GitHub, analytics, WhatsApp invite

---

## 9. Contacts / open questions for tech team

- Production custom domain?
- Who has Supabase owner access (for RLS + Auth migration)?
- Keep interim password admin or block `/admin` until Auth ships?
- Analytics ID?
- Form spam policy (honeypot / CAPTCHA)?
