# SEA Website

Marketing site for the **Student Entrepreneurship Association (SEA)** at the University of Birmingham / UoB Dubai.

**Educate → Incubate (B-Labs) → Accelerate**

| | |
|---|---|
| Live preview | https://sea-website-blush.vercel.app/ |
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
- `VITE_ADMIN_PASSWORD` (interim admin gate — **not a real secret** once built into the client bundle)

Configure the same variables in the Vercel project dashboard. Redeploy after env changes.

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page (anchor sections) |
| `/admin` | CMS / submissions dashboard (password-gated) |

## Content updates

- **Blog & form submissions** — `/admin` (backed by Supabase)
- **Team, events, cohorts, partners, hero** — hardcoded in React components under `src/components/` plus assets in `public/`

## Deploy

Push to `main`. Vercel serves the SPA; `vercel.json` rewrites all routes to `index.html`.
