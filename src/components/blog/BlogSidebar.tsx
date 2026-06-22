import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { allPosts } from '@/lib/posts';

interface BlogSidebarProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

export function BlogSidebar({ searchQuery, setSearchQuery }: BlogSidebarProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeCategory = searchParams.get('topic');

  const categoriesMap = allPosts.reduce<Record<string, number>>((acc, post) => {
    const primaryTag = post.tags[0] || 'other';
    acc[primaryTag] = (acc[primaryTag] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.keys(categoriesMap).sort();

  const isAllPostsActive = !activeCategory && (location.pathname === '/blog/archive' || location.pathname === '/blog');
  const activeClass = "bg-foreground/5 dark:bg-foreground/10 text-foreground font-bold";
  const inactiveClass = "hover:bg-foreground/5 dark:hover:bg-foreground/10 text-foreground-muted hover:text-foreground font-medium";

  return (
    <aside className="w-full md:w-[240px] flex-shrink-0 sticky top-24 self-start">
      {setSearchQuery && (
        <div className="relative mb-6 group">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted group-focus-within:text-purple transition-colors" />
          <input
            className="blog-input w-full transition-all duration-300 bg-background border border-border/80 dark:border-white/20 hover:border-border focus:ring-1 focus:ring-purple/50 focus:border-purple/50 rounded-lg"
            style={{ paddingLeft: '2.5rem', paddingTop: '0.65rem', paddingBottom: '0.65rem' }}
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <Link 
            to="/blog/archive"
            className={`no-underline w-full text-left px-3 py-1.5 rounded-md transition-colors flex items-center justify-between flex-shrink-0 ${isAllPostsActive ? activeClass : inactiveClass}`}
          >
            <span>All posts</span>
            <span className="text-xs font-medium opacity-50 ml-3">{allPosts.length}</span>
          </Link>
        </div>
        
        <div>
          <h3 className="text-[11px] font-bold text-foreground-muted uppercase tracking-widest mb-2 ml-3 mt-1">Topics</h3>
          <div className="flex flex-row md:flex-col gap-0.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/blog/archive?topic=${cat}`}
                className={`no-underline w-full text-left px-3 py-1.5 rounded-md transition-colors flex items-center justify-between flex-shrink-0 ${activeCategory === cat ? activeClass : inactiveClass}`}
              >
                <span className="capitalize">{cat}</span>
                <span className="text-xs font-medium opacity-50 ml-3">{categoriesMap[cat]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
