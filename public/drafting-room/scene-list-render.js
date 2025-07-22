import { analyzeAndRedrawScene } from './drafting-room.js';

export function attachSceneClickHandlers() {
  const sceneEls = document.querySelectorAll('.scene-card, .scene-item');
  sceneEls.forEach(el => {
    el.addEventListener('click', () => {
      const sceneId = el.dataset.sceneId;
      loadAndActivateScene(sceneId);
    });
  });
}

export function loadAndActivateScene(sceneId) {
  const sceneObj = getSceneById(sceneId);
  if (!sceneObj) {
    console.warn('Scene not found:', sceneId);
    return;
  }
  highlightActiveScene(sceneId);
  window.currentSceneId = sceneId;
  renderBeatsForScene(sceneObj);
  analyzeAndRedrawScene(sceneObj.text || beatsToPlainText(sceneObj.beats));
  const context = buildContextFromScene(sceneObj);
  showContextualTemplateSuggestions(context);
}

export function highlightActiveScene(sceneId) {
  document.querySelectorAll('.scene-card, .scene-item').forEach(el => {
    el.classList.toggle('active', el.dataset.sceneId === sceneId);
  });
}

export function getSceneById(id) {
  // Example: search in global bookData or projects[currentProject]
  if (window.bookData && window.bookData.scenes) {
    return window.bookData.scenes.find(s => s.id === id);
  }
  if (window.projects && window.currentProject && window.projects[window.currentProject]?.scenes) {
    return window.projects[window.currentProject].scenes.find(s => s.id === id);
  }
  return null;
}

export function beatsToPlainText(beats=[]) {
  return beats.map(b => b.content).join('\n\n');
}

// Stub: render beats or set editor text
export function renderBeatsForScene(sceneObj) {
  // Implement actual rendering logic or fallback
  const editor = document.getElementById('scene-text');
  if (editor) {
    editor.value = sceneObj.text || beatsToPlainText(sceneObj.beats);
  }
}

// Build context for template suggestions and downstream features
export function buildContextFromScene(sceneObj) {
  const result = {
    emotion: 'neutral',
    act: null,
    sceneIndex: null
  };

  // 1. Try to derive emotion from analysis if it exists
  if (window.runAllDataAnalysis) {
    const analysis = window.runAllDataAnalysis(sceneObj.text || beatsToPlainText(sceneObj.beats));
    if (analysis && analysis.emotionHeatmap) {
      const emotionCounts = analysis.emotionHeatmap;
      const dominant = getDominantEmotion(emotionCounts);
      if (dominant) result.emotion = dominant;
    }
  }

  // 2. Locate scene's position in chapters + acts
  const project = window.currentProjectData || {};
  const sceneId = sceneObj.id;
  result.sceneIndex = findSceneIndex(project, sceneId);
  result.act = findActForScene(project, sceneId);

  return result;
}

function getDominantEmotion(emotionCounts) {
  let top = null;
  let max = 0;
  for (const [emotion, count] of Object.entries(emotionCounts)) {
    if (count > max) {
      max = count;
      top = emotion;
    }
  }
  return top || 'neutral';
}

function findSceneIndex(project, sceneId) {
  const chapters = project?.chapters || [];
  for (let i = 0; i < chapters.length; i++) {
    const scenes = chapters[i].sceneIds || [];
    const index = scenes.indexOf(sceneId);
    if (index !== -1) {
      return { chapterIndex: i, sceneIndex: index };
    }
  }
  return null;
}

function findActForScene(project, sceneId) {
  const acts = project?.acts || [];
  for (let a = 0; a < acts.length; a++) {
    const act = acts[a];
    const chapterIds = act.chapterIds || [];
    for (const cid of chapterIds) {
      const chapter = project.chapters.find(ch => ch.id === cid);
      if (chapter && chapter.sceneIds.includes(sceneId)) {
        return act.name || `Act ${a + 1}`;
      }
    }
  }
  return null;
}

// Stub: show contextual template suggestions
export function showContextualTemplateSuggestions(context) {
  // Implement actual UI logic
  const el = document.getElementById('contextual-template-suggestions');
  if (el) {
    el.textContent = `Emotion: ${context.emotion}, Act: ${context.act}`;
  }
}

// Call this after rendering the sidebar scene list
attachSceneClickHandlers();
