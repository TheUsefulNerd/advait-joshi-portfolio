import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allPosts } from './BlogHome';
import '../../styles/blog.css';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogArchive = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

  const filtered = allPosts
    .filter((p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => !activeTag || p.tags.includes(activeTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group by year
  const byYear = filtered.reduce<Record<string, typeof filtered>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    (acc[year] ??= []).push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="blog-page">
      <div className="max-w-2xl mx-auto px-6 py-12">

        <header className="mb-8">
          <h1>Archive</h1>
          <p style={{ color: 'var(--blog-text-muted)' }}>
            All posts, searchable and filterable by tag.
          </p>
        </header>

        {/* Search */}
        <div style={{ marginBottom: '1.25rem' }}>
          <input
            className="blog-input"
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          <button className={`blog-tag ${!activeTag ? 'active' : ''}`} onClick={() => setActiveTag(null)}>
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

        <hr className="blog-divider" />

        {filtered.length === 0 && (
          <p style={{ color: 'var(--blog-text-muted)', textAlign: 'center', padding: '3rem 0' }}>
            No posts match your search.
          </p>
        )}

        {years.map((year) => (
          <section key={year} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ marginTop: 0 }}>{year}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {byYear[year].map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="blog-card">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div className="blog-card-title">{post.title}</div>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                          {post.tags.map((tag) => (
                            <span key={tag} className="blog-tag" style={{ cursor: 'default' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <span className="blog-card-meta" style={{ flexShrink: 0, paddingTop: '0.1rem' }}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BlogArchive;
