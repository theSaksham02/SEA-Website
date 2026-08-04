# SEA Website

Marketing site for the **Student Entrepreneurship Association (SEA)** at the University of Birmingham / UoB Dubai.

**Educate → Incubate (B-Labs) → Accelerate**

| | |
|---|---|
| Live preview | https://seauobd.vercel.app/ |
| Stack | Vite 7 · React 19 · React Router 7 · plain CSS |
| Backend | Supabase (forms + blog CMS) |
| Host | Vercel |

For full architecture, env vars, RLS checklist, and known risks, see **[HANDOVER.md](./HANDOVER.md)**.

## Quick start

```bash
npm ci
cp .env.example .env.local   # fill in VITE_* values
npm run dev
```

| Script | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Lint | `npm run lint` |

## Environment

Copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Configure the same variables in the Vercel project dashboard. Redeploy after env changes.

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page (anchor sections) |
| `/admin` | CMS / submissions dashboard (Supabase Auth email + password) |

## Admin access

1. Apply RLS SQL in [`supabase/migrations/20260729120000_rls_policies.sql`](./supabase/migrations/20260729120000_rls_policies.sql) via the Supabase SQL Editor.
2. Create an admin user in **Authentication → Users** (invite/create). Disable public sign-ups.
3. Sign in at `/admin` with that email and password.

## Content updates

- **Blog & form submissions** — `/admin` (backed by Supabase)
- **Team, events, cohorts, partners, hero** — hardcoded in React components under `src/components/` plus assets in `public/`

## Deploy

Push to `main`. Vercel serves the SPA; `vercel.json` rewrites all routes to `index.html`.
