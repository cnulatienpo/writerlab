// Draws motif bubbles using real motifMap data
export function drawMotifLayer(canvas, motifMap) {
  if (!canvas || !motifMap) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // motifMap: { motifWord: count, ... }
  const motifs = Object.keys(motifMap);
  const counts = motifs.map(m => motifMap[m]);
  const maxCount = Math.max(...counts, 1);

  // Bubble layout: simple grid, size by count
  const cols = Math.ceil(Math.sqrt(motifs.length));
  const rows = Math.ceil(motifs.length / cols);
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;

  motifs.forEach((motif, i) => {
    const count = motifMap[motif];
    const radius = Math.max(10, (count / maxCount) * (Math.min(cellW, cellH) / 2));
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * cellW + cellW / 2;
    const y = row * cellH + cellH / 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f7ca18';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    ctx.fillStyle = '#222';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(motif, x, y + 4);
  });
}
