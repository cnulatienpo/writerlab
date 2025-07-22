// Draws the emotion bar chart using real emotionHeatmap data
export function drawEmotionLayer(canvas, emotionHeatmap) {
  if (!canvas || !emotionHeatmap) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Example: emotionHeatmap = { sadness: 10, joy: 5, anger: 2, ... }
  const emotions = Object.keys(emotionHeatmap);
  const values = emotions.map(e => emotionHeatmap[e]);
  const maxValue = Math.max(...values, 1);
  const barWidth = canvas.width / emotions.length;

  emotions.forEach((emotion, i) => {
    const value = emotionHeatmap[emotion];
    const barHeight = (value / maxValue) * canvas.height;
    ctx.fillStyle = getEmotionColor(emotion);
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 4, barHeight);
    ctx.fillStyle = '#222';
    ctx.font = '12px sans-serif';
    ctx.fillText(emotion, i * barWidth + 4, canvas.height - 6);
  });
}

function getEmotionColor(emotion) {
  const colors = {
    sadness: '#4a90e2',
    joy: '#f7ca18',
    anger: '#e94e77',
    fear: '#8e44ad',
    surprise: '#16a085',
    disgust: '#27ae60',
    trust: '#2ecc71',
    anticipation: '#f39c12'
  };
  return colors[emotion] || '#888';
}
