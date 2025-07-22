// Moved from drafting room/redraw all layers
import { drawEmotionLayer } from './emotion-bar.js';
import { drawMotifLayer } from './motif-bubble.js';

export function redrawAllLayers(data) {
  // Example: data = { emotionHeatmap, motifMap, ... }
  const emotionCanvas = document.getElementById('emotion-layer');
  const motifCanvas = document.getElementById('motif-layer');
  if (emotionCanvas && data.emotionHeatmap) {
    drawEmotionLayer(emotionCanvas, data.emotionHeatmap);
  }
  if (motifCanvas && data.motifMap) {
    drawMotifLayer(motifCanvas, data.motifMap);
  }
  // ...other layers...
}
