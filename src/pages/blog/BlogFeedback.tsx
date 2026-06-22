import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ContentFeedbackInsert } from '../../lib/supabase';
import '../../styles/blog.css';

const BlogFeedback = () => {
  const [name, setName] = useState('');
  const [postRef, setPostRef] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [clarityRating, setClarityRating] = useState<number | null>(null);
  const [styleRating, setStyleRating] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setStatus('submitting');

    const payload: ContentFeedbackInsert = {
      post_slug: postRef.trim() || '',
      clarity_rating: clarityRating,
      style_rating: styleRating,
      comment: comment.trim(),
    };

    const { error } = await supabase.from('content_feedback').insert(payload);

    if (error) {
      console.error('Feedback error:', error);
      setStatus('error');
    } else {
      setStatus('success');
      setComment('');
      setPostRef('');
      setName('');
      setEmail('');
      setClarityRating(null);
      setStyleRating(null);
    }
  };

  return (
    <div className="blog-page">
      <div className="max-w-xl mx-auto px-6 py-12">
        <header style={{ marginBottom: '2rem' }}>
          <h1>Feedback</h1>
          <p style={{ color: 'var(--blog-text-muted)' }}>
            Help me write better. Your honest feedback shapes future posts.
          </p>
        </header>

        {status === 'success' ? (
          <div
            style={{
              background: 'var(--blog-card-bg)',
              border: '1px solid var(--blog-border)',
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🙏</p>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Thank you!</p>
            <p style={{ color: 'var(--blog-text-muted)', fontSize: '0.9rem' }}>
              Your feedback has been recorded and will help improve this post.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="blog-form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="blog-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="blog-form-label" htmlFor="post-ref">
                Which post are you writing about?
              </label>
              <input
                id="post-ref"
                className="blog-input"
                type="text"
                value={postRef}
                onChange={(e) => setPostRef(e.target.value)}
                placeholder="Title or topic of the post"
              />
            </div>

            <div>
              <label className="blog-form-label">Clarity Rating (1-5)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={`clarity-${num}`}
                    type="button"
                    onClick={() => setClarityRating(num)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `1px solid ${clarityRating === num ? 'var(--blog-accent)' : 'var(--blog-border)'}`,
                      background: clarityRating === num ? 'var(--blog-accent)' : 'transparent',
                      color: clarityRating === num ? '#fff' : 'var(--blog-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="blog-form-label">Style Rating (1-5)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={`style-${num}`}
                    type="button"
                    onClick={() => setStyleRating(num)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `1px solid ${styleRating === num ? 'var(--blog-accent)' : 'var(--blog-border)'}`,
                      background: styleRating === num ? 'var(--blog-accent)' : 'transparent',
                      color: styleRating === num ? '#fff' : 'var(--blog-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="blog-form-label" htmlFor="comment">
                Your feedback *
              </label>
              <textarea
                id="comment"
                className="blog-input"
                rows={6}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What worked, what didn't, what you'd like to see explained differently..."
                style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
              />
            </div>

            <div>
              <label className="blog-form-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                className="blog-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="only if you'd like me to respond"
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#C0392B', fontSize: '0.875rem', margin: 0 }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="blog-submit-btn"
              disabled={status === 'submitting' || !comment.trim()}
              style={{ opacity: status === 'submitting' ? 0.6 : 1, marginTop: '0.5rem' }}
            >
              {status === 'submitting' ? 'Sending…' : 'Send Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogFeedback;
