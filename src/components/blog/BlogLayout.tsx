import { ReactNode } from 'react';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

interface BlogLayoutProps {
  children: ReactNode;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  rightSidebar?: ReactNode;
  showSidebar?: boolean;
}

export function BlogLayout({ children, searchQuery, setSearchQuery, rightSidebar, showSidebar = true }: BlogLayoutProps) {
  return (
    <div className="blog-page relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-16 w-full">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-12 items-start w-full">
          {/* Left Column: Navigation Sidebar */}
          {showSidebar && (
            <BlogSidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          )}

          {/* Center Column: Main Content */}
          <main className={`flex-1 min-w-0 w-full flex flex-col ${showSidebar ? 'max-w-[1000px]' : 'max-w-none'}`}>
            {children}
          </main>

          {/* Right Column (Optional) */}
          {rightSidebar && (
            <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 self-start">
              {rightSidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
