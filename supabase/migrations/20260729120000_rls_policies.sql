-- SEA Website — required RLS policies
-- Apply in Supabase SQL Editor (or via `supabase db push`) BEFORE treating /admin as production-safe.
--
-- Access model:
--   Form tables: anon INSERT only; authenticated SELECT + DELETE
--   blog_posts:  anon SELECT (public site); authenticated full CRUD
--
-- Admin model: any Supabase Auth user with role `authenticated` is an admin.
-- Create admin users in Dashboard → Authentication → Users (invite/create).
-- Disable public sign-ups (Auth → Providers → Email → disable "Enable sign ups").

-- ---------------------------------------------------------------------------
-- Form submission tables
-- ---------------------------------------------------------------------------

alter table public.event_registrations enable row level security;
alter table public.startup_team_applications enable row level security;
alter table public.startup_applications enable row level security;
alter table public.sponsor_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Drop prior policies if re-running (safe idempotent apply)
drop policy if exists "anon_insert_event_registrations" on public.event_registrations;
drop policy if exists "authenticated_select_event_registrations" on public.event_registrations;
drop policy if exists "authenticated_delete_event_registrations" on public.event_registrations;

drop policy if exists "anon_insert_startup_team_applications" on public.startup_team_applications;
drop policy if exists "authenticated_select_startup_team_applications" on public.startup_team_applications;
drop policy if exists "authenticated_delete_startup_team_applications" on public.startup_team_applications;

drop policy if exists "anon_insert_startup_applications" on public.startup_applications;
drop policy if exists "authenticated_select_startup_applications" on public.startup_applications;
drop policy if exists "authenticated_delete_startup_applications" on public.startup_applications;

drop policy if exists "anon_insert_sponsor_inquiries" on public.sponsor_inquiries;
drop policy if exists "authenticated_select_sponsor_inquiries" on public.sponsor_inquiries;
drop policy if exists "authenticated_delete_sponsor_inquiries" on public.sponsor_inquiries;

drop policy if exists "anon_insert_newsletter_subscribers" on public.newsletter_subscribers;
drop policy if exists "authenticated_select_newsletter_subscribers" on public.newsletter_subscribers;
drop policy if exists "authenticated_delete_newsletter_subscribers" on public.newsletter_subscribers;

-- event_registrations
create policy "anon_insert_event_registrations"
  on public.event_registrations for insert
  to anon
  with check (true);

create policy "authenticated_select_event_registrations"
  on public.event_registrations for select
  to authenticated
  using (true);

create policy "authenticated_delete_event_registrations"
  on public.event_registrations for delete
  to authenticated
  using (true);

-- startup_team_applications
create policy "anon_insert_startup_team_applications"
  on public.startup_team_applications for insert
  to anon
  with check (true);

create policy "authenticated_select_startup_team_applications"
  on public.startup_team_applications for select
  to authenticated
  using (true);

create policy "authenticated_delete_startup_team_applications"
  on public.startup_team_applications for delete
  to authenticated
  using (true);

-- startup_applications
create policy "anon_insert_startup_applications"
  on public.startup_applications for insert
  to anon
  with check (true);

create policy "authenticated_select_startup_applications"
  on public.startup_applications for select
  to authenticated
  using (true);

create policy "authenticated_delete_startup_applications"
  on public.startup_applications for delete
  to authenticated
  using (true);

-- sponsor_inquiries
create policy "anon_insert_sponsor_inquiries"
  on public.sponsor_inquiries for insert
  to anon
  with check (true);

create policy "authenticated_select_sponsor_inquiries"
  on public.sponsor_inquiries for select
  to authenticated
  using (true);

create policy "authenticated_delete_sponsor_inquiries"
  on public.sponsor_inquiries for delete
  to authenticated
  using (true);

-- newsletter_subscribers
create policy "anon_insert_newsletter_subscribers"
  on public.newsletter_subscribers for insert
  to anon
  with check (true);

create policy "authenticated_select_newsletter_subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

create policy "authenticated_delete_newsletter_subscribers"
  on public.newsletter_subscribers for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Blog CMS
-- ---------------------------------------------------------------------------

alter table public.blog_posts enable row level security;

drop policy if exists "anon_select_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_select_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_insert_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_update_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_delete_blog_posts" on public.blog_posts;

create policy "anon_select_blog_posts"
  on public.blog_posts for select
  to anon
  using (true);

create policy "authenticated_select_blog_posts"
  on public.blog_posts for select
  to authenticated
  using (true);

create policy "authenticated_insert_blog_posts"
  on public.blog_posts for insert
  to authenticated
  with check (true);

-- UPDATE needs a SELECT policy for the same role (Postgres RLS requirement)
create policy "authenticated_update_blog_posts"
  on public.blog_posts for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated_delete_blog_posts"
  on public.blog_posts for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Verification queries (run as sanity check after apply)
-- ---------------------------------------------------------------------------
-- select schemaname, tablename, rowsecurity
-- from pg_tables
-- where schemaname = 'public'
--   and tablename in (
--     'event_registrations','startup_team_applications','startup_applications',
--     'sponsor_inquiries','newsletter_subscribers','blog_posts'
--   );
--
-- select tablename, policyname, roles, cmd
-- from pg_policies
-- where schemaname = 'public'
-- order by tablename, policyname;
