<div align="center">

<img src="docs/sea-banner.svg" alt="SEA — Educate → Incubate → Accelerate" width="100%"/>

# Student Entrepreneurship Association

[![Live Preview](https://img.shields.io/badge/Live-Preview-CC0000?style=for-the-badge&logo=vercel&logoColor=white)](https://sea-website-blush.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/Status-Marketing_SPA-0A0A0A?style=for-the-badge)](./HANDOVER.md)

<img src="https://readme-typing-svg.demolab.com?font=Arial&weight=800&size=28&duration=3200&pause=900&color=CC0000&center=true&vCenter=true&multiline=true&width=720&height=90&lines=Educate+%E2%86%92+Incubate+%E2%86%92+Accelerate;Build.+Ship.+Scale.;UoB+%C2%B7+UoB+Dubai" alt="Typing tagline" />

<img src="src/assets/sea-logo.jpg" alt="SEA Logo" width="120"/>

**Community marketing site** for SEA — founders, cohorts, events, partners, and the B-Labs pipeline.

[🌐 Open Live Site](https://sea-website-blush.vercel.app/) · [📋 Tech Handover](./HANDOVER.md) · [⚙️ Env Template](./.env.example)

</div>

---

## ⚡ What this is

A Vite + React SPA that markets SEA’s arc — **Educate → Incubate (B-Labs) → Accelerate** — with forms and a blog CMS on Supabase, hosted on Vercel.

```text
  Browser  ──►  Vercel (Vite SPA)  ──►  Supabase
                      │
                 /admin gate
                      │
        Forms · Newsletter · Blog CMS
```

| Surface | Route | Notes |
|:-------:|:-----:|:------|
| 🏠 Landing | `/` | Hero → process → team → events → cohorts → partners → blog |
| 🔐 Admin | `/admin` | Password-gated CMS + submissions |
| 🧭 404 | `*` | Client `NotFound` |

---

<div align="center">

## 🛠 Stack

<img src="https://skillicons.dev/icons?i=react,vite,js,css,vercel,supabase,github" alt="Tech stack icons" />

| Layer | Choice |
|:-----:|:-------|
| UI | React 19 · plain CSS · React Router 7 |
| Build | Vite 7 |
| Data | Supabase (`anon` key + RLS) |
| Host | Vercel (`vercel.json` SPA rewrite) |

</div>

---

## 🚀 Quick start

```bash
# 1. Install
npm ci

# 2. Env
cp .env.example .env.local
# fill VITE_SUPABASE_URL · VITE_SUPABASE_ANON_KEY · VITE_ADMIN_PASSWORD

# 3. Run
npm run dev
```

<div align="center">

| Command | What it does |
|:-------:|:-------------|
| `npm run dev` | 🔥 Hot-reload local server |
| `npm run build` | 📦 Production build → `dist/` |
| `npm run preview` | 👀 Serve the production build |
| `npm run lint` | ✅ ESLint |

</div>

<details>
<summary><b>🔑 Environment variables</b></summary>

<br/>

| Variable | Purpose | Sensitivity |
|:---------|:--------|:------------|
| `VITE_SUPABASE_URL` | Supabase project URL | Public (client) |
| `VITE_SUPABASE_ANON_KEY` | Anon key | Public — protect with **RLS** |
| `VITE_ADMIN_PASSWORD` | Interim `/admin` gate | **Not a secret** once bundled in JS — migrate to Auth ASAP |

Set the same three in the **Vercel** project. Redeploy after any env change.

</details>

<details>
<summary><b>🗺 Content map</b></summary>

<br/>

| Content | Where to edit |
|:--------|:--------------|
| Blog posts | `/admin` → Blog CMS → `blog_posts` |
| Form submissions | `/admin` tabs |
| Team / events / cohorts / partners / hero | Component arrays in `src/components/` + `public/` assets |
| Deploy | Push `main` → Vercel |

</details>

<details>
<summary><b>🧪 Pre-deploy checklist</b></summary>

<br/>

- [ ] RLS verified on all six Supabase tables
- [ ] Vercel env set; production domain / canonical decided
- [ ] `npm run build` + `npm run lint` green
- [ ] Smoke-test: home, one form, blog, admin login, 404
- [ ] Absolute OG image checked
- [ ] Owners confirmed: Vercel · Supabase · GitHub · analytics

Full checklist + risks → **[HANDOVER.md](./HANDOVER.md)**

</details>

---

<div align="center">

## 🎯 Landing flow

```
Navbar → SwissHero → ProcessAbout → FoundersNote
      → MasonryTeam → TimelineEvents → CohortTicker
      → Partners → BlogNews → TerminalFooter
```

<img src="https://img.shields.io/badge/Hardcoded-Team%20%7C%20Events%20%7C%20Cohorts%20%7C%20Partners-CC0000?style=flat-square"/>
<img src="https://img.shields.io/badge/Supabase-Forms%20%2B%20Blog-3FCF8E?style=flat-square"/>
<img src="https://img.shields.io/badge/Host-Vercel-000000?style=flat-square&logo=vercel"/>

<br/><br/>

**Built for SEA · University of Birmingham / UoB Dubai**

[![Open site](https://img.shields.io/badge/Open_Live_Site-CC0000?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sea-website-blush.vercel.app/)

</div>
