// Moved from drafting room/save feedback

// Save feedback text to localStorage
export function saveTextFeedback(projectId, feedback) {
  if (!projectId || !feedback) return;
  const key = `feedback_${projectId}_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(feedback));
  alert('Feedback saved!');
}

// Save visualizer canvas as PNG
export function saveVisualizerImage(filename = 'visualizer-snapshot.png') {
  const visualizer = document.getElementById('visualizer');
  if (!visualizer) return;
  // Combine all canvas layers into one image
  const canvases = visualizer.querySelectorAll('canvas');
  if (!canvases.length) return;
  const width = canvases[0].width;
  const height = canvases[0].height;
  const merged = document.createElement('canvas');
  merged.width = width;
  merged.height = height;
  const ctx = merged.getContext('2d');
  canvases.forEach(c => ctx.drawImage(c, 0, 0));
  const link = document.createElement('a');
  link.download = filename;
  link.href = merged.toDataURL('image/png');
  link.click();
}

// Button wiring (if using IDs)
window.addEventListener('DOMContentLoaded', () => {
  const saveTextBtn = document.getElementById('saveTextBtn');
  const saveImageBtn = document.getElementById('saveImageBtn');
  if (saveTextBtn) {
    saveTextBtn.addEventListener('click', () => {
      // Example: get feedback from UI
      const projectId = window.currentProject?.name || 'unknown';
      const feedback = window.latestRayRayReply || { content: 'No feedback found.' };
      saveTextFeedback(projectId, feedback);
    });
  }
  if (saveImageBtn) {
    saveImageBtn.addEventListener('click', () => {
      saveVisualizerImage('drafting-room-' + Date.now() + '.png');
    });
  }
});

// Global displayFeedback function for non-module use
export function displayFeedback(feedback, analysis) {
  // Example: render feedback and analysis to the UI
  const feedbackEl = document.getElementById('feedback-output');
  if (feedbackEl) {
    feedbackEl.innerHTML = `<h3>LLM Feedback</h3><pre>${typeof feedback === 'string' ? feedback : JSON.stringify(feedback, null, 2)}</pre>`;
    if (analysis) {
      feedbackEl.innerHTML += `<h3>Analysis</h3><pre>${JSON.stringify(analysis, null, 2)}</pre>`;
    }
  } else {
    // Fallback: log to console
    console.log('LLM Feedback:', feedback);
    console.log('Analysis:', analysis);
  }
};
