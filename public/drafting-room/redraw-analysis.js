// Moved from drafting room/redraw all layers after analysis
import { drawEmotionLayer } from './emotion-bar.js';
import { drawMotifLayer } from './motif-bubble.js';

const layerOrder = ['background', 'emotion', 'motif', 'structure', 'theme', 'feedback'];

function setLayerZIndices() {
  layerOrder.forEach((layerName, i) => {
    const canvas = document.getElementById(`${layerName}-layer`);
    if (canvas) {
      canvas.style.zIndex = i + 1;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
    }
  });
}

function clearAllLayers() {
  layerOrder.forEach(layerName => {
    const canvas = document.getElementById(`${layerName}-layer`);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
}

export function redrawAllLayers(data) {
  setLayerZIndices();
  clearAllLayers();
  const emotionCanvas = document.getElementById('emotion-layer');
  const motifCanvas = document.getElementById('motif-layer');
  if (emotionCanvas && data.emotionHeatmap) {
    drawEmotionLayer(emotionCanvas, data.emotionHeatmap);
  }
  // Convert motifMap {word: count, ...} to [{word, count}, ...] for drawMotifLayer
  if (motifCanvas && data.motifMap) {
    const motifList = Object.entries(data.motifMap).map(([word, count]) => ({ word, count }));
    drawMotifLayer(motifCanvas, motifList);
  }
  // ...other layers (structure, theme, feedback)...
}
