-- Extra fields for the SEA Hacks 2026 registration modal.
-- Nullable so existing name/email rows stay valid.
-- Anon insert stays open via the existing anon_insert_event_registrations policy.

alter table public.event_registrations
  add column if not exists university text,
  add column if not exists participation text,
  add column if not exists track text;
