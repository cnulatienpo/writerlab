import Link from 'next/link';

export default function DeviousnessPage() {
  return (
    <>
      <style jsx global>{`
        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .tile {
          display: inline-block;
          background-color: #222;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          color: #fff;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .tile:hover {
          background-color: #333;
        }
      `}</style>
      <main style={{ padding: '2rem', color: '#f4f4f4', background: '#111', minHeight: '100vh' }}>
        <h1>Literary Deviousness</h1>
        <p style={{ maxWidth: '600px', marginTop: '1rem' }}>
          This is the meat and potatoes of writing. if you cant do any of this, you can't do shit. These aren't tests, they're not here to judge what kind of writer you are. These are time tested writing tools to help you talk all that shit, exactly the way you want to. 
        </p>

        {/* 1. Story Fundamentals */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>1. Story Fundamentals</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Stakes')}`} className="tile">Stakes</Link>
            <Link href={`/definitions/${encodeURIComponent('Conflict')}`} className="tile">Conflict</Link>
            <Link href={`/definitions/${encodeURIComponent('Decision')}`} className="tile">Decision</Link>
            <Link href={`/definitions/${encodeURIComponent('Change')}`} className="tile">Change</Link>
            <Link href={`/definitions/${encodeURIComponent('Outcome')}`} className="tile">Outcome</Link>
          </div>
        </section>

        {/* 2. Character Construction */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>2. Character Construction</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Character Drive')}`} className="tile">Character Drive</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Motivation')}`} className="tile">Character Motivation</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Flaw')}`} className="tile">Character Flaw</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Identity')}`} className="tile">Character Identity</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Truth')}`} className="tile">Character Truth</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Wound')}`} className="tile">Character Wound</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Description')}`} className="tile">Character Description</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Backstory')}`} className="tile">Character Backstory</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Decision Style')}`} className="tile">Character Decision Style</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Body Logic')}`} className="tile">Character Body Logic</Link>
          </div>
        </section>

        {/* 3. Description & Setting */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>3. Description & Setting</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Sensory Description')}`} className="tile">Sensory Description</Link>
            <Link href={`/definitions/${encodeURIComponent('Setting')}`} className="tile">Setting</Link>
          </div>
        </section>

        {/* 4. Emotional & Symbolic Language */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>4. Emotional & Symbolic Language</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Metaphor')}`} className="tile">Metaphor</Link>
            <Link href={`/definitions/${encodeURIComponent('Metaphors Part 2')}`} className="tile">Metaphors Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Mood')}`} className="tile">Mood</Link>
            <Link href={`/definitions/${encodeURIComponent('Motif')}`} className="tile">Motif</Link>
            <Link href={`/definitions/${encodeURIComponent('Narrative Devices Part 1')}`} className="tile">Narrative Devices Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Narrative Devices Part 2')}`} className="tile">Narrative Devices Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Point of View')}`} className="tile">Point of View</Link>
            <Link href={`/definitions/${encodeURIComponent('Tone')}`} className="tile">Tone</Link>
            <Link href={`/definitions/${encodeURIComponent('Repetition')}`} className="tile">Repetition</Link>
            <Link href={`/definitions/${encodeURIComponent('Subtext')}`} className="tile">Subtext</Link>
            <Link href={`/definitions/${encodeURIComponent('Symbolism')}`} className="tile">Symbolism</Link>
            <Link href={`/definitions/${encodeURIComponent('Suspense')}`} className="tile">Suspense</Link>
            <Link href={`/definitions/${encodeURIComponent('Suspense Part 2')}`} className="tile">Suspense Part 2</Link>
          </div>
        </section>

        {/* 5. Reader Manipulation */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>5. Reader Manipulation</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Reader Manipulators Part 1')}`} className="tile">Reader Manipulators Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Reader Manipulators Part 2')}`} className="tile">Reader Manipulators Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Reader Manipulators Part 3')}`} className="tile">Reader Manipulators Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Reader Manipulators Part 4')}`} className="tile">Reader Manipulators Part 4</Link>
            <Link href={`/definitions/${encodeURIComponent('Planting and Payoff')}`} className="tile">Planting and Payoff</Link>
          </div>
        </section>

        {/* 6. Dialogue */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>6. Dialogue</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Dialogue Part 1')}`} className="tile">Dialogue Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Dialogue Part 2')}`} className="tile">Dialogue Part 2</Link>
          </div>
        </section>

        {/* 7. Structure (Part I – Writer-Ready) */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>7. Structure (Part I – Writer-Ready)</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Beats come first')}`} className="tile">Beats Come First</Link>
            <Link href={`/definitions/${encodeURIComponent('Scenes Part 1')}`} className="tile">Scenes Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Scenes Part 2')}`} className="tile">Scenes Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Scene Starters')}`} className="tile">Scene Starters</Link>
            <Link href={`/definitions/${encodeURIComponent('Scene Enders')}`} className="tile">Scene Enders</Link>
            <Link href={`/definitions/${encodeURIComponent('Scene Starters and Enders part 1.5')}`} className="tile">Scene Starters and Enders Part 1.5</Link>
            <Link href={`/definitions/${encodeURIComponent('Scene Transitions')}`} className="tile">Scene Transitions</Link>
          </div>
        </section>

        {/* 8. Archetypes & Roles */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>8. Archetypes & Roles</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Static Character')}`} className="tile">Static Character</Link>
            <Link href={`/definitions/${encodeURIComponent('Symbolic Character')}`} className="tile">Symbolic Character</Link>
            <Link href={`/definitions/${encodeURIComponent('The Archetypal Character')}`} className="tile">The Archetypal Character</Link>
            <Link href={`/definitions/${encodeURIComponent('Flat Character')}`} className="tile">Flat Character</Link>
            <Link href={`/definitions/${encodeURIComponent('Round Characters')}`} className="tile">Round Characters</Link>
            <Link href={`/definitions/${encodeURIComponent('Dynamic Characters')}`} className="tile">Dynamic Characters</Link>
            <Link href={`/definitions/${encodeURIComponent('The Foil')}`} className="tile">The Foil</Link>
            <Link href={`/definitions/${encodeURIComponent('The Hero')}`} className="tile">The Hero</Link>
            <Link href={`/definitions/${encodeURIComponent('The Mentor')}`} className="tile">The Mentor</Link>
            <Link href={`/definitions/${encodeURIComponent('The Villain')}`} className="tile">The Villain</Link>
            <Link href={`/definitions/${encodeURIComponent('Sidekick')}`} className="tile">Sidekick</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Roles')}`} className="tile">Character Roles</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Role Interactions')}`} className="tile">Character Role Interactions</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Role Dynamics')}`} className="tile">Character Role Dynamics</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Role Dynamics 2')}`} className="tile">Character Role Dynamics 2</Link>
          </div>
        </section>

        {/* 9. Structure (Part II – Scaling Up) */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>9. Structure (Part II – Scaling Up)</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Scenes build Chapters')}`} className="tile">Scenes Build Chapters</Link>
            <Link href={`/definitions/${encodeURIComponent('Chapters Build Acts')}`} className="tile">Chapters Build Acts</Link>
            <Link href={`/definitions/${encodeURIComponent('Acts House Arcs')}`} className="tile">Acts House Arcs</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Arcs Part 1')}`} className="tile">Character Arcs Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Arcs Part 2')}`} className="tile">Character Arcs Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Character Arcs Part 3')}`} className="tile">Character Arcs Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Flat Arc')}`} className="tile">Flat Arc</Link>
            <Link href={`/definitions/${encodeURIComponent('Positive Arc')}`} className="tile">Positive Arc</Link>
            <Link href={`/definitions/${encodeURIComponent('Negative Arc')}`} className="tile">Negative Arc</Link>
          </div>
        </section>

        {/* 10. Technical Tools */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>10. Technical Tools</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Grammer Part 1')}`} className="tile">Grammar Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Grammer Part 2')}`} className="tile">Grammar Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Grammer Part 3')}`} className="tile">Grammar Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Punctuation')}`} className="tile">Punctuation</Link>
            <Link href={`/definitions/${encodeURIComponent('Pacing Part 1')}`} className="tile">Pacing Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Pacing Part 2')}`} className="tile">Pacing Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Pacing Part 3')}`} className="tile">Pacing Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Planting and Payoff')}`} className="tile">Planting and Payoff</Link>
          </div>
        </section>

        {/* 11. Voice & Vision */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>11. Voice & Vision</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Voice Part 1')}`} className="tile">Voice Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 2')}`} className="tile">Voice Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 3')}`} className="tile">Voice Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 4')}`} className="tile">Voice Part 4</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 5')}`} className="tile">Voice Part 5</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 6')}`} className="tile">Voice Part 6</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 7')}`} className="tile">Voice Part 7</Link>
            <Link href={`/definitions/${encodeURIComponent('Voice Part 8')}`} className="tile">Voice Part 8</Link>
          </div>
        </section>

        {/* 12. Thematic Execution */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>12. Thematic Execution</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Theme Part 1')}`} className="tile">Theme Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Theme Part 2')}`} className="tile">Theme Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Theme Part 3')}`} className="tile">Theme Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Theme Part 4')}`} className="tile">Theme Part 4</Link>
            <Link href={`/definitions/${encodeURIComponent('Theme Part 5')}`} className="tile">Theme Part 5</Link>
          </div>
        </section>

        {/* 13. Application & Mastery */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>13. Application & Mastery</h2>
          <div className="grid">
            <Link href={`/definitions/${encodeURIComponent('Short Stories Part 1')}`} className="tile">Short Stories Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Short Stories Part 2')}`} className="tile">Short Stories Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Short Stories Part 3')}`} className="tile">Short Stories Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('3 Act Structure Part 1')}`} className="tile">3 Act Structure Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('3 Act Structure part 2')}`} className="tile">3 Act Structure part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('3 Act Structure Part 3')}`} className="tile">3 Act Structure Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 1')}`} className="tile">Classic Arc Part 1</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 2')}`} className="tile">Classic Arc Part 2</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 3')}`} className="tile">Classic Arc Part 3</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 4')}`} className="tile">Classic Arc Part 4</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 5')}`} className="tile">Classic Arc Part 5</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 6')}`} className="tile">Classic Arc Part 6</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 7')}`} className="tile">Classic Arc Part 7</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 8')}`} className="tile">Classic Arc Part 8</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 9')}`} className="tile">Classic Arc Part 9</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 10')}`} className="tile">Classic Arc Part 10</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 11')}`} className="tile">Classic Arc Part 11</Link>
            <Link href={`/definitions/${encodeURIComponent('Classic Arc Part 12')}`} className="tile">Classic Arc Part 12</Link>
          </div>
        </section>

      </main>
    </>
  );
}


