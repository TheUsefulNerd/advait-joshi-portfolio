# Advait Joshi — Portfolio + Blog: Project Specification

This is the single source of truth for the site's architecture, design system, data model, and build workflow. Keep this file in the repo at `/docs/PROJECT_SPEC.md` so coding agents (and future-you) always have full context.

---

## 1. Purpose

A dual-audience site:
- **Portfolio** — for recruiters, IIT/research contacts, and anyone evaluating Advait professionally.
- **Blogs** — for a 200+ person professional cohort (mixed tech/non-tech, 10+ yrs experience) learning AI, breaking down concepts in plain language, with a feedback loop that turns reader questions directly into new content.

Both audiences are served by one site with a clear fork at the entry point — neither audience has to wade through content meant for the other.

---

## 2. Site Architecture

### 2.1 Landing Hero (universal entry point)

- Stays the visual centerpiece: name, photo, gradient headline text, audio-bar decorative elements, credentials line — **kept identical across light and dark mode**, just recolored for contrast (not removed or simplified in light mode).
- **Three buttons**:
  1. **Portfolio** — secondary/outline style — switches to Portfolio mode
  2. **Blogs** — primary/filled style — switches to Blogs mode
  3. **My Resume** — small, plain text, tertiary style ("My Resume" — no icon) — opens the Google Drive resume link in a **new tab**
- Persistent top nav (Portfolio / Blogs toggle) carries across the whole site so users can switch modes from anywhere.

### 2.2 Portfolio Mode

- Sub-nav: **About Me, Experience, Projects, Skills, Education, Contact**
- About Me section includes: about, skills, education, and a contact form with resume link + PDF download
- **"My Resume" button repeated** in the same style/placement (e.g. top-right near page title) on **Experience, Projects, and Contact** pages — consistent landmark, not just hero-only
- Design language: keep current energetic identity (gradients, audio bars) in both light and dark mode — this section is about personal brand, not minimalism

### 2.3 Blogs Mode

- Sub-nav: **Recent Blogs, Archive, Feedback Form**
- Posts organized by **tags / concept-depth**, not just chronological order, so non-tech readers can self-select away from deep-dive math content
- A pinned **"Start Here"** post — roadmap/glossary for newcomers
- Design language: **minimalist, editorial/"professor" feel**, in both light and dark mode — this is the one section where minimalism is the rule, independent of mode:
  - **Light mode**: warm off-white background (~`#FAFAF8`), near-black text (~`#1A1A1A`, never pure black), **one** flat accent color for links/highlights (no gradients), thin neutral-gray borders, generous line-height (1.6–1.8), restrained type scale, no decorative elements
  - **Dark mode**: same restrained philosophy, adapted palette
- Floating "Ask" widget visible throughout (see §3)
- Dedicated Feedback Form page, separate from the widget (see §4)

---

## 3. Floating "Ask" Widget

- Siri-orb inspired, **fixed bottom-right corner** (not draggable)
- Idle state: small dot/orb with subtle gradient (pulled from existing brand palette)
- Behavior: shrinks further while actively scrolling, expands slightly on idle or scroll-up; tap to expand into an input box
- **Two states**, toggled via a "Newsletter" control in the widget:
  - **Ask a Question** — Name (optional), Question (free text)
  - **Newsletter** — Email (required)
