import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/blog.css';

// ── Placeholder posts data (replace with real MDX imports in Phase 7) ─────────
export const allPosts = [
  {
    slug: 'start-here',
    title: 'Start Here — Your Roadmap to Understanding AI',
    description:
      'New to AI? This is the post to read first. A plain-language glossary and reading roadmap for the 200+ person cohort.',
    date: '2026-06-21',
    tags: ['beginner', 'guide', 'glossary'],
    pinned: true,
  },
];

const tagColors: Record<string, string> = {
  beginner: 'beginner',
  guide: 'guide',
  glossary: 'glossary',
  'deep-dive': 'deep-dive',
  llm: 'llm',
  rag: 'rag',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogHome = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));
  const pinnedPost = allPosts.find((p) => p.pinned);
  const filtered = allPosts
    .filter((p) => !p.pinned)
    .filter((p) => !activeTag || p.tags.includes(activeTag));

  return (
    <div className="blog-page">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="mb-10">
          <h1>Blogs</h1>
          <p style={{ color: 'var(--blog-text-muted)', lineHeight: '1.65', maxWidth: '55ch' }}>
            Plain-language AI & ML insights for a mixed tech/non-tech audience.
            New posts turn reader questions into content — ask yours via the widget.
          </p>
        </header>

        {/* ── Pinned "Start Here" ──────────────────────────────────────────── */}
        {pinnedPost && (
          <Link to={`/blog/${pinnedPost.slug}`} style={{ textDecoration: 'none' }}>
            <div className="blog-pinned" style={{ marginBottom: '2.5rem' }}>
              <div className="blog-card-title" style={{ marginTop: '0.5rem' }}>
                {pinnedPost.title}
              </div>
              <p className="blog-card-excerpt">{pinnedPost.description}</p>
              <div className="blog-card-meta">{formatDate(pinnedPost.date)}</div>
            </div>
          </Link>
        )}

        {/* ── Tag filter ──────────────────────────────────────────────────── */}
        {allTags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            <button
              className={`blog-tag ${!activeTag ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-tag ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <hr className="blog-divider" />

        {/* ── Recent posts list ────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--blog-text-muted)', textAlign: 'center', padding: '3rem 0' }}>
            {activeTag ? `No posts tagged "${activeTag}" yet.` : 'More posts coming soon!'}
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="blog-card">
                <div className="blog-card-title">{post.title}</div>
                <p className="blog-card-excerpt">{post.description}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag" style={{ cursor: 'default' }}>{tag}</span>
                    ))}
                  </div>
                  <span className="blog-card-meta">{formatDate(post.date)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
