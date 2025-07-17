import fs from 'fs';
import path from 'path';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const filePath = path.join(process.cwd(), 'definitions', slug);
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    content = 'Content not found.';
  }
  return {
    props: { slug, content },
  };
}

export default function DefinitionPage({ slug, content }) {
  return (
    <div>
      <h1>{slug}</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{content}</pre>
    </div>
  );
}
