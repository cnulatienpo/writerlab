import Link from 'next/link';

const tiles = [
  "CONFLICT.txt",
  "change definition.txt",
  "character backstory",
  "character decision style",
  "character description",
  "character drive",
  "character flaw",
  "character identity",
  "character motivation",
  "decision def.txt",
  "desire def.txt",
  "dialouge part one",
  "dialouge part two",
  "point of view",
  "sensory detail.txt",
  "stakes def.txt"
];

export default function Home() {
  return (
    <div>
      <h1>Updated! I control reality now.</h1>
      <p>This is your homepage. It's working.</p>
      <h2>Literary Deviousness</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {tiles.map((tile) => (
          <Link key={tile} href={`/definition/${encodeURIComponent(tile)}`}>
            <div style={{ border: '1px solid #ccc', padding: '1rem', cursor: 'pointer', minWidth: '200px' }}>
              {tile}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
