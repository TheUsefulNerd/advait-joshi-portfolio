import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned?: boolean;
  content: string; // raw markdown body
}

// Import all markdown files eagerly and as raw strings
const modules = import.meta.glob('/content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const posts: Post[] = Object.values(modules).map((fileContent) => {
  const { data, content } = matter(fileContent as string);
  return {
    slug: data.slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    pinned: data.pinned,
    content,
  };
});

// Sort by date descending
export const allPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
