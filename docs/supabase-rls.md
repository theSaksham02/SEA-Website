# Supabase RLS checklist (blocking for production)

The SPA uses the **anon** key in the browser. Real protection is Row Level Security — not the UI login alone.

Apply [`supabase/migrations/20260804120000_create_app_tables_and_rls.sql`](../supabase/migrations/20260804120000_create_app_tables_and_rls.sql) (creates tables + RLS). Older file `20260729120000_rls_policies.sql` only works **after** tables exist.

**Already applied** on Supabase project **SEA-website** (`znzguinpxfywepsyxnbv`). Re-run only if spinning up a new project.

## Access model (after migration)

| Table | Anon | Authenticated (admin users) |
|-------|------|-----------------------------|
| Form tables (`event_registrations`, `startup_*`, `sponsor_inquiries`, `newsletter_subscribers`) | INSERT only | SELECT + DELETE |
| `blog_posts` | SELECT | full CRUD |

## Admin setup

1. Dashboard → Authentication → Users → create/invite admin emails.
2. Disable public sign-ups (Auth → Providers → Email).
3. Sign in at `/admin` with that email/password.

## Staging caveat

Staging currently shares the same Supabase project as production unless Preview env vars point at a separate project. Test form submissions will create real rows — use clearly fake emails or a dedicated staging project.
