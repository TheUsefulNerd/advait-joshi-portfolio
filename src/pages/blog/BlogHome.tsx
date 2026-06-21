import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allPosts } from '@/lib/posts';
import '../../styles/blog.css';

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
  const filtered = allPosts
    .filter((p) => !activeTag || p.tags.includes(activeTag));

  return (
    <div className="blog-page">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="mb-10">
          <h1>Blogs</h1>
        </header>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="blog-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px' }}>
                <div className="blog-card-title">{post.title}</div>
                <p className="blog-card-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>{post.description}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag" style={{ cursor: 'default', fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>{tag}</span>
                    ))}
                  </div>
                  <span className="blog-card-meta" style={{ fontSize: '0.8rem' }}>{formatDate(post.date)}</span>
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
