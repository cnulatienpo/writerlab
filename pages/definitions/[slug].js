import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'definitions'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'definitions', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    props: {
      title: data.title || params.slug,
      contentHtml
    }
  };
}

export default function DefinitionPage({ title, contentHtml }) {
  return (
    <main style={{ padding: '2rem', color: '#f4f4f4', background: '#111', minHeight: '100vh' }}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  );
}
