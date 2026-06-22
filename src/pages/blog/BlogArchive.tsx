import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Folder, FolderOpen, ArrowRight } from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Derive categories from all posts
  const categoriesMap = allPosts.reduce<Record<string, number>>((acc, post) => {
    const primaryTag = post.tags[0] || 'other';
    acc[primaryTag] = (acc[primaryTag] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.keys(categoriesMap).sort();

  // Filter posts based on search and activeCategory
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
    .filter((p) => !activeCategory || (p.tags[0] || 'other') === activeCategory);

  const sortedFiltered = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="blog-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
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

            {/* Navigation / Topics */}
            <div>
              <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-1">Topics</h3>
              <div className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                <button 
                  onClick={() => setActiveCategory(null)} 
                  className={`text-left px-3 py-2.5 rounded-lg transition-all whitespace-nowrap flex items-center justify-between flex-shrink-0 ${!activeCategory ? 'bg-purple/10 text-purple font-semibold' : 'hover:bg-card-hover text-foreground-muted hover:text-foreground'}`}
                >
                  <span className="flex items-center gap-2.5">
                    All Topics
                  </span>
                  <span className="text-xs font-medium opacity-60 bg-background/50 px-2 py-0.5 rounded-full">{allPosts.length}</span>
                </button>
                
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2.5 rounded-lg transition-all whitespace-nowrap flex items-center justify-between flex-shrink-0 ${activeCategory === cat ? 'bg-purple/10 text-purple font-semibold' : 'hover:bg-card-hover text-foreground-muted hover:text-foreground'}`}
                  >
                    <span className="flex items-center gap-2.5 capitalize">
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
            {!activeCategory ? (
              // STATE 1: All Topics Selected -> Show Folder Grid
              <div>
                <header className="mb-10 text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-3">All Topics</h1>
                  <p style={{ color: 'var(--blog-text-muted)' }} className="text-lg">
                    Explore our blogs by category.
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="text-left flex flex-col items-start gap-4 group blog-card w-full"
                    >
                      <div className="bg-purple/10 p-3 rounded-lg text-purple group-hover:scale-110 transition-transform duration-300">
                        <Folder className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold capitalize m-0 group-hover:text-purple transition-colors">{cat}</h3>
                        <p className="text-sm text-foreground-muted mt-1">{categoriesMap[cat]} posts</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // STATE 2: Specific Folder Selected -> Show OpenAI Style Post List
              <div>
                <header className="mb-10 flex items-center justify-between border-b border-border pb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 capitalize flex items-center gap-3">
                      <FolderOpen className="w-8 h-8 text-purple" />
                      {activeCategory}
                    </h1>
                    <p style={{ color: 'var(--blog-text-muted)' }} className="text-lg">
                      Showing {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} in this topic.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="text-sm font-medium text-foreground-muted hover:text-purple transition-colors flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border"
                  >
                    View All Topics
                  </button>
                </header>

                {filtered.length === 0 ? (
                  <div className="text-center py-20 bg-card rounded-xl border border-border">
                    <FolderOpen className="w-12 h-12 text-foreground-muted opacity-30 mx-auto mb-4" />
                    <p className="text-lg text-foreground-muted font-medium">No posts found</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {sortedFiltered.map((post) => (
                      <Link key={post.slug} to={`/blog/${post.slug}`} className="block no-underline group blog-card">
                        <div>
                          <span className="text-sm font-semibold text-purple mb-3 block">
                            {formatDate(post.date)}
                          </span>
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-purple transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-foreground-muted line-clamp-2 mb-4 leading-relaxed">
                            {post.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-foreground hover:text-purple transition-colors">
                            Read more <ArrowRight className="ml-1.5 w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogArchive;
