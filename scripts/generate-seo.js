import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Paths
const CONTENT_DIR = path.resolve('content/posts');
const DIST_DIR = path.resolve('dist');
const DIST_INDEX = path.join(DIST_DIR, 'index.html');

// Ensure dist and dist/index.html exist
if (!fs.existsSync(DIST_INDEX)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(DIST_INDEX, 'utf-8');

// Get all markdown files
const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));

console.log(`Generating SEO pre-rendered pages for ${files.length} posts...`);

files.forEach(file => {
  const filePath = path.join(CONTENT_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContent);
  const slug = data.slug;
  const title = data.title;
  const description = data.description;
  
  if (!slug) {
    console.warn(`Warning: ${file} is missing a slug. Skipping.`);
    return;
  }

  // Extract image
  let image = data.image;
  if (!image) {
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch) {
      image = imageMatch[1];
    }
  }

  // Use a default image if none found
  if (!image) {
    image = '/og-image.png'; // default fallback
  } else if (image.startsWith('/')) {
    image = `https://advaitjoshi.com${image}`;
  }

  const fullTitle = `${title} | Advait Joshi`;
  const url = `https://advaitjoshi.com/blog/${slug}`;

  // Replace tags in the template
  let postHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${fullTitle}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    // Add og:image if it doesn't exist, or replace if it does. Let's just insert it before twitter tags.
    .replace(/<meta name="twitter:card"/, `<meta property="og:image" content="${image}" />\n    <meta name="twitter:card"`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${fullTitle}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<\/head>/, `    <meta name="twitter:image" content="${image}" />\n  </head>`);

  // Ensure the target directory exists
  const targetDir = path.join(DIST_DIR, 'blog', slug);
  fs.mkdirSync(targetDir, { recursive: true });

  // Write the file
  fs.writeFileSync(path.join(targetDir, 'index.html'), postHtml);
  console.log(`✓ Pre-rendered: /blog/${slug}`);
});

console.log('SEO pre-rendering complete!');
