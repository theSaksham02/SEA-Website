-- Path A: create tables matching the Vite SEA app, then apply RLS.
-- Applied to project SEA-website (znzguinpxfywepsyxnbv). Safe to re-run (IF NOT EXISTS).
--
-- Access model:
--   Form tables: anon INSERT only; authenticated SELECT + DELETE
--   blog_posts:  anon SELECT; authenticated full CRUD

create extension if not exists "pgcrypto";

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  student_id text,
  event_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.startup_team_applications (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  skills text,
  linkedin text,
  created_at timestamptz not null default now()
);

create table if not exists public.startup_applications (
  id uuid primary key default gen_random_uuid(),
  founder_name text,
  email text,
  startup_name text,
  stage text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.sponsor_inquiries (
  id uuid primary key default gen_random_uuid(),
  company text,
  contact_name text,
  email text,
  partnership_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_key unique (email)
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  content text,
  category text default 'ANNOUNCEMENT',
  author text default 'SEA Team',
  image_url text,
  created_at timestamptz not null default now()
);

alter table if exists public.leads enable row level security;

alter table public.event_registrations enable row level security;
alter table public.startup_team_applications enable row level security;
alter table public.startup_applications enable row level security;
alter table public.sponsor_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.blog_posts enable row level security;

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
drop policy if exists "anon_select_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_select_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_insert_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_update_blog_posts" on public.blog_posts;
drop policy if exists "authenticated_delete_blog_posts" on public.blog_posts;

create policy "anon_insert_event_registrations"
  on public.event_registrations for insert to anon with check (true);
create policy "authenticated_select_event_registrations"
  on public.event_registrations for select to authenticated using (true);
create policy "authenticated_delete_event_registrations"
  on public.event_registrations for delete to authenticated using (true);

create policy "anon_insert_startup_team_applications"
  on public.startup_team_applications for insert to anon with check (true);
create policy "authenticated_select_startup_team_applications"
  on public.startup_team_applications for select to authenticated using (true);
create policy "authenticated_delete_startup_team_applications"
  on public.startup_team_applications for delete to authenticated using (true);

create policy "anon_insert_startup_applications"
  on public.startup_applications for insert to anon with check (true);
create policy "authenticated_select_startup_applications"
  on public.startup_applications for select to authenticated using (true);
create policy "authenticated_delete_startup_applications"
  on public.startup_applications for delete to authenticated using (true);

create policy "anon_insert_sponsor_inquiries"
  on public.sponsor_inquiries for insert to anon with check (true);
create policy "authenticated_select_sponsor_inquiries"
  on public.sponsor_inquiries for select to authenticated using (true);
create policy "authenticated_delete_sponsor_inquiries"
  on public.sponsor_inquiries for delete to authenticated using (true);

create policy "anon_insert_newsletter_subscribers"
  on public.newsletter_subscribers for insert to anon with check (true);
create policy "authenticated_select_newsletter_subscribers"
  on public.newsletter_subscribers for select to authenticated using (true);
create policy "authenticated_delete_newsletter_subscribers"
  on public.newsletter_subscribers for delete to authenticated using (true);

create policy "anon_select_blog_posts"
  on public.blog_posts for select to anon using (true);
create policy "authenticated_select_blog_posts"
  on public.blog_posts for select to authenticated using (true);
create policy "authenticated_insert_blog_posts"
  on public.blog_posts for insert to authenticated with check (true);
create policy "authenticated_update_blog_posts"
  on public.blog_posts for update to authenticated using (true) with check (true);
create policy "authenticated_delete_blog_posts"
  on public.blog_posts for delete to authenticated using (true);
