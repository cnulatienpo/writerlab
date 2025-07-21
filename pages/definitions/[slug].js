import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getStaticPaths() {
  const dirPath = path.join(process.cwd(), 'definitions');
  const files = fs.readdirSync(dirPath);

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'definitions', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  return {
    props: {
      content: marked(content),
      frontmatter: data || {},
      slug: params.slug
    }
  };
}

export default function DefinitionPage({ content, frontmatter, slug }) {
  return (
    <main style={{ padding: '2rem', color: '#f4f4f4', background: '#111', minHeight: '100vh' }}>
      <h1>{frontmatter.title || slug}</h1>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
