-- Add View More content fields to timeline events
alter table public.timeline_events
  add column if not exists description text,
  add column if not exists image_url_1 text,
  add column if not exists image_url_2 text,
  add column if not exists image_url_3 text;
