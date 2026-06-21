import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allPosts } from '@/lib/posts';
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
    .filter((p) => !activeTag || p.tags.includes(activeTag));

  // Group by primary tag
  const byTag = filtered.reduce<Record<string, typeof filtered>>((acc, post) => {
    const primaryTag = post.tags[0] || 'other';
    (acc[primaryTag] ??= []).push(post);
    return acc;
  }, {});

  const tags = Object.keys(byTag).sort();

  // Sort posts within each group: oldest first (sequential reading order)
  tags.forEach(tag => {
    byTag[tag].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return (
    <div className="blog-page">
      <div className="max-w-3xl mx-auto px-6 py-12">

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

        {tags.map((tag) => (
          <section key={tag} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ marginTop: 0, textTransform: 'capitalize' }}>{tag}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {byTag[tag].map((post, index) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="blog-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--blog-text-muted)', minWidth: '1.5rem', textAlign: 'right' }}>
                      {index + 1}.
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div className="blog-card-title" style={{ margin: 0, fontSize: '1.1rem' }}>{post.title}</div>
                    </div>
                    <span className="blog-card-meta" style={{ flexShrink: 0 }}>
                      {formatDate(post.date)}
                    </span>
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
