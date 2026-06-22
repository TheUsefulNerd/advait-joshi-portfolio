# Advait Joshi — Portfolio + Blog

A modern, dual-audience personal website featuring a professional portfolio and an integrated technical blog. Built with React, TypeScript, Tailwind CSS, and a serverless Supabase backend.

## 🌐 Live Site

**URL**: https://advait-joshi-portfolio.vercel.app/

---

## 👤 About

Portfolio for **Advait Joshi** — ML Engineer & AI Researcher.

- 🎓 CSE (Data Science) student at SVIT, graduating 2027
- 💼 ML Engineer Intern @ TechPeek | AI Engineer Intern @ DRDO
- 🔬 Research Intern @ IIT Kanpur & IIT Patna
- ⛓️ Blockchain Developer Intern @ Inspiring Wave
- 🔗 [GitHub](https://github.com/TheUsefulNerd) · [LinkedIn](https://linkedin.com/in/advaitszone)

---

## 🗂️ Site Architecture

This site operates in two distinct modes to serve different audiences without clutter:

### 1. Portfolio Mode
For recruiters and professional contacts.
- **Home (`/`)**: Landing hero with smooth animations and entry points.
- **About (`/portfolio/about`)**: Personal journey, highlights, top skills, education, and a contact form.
- **Experience (`/portfolio/experience`)**: Timeline of internships and work history.
- **Projects (`/portfolio/projects`)**: Featured machine learning, agentic AI, and RAG projects.

### 2. Blog Mode
For technical readers and professionals. Features a clean, minimalist, editorial design.
- **Blog Home (`/blog`)**: Recent posts and tag filtering.
- **Blog Archive (`/blog/archive`)**: Complete list of all published articles.
- **Blog Post (`/blog/:slug`)**: Full markdown articles with a generated Table of Contents and one-click sharing.
- **Feedback Form (`/blog/feedback`)**: Dedicated page for readers to rate content clarity and style.

### ✨ Unique Features
- **Floating "Ask" Widget:** A sticky, interactive widget allowing readers to ask questions or subscribe to the newsletter from anywhere on the blog.
- **Supabase Backend:** Secure data collection for newsletter subscribers, user questions, and content feedback. Protected via strict Row Level Security (RLS).
- **SEO Optimized:** Dynamic Open Graph and Twitter tags for seamless sharing across platforms.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **Backend & Database**: Supabase (PostgreSQL, Auth, RLS)
- **Data Fetching**: TanStack Query
- **Icons**: Lucide React
- **Markdown**: react-markdown + remark-gfm + rehype-slug

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase Project (for backend features)

### Setup Supabase

1. Create a project on [Supabase](https://supabase.com).
2. Copy the contents of `supabase/schema.sql` and run it in the Supabase SQL Editor to create the necessary tables and RLS policies.
3. Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available locally (check your terminal for the exact localhost port).

### Other Scripts

```bash
npm run build       # Production build
npm run preview     # Preview the production build locally
npm run lint        # Run ESLint
```

---

## 📄 License

This project is for personal use. All content and design © 2026 Advait Joshi.
