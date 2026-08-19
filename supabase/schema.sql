-- OrbisMoneta — admin portal schema.
--
-- Run this ONCE in the Supabase SQL editor (Dashboard → SQL Editor → New
-- query → paste → Run). It is written to be safe to run again: every object
-- is created only if it is missing, so re-running it will not drop anything or
-- lose a single post.
--
-- Security model, in one line: both tables have row level security on and no
-- policies at all, so the public `anon` key can read and write NOTHING. Every
-- read and write in the app goes through the server using the service role
-- key, which bypasses RLS and is never sent to a browser. If you ever want to
-- query these from client-side code you must add explicit policies first —
-- please don't; the server routes are the front door.

-- ---------------------------------------------------------------- insights
-- One row per article. The column names are snake_case here and camelCase in
-- the app; lib/insights-store.ts is the only place that translates, so the
-- rest of the site never sees the difference.
create table if not exists public.insights (
  -- The URL. Also the primary key: an article is its address, and two posts
  -- sharing a slug would mean one of them is unreachable.
  slug              text primary key,
  title             text        not null,
  -- Free text, not an enum. The client asked to be able to create categories,
  -- and an enum would mean a database migration every time they thought of a
  -- new one. The filter row on /insights is built from whatever categories the
  -- published posts actually use, so a new one appears by being used.
  category          text        not null,
  topic             text        not null default '',
  type              text        not null default 'Analysis',
  excerpt           text        not null default '',
  author            text        not null default '',
  author_role       text        not null default '',
  -- Null while a post is a draft. This is what the "3 min ago" on the card
  -- counts from, so it is a real timestamp, not a display string.
  published_at      timestamptz,
  status            text        not null default 'draft',
  cover_src         text,
  cover_alt         text,
  cover_tone        text        not null default 'navy',
  -- The article itself, as the same block array the renderer already takes:
  -- [{ "type": "paragraph", "text": "..." }, ...]. JSONB rather than a lump of
  -- HTML so nothing the admin types can inject markup into the page.
  body              jsonb       not null default '[]'::jsonb,
  outline           jsonb       not null default '[]'::jsonb,
  media             jsonb       not null default '[]'::jsonb,
  related_service   jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- The listing reads published posts newest-first and nothing else, so that is
-- the index it gets.
create index if not exists insights_published_idx
  on public.insights (published_at desc nulls last)
  where status = 'published';

alter table public.insights enable row level security;

-- ------------------------------------------------------------------ events
-- One row per tracked thing: a page view, or a click on something that
-- matters. Deliberately one flat table — traction on a marketing site is a few
-- counts, and a star schema would be a lot of machinery for numbers you can
-- get with `count(*)`.
create table if not exists public.events (
  id          bigint generated always as identity primary key,
  -- 'pageview' | 'cta_click'. Add names freely; nothing is hardcoded.
  name        text        not null,
  -- The page it happened on, path only — never the query string, which is
  -- where campaign tags and any accidental personal data end up.
  path        text        not null default '',
  -- For a click, what was clicked: 'Explore Digital Currency Hub'.
  label       text,
  -- A daily-rotating hash of IP + user agent. NOT an identity: the salt
  -- changes at midnight UTC, so the same person is a different value tomorrow
  -- and cannot be followed across days. This is what makes "visitors" a real
  -- number without a cookie banner — see lib/analytics.ts.
  visitor     text        not null default '',
  referrer    text,
  created_at  timestamptz not null default now()
);

create index if not exists events_created_idx on public.events (created_at desc);
create index if not exists events_name_created_idx on public.events (name, created_at desc);

alter table public.events enable row level security;

-- ----------------------------------------------------------------- storage
-- Cover images and any pictures dropped into an article. Public read, because
-- these are published on a public website; writes still go through the server,
-- which is the only thing holding the service role key.
insert into storage.buckets (id, name, public)
values ('insight-media', 'insight-media', true)
on conflict (id) do nothing;

-- --------------------------------------------------------------- traction()
-- Everything the admin dashboard shows, in one round trip.
--
-- This is a function rather than a pile of queries in JavaScript for one
-- reason: counting DISTINCT visitors is not something the REST API can do, and
-- the alternative is dragging every event row of the last month into a
-- serverless function to count them there. That works on day one and stops
-- working quietly, somewhere around the point the client stops checking.
-- Postgres counts them where they live.
--
-- `p_days` is the window for the lists and the chart. The headline counts have
-- their own fixed windows, because "today" and "this week" are the questions
-- people actually ask.
create or replace function public.traction(p_days int default 30)
returns jsonb
language sql
stable
as $$
  with window_events as (
    select * from public.events
    where created_at >= now() - make_interval(days => p_days)
  ),
  views as (select * from window_events where name = 'pageview')
  select jsonb_build_object(
    'views', jsonb_build_object(
      'today', (select count(*) from public.events
                where name = 'pageview' and created_at >= date_trunc('day', now())),
      'week',  (select count(*) from public.events
                where name = 'pageview' and created_at >= now() - interval '7 days'),
      'month', (select count(*) from views),
      'total', (select count(*) from public.events where name = 'pageview')
    ),
    'visitors', jsonb_build_object(
      'today', (select count(distinct visitor) from public.events
                where name = 'pageview' and created_at >= date_trunc('day', now())),
      'week',  (select count(distinct visitor) from public.events
                where name = 'pageview' and created_at >= now() - interval '7 days'),
      'month', (select count(distinct visitor) from views)
    ),
    -- Every tracked button, busiest first. Nothing is hardcoded here, so a new
    -- tracked control appears in the dashboard the moment it is first clicked.
    'clicks', coalesce((
      select jsonb_agg(row_to_json(c))
      from (
        select label, count(*) as count, count(distinct visitor) as people
        from window_events
        where name = 'cta_click' and label is not null
        group by label
        order by count(*) desc
        limit 20
      ) c
    ), '[]'::jsonb),
    'topPages', coalesce((
      select jsonb_agg(row_to_json(p))
      from (
        select path, count(*) as count, count(distinct visitor) as people
        from views
        group by path
        order by count(*) desc
        limit 10
      ) p
    ), '[]'::jsonb),
    'topArticles', coalesce((
      select jsonb_agg(row_to_json(a))
      from (
        select path, count(*) as count, count(distinct visitor) as people
        from views
        where path like '/insights/%'
        group by path
        order by count(*) desc
        limit 10
      ) a
    ), '[]'::jsonb),
    -- One row per day for the bar chart, gaps filled. Without the generate_series
    -- a quiet day is simply absent and the chart silently closes the gap, which
    -- draws a flat week as a busy one.
    'daily', coalesce((
      select jsonb_agg(row_to_json(d) order by d.day)
      from (
        select
          g.day::date as day,
          count(v.id) as views,
          count(distinct v.visitor) as visitors
        from generate_series(
               date_trunc('day', now() - make_interval(days => p_days - 1)),
               date_trunc('day', now()),
               interval '1 day'
             ) g(day)
        left join views v on date_trunc('day', v.created_at) = g.day
        group by g.day
      ) d
    ), '[]'::jsonb)
  );
$$;