- On submit, captures: question content, post/page context (slug; heading anchor where possible), timestamp, source tag (`widget`)
- One-time tooltip on first visit explaining its purpose (unlike Siri, the function isn't self-evident)
- Mobile: keep clear of OS gesture zones and browser toolbars, sufficient margin from edges

---

## 4. Feedback Form Page

A separate dedicated page (not the same as the widget) for **content/style feedback**, structurally different from topic questions:
- Post reference
- Clarity/style rating (simple scale, e.g. 1–5 or thumbs)
- Open comment field (e.g. "what would make this easier to follow?")

---

## 5. Data Model (Supabase)

### Tables

**`questions`**
- `id`, `content`, `name` (nullable), `post_slug`, `post_context` (heading anchor, optional), `source` (`widget` | `feedback_form`), `status` (`new` → `reviewing` → `drafting` → `published` | `ignored`), `created_at`

**`content_feedback`**
- `id`, `post_slug`, `clarity_rating`, `style_rating` (or one combined rating), `comment`, `created_at`

**`subscribers`**
- `id`, `email`, `confirmed`, `unsubscribe_token`, `subscribed_at`

### Security

- Public site uses the Supabase **anon key** — safe to expose in client code; protection comes from RLS, not key secrecy
- RLS: anonymous role gets **INSERT only** on all three tables — no SELECT/UPDATE/DELETE
- RLS: authenticated role gets **SELECT/UPDATE** on all three tables — set up now, during this build, so a future dashboard can plug in without any backend changes
- A single Supabase Auth admin account (your own login) is created now, ready for a future dashboard to authenticate against
- The Supabase **service role key** should not be used at all if avoidable — Supabase Auth + RLS removes the need for it entirely

---

## 6. Admin Dashboard (future project — NOT part of this build)

Out of scope for the current website build. The website's only job here is making sure the backend is dashboard-ready (see §5 Security) — the dashboard itself is a separate project, built later in its own private repo.

When it's eventually built, it will:
- Connect to the same Supabase project, gated behind the Supabase Auth login already created
- View/manage all questions and feedback in one place
- Follow a status pipeline: **New → Reviewing → Drafting a post → Published / Ignored-Duplicate**
- Turn raw submissions into a working content pipeline, not a raw data dump

---

## 7. Content Authoring

- Posts written as **MDX files in the website repo** (not database-driven)
- Why: no custom editor to build, native code/syntax highlighting for technical content, git history doubles as version control/backup, trivial to update old posts with FAQ sections pulled from widget questions
- Frontmatter: `title`, `slug`, `tags`, `description`, `ogImage`, `date`
- Include heading anchors/IDs in posts to support precise widget context capture

---

## 8. Newsletter

- Emails collected via the widget's Newsletter state
- Sending via **Resend** (free tier ≈ 3,000 emails/month — comfortably covers current scale)
- Trigger: manual send on publish to start; revisit Supabase Edge Function automation later if needed

---

## 9. SEO & Shareability

- Clean, consistent slugs per post
- Open Graph tags (title, description, preview image) per post — important since the cohort will share links in WhatsApp/LinkedIn
- Standard sitemap

---

## 10. Analytics

- **Vercel Web Analytics** (free tier) to start — zero extra setup since already on Vercel
- Fallback if limits are hit: **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner needed)

---

## 11. Hosting & Infra (all free tier at current scale)

| Layer | Tool | Cost |
|---|---|---|
| Hosting | Vercel (Hobby) | Free |
| Domain | `.vercel.app` for now | Free (defer custom domain) |
| Backend | Supabase | Free tier |
| Repos | GitHub (public site + private dashboard) | Free |
| Email | Resend | Free tier |

---

## 12. Development Workflow

- This doc lives at `/docs/PROJECT_SPEC.md` in the repo so any coding agent has persistent context without manual relay
- **Git branching**: `main` (production) ← `dev` (staging, auto-deployed via Vercel preview) ← `feature/*` branches per task
- Agents work **only** within feature branches — no push access to `dev` or `main`
- Flow per task: agent completes work on a feature branch → opens PR into `dev` → you review the diff + check the `dev` Vercel preview deployment → once verified, you manually merge `dev` → `main`
- Commit before any agent work begins; have agents commit incrementally so any bad step can be reverted in seconds
- Use Plan Mode for complex tasks and Review Gates/Walkthroughs to review each change before approving — avoid full autopilot, especially for a live site
- Work **one phase/feature at a time**, not "build everything" in a single pass

---

## 13. Suggested Build Order

1. Landing hero: 3-button layout, light-mode recoloring of existing gradient/audio-bar elements
2. Portfolio pages: consistent Resume button across Experience / Projects / Contact
3. Blogs shell: nav, archive/tag structure, minimalist design system (light + dark)
4. Supabase setup: tables, RLS policies (anon insert-only + authenticated SELECT/UPDATE), admin auth account
5. Floating widget: UI + Supabase integration
6. Feedback form page: UI + Supabase integration
7. MDX post template + first "Start Here" post
8. Newsletter: subscriber capture + Resend integration
9. SEO/OG tags + analytics integration

*(Admin dashboard is a separate future project, not part of this build — the backend is already prepared for it after step 4.)*
