import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allPosts } from '@/lib/posts';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { SEO } from '@/components/SEO';
import '../../styles/blog.css';

const BlogHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('topic');

  let filteredPosts = allPosts;
  if (activeCategory) {
    filteredPosts = filteredPosts.filter((post) => 
      post.tags[0]?.toLowerCase() === activeCategory.toLowerCase()
    );
  }
  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  const sortedFiltered = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));

  return (
    <>
      <SEO title="Blogs | Advait Joshi" description="Articles on AI, Agentic Systems, and more." />
      <BlogLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSidebar={false}>
        {sortedFiltered.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-foreground-muted mb-2">No posts found</h3>
          <p className="text-sm">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <header className="mb-2">
            <h1 className="text-4xl font-bold mb-6">Recent Blogs</h1>
            {/* Tag filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  className={`blog-tag ${!activeCategory ? 'active' : ''}`}
                  onClick={() => setSearchParams({})}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`blog-tag ${activeCategory === tag ? 'active' : ''}`}
                    onClick={() => setSearchParams({ topic: tag })}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            <hr className="blog-divider !mt-8 !mb-0" />
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFiltered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </BlogLayout>
    </>
  );
};

export default BlogHome;
