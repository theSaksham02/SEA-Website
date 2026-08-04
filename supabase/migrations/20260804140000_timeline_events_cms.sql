-- Events Ecosystem CMS for the landing timeline (TimelineEvents.jsx).
-- Separate from legacy public.events (unused by the Vite SPA).

create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date_label text not null,
  location text,
  status text not null default 'upcoming'
    check (status in ('past', 'upcoming', 'future')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists timeline_events_sort_idx
  on public.timeline_events (sort_order asc);

alter table public.timeline_events enable row level security;

drop policy if exists "anon_select_timeline_events" on public.timeline_events;
drop policy if exists "authenticated_select_timeline_events" on public.timeline_events;
drop policy if exists "authenticated_insert_timeline_events" on public.timeline_events;
drop policy if exists "authenticated_update_timeline_events" on public.timeline_events;
drop policy if exists "authenticated_delete_timeline_events" on public.timeline_events;

create policy "anon_select_timeline_events"
  on public.timeline_events for select to anon using (true);
create policy "authenticated_select_timeline_events"
  on public.timeline_events for select to authenticated using (true);
create policy "authenticated_insert_timeline_events"
  on public.timeline_events for insert to authenticated with check (true);
create policy "authenticated_update_timeline_events"
  on public.timeline_events for update to authenticated using (true) with check (true);
create policy "authenticated_delete_timeline_events"
  on public.timeline_events for delete to authenticated using (true);

insert into public.timeline_events (title, date_label, location, status, sort_order)
select * from (values
  ('Global AI Summit', 'Oct ''24', 'Main Hall', 'past', 1),
  ('SEA Entrepreneurship Day', 'Nov ''24', 'Campus', 'past', 2),
  ('AI Genesis x SEA', 'Dec ''24', 'Innovation Lab', 'past', 3),
  ('SEA x ACM', 'Jan ''25', 'G12', 'past', 4),
  ('SEA Expo', 'Feb ''25', 'Campus Center', 'upcoming', 5),
  ('Demo Day', 'Mar ''25', 'TBD', 'future', 6)
) as v(title, date_label, location, status, sort_order)
where not exists (select 1 from public.timeline_events limit 1);
