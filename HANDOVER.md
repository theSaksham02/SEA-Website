# SEA Website — Tech Team Handover

## 1. Project summary

**SEA (Student Entrepreneurship Association)** is the University of Birmingham / UoB Dubai community marketing site. Tagline arc: Educate → Incubate (B-Labs) → Accelerate.

| Item | Detail |
|------|--------|
| Audience | Students, founders, sponsors, partners |
| Stack | Vite 7 + React 19 SPA, plain CSS, React Router 7 |
| Backend | Supabase (forms + blog CMS) via anon key + Auth for `/admin` |
| Hosting | Vercel (`vercel.json` SPA rewrite) |
| Preview | https://sea-website-blush.vercel.app/ |
| Repo | https://github.com/theSaksham02/SEA-Website.git · branch `main` |
| Routes | `/` landing (anchor sections), `/admin` CMS/dashboard (Supabase Auth), client `NotFound` |

---

## 2. Architecture & key files

```
Browser → Vite SPA on Vercel → Supabase
                ↑
         /admin (Supabase Auth session)
                ↑
    Forms (Event / Apply / Sponsor / Newsletter) — anon INSERT
    Blog (BlogNews public SELECT + CMS authenticated writes)
```

| Area | File(s) |
|------|---------|
| Routes / layout | `src/App.jsx` |
| Supabase client + form helpers | `src/lib/supabase.js` |
| Admin CMS / dashboard | `src/components/AdminDashboard.jsx` |
| Hardcoded content | `MasonryTeam`, `TimelineEvents`, `CohortTicker`, `Partners`, `SwissHero` |
| SPA fallback (required) | `vercel.json` |
| RLS policies (apply in Supabase) | `supabase/migrations/20260729120000_rls_policies.sql` |

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

Set the same vars in the Vercel project (Production / Preview / Development as needed). After changing env vars, trigger a redeploy so the build picks them up.

Local: copy `.env.example` → `.env.local` (gitignored). Do not commit real keys.

`VITE_ADMIN_PASSWORD` has been **removed**. `/admin` uses Supabase Auth (`signInWithPassword`). Do not reintroduce a client-side password gate.

---

## 5. Supabase ownership checklist

### 5.1 Keys & users

- [ ] Confirm project URL and keys match Vercel + local env
- [ ] Create at least one admin user: Dashboard → **Authentication → Users** → Invite / Create user
- [ ] **Disable public sign-ups** (Auth → Providers → Email) so only invited users can authenticate
- [ ] Document table schemas for the six tables above (export when possible)

### 5.2 RLS audit (blocking for production)

Apply [`supabase/migrations/20260729120000_rls_policies.sql`](./supabase/migrations/20260729120000_rls_policies.sql) in the Supabase **SQL Editor**, then verify:

| Table | Anon | Authenticated |
|-------|------|----------------|
| Form tables (`event_registrations`, `startup_team_applications`, `startup_applications`, `sponsor_inquiries`, `newsletter_subscribers`) | INSERT only | SELECT + DELETE |
| `blog_posts` | SELECT (public site) | SELECT + INSERT + UPDATE + DELETE |

**Must not allow:** anon SELECT/UPDATE/DELETE on form submissions; anon INSERT/UPDATE/DELETE on `blog_posts`.

**How to verify (quick):**

1. With no session (anon key only): form INSERT succeeds; `select *` on form tables returns empty / permission error; blog SELECT works; blog INSERT fails.
2. After `/admin` login: form SELECT + DELETE work; blog CMS create/edit/delete work.
3. Confirm RLS is enabled: Authentication → or SQL:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'event_registrations','startup_team_applications','startup_applications',
    'sponsor_inquiries','newsletter_subscribers','blog_posts'
  );
```

### 5.3 Migrations

Schema historically lived only in the Supabase dashboard. This repo now includes the RLS migration SQL above. Prefer adding further schema changes under `supabase/migrations/` going forward.

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

- **RLS must be applied in Supabase** — the migration file is in-repo but does not auto-apply; until applied, anon key may still read/write everything if prior policies were loose
- Admin = any authenticated user; keep sign-ups closed and rotate credentials carefully
- No CI, no tests, no TypeScript
- Stale event dates / copyright year; relative OG URLs; large unoptimized `public/` assets (~36MB)
- Dead Formspree components (`JoinIdea`, `JoinStartup`); GA placeholder in `App.jsx`
- Possible form field ↔ schema mismatches (`studentId`, `linkedin`, `startupName`, etc.)
- Out of scope for this handover pass (future backlog): full TypeScript rewrite, Next.js SSR migration, redesign, finer-grained admin roles (`app_metadata`)

---

## 8. Pre-deploy acceptance checklist

- [ ] RLS SQL applied and verified on all six tables
- [ ] Admin user created; public sign-up disabled
- [ ] Vercel env set (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`); production domain / canonical decided
- [ ] `VITE_ADMIN_PASSWORD` removed from Vercel env (if previously set)
- [ ] `npm run build` + `npm run lint` green
- [ ] Smoke-test: home load, one form submit, blog load, `/admin` Auth login, submissions visible, 404
- [ ] OG preview (absolute image) checked
- [ ] Access: who owns Vercel, Supabase, GitHub, analytics, WhatsApp invite

---

## 9. Contacts / open questions for tech team

- Production custom domain?
- Who has Supabase owner access (for RLS apply + Auth user management)?
- Analytics ID?
- Form spam policy (honeypot / CAPTCHA)?
