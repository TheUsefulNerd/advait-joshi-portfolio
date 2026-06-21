import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Folder, FolderOpen } from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));
  
  const categoriesMap = allPosts.reduce<Record<string, number>>((acc, post) => {
    const primaryTag = post.tags[0] || 'other';
    acc[primaryTag] = (acc[primaryTag] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.keys(categoriesMap).sort();

  const filtered = allPosts
    .filter((p) => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.tags.some(t => t.toLowerCase().includes(s))
      );
    })
    .filter((p) => !activeTag || p.tags.includes(activeTag))
    .filter((p) => !activeCategory || (p.tags[0] || 'other') === activeCategory);

  const sortedFiltered = [...filtered].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const byCategory = filtered.reduce<Record<string, typeof filtered>>((acc, post) => {
    const primaryTag = post.tags[0] || 'other';
    (acc[primaryTag] ??= []).push(post);
    return acc;
  }, {});

  const visibleCategories = Object.keys(byCategory).sort();
  visibleCategories.forEach(cat => {
    byCategory[cat].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return (
    <div className="blog-page">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-3">Archive</h1>
          <p style={{ color: 'var(--blog-text-muted)' }} className="text-lg">
            Explore all posts, organized by category and tags.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            {/* Search */}
            <div className="relative mb-8 group">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted group-focus-within:text-purple transition-colors" />
              <input
                className="blog-input w-full transition-all duration-300 focus:ring-2 focus:ring-purple/30 focus:border-purple"
                style={{ paddingLeft: '2.5rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                type="text"
                placeholder="Search articles, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categories (Folders) */}
            <div>
              <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-1">Folders</h3>
              <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                <button 
                  onClick={() => setActiveCategory(null)} 
                  className={`text-left px-3 py-2.5 rounded-lg transition-all whitespace-nowrap flex items-center justify-between flex-shrink-0 ${!activeCategory ? 'bg-purple/10 text-purple font-semibold' : 'hover:bg-card-hover text-foreground-muted hover:text-foreground'}`}
                >
                  <span className="flex items-center gap-2.5">
                    {!activeCategory ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4 opacity-70" />}
                    All Posts
                  </span>
                  <span className="text-xs font-medium opacity-60 bg-background/50 px-2 py-0.5 rounded-full">{allPosts.length}</span>
                </button>
                
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`text-left px-3 py-2.5 rounded-lg transition-all whitespace-nowrap flex items-center justify-between flex-shrink-0 ${activeCategory === cat ? 'bg-purple/10 text-purple font-semibold' : 'hover:bg-card-hover text-foreground-muted hover:text-foreground'}`}
                  >
                    <span className="flex items-center gap-2.5 capitalize">
                      {activeCategory === cat ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4 opacity-70" />}
                      {cat}
                    </span>
                    <span className="text-xs font-medium opacity-60 bg-background/50 px-2 py-0.5 rounded-full">{categoriesMap[cat]}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button 
                className={`blog-tag transition-all duration-300 ${!activeTag ? 'active ring-2 ring-purple/40 bg-purple/10 !text-purple' : 'opacity-60 hover:opacity-100'}`} 
                onClick={() => setActiveTag(null)}
              >
                All Tags
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`blog-tag transition-all duration-300 ${activeTag === tag ? 'active ring-2 ring-purple/40 bg-purple/10 !text-purple' : 'opacity-60 hover:opacity-100'}`}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <span className="text-sm font-medium text-foreground-muted">
                Showing {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-xl border border-border">
                <FolderOpen className="w-12 h-12 text-foreground-muted opacity-30 mx-auto mb-4" />
                <p className="text-lg text-foreground-muted font-medium">No posts found</p>
                <p className="text-sm text-foreground-muted opacity-70 mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : activeCategory ? (
              <div className="flex flex-col gap-3">
                {sortedFiltered.map((post, index) => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="block no-underline group">
                    <div className="blog-card flex items-center gap-4 p-4 md:px-6 transition-all duration-300 group-hover:border-purple/30 group-hover:bg-purple/5">
                      <div className="text-lg font-bold text-foreground-muted/50 min-w-[2rem] text-right group-hover:text-purple/50 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="blog-card-title m-0 text-base md:text-lg truncate group-hover:text-purple transition-colors">{post.title}</h3>
                      </div>
                      <span className="blog-card-meta flex-shrink-0 text-xs md:text-sm">
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {visibleCategories.map((cat) => (
                  <section key={cat}>
                    <h2 className="mt-0 mb-5 capitalize flex items-center gap-3 text-2xl font-bold border-b border-border/50 pb-3">
                      <FolderOpen className="w-6 h-6 text-purple" /> 
                      {cat}
                      <span className="text-sm font-medium bg-purple/10 text-purple px-2.5 py-0.5 rounded-full ml-2">
                        {byCategory[cat].length}
                      </span>
                    </h2>
                    <div className="flex flex-col gap-3">
                      {byCategory[cat].map((post, index) => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="block no-underline group">
                          <div className="blog-card flex items-center gap-4 p-4 md:px-6 transition-all duration-300 group-hover:border-purple/30 group-hover:bg-purple/5">
                            <div className="text-lg font-bold text-foreground-muted/50 min-w-[2rem] text-right group-hover:text-purple/50 transition-colors">
                              {(index + 1).toString().padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="blog-card-title m-0 text-base md:text-lg truncate group-hover:text-purple transition-colors">{post.title}</h3>
                            </div>
                            <span className="blog-card-meta flex-shrink-0 text-xs md:text-sm">
                              {formatDate(post.date)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogArchive;
