import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Writer Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" />
      </Head>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Space Grotesk', sans-serif;
          background: #111;
          color: #f4f4f4;
          line-height: 1.6;
          padding: 2rem;
        }
        header {
          text-align: center;
          margin-bottom: 3rem;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .nav {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .nav a {
          text-decoration: none;
          color: #f4f4f4;
          font-weight: bold;
          border: 2px solid #f4f4f4;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .nav a:hover {
          background: #f4f4f4;
          color: #111;
        }
        footer {
          text-align: center;
          margin-top: 4rem;
          font-size: 0.85rem;
          color: #888;
        }
      `}</style>

      <header>
        <h1>Projects From The Projects</h1>
        <p>Fiction Writing School For Broke Mutherfuckers.</p>
        <div className="nav">
          <a href="/quiz.html">Take Writer Type Quiz</a>
          <a href="/login">Log In</a>
          <a href="/signup">Sign Up</a>
        </div>
      </header>

      <a href="/deviousness" className="tile" style={{ display: 'block', maxWidth: 300, margin: '2rem auto', textAlign: 'center', textDecoration: 'none', color: '#f4f4f4', border: '2px solid #f4f4f4', borderRadius: 8, padding: '1.5rem 1rem', transition: 'background 0.2s' }}>
        <strong>Literary Deviousness</strong>
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
          Learn the Craft
        </div>
      </a>

      <footer>
        &copy; 2025 Projects from the Projects.
        <a href="/legal.html" style={{ color: '#f4f4f4', marginLeft: 10 }}>Privacy &amp; Terms</a>
      </footer>
    </>
  );
}

