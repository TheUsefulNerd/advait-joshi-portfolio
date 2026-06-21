import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { QuestionInsert, SubscriberInsert } from '@/lib/supabase';
import { MessageSquare, Mail, X, Send } from 'lucide-react';
import '@/styles/blog.css';

interface FloatingWidgetProps {
  currentPostSlug?: string;
  currentPostTitle?: string;
}

export function FloatingWidget({ currentPostSlug, currentPostTitle }: FloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ask' | 'subscribe'>('ask');

  // Question Form State
  const [qName, setQName] = useState('');
  const [qContent, setQContent] = useState('');
  const [qStatus, setQStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Subscribe Form State
  const [sEmail, setSEmail] = useState('');
  const [sStatus, setSStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qContent.trim()) return;

    setQStatus('submitting');
    const payload: QuestionInsert = {
      content: qContent.trim(),
      name: qName.trim() || null,
      post_slug: currentPostSlug || 'general',
      post_context: currentPostTitle || null,
      source: 'widget',
    };

    const { error } = await supabase.from('questions').insert(payload);
    if (error) {
      console.error('Question error:', error);
      setQStatus('error');
    } else {
      setQStatus('success');
      setQContent('');
      setQName('');
      setTimeout(() => setQStatus('idle'), 5000);
    }
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sEmail.trim()) return;

    setSStatus('submitting');
    const payload: SubscriberInsert = {
      email: sEmail.trim(),
    };

    const { error } = await supabase.from('subscribers').insert(payload);
    if (error) {
      // Handle unique constraint error specifically if possible, but for now generic error
      console.error('Subscribe error:', error);
      setSStatus('error');
    } else {
      setSStatus('success');
      setSEmail('');
      setTimeout(() => setSStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-transform duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        style={{
          background: 'var(--blog-accent)',
          color: '#FFF',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Open interactions"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Widget Panel */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] rounded-xl shadow-2xl transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'var(--blog-card-bg)',
          border: '1px solid var(--blog-border)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--blog-border)',
            background: 'var(--blog-bg-secondary)',
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('ask')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.25rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'ask' ? 600 : 400,
                color: activeTab === 'ask' ? 'var(--blog-text)' : 'var(--blog-text-muted)',
                borderBottom: activeTab === 'ask' ? '2px solid var(--blog-accent)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Ask a Question
            </button>
            <button
              onClick={() => setActiveTab('subscribe')}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.25rem 0.5rem',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'subscribe' ? 600 : 400,
                color: activeTab === 'subscribe' ? 'var(--blog-text)' : 'var(--blog-text-muted)',
                borderBottom: activeTab === 'subscribe' ? '2px solid var(--blog-accent)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              Newsletter
            </button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--blog-text-muted)', cursor: 'pointer' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: '1.25rem' }}>
          {activeTab === 'ask' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p style={{ fontSize: '0.875rem', color: 'var(--blog-text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                HAVE A QUESTION? PLEASE ASK - MAYBE YOU WILL SEE A BLOG ON IT SOON
              </p>

              {qStatus === 'success' ? (
                <div style={{ padding: '1rem', textAlign: 'center', background: 'var(--blog-bg-secondary)', borderRadius: '6px' }}>
                  <p style={{ fontWeight: 500, margin: 0 }}>Question received!</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--blog-text-muted)', margin: '0.25rem 0 0' }}>I'll try to cover it in a future post.</p>
                </div>
              ) : (
                <form onSubmit={handleQuestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    className="blog-input"
                    type="text"
                    placeholder="Name (Optional)"
                    value={qName}
                    onChange={(e) => setQName(e.target.value)}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                  />
                  <textarea
                    className="blog-input"
                    placeholder="Your question..."
                    value={qContent}
                    onChange={(e) => setQContent(e.target.value)}
                    required
                    rows={4}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem', resize: 'none' }}
                  />
                  {qStatus === 'error' && (
                    <p style={{ fontSize: '0.75rem', color: '#C0392B', margin: 0 }}>Failed to send. Try again.</p>
                  )}
                  <button
                    type="submit"
                    className="blog-submit-btn"
                    disabled={qStatus === 'submitting'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem' }}
                  >
                    {qStatus === 'submitting' ? 'Sending...' : (
                      <>
                        <Send className="w-4 h-4" /> Send Question
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p style={{ fontSize: '0.875rem', color: 'var(--blog-text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                Get notified as soon as I post a new blog. No spam, ever.
              </p>

              {sStatus === 'success' ? (
                <div style={{ padding: '1rem', textAlign: 'center', background: 'var(--blog-bg-secondary)', borderRadius: '6px' }}>
                  <p style={{ fontWeight: 500, margin: 0 }}>Subscribed!</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--blog-text-muted)', margin: '0.25rem 0 0' }}>Thanks for joining.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input
                    className="blog-input"
                    type="email"
                    placeholder="Email Address"
                    value={sEmail}
                    onChange={(e) => setSEmail(e.target.value)}
                    required
                    style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
                  />
                  {sStatus === 'error' && (
                    <p style={{ fontSize: '0.75rem', color: '#C0392B', margin: 0 }}>Subscription failed. You might already be subscribed.</p>
                  )}
                  <button
                    type="submit"
                    className="blog-submit-btn"
                    disabled={sStatus === 'submitting'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem' }}
                  >
                    {sStatus === 'submitting' ? 'Subscribing...' : (
                      <>
                        <Mail className="w-4 h-4" /> Subscribe
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
