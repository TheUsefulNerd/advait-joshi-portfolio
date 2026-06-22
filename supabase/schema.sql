-- 1. Create tables

-- Questions from users (Ask Widget)
CREATE TABLE public.questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content text NOT NULL,
  name text,
  post_slug text NOT NULL,
  post_context text,
  source text NOT NULL CHECK (source IN ('widget', 'feedback_form')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'drafting', 'published', 'ignored')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Content Feedback (Feedback Form)
CREATE TABLE public.content_feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug text NOT NULL,
  clarity_rating integer,
  style_rating integer,
  comment text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Newsletter Subscribers
CREATE TABLE public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  confirmed boolean DEFAULT false,
  unsubscribe_token uuid DEFAULT gen_random_uuid(),
  subscribed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Anonymous Insert Policies (allows the website to send data)
CREATE POLICY "Allow anonymous inserts for questions" ON public.questions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts for feedback" ON public.content_feedback FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts for subscribers" ON public.subscribers FOR INSERT TO anon WITH CHECK (true);

-- Authenticated Full Access Policies (for your future Admin Dashboard)
CREATE POLICY "Allow authenticated full access questions" ON public.questions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access feedback" ON public.content_feedback FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow authenticated full access subscribers" ON public.subscribers FOR ALL TO authenticated USING (true);
