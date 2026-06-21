import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { ContentFeedbackInsert } from '../../lib/supabase';
import '../../styles/blog.css';

const BlogFeedback = () => {
  const location = useLocation();
  const [postSlug, setPostSlug] = useState(
    new URLSearchParams(location.search).get('post') ?? ''
  );
  const [clarityRating, setClarityRating] = useState(0);
  const [styleRating, setStyleRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postSlug) return;

    setStatus('submitting');

    const payload: ContentFeedbackInsert = {
      post_slug: postSlug,
      clarity_rating: clarityRating || null,
      style_rating: styleRating || null,
      comment: comment.trim() || null,
    };

    const { error } = await supabase.from('content_feedback').insert(payload);

    if (error) {
      console.error('Feedback error:', error);
      setStatus('error');
    } else {
      setStatus('success');
      setComment('');
      setClarityRating(0);
      setStyleRating(0);
    }
  };

  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number;
    onChange: (v: number) => void;
    label: string;
  }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <label className="blog-form-label">{label}</label>
      <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= value ? 'filled' : ''}`}
            onClick={() => onChange(star)}
            aria-label={`${star} star`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );

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
          <form onSubmit={handleSubmit}>
            {/* Post reference */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="blog-form-label" htmlFor="post-ref">
                Post slug / reference *
              </label>
              <input
                id="post-ref"
                className="blog-input"
                type="text"
                required
                value={postSlug}
                onChange={(e) => setPostSlug(e.target.value)}
                placeholder="e.g. start-here"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--blog-text-muted)' }}>
                Found in the post URL after /blog/
              </span>
            </div>

            <StarRating value={clarityRating} onChange={setClarityRating} label="Clarity — How easy was it to follow?" />
            <StarRating value={styleRating} onChange={setStyleRating} label="Style — Was the writing engaging and well-paced?" />

            {/* Comment */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="blog-form-label" htmlFor="comment">
                What would make this easier to follow? (optional)
              </label>
              <textarea
                id="comment"
                className="blog-input"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any specific section that was confusing, or suggestions for examples..."
                style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#C0392B', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="blog-submit-btn"
              disabled={status === 'submitting' || !postSlug}
              style={{ opacity: status === 'submitting' ? 0.6 : 1 }}
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogFeedback;
