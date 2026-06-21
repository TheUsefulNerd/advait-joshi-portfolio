import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { allPosts } from '@/lib/posts';
import { FloatingWidget } from '@/components/blog/FloatingWidget';
import '../../styles/blog.css';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="blog-page">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1>Post Not Found</h1>
          <p style={{ color: 'var(--blog-text-muted)', marginBottom: '2rem' }}>
            The post you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog" className="blog-tag" style={{ textDecoration: 'none' }}>
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page" style={{ position: 'relative' }}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <div style={{ marginBottom: '2rem' }}>
          <Link
            to="/blog"
            style={{
              color: 'var(--blog-text-muted)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            ← Back to all posts
          </Link>
        </div>

        {/* Post header */}
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            {post.title}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              color: 'var(--blog-text-muted)',
              fontSize: '0.9rem',
            }}
          >
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag" style={{ cursor: 'default' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Post content */}
        <article style={{ minHeight: '40vh' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--blog-text-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>
            {post.description}
          </p>
          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <hr className="blog-divider" style={{ margin: '4rem 0 2rem' }} />

        {/* Footer actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'var(--blog-bg-secondary)',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Help me improve</h3>
          <p style={{ color: 'var(--blog-text-muted)', fontSize: '0.95rem', margin: 0 }}>
            Was this post confusing? Too simple? Just right? Your feedback shapes future content.
          </p>
          <div style={{ marginTop: '0.5rem' }}>
            <Link
              to={`/blog/feedback?post=${post.slug}`}
              className="blog-submit-btn"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              Give Feedback
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Widget (Questions & Newsletter) */}
      <FloatingWidget currentPostSlug={post.slug} currentPostTitle={post.title} />
    </div>
  );
};

export default BlogPost;
