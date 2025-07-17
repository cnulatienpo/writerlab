function saveTextFeedback(projectId, feedbackObj) {
  const key = `feedback_${projectId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(feedbackObj));
  alert('Feedback saved!');
}

function saveVisualizerImage(filename = 'visual_feedback.png') {
  const visualizer = document.getElementById('visualizer');
  if (!visualizer) return;

  const width = visualizer.offsetWidth;
  const height = visualizer.offsetHeight;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d');

  Array.from(visualizer.querySelectorAll('canvas')).forEach(layer => {
    if (layer.style.display !== 'none') {
      tempCtx.drawImage(layer, 0, 0, width, height);
    }
  });

  const url = tempCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
