# SEA Website — Tech Team Handover

## 1. Project summary

**SEA (Student Entrepreneurship Association)** is the University of Birmingham / UoB Dubai community marketing site. Tagline arc: Educate → Incubate (B-Labs) → Accelerate.

| Item | Detail |
|------|--------|
| Audience | Students, founders, sponsors, partners |
| Stack | Vite 7 + React 19 SPA, plain CSS, React Router 7 |
| Backend | Supabase (forms + blog CMS) via anon key + Auth for `/admin` |
| Hosting | Vercel project `sea-uobd` (`vercel.json` SPA rewrite) |
| **Production** | https://seauobd.vercel.app/ |
| **Staging (testing site)** | https://sea-uobd-staging.vercel.app/ |
| Repo | https://github.com/theSaksham02/SEA-Website.git |
| Branches | `main` = production · `staging` = shared testing |
| Routes | `/` landing, `/admin` (Supabase Auth), client `NotFound` |

---

## 2. Architecture & key files

```
Browser → Vite SPA on Vercel → Supabase
                ↑
         /admin (Supabase Auth session)
                ↑
    Forms — anon INSERT · Blog — anon SELECT + auth CMS
```

| Area | File(s) |
|------|---------|
| Routes / layout | `src/App.jsx` |
| Supabase client + form helpers | `src/lib/supabase.js` |
| Admin CMS / dashboard | `src/components/AdminDashboard.jsx` |
| Hardcoded content | `MasonryTeam`, `TimelineEvents`, `CohortTicker`, `Partners`, `SwissHero` |
| SPA fallback (required) | `vercel.json` |
| CI | `.github/workflows/ci.yml` |
| RLS policies (apply in Supabase) | `supabase/migrations/20260729120000_rls_policies.sql` |
| RLS checklist | `docs/supabase-rls.md` |

**Landing sections:** Navbar → SwissHero → ProcessAbout → FoundersNote → MasonryTeam → TimelineEvents → CohortTicker → Partners → BlogNews → TerminalFooter.

**Supabase tables:** `event_registrations`, `startup_team_applications`, `startup_applications`, `sponsor_inquiries`, `newsletter_subscribers`, `blog_posts`.

---

## 3. Local setup

```bash
npm ci
cp .env.example .env.local   # fill VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
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

All `VITE_*` values are **embedded in the client bundle**. Protect data with RLS.

| Var | Purpose | Sensitivity |
|-----|---------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Public (client) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | Public; protect via RLS |

Set both on Vercel for **Production** and **Preview**. Redeploy after env changes.

`VITE_ADMIN_PASSWORD` is **removed**. `/admin` uses Supabase Auth only.

---

## 5. Supabase ownership checklist

### 5.1 Keys & users

- [ ] Confirm project URL/keys match Vercel + local
- [ ] Create admin user(s): Dashboard → Authentication → Users
- [ ] **Disable public sign-ups**
- [ ] Apply RLS SQL (below)

### 5.2 RLS (blocking)

Apply [`supabase/migrations/20260729120000_rls_policies.sql`](./supabase/migrations/20260729120000_rls_policies.sql) in the Supabase SQL Editor.

| Table | Anon | Authenticated |
|-------|------|----------------|
| Form tables | INSERT only | SELECT + DELETE |
| `blog_posts` | SELECT | full CRUD |

See [`docs/supabase-rls.md`](./docs/supabase-rls.md).

**Staging shares the same Supabase project** unless Preview env points at a separate project — use fake test emails.

---

## 6. How to update content

| Content | Where |
|---------|--------|
| Blog / submissions | `/admin` after Auth login |
| Team / events / cohorts / partners | Component arrays + `public/` assets |
| Deploy | See §10 — **never** push straight to production |

---

## 7. Known risks & tech debt

- RLS SQL is in-repo but **must be applied** in the live Supabase project
- Any authenticated user is an admin — keep sign-ups closed
- CI = lint + build only (no e2e yet)
- Large `public/` images still need WebP/compression
- TriNOVA “Coming Soon” is intentional until announced
- Possible form field ↔ schema mismatches
- Backlog: TypeScript, Next.js, separate staging Supabase, Dependabot

---

## 8. Promote checklist (staging → production)

- [ ] RLS applied and verified
- [ ] Admin user created; public sign-up disabled
- [ ] CI green on the PR
- [ ] Smoke-test on **https://sea-uobd-staging.vercel.app/**: home, form, blog, `/admin`, 404
- [ ] OG absolute image OK
- [ ] Owners confirmed: Vercel · Supabase · GitHub
- [ ] Then open PR `staging` → `main` (production updates)

---

## 9. Open questions

- Custom production domain?
- Who owns Supabase (RLS + Auth users)?
- Analytics measurement ID?
- Form spam policy?
- Separate Supabase project for staging?

---

## 10. Staging site & CI/CD (required reading for new team)

Mistakes stay in **PRs and staging**. Production only updates from protected `main`.

### Environments

| Env | Git | URL |
|-----|-----|-----|
| Local | any | `localhost:5173` |
| PR Preview | every PR | Unique `*.vercel.app` on the PR |
| **Staging** | `staging` | **https://sea-uobd-staging.vercel.app/** |
| **Production** | `main` | **https://seauobd.vercel.app/** |

### Team workflow

```text
1. git checkout -b feature/my-change
2. Push + open PR into staging
3. Wait for CI (Lint & Build) + Vercel Preview on the PR
4. Review → merge to staging → test https://sea-uobd-staging.vercel.app/
5. Sign-off → PR staging → main → production
```

**Do not** run `vercel --prod` from laptops. **Do not** push directly to `main`.

### CI

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `npm ci` → `lint` → `build` on PRs and pushes to `main` / `staging`.

### Branch protection (`main` — enabled)

- Pull request required
- Status check required: **Lint & Build**
- 1 approving review
- Enforce for admins; no force pushes

Mirror the same on `staging` if desired.

### Vercel

- Project: `sea-uobd`
- Production branch: `main`
- Staging alias: `sea-uobd-staging.vercel.app` (re-point after major staging deploys if needed: `vercel alias set <deployment-url> sea-uobd-staging.vercel.app`)
- After each push to `staging`, Git also creates `sea-uobd-git-staging-….vercel.app`
