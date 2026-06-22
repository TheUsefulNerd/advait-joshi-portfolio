import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allPosts } from '@/lib/posts';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { BlogCard } from '@/components/blog/BlogCard';
import '../../styles/blog.css';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogArchive = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('topic');

  // Filter logic
  let filteredPosts = allPosts;
  if (activeCategory) {
    filteredPosts = filteredPosts.filter((post) => 
      post.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
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

  return (
    <BlogLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      {sortedFiltered.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium text-foreground-muted mb-2">No posts found</h3>
          <p className="text-sm">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFiltered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </BlogLayout>
  );
};

export default BlogArchive;
