import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { allPosts } from '@/lib/posts';
import { useToast } from '@/hooks/use-toast';
import { FloatingWidget } from '@/components/blog/FloatingWidget';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { SEO } from '@/components/SEO';
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
  const [activeSection, setActiveSection] = useState<string>('');
  const { toast } = useToast();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Blog post link copied to clipboard.",
    });
  };

  const toc = useMemo(() => {
    if (!post) return [];
    const headings = [];
    const regex = /^(##|###)\s+(.*)$/gm;
    let match;
    while ((match = regex.exec(post.content)) !== null) {
      headings.push({
        level: match[1].length,
        title: match[2].trim(),
        id: match[2].trim().toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, ''),
      });
    }
    return headings;
  }, [post?.content]);

  if (!post) {
    return (
      <div className="blog-page">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-foreground-muted mb-8 text-lg">
            The post you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog/archive" className="inline-flex items-center gap-2 text-purple font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title} 
        description={post.description} 
        type="article" 
        image={post.image}
        url={`https://advaitjoshi.com/blog/${post.slug}`} 
      />
      <BlogLayout
        rightSidebar={
          <div className="sticky top-24">
            {toc.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-widest mb-4">On this page</h4>
                <ul className="flex flex-col gap-2 border-l-2 border-border/30 pl-4">
                  {toc.map((heading, idx) => (
                    <li key={idx} className="relative">
                      {activeSection === heading.id && (
                        <div className="absolute -left-[18px] top-0 bottom-0 w-[2px] bg-purple rounded-full" />
                      )}
                      <a 
                        href={`#${heading.id}`}
                        onClick={() => setActiveSection(heading.id)}
                        className={`text-sm block py-1 transition-colors rounded-r-md hover:bg-secondary/50 px-2 ${
                          heading.level === 3 ? 'ml-3' : ''
                        } ${activeSection === heading.id ? 'text-purple font-semibold bg-purple/5' : 'text-foreground-muted hover:text-foreground'}`}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        }
      >
        <div className="max-w-3xl">
          {/* Mobile back link */}
          <div className="md:hidden mb-8">
            <Link to="/blog/archive" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground font-medium text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all posts
            </Link>
          </div>

          <article>
            {/* Header */}
            <header className="mb-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-semibold text-foreground-muted mb-4">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="opacity-50">•</span>
                <span className="capitalize">{post.tags[0]}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 tracking-tight">
                {post.title}
              </h1>
              
              <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed font-light mb-8">
                {post.description}
              </p>

              {/* Share Button */}
              <div className="flex items-center justify-center md:justify-start mt-6">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary/50 hover:bg-secondary text-foreground-muted hover:text-foreground text-sm font-medium transition-colors"
                  aria-label="Copy Link"
                >
                  <LinkIcon className="w-4 h-4" /> Copy Link
                </button>
              </div>
            </header>



            {/* Prose Content */}
            <div className="blog-prose prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeSlug]}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          <hr className="my-16 border-border/60" />

          {/* Footer Feedback */}
          <div className="bg-secondary/30 w-full py-4 px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between rounded-lg mt-12">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-sm font-semibold mb-0.5 text-foreground">Help me improve</h3>
              <p className="text-sm text-foreground-muted">
                Was this post confusing? Too simple? Just right?
              </p>
            </div>
            <Link
              to={`/blog/feedback?post=${post.slug}`}
              className="no-underline whitespace-nowrap px-4 py-2 rounded-md bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Give Feedback
            </Link>
          </div>
        </div>

        <FloatingWidget currentPostSlug={post.slug} currentPostTitle={post.title} />
      </BlogLayout>
    </>
  );
};

export default BlogPost;
