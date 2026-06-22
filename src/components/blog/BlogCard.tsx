import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface BlogCardProps {
  post: any;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="block no-underline group bg-card rounded-xl border border-border/50 hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
    >
      {post.image ? (
        <div className="h-32 w-full border-b border-border/50 relative flex-shrink-0 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <div className="h-32 w-full bg-gradient-to-br from-[#E2F5E2] to-[#FF8C69] border-b border-border/50 relative flex-shrink-0"></div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs font-medium text-foreground-muted mb-1.5">
          {formatDate(post.date)}
        </div>
        <h3 className="text-lg font-bold mb-1.5 group-hover:text-purple transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-foreground-muted line-clamp-2 mb-3 text-sm leading-relaxed">
          {post.description}
        </p>
        
        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-3 mt-auto">
          {post.tags.map((tag: string) => (
            <span key={tag} className="text-[11px] font-medium bg-secondary/50 text-foreground-muted px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-1 border-t border-border/20">
          <span className="text-purple font-medium flex items-center gap-1.5 group-hover:gap-2 transition-all text-xs uppercase tracking-wide mt-2">
            Read more <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
