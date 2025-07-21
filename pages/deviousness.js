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
            <Link href="/definitions/Stakes" className="tile">Stakes</Link>
            <Link href="/definitions/Conflict" className="tile">Conflict</Link>
            <Link href="/definitions/Decision" className="tile">Decision</Link>
            <Link href="/definitions/Change" className="tile">Change</Link>
            <Link href="/definitions/Outcome" className="tile">Outcome</Link>
          </div>
        </section>

        {/* 2. Character Construction */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>2. Character Construction</h2>
          <div className="grid">
            <Link href="/definitions/Character Drive" className="tile">Character Drive</Link>
            <Link href="/definitions/Character Motivation" className="tile">Character Motivation</Link>
            <Link href="/definitions/Character Flaw" className="tile">Character Flaw</Link>
            <Link href="/definitions/Character Identity" className="tile">Character Identity</Link>
            <Link href="/definitions/Character Truth" className="tile">Character Truth</Link>
            <Link href="/definitions/Character Wound" className="tile">Character Wound</Link>
            <Link href="/definitions/Character Description" className="tile">Character Description</Link>
            <Link href="/definitions/Character Backstory" className="tile">Character Backstory</Link>
            <Link href="/definitions/Character Decision Style" className="tile">Character Decision Style</Link>
            <Link href="/definitions/Character Body Logic" className="tile">Character Body Logic</Link>
          </div>
        </section>

        {/* 3. Description & Setting */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>3. Description & Setting</h2>
          <div className="grid">
            <Link href="/definitions/Sensory Description" className="tile">Sensory Description</Link>
            <Link href="/definitions/Setting" className="tile">Setting</Link>
          </div>
        </section>

        {/* 4. Emotional & Symbolic Language */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>4. Emotional & Symbolic Language</h2>
          <div className="grid">
            <Link href="/definitions/Metaphor" className="tile">Metaphor</Link>
            <Link href="/definitions/Metaphors Part 2" className="tile">Metaphors Part 2</Link>
            <Link href="/definitions/Mood" className="tile">Mood</Link>
            <Link href="/definitions/Motif" className="tile">Motif</Link>
            <Link href="/definitions/Narrative Devices Part 1" className="tile">Narrative Devices Part 1</Link>
            <Link href="/definitions/Narrative Devices Part 2" className="tile">Narrative Devices Part 2</Link>
            <Link href="/definitions/Point of View" className="tile">Point of View</Link>
            <Link href="/definitions/Tone" className="tile">Tone</Link>
            <Link href="/definitions/Repetition" className="tile">Repetition</Link>
            <Link href="/definitions/Subtext" className="tile">Subtext</Link>
            <Link href="/definitions/Symbolism" className="tile">Symbolism</Link>
            <Link href="/definitions/Suspense" className="tile">Suspense</Link>
            <Link href="/definitions/Suspense Part 2" className="tile">Suspense Part 2</Link>
          </div>
        </section>

        {/* 5. Reader Manipulation */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>5. Reader Manipulation</h2>
          <div className="grid">
            <Link href="/definitions/Reader Manipulators Part 1" className="tile">Reader Manipulators Part 1</Link>
            <Link href="/definitions/Reader Manipulators Part 2" className="tile">Reader Manipulators Part 2</Link>
            <Link href="/definitions/Reader Manipulators Part 3" className="tile">Reader Manipulators Part 3</Link>
            <Link href="/definitions/Reader Manipulators Part 4" className="tile">Reader Manipulators Part 4</Link>
            <Link href="/definitions/Planting and Payoff" className="tile">Planting and Payoff</Link>
          </div>
        </section>

        {/* 6. Dialogue */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>6. Dialogue</h2>
          <div className="grid">
            <Link href="/definitions/Dialogue Part 1" className="tile">Dialogue Part 1</Link>
            <Link href="/definitions/Dialogue Part 2" className="tile">Dialogue Part 2</Link>
          </div>
        </section>

        {/* 7. Structure (Part I – Writer-Ready) */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>7. Structure (Part I – Writer-Ready)</h2>
          <div className="grid">
            <Link href="/definitions/Beats come first" className="tile">Beats Come First</Link>
            <Link href="/definitions/Scenes Part 1" className="tile">Scenes Part 1</Link>
            <Link href="/definitions/Scenes Part 2" className="tile">Scenes Part 2</Link>
            <Link href="/definitions/Scene Starters" className="tile">Scene Starters</Link>
            <Link href="/definitions/Scene Enders" className="tile">Scene Enders</Link>
            <Link href="/definitions/Scene Starters and Enders part 1.5" className="tile">Scene Starters and Enders Part 1.5</Link>
            <Link href="/definitions/Scene Transitions" className="tile">Scene Transitions</Link>
          </div>
        </section>

        {/* 8. Archetypes & Roles */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>8. Archetypes & Roles</h2>
          <div className="grid">
            <Link href="/definitions/Static Character" className="tile">Static Character</Link>
            <Link href="/definitions/Symbolic Character" className="tile">Symbolic Character</Link>
            <Link href="/definitions/The Archetypal Character" className="tile">The Archetypal Character</Link>
            <Link href="/definitions/Flat Character" className="tile">Flat Character</Link>
            <Link href="/definitions/Round Characters" className="tile">Round Characters</Link>
            <Link href="/definitions/Dynamic Characters" className="tile">Dynamic Characters</Link>
            <Link href="/definitions/The Foil" className="tile">The Foil</Link>
            <Link href="/definitions/The Hero" className="tile">The Hero</Link>
            <Link href="/definitions/The Mentor" className="tile">The Mentor</Link>
            <Link href="/definitions/The Villain" className="tile">The Villain</Link>
            <Link href="/definitions/Sidekick" className="tile">Sidekick</Link>
            <Link href="/definitions/Character Roles" className="tile">Character Roles</Link>
            <Link href="/definitions/Character Role Interactions" className="tile">Character Role Interactions</Link>
            <Link href="/definitions/Character Role Dynamics" className="tile">Character Role Dynamics</Link>
            <Link href="/definitions/Character Role Dynamics 2" className="tile">Character Role Dynamics 2</Link>
          </div>
        </section>

        {/* 9. Structure (Part II – Scaling Up) */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>9. Structure (Part II – Scaling Up)</h2>
          <div className="grid">
            <Link href="/definitions/Scenes build Chapters" className="tile">Scenes Build Chapters</Link>
            <Link href="/definitions/Chapters Build Acts" className="tile">Chapters Build Acts</Link>
            <Link href="/definitions/Acts House Arcs" className="tile">Acts House Arcs</Link>
            <Link href="/definitions/Character Arcs Part 1" className="tile">Character Arcs Part 1</Link>
            <Link href="/definitions/Character Arcs Part 2" className="tile">Character Arcs Part 2</Link>
            <Link href="/definitions/Character Arcs Part 3" className="tile">Character Arcs Part 3</Link>
            <Link href="/definitions/Flat Arc" className="tile">Flat Arc</Link>
            <Link href="/definitions/Positive Arc" className="tile">Positive Arc</Link>
            <Link href="/definitions/Negative Arc" className="tile">Negative Arc</Link>
          </div>
        </section>

        {/* 10. Technical Tools */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>10. Technical Tools</h2>
          <div className="grid">
            <Link href="/definitions/Grammer Part 1" className="tile">Grammar Part 1</Link>
            <Link href="/definitions/Grammer Part 2" className="tile">Grammar Part 2</Link>
            <Link href="/definitions/Grammer Part 3" className="tile">Grammar Part 3</Link>
            <Link href="/definitions/Punctuation" className="tile">Punctuation</Link>
            <Link href="/definitions/Pacing Part 1" className="tile">Pacing Part 1</Link>
            <Link href="/definitions/Pacing Part 2" className="tile">Pacing Part 2</Link>
            <Link href="/definitions/Pacing Part 3" className="tile">Pacing Part 3</Link>
            <Link href="/definitions/Planting and Payoff" className="tile">Planting and Payoff</Link>
          </div>
        </section>

        {/* 11. Voice & Vision */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>11. Voice & Vision</h2>
          <div className="grid">
            <Link href="/definitions/Voice Part 1" className="tile">Voice Part 1</Link>
            <Link href="/definitions/Voice Part 2" className="tile">Voice Part 2</Link>
            <Link href="/definitions/Voice Part 3" className="tile">Voice Part 3</Link>
            <Link href="/definitions/Voice Part 4" className="tile">Voice Part 4</Link>
            <Link href="/definitions/Voice Part 5" className="tile">Voice Part 5</Link>
            <Link href="/definitions/Voice Part 6" className="tile">Voice Part 6</Link>
            <Link href="/definitions/Voice Part 7" className="tile">Voice Part 7</Link>
            <Link href="/definitions/Voice Part 8" className="tile">Voice Part 8</Link>
          </div>
        </section>

        {/* 12. Thematic Execution */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>12. Thematic Execution</h2>
          <div className="grid">
            <Link href="/definitions/Theme Part 1" className="tile">Theme Part 1</Link>
            <Link href="/definitions/Theme Part 2" className="tile">Theme Part 2</Link>
            <Link href="/definitions/Theme Part 3" className="tile">Theme Part 3</Link>
            <Link href="/definitions/Theme Part 4" className="tile">Theme Part 4</Link>
            <Link href="/definitions/Theme Part 5" className="tile">Theme Part 5</Link>
          </div>
        </section>

        {/* 13. Application & Mastery */}
        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>13. Application & Mastery</h2>
          <div className="grid">
            <Link href="/definitions/Short Stories Part 1" className="tile">Short Stories Part 1</Link>
            <Link href="/definitions/Short Stories Part 2" className="tile">Short Stories Part 2</Link>
            <Link href="/definitions/Short Stories Part 3" className="tile">Short Stories Part 3</Link>
            <Link href="/definitions/3 Act Structure Part 1" className="tile">3 Act Structure Part 1</Link>
            <Link href="/definitions/3 Act Structure part 2" className="tile">3 Act Structure part 2</Link>
            <Link href="/definitions/3 Act Structure Part 3" className="tile">3 Act Structure Part 3</Link>
            <Link href="/definitions/Classic Arc Part 1" className="tile">Classic Arc Part 1</Link>
            <Link href="/definitions/Classic Arc Part 2" className="tile">Classic Arc Part 2</Link>
            <Link href="/definitions/Classic Arc Part 3" className="tile">Classic Arc Part 3</Link>
            <Link href="/definitions/Classic Arc Part 4" className="tile">Classic Arc Part 4</Link>
            <Link href="/definitions/Classic Arc Part 5" className="tile">Classic Arc Part 5</Link>
            <Link href="/definitions/Classic Arc Part 6" className="tile">Classic Arc Part 6</Link>
            <Link href="/definitions/Classic Arc Part 7" className="tile">Classic Arc Part 7</Link>
            <Link href="/definitions/Classic Arc Part 8" className="tile">Classic Arc Part 8</Link>
            <Link href="/definitions/Classic Arc Part 9" className="tile">Classic Arc Part 9</Link>
            <Link href="/definitions/Classic Arc Part 10" className="tile">Classic Arc Part 10</Link>
            <Link href="/definitions/Classic Arc Part 11" className="tile">Classic Arc Part 11</Link>
            <Link href="/definitions/Classic Arc Part 12" className="tile">Classic Arc Part 12</Link>
          </div>
        </section>

      </main>
    </>
  );
}


