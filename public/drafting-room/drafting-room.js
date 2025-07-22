// Track current scene ID for beat management
let currentSceneId = null;

export function loadSceneIntoEditor(sceneId) {
  currentSceneId = sceneId;
  const scene = window.getSceneById ? window.getSceneById(sceneId) : null;
  if (!scene) return;
  const textbox = document.getElementById('scene-textbox');
  if (textbox) textbox.value = scene.text || '';
  if (window.getAllScenes && window.renderSceneList) {
    window.renderSceneList(window.getAllScenes(), sceneId);
  }
  if (window.loadBeats) {
    window.loadBeats(sceneId);
  }
}

export function getCurrentSceneId() {
  return currentSceneId;
}

// Add Beat button logic
export function addBeat() {
  const sceneId = getCurrentSceneId();
  const beatText = prompt('Enter beat text:');
  if (!beatText) return;
  const key = `beats_${sceneId}`;
  const stored = localStorage.getItem(key);
  const beats = stored ? JSON.parse(stored) : [];
  const newBeat = { text: beatText };
  beats.push(newBeat);
  saveBeatsForScene(sceneId, beats);
  loadBeats(sceneId);
}
// Save beats for a scene to localStorage
export function saveBeatsForScene(sceneId, beatsArray) {
  const key = `beats_${sceneId}`;
  localStorage.setItem(key, JSON.stringify(beatsArray));
}

// Load beats for a scene and render them in the beat drawer
export function loadBeats(sceneId) {
  const key = `beats_${sceneId}`;
  const stored = localStorage.getItem(key);
  const beats = stored ? JSON.parse(stored) : [];
  const container = document.getElementById('beat-list');
  if (!container) return;
  container.innerHTML = '';
  beats.forEach((beat, index) => {
    const el = document.createElement('div');
    el.className = 'beat-block';
    el.innerText = beat.text || `Beat ${index + 1}`;
    container.appendChild(el);
  });
}
// Load a scene into the editor area and update sidebar highlight
export function loadSceneIntoEditor(sceneId) {
  const scene = window.getSceneById ? window.getSceneById(sceneId) : null;
  if (!scene) return;
  const textbox = document.getElementById('scene-textbox');
  if (textbox) textbox.value = scene.text || '';
  if (window.getAllScenes && window.renderSceneList) {
    window.renderSceneList(window.getAllScenes(), sceneId);
  }
  if (window.loadBeats) {
    window.loadBeats(sceneId);
  }
}
// Open beat drawer on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.openBeatDrawer) {
    window.openBeatDrawer();
  }
});
// Page initialization: render scene list and load default scene
window.addEventListener('DOMContentLoaded', () => {
  if (window.getAllScenes) {
    const scenes = window.getAllScenes();
    const defaultScene = scenes?.[0];
    if (defaultScene) {
      renderSceneList(scenes, defaultScene.id);
      if (window.loadSceneIntoEditor) {
        window.loadSceneIntoEditor(defaultScene.id);
      }
    }
  }
});
// Render the scene list in the sidebar and highlight the active scene
export function renderSceneList(scenes, activeSceneId) {
  const sidebar = document.getElementById('scene-list');
  if (!sidebar) return;
  sidebar.innerHTML = '';
  scenes.forEach(scene => {
    const el = document.createElement('div');
    el.className = 'scene-item';
    if (scene.id === activeSceneId) el.classList.add('active');
    el.innerText = scene.title;
    el.onclick = () => loadSceneIntoEditor(scene.id);
    sidebar.appendChild(el);
  });
}
import { redrawAllLayers } from './redraw-analysis.js';
import { runAllDataAnalysis } from './analysis-utils.js';

// Analyze and redraw charts for a given scene text
export function analyzeAndRedrawScene(sceneText) {
  const data = runAllDataAnalysis(sceneText);
  redrawAllLayers(data);
}

// Call this when a scene is selected
export function handleSceneSelection(scene) {
  const sceneText = scene.text || "";
  analyzeAndRedrawScene(sceneText);
}
