export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  pinned?: boolean;
  content: string; // raw markdown body
}

// Custom lightweight frontmatter parser for the browser
function parseFrontmatter(markdown: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) return { data: {} as any, content: markdown };

  const frontmatterString = match[1];
  const content = markdown.slice(match[0].length).trim();
  const data: Record<string, any> = {};
  
  frontmatterString.split('\n').forEach(line => {
    const splitIndex = line.indexOf(':');
    if (splitIndex !== -1) {
      const key = line.slice(0, splitIndex).trim();
      let value: any = line.slice(splitIndex + 1).trim();
      
      // Strip quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays (tags)
      if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((v: string) => {
          v = v.trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            return v.slice(1, -1);
          }
          return v;
        }).filter(Boolean);
      } else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      
      data[key] = value;
    }
  });

  return { data, content };
}

// Import all markdown files eagerly and as raw strings
const modules = import.meta.glob('/content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const posts: Post[] = Object.values(modules).map((fileContent) => {
  const { data, content } = parseFrontmatter(fileContent as string);
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
