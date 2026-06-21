-- 1. Create tables

-- Questions from users (Ask Widget)
create table public.questions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  name text,
  post_slug text, -- 'general' or specific slug if asked from a post
  post_context text, -- title of the post for context
  source text not null -- 'widget' or 'feedback_form'
);

-- Content Feedback (Feedback Form)
create table public.content_feedback (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_slug text not null,
  clarity_rating integer check (clarity_rating >= 1 and clarity_rating <= 5),
  style_rating integer check (style_rating >= 1 and style_rating <= 5),
  comment text
);

-- Newsletter Subscribers
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null unique,
  status text default 'active' not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.questions enable row level security;
alter table public.content_feedback enable row level security;
alter table public.subscribers enable row level security;

-- 3. Create RLS Policies
-- Allow anyone to insert (anon key)
create policy "Allow anonymous inserts" on public.questions for insert to anon with check (true);
create policy "Allow anonymous inserts" on public.content_feedback for insert to anon with check (true);
create policy "Allow anonymous inserts" on public.subscribers for insert to anon with check (true);

-- Deny all reads/updates/deletes to public (only admin can view via Supabase Dashboard)
create policy "Deny public select" on public.questions for select to anon using (false);
create policy "Deny public select" on public.content_feedback for select to anon using (false);
create policy "Deny public select" on public.subscribers for select to anon using (false);
