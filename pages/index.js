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

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '3rem', margin: '2rem auto', maxWidth: 1100 }}>
        <div style={{ flex: 2, minWidth: 320 }}>
          <div style={{ background: 'rgba(30,30,30,0.95)', borderRadius: 8, padding: '2rem', color: '#f4f4f4', fontSize: '1.08rem', lineHeight: '1.7', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}>
            <p style={{ marginBottom: '1.5rem', fontWeight: 600 }}>I made a game to learn the literary devices I was never taught.</p>
            <p>Here’s what happened: I read a lot as a kid. Decided I wanted to be a writer. Bought all the how-to-write books. And none of them made any damn sense to me.</p>
            <p>They all assumed I already knew something I didn’t: the actual parts of writing.</p>
            <p>Most had what I call the Star Wars disease. George Lucas talked about Joseph Campbell, and suddenly every writing book said “just follow the three-act structure and hit publish button—and you will start bleeding money out of your eyeballs. #1 best seller- i promise.”</p>
            <p>But they never explained what goes into those acts. They assumed you already knew how to use literary devices. I didn’t. So I felt stupid. Not creative enough. Not talented enough. i thought being a good writer meant i was already supposed to know all that.</p>
            <p>So i bought every book on the market and studied them. but they have a big problem- you cant talk to them and ask questions. and what if they write it for the type of writer you’re not? then you just wasted your time.</p>
            <p>So I built this site to teach myself, and i thought maybe you could use it too.<br />Here’s what it does:</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li></li>
              
              <li>There’s a simple built-in AI named RayRay who answers your questions if you get stuck<br />(He's slow and forgets everything between chats, but he's trying his best)</li>
            </ul>
            <p style={{ fontWeight: 600 }}>The big idea?</p>
            <p>I started thinking of literary devices like elements on a periodic table—and stories like experiments. It takes the pressure off.</p>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <a
            href="/drafting.html"
            className="tile"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              color: '#f4f4f4',
              border: '2px solid #f4f4f4',
              borderRadius: 8,
              padding: '1.5rem 1rem',
              transition: 'background 0.2s',
              marginBottom: '2rem'
            }}
          >
            <strong>Drafting Room</strong>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Open the interactive scene builder and feedback tools.
            </div>
          </a>

          <a
            href="/deviousness"
            className="tile"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              color: '#f4f4f4',
              border: '2px solid #f4f4f4',
              borderRadius: 8,
              padding: '1.5rem 1rem',
              transition: 'background 0.2s'
            }}
          >
            <strong>Literary Deviousness</strong>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
              The building blocks of writing
            </div>
          </a>
        </div>
      </div>

      <footer>
        &copy; 2025 Projects from the Projects.
        <a href="/legal.html" style={{ color: '#f4f4f4', marginLeft: 10 }}>Privacy &amp; Terms</a>
      </footer>
    </>
  );
}

