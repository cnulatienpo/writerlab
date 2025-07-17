// ===============================================
// DRAFTING ROOM - INTEGRATED FUNCTIONALITY
// ===============================================

// ===============================================
// DATA ANALYSIS FUNCTIONS
// ===============================================

// Stopwords for motif tracker
const STOPWORDS = [
  "the","and","a","to","of","in","that","is","for","on","it","as","with","was","but","be","at","by",
  "an","are","this","from","or","which","you","one","had","not","were","her","all","she","his","they",
  "have","has","we","my","so","me","their","if","no","he"
];

// Textual Telemetry Functions
function getAverageSentenceLength(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  if (sentences.length === 0) return 0;
  const totalWords = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).filter(w => w).length, 0);
  return +(totalWords / sentences.length).toFixed(2);
}

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(w => w).length;
}

function getSentenceCount(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences.length;
}

function getDialoguePercentage(text) {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length === 0) return 0;
  const dialogueLines = lines.filter(line => line.trim().startsWith('"') || line.trim().endsWith('"'));
  return +(100 * dialogueLines.length / lines.length).toFixed(1);
}

function getMostCommonWord(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z'\s-]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.includes(w));
  if (!words.length) return null;
  const freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;
  let max = 0, most = null;
  for (let w in freq) if (freq[w] > max) { max = freq[w]; most = w; }
  return most;
}

function getAdverbCount(text) {
  return (text.match(/\b\w+ly\b/gi) || []).length;
}

function getReadingLevel(text) {
  const sentences = getSentenceCount(text) || 1;
  const words = getWordCount(text) || 1;
  const syllables = (text.match(/[aeiouy]{1,2}/gi) || []).length || 1;
  const fleschKincaid = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.round(fleschKincaid);
}

function getPassiveVoicePercentage(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  if (sentences.length === 0) return 0;
  let passive = 0;
  const passiveRegex = /\b(was|were|is|are|been|being|be)\b\s+\w+ed\b/i;
  for (let s of sentences) if (passiveRegex.test(s)) passive++;
  return +(100 * passive / sentences.length).toFixed(1);
}

// Motif/Theme Tracker
function getMotifMap(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z'\s-]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.includes(w));
  const freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;
  // Get top 5 motifs
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
}

// Emotion/Conceptual Heatmap
const EMOTION_WORDS = ["fear","anger","love","joy","sad","hate","hope","envy","pain","shame","trust"];
function getEmotionHeatmap(text) {
  const result = {};
  for (let emotion of EMOTION_WORDS) {
    const regex = new RegExp(`\\b${emotion}\\w*\\b`, 'gi');
    result[emotion] = (text.match(regex) || []).length;
  }
  return result;
}

// Character Tracker
function getCharacterMap(text) {
  const names = {};
  const lines = text.split('\n');
  for (let line of lines) {
    const words = line.split(/\s+/);
    for (let i = 1; i < words.length; i++) {
      const w = words[i];
      if (/^[A-Z][a-z]+$/.test(w)) names[w] = (names[w] || 0) + 1;
    }
  }
  return Object.entries(names)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
}

// Main Data Analysis Function
function runAllDataAnalysis(text) {
  return {
    telemetry: {
      avgSentenceLength: getAverageSentenceLength(text),
      wordCount: getWordCount(text),
      sentenceCount: getSentenceCount(text),
      dialoguePercent: getDialoguePercentage(text),
      mostCommonWord: getMostCommonWord(text),
      adverbCount: getAdverbCount(text),
      readingLevel: getReadingLevel(text),
      passiveVoicePercent: getPassiveVoicePercentage(text)
    },
    motifMap: getMotifMap(text),
    emotionHeatmap: getEmotionHeatmap(text),
    characterMap: getCharacterMap(text)
  };
}

// DOM Elements
const projectList = document.getElementById('project-list');
const createProjectBtn = document.getElementById('create-project');
const newProjectInput = document.getElementById('new-project-name');

const storyCheckSection = document.getElementById('story-check');
const storyCheckInput = document.getElementById('story-check-input');
const saveStoryCheckBtn = document.getElementById('save-story-check');

const outlineSection = document.getElementById('outline');
const outlineContainer = document.getElementById('outline-container');
const addSceneBtn = document.getElementById('add-scene');

const sceneEditor = document.getElementById('scene-editor');
const sceneTitle = document.getElementById('scene-title');
const sceneText = document.getElementById('scene-text');
const saveSceneBtn = document.getElementById('save-scene');
const closeSceneBtn = document.getElementById('close-scene');

const drawer = document.getElementById('slideout-drawer');
const toggleDrawerBtn = document.getElementById('toggle-drawer');

const junkDrawer = document.getElementById('junk-drawer');
const toggleJunkDrawerBtn = document.getElementById('toggle-junk');
const addNoteBtn = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
const junkDrawerText = document.getElementById('junk-drawer-text');

const wordCount = document.getElementById('word-count');
const visualizerSection = document.getElementById('visualizer-section');
const toggleVisualizerBtn = document.getElementById('toggle-visualizer');

const feedbackTray = document.getElementById('feedback-tray');
const feedbackContent = document.getElementById('feedback-content');

// Scene Notes Inputs
const sceneGoal = document.getElementById('scene-goal');
const sceneEmotion = document.getElementById('scene-emotion');
const sceneCharacters = document.getElementById('scene-characters');
const sceneAct = document.getElementById('scene-act');
const desireSlider = document.getElementById('desire-slider');
const conflictSlider = document.getElementById('conflict-slider');
const revealSlider = document.getElementById('reveal-slider');
const sceneNote = document.getElementById('scene-note');

const templateSelector = document.getElementById('template-selector');
const insertTemplateBtn = document.getElementById('insert-template');
const suggestTemplateBtn = document.getElementById('suggest-template');
const templateSuggestions = document.getElementById('template-suggestions');
const beatStack = document.getElementById('beat-stack');

// Beat template scaffolds
const beatTemplates = [
  {
    name: 'Emotional Turn',
    scaffold: 'The character feels [emotion] until [event] flips it to [new emotion].',
    tags: ['emotion', 'turn', 'internal', 'Act II']
  },
  {
    name: 'Power Shift',
    scaffold: '[Character] gains or loses control after [event].',
    tags: ['structure', 'tension', 'Act III']
  },
  {
    name: 'Setup',
    scaffold: 'We introduce [idea/item] that will matter later.',
    tags: ['foreshadow', 'Act I', 'calm']
  },
  {
    name: 'Escalation',
    scaffold: '[Conflict] gets worse as [complication] is introduced.',
    tags: ['tension', 'Act II', 'fast']
  }
];

// Suggest templates based on context tags
function suggestTemplates(context = {}) {
  const values = Object.values(context);
  return beatTemplates
    .map(tpl => {
      const matchCount = tpl.tags ? tpl.tags.reduce((count, tag) => {
        return values.includes(tag) ? count + 1 : count;
      }, 0) : 0;
      return { tpl, matchCount };
    })
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(item => item.tpl);
}

function collectContext() {
  const emotions = [];
  if (currentAnalysisResult && currentAnalysisResult.emotionHeatmap) {
    const sorted = Object.entries(currentAnalysisResult.emotionHeatmap)
      .sort((a, b) => b[1] - a[1])
      .filter(([, c]) => c > 0);
    sorted.slice(0, 2).forEach(([e]) => emotions.push(e));
  }

  let pacing = 'medium';
  if (currentAnalysisResult && currentAnalysisResult.telemetry) {
    const avg = currentAnalysisResult.telemetry.avgSentenceLength || 0;
    if (avg > 18) pacing = 'slow';
    else if (avg > 12) pacing = 'medium';
    else pacing = 'fast';
  }

  let act = '';
  if (currentProject && currentSceneIndex !== null) {
    const scene = projects[currentProject].scenes[currentSceneIndex];
    act = (scene.notes && scene.notes.act) || '';
  }
  if (sceneAct && sceneAct.value) {
    act = sceneAct.value;
  }

  return {
    emotion: emotions.join(', '),
    pacing,
    act
  };
}

// State
let currentProject = null;
let projects = {};
let currentSceneIndex = null;
let autosaveTimer;
let latestRayRayReply = '';
let currentAnalysisResult = null;
let currentSceneBeats = [];

function getCurrentSceneTitle() {
  if (currentSceneIndex !== null && currentProject && projects[currentProject]) {
    const scene = projects[currentProject].scenes[currentSceneIndex];
    return scene.title || `Scene ${currentSceneIndex + 1}`;
  }
  return 'Text Analysis';
}

// ===============================================
// CORE PROJECT MANAGEMENT
// ===============================================

// Load from localStorage
function loadProjects() {
  const saved = localStorage.getItem('drafting-projects');
  if (saved) projects = JSON.parse(saved);
}

// Save to localStorage
function saveProjects() {
  localStorage.setItem('drafting-projects', JSON.stringify(projects));
}

// Render all projects
function renderProjects() {
  projectList.innerHTML = '';
  Object.keys(projects).forEach(name => {
    const div = document.createElement('div');
    div.textContent = name;
    div.classList.add('project-entry');
    div.onclick = () => loadProject(name);
    projectList.appendChild(div);
  });
}

// Create project
function createProject() {
  const name = newProjectInput.value.trim();
  if (!name || projects[name]) return;
  projects[name] = {
    storyCheck: '',
    scenes: []
  };
  newProjectInput.value = '';
  saveProjects();
  renderProjects();
}

// Load project
function loadProject(name) {
  currentProject = name;
  storyCheckInput.value = projects[name].storyCheck || '';
  renderOutline();
  loadJunkDrawer();
  storyCheckSection.classList.remove('hidden');
  outlineSection.classList.remove('hidden');
  sceneEditor.classList.add('hidden');
  drawer.classList.add('hidden');
  updateSceneSidebar();
}

// Save Story Check
function saveStoryCheck() {
  if (!currentProject) return;
  projects[currentProject].storyCheck = storyCheckInput.value;
  saveProjects();
}

// ===============================================
// SCENE MANAGEMENT
// ===============================================

// Update word count
function updateWordCount() {
  const text = sceneText.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = `Words: ${count}`;
}

// Render beat blocks based on currentSceneBeats
function renderBeats() {
  if (!beatStack) return;
  beatStack.innerHTML = '';
  currentSceneBeats.forEach((beat, index) => {
    const textarea = document.createElement('textarea');
    textarea.className = 'beat-block';
    textarea.value = beat.content;
    textarea.dataset.index = index;

    const tpl = beatTemplates.find(t => t.scaffold === beat.content);
    if (tpl) {
      textarea.dataset.scaffold = tpl.scaffold;
      // mark pristine if content matches scaffold
      if (beat.content === tpl.scaffold) {
        textarea.dataset.pristine = 'true';
      }
    }

    textarea.addEventListener('focus', () => {
      if (textarea.dataset.pristine === 'true' && textarea.value === textarea.dataset.scaffold) {
        textarea.value = '';
      }
    });

    textarea.addEventListener('input', () => {
      textarea.dataset.pristine = 'false';
      currentSceneBeats[index].content = textarea.value;
    });

    beatStack.appendChild(textarea);
  });
}

// Insert a template beat and track it
function insertTemplateBeat(templateName) {
  const tpl = beatTemplates.find(t => t.name === templateName);
  if (!tpl) return;

  const beat = { type: 'Template', content: tpl.scaffold };
  currentSceneBeats.push(beat);
  const index = currentSceneBeats.length - 1;

  const textarea = document.createElement('textarea');
  textarea.className = 'beat-block';
  textarea.value = tpl.scaffold;
  textarea.dataset.scaffold = tpl.scaffold;
  textarea.dataset.pristine = 'true';
  textarea.dataset.index = index;

  textarea.addEventListener('focus', () => {
    if (textarea.dataset.pristine === 'true' && textarea.value === tpl.scaffold) {
      textarea.value = '';
    }
  });

  textarea.addEventListener('input', () => {
    textarea.dataset.pristine = 'false';
    currentSceneBeats[index].content = textarea.value;
  });

  if (beatStack) beatStack.appendChild(textarea);
}

// Render outline
function renderOutline() {
  outlineContainer.innerHTML = '';
  projects[currentProject].scenes.forEach((scene, index) => {
    const btn = document.createElement('div');
    btn.textContent = scene.title || `Scene ${index + 1}`;
    btn.classList.add('scene-card');
    btn.onclick = () => editScene(index);
    outlineContainer.appendChild(btn);
  });
}

// Add Scene
function addScene() {
  if (!currentProject) return;
  const title = prompt('Scene title:') || `Scene ${projects[currentProject].scenes.length + 1}`;
  const newScene = {
    title: title,
    text: '',
    notes: {},
    beats: []
  };
  projects[currentProject].scenes.push(newScene);
  saveProjects();
  renderOutline();
  updateSceneSidebar();
}

// Edit Scene
function editScene(index) {
  currentSceneIndex = index;
  const scene = projects[currentProject].scenes[index];
  sceneTitle.textContent = `✍️ ${scene.title}`;
  sceneText.value = scene.text || '';

  // Load beats
  currentSceneBeats = Array.isArray(scene.beats) ? scene.beats : [];
  renderBeats();
  
  // Load scene notes
  const notes = scene.notes || {};
  sceneGoal.value = notes.goal || '';
  sceneEmotion.value = notes.emotion || '';
  sceneCharacters.value = notes.characters || '';
  sceneAct.value = notes.act || '';
  desireSlider.value = notes.desire || 0;
  conflictSlider.value = notes.conflict || 0;
  revealSlider.value = notes.reveal || 0;

  loadSceneNote();
  
  sceneEditor.classList.remove('hidden');
  outlineSection.classList.add('hidden');
  drawer.classList.add('hidden');
  updateWordCount();
}

// Save Scene
function saveScene() {
  if (!currentProject || currentSceneIndex === null) return;
  
  const scene = projects[currentProject].scenes[currentSceneIndex];
  scene.text = sceneText.value;
  scene.beats = currentSceneBeats;
  scene.notes = {
    goal: sceneGoal.value,
    emotion: sceneEmotion.value,
    characters: sceneCharacters.value,
    act: sceneAct.value,
    desire: parseInt(desireSlider.value),
    conflict: parseInt(conflictSlider.value),
    reveal: parseInt(revealSlider.value)
  };
  saveSceneNote();

  saveProjects();
  renderOutline();
  updateSceneSidebar();
  
  // Auto-analyze scene with Ray Ray
  if (scene.text.trim()) {
    analyzeSceneWithRayRay(scene);
  }
}

// Auto-save scene
function autosaveScene() {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => {
    saveScene();
    updateWordCount();
  }, 1000);
}

// Close Scene Editor
function closeScene() {
  saveScene();
  currentSceneIndex = null;
  currentSceneBeats = [];
  if (beatStack) beatStack.innerHTML = '';
  sceneEditor.classList.add('hidden');
  outlineSection.classList.remove('hidden');
  drawer.classList.add('hidden');
}

// Update Scene Sidebar
function updateSceneSidebar() {
  const sceneList = document.getElementById('scene-list');
  sceneList.innerHTML = '';
  
  if (currentProject && projects[currentProject]) {
    projects[currentProject].scenes.forEach((scene, index) => {
      const li = document.createElement('li');
      li.textContent = scene.title || `Scene ${index + 1}`;
      li.onclick = () => editScene(index);
      if (index === currentSceneIndex) {
        li.classList.add('active');
      }
      sceneList.appendChild(li);
    });
  }
}

// ===============================================
// SCENE NOTES MANAGEMENT
// ===============================================

// Save scene notes
function saveSceneNotes() {
  if (!currentProject || currentSceneIndex === null) return;
  const scene = projects[currentProject].scenes[currentSceneIndex];
  scene.notes = {
    goal: sceneGoal.value,
    emotion: sceneEmotion.value,
    characters: sceneCharacters.value,
    act: sceneAct.value,
    desire: parseInt(desireSlider.value),
    conflict: parseInt(conflictSlider.value),
    reveal: parseInt(revealSlider.value)
  };
  saveProjects();
}

function saveSceneNote() {
  if (!currentProject || currentSceneIndex === null) return;
  const key = `sceneNote_${currentProject}_${currentSceneIndex}`;
  localStorage.setItem(key, sceneNote.value);
}

function loadSceneNote() {
  if (!currentProject || currentSceneIndex === null) return;
  const key = `sceneNote_${currentProject}_${currentSceneIndex}`;
  sceneNote.value = localStorage.getItem(key) || '';
}

// ===============================================
// JUNK DRAWER NOTES
// ===============================================

const JUNK_PREFIX = 'junkDrawer_';
let junkDrawerNotes = [];

function getJunkKey() {
  return `${JUNK_PREFIX}${currentProject || 'default'}`;
}

function saveJunkDrawer(notes) {
  const key = getJunkKey();
  const payload = { text: junkDrawerText.value, notes };
  localStorage.setItem(key, JSON.stringify(payload));
}

function appendJunkNote(note) {
  const wrapper = document.createElement('div');
  wrapper.className = 'junk-note-wrapper';

  const textarea = document.createElement('textarea');
  textarea.value = note.content;
  textarea.dataset.id = note.id;
  textarea.addEventListener('input', (e) => {
    const id = e.target.dataset.id;
    const idx = junkDrawerNotes.findIndex(n => n.id === id);
    if (idx !== -1) {
      junkDrawerNotes[idx].content = e.target.value;
      saveJunkDrawer(junkDrawerNotes);
    }
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    const idx = junkDrawerNotes.findIndex(n => n.id === note.id);
    if (idx !== -1) {
      junkDrawerNotes.splice(idx, 1);
      saveJunkDrawer(junkDrawerNotes);
      wrapper.remove();
    }
  });

  wrapper.appendChild(textarea);
  wrapper.appendChild(delBtn);
  notesContainer.appendChild(wrapper);
}

function loadJunkDrawer() {
  const key = getJunkKey();
  const data = localStorage.getItem(key);
  let parsed = data ? JSON.parse(data) : {};
  junkDrawerText.value = parsed.text || '';
  junkDrawerNotes = parsed.notes || [];
  notesContainer.innerHTML = '';
  junkDrawerNotes.forEach(note => appendJunkNote(note));
}

function addJunkNote() {
  const note = { id: `note-${Date.now()}`, content: '' };
  junkDrawerNotes.push(note);
  appendJunkNote(note);
  saveJunkDrawer(junkDrawerNotes);
}

// ===============================================
// VISUALIZER FUNCTIONS
// ===============================================

function toggleLayer(layerName, drawFunction, data) {
  const checkbox = document.getElementById(`toggle-${layerName}-layer`);
  const canvas = document.getElementById(`${layerName}-layer`);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (!checkbox || !checkbox.checked) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';
  } else {
    canvas.style.display = 'block';
    drawFunction(data);
  }
}

function drawMotifLayer(data) {
  const canvas = document.getElementById('motif-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Background
  ctx.fillStyle = 'rgba(178, 215, 255, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Title
  ctx.fillStyle = '#17496b';
  ctx.font = "24px 'Space Grotesk', sans-serif";
  ctx.fillText("Motif Map", 20, 40);
  
  // Sample visualization
  if (data && data.motifs) {
    data.motifs.forEach((motif, index) => {
      ctx.fillStyle = '#2481c7';
      ctx.fillRect(50 + index * 60, 80, 40, motif.count * 10);
      ctx.fillStyle = '#17496b';
      ctx.font = "12px 'Space Grotesk', sans-serif";
      ctx.fillText(motif.word, 50 + index * 60, 75);
    });
  }
}

function drawEmotionLayer(data) {
  const canvas = document.getElementById('emotion-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 224, 178, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#885518';
  ctx.font = "24px 'Space Grotesk', sans-serif";
  ctx.fillText("Emotion Heatmap", 20, 40);

  if (!data || !data.emotionHeatmap) return;

  const entries = Object.entries(data.emotionHeatmap);
  if (entries.length === 0) return;

  const values = entries.map(([, count]) => count);
  const max = Math.max(...values, 1);
  const padding = 20;
  const availableWidth = canvas.width - padding * (entries.length + 1);
  const barWidth = availableWidth / entries.length;

  entries.forEach(([emotion, count], index) => {
    const x = padding + index * (barWidth + padding);
    const barHeight = (count / max) * (canvas.height - 80);
    const y = canvas.height - barHeight - 40;

    ctx.fillStyle = '#ffb347';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = '#885518';
    ctx.font = "12px 'Space Grotesk', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(emotion, x + barWidth / 2, canvas.height - 15);
    ctx.fillText(count, x + barWidth / 2, y - 5);
  });
}

function drawCharacterLayer(data) {
  const canvas = document.getElementById('character-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Placeholder – waiting for real character data
}

function drawPacingLayer(data) {
  const canvas = document.getElementById('pacing-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Placeholder – waiting for real pacing data
}

function drawStructureLayer(data) {
  const canvas = document.getElementById('structure-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Placeholder – waiting for real structure data
}

function drawThemeLayer(data) {
  const canvas = document.getElementById('theme-layer');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Placeholder – waiting for real theme data
}

function redrawAllLayers(data) {
  if (data) {
    currentAnalysisResult = data;
  }

  toggleLayer('motif', drawMotifLayer, currentAnalysisResult);
  toggleLayer('emotion', drawEmotionLayer, currentAnalysisResult);
  toggleLayer('character', drawCharacterLayer, currentAnalysisResult);
  toggleLayer('pacing', drawPacingLayer, currentAnalysisResult);
  toggleLayer('structure', drawStructureLayer, currentAnalysisResult);
  toggleLayer('theme', drawThemeLayer, currentAnalysisResult);
}

// ===============================================
// RAY RAY CHAT FUNCTIONALITY
// ===============================================

function toggleRayRay() {
  const container = document.getElementById('rayray-container');
  const arrow = container.querySelector('#rayray-header span:last-child');
  
  container.classList.toggle('open');
  arrow.textContent = container.classList.contains('open') ? '▼' : '▶';
}

function getAllScenes() {
  if (!currentProject || !projects[currentProject]) return [];
  return projects[currentProject].scenes;
}

function addFeedbackToTray(sceneTitle, feedback) {
  const entry = document.createElement('div');

  const title = document.createElement('strong');
  title.textContent = sceneTitle;
  entry.appendChild(title);

  const messagePara = document.createElement('p');
  messagePara.textContent = feedback;
  entry.appendChild(messagePara);

  const divider = document.createElement('hr');
  divider.style.border = '1px solid #333';
  entry.appendChild(divider);

  feedbackContent.appendChild(entry);
  feedbackContent.scrollTop = feedbackContent.scrollHeight;

  latestRayRayReply = feedback;
  const controls = document.getElementById('save-controls');
  if (controls) controls.style.display = 'block';
}

function analyzeSceneWithRayRay(scene) {
  const messages = [
    {
      role: "system",
      content: `You are Ray Ray, a writing assistant embedded inside a scene editor.
You speak as the *element being analyzed* — grammar, pacing, theme, etc.
You respond in first person: "I'm your grammar. My verbs carry too much weight."

Rules:
- Do not rewrite or complete the user's text.
- Never say "As an AI language model…"
- You are insightful but clinical — no flattery or encouragement.
- Stay specific and describe what you observe in the writing.
- Use real terminology when applicable (e.g. passive voice, comma splice, rising tension).`
    },
    {
      role: "user",
      content: `Please analyze this scene: "${scene.title}"\n\n${scene.text}`
    }
  ];

  fetch('/api/deepseek/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      temperature: 0.7,
      max_tokens: 300
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const feedback = data.choices[0].message.content;
      addFeedbackToTray(scene.title, feedback);
      
      // Update visualization with analysis
      redrawAllLayers({
        motifs: [
          { word: "tension", count: 3 },
          { word: "conflict", count: 2 },
          { word: "resolve", count: 1 }
        ]
      });
    }
  })
  .catch(error => {
    console.error('Error getting Ray Ray feedback:', error);
    addFeedbackToTray(scene.title, 'Error getting feedback. Please try again.');
  });
}

// Function to get selected text or current scene text
function getSelectedOrCurrentText() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText) {
    return selectedText;
  }
  
  // Fall back to current scene text
  if (currentSceneIndex !== null && currentProject && projects[currentProject]) {
    const scene = projects[currentProject].scenes[currentSceneIndex];
    return scene.text || '';
  }
  
  return '';
}

function sendRayRay() {
  const input = document.getElementById('rayray-input');
  const msg = input.value.trim();
  if (!msg) return;

  // Display user message
  const messages = document.getElementById('rayray-messages');
  const userMsg = document.createElement('div');
  userMsg.style.color = '#85e1ff';
  userMsg.textContent = "You: " + msg;
  messages.appendChild(userMsg);

  // Get text for analysis - either selected text or current scene
  const textToAnalyze = getSelectedOrCurrentText();
  
  // Show loading
  const loadingMsg = document.createElement('div');
  loadingMsg.style.color = '#ffe877';
  loadingMsg.textContent = 'Ray Ray: Analyzing your text...';
  messages.appendChild(loadingMsg);

  // Run data analysis if we have text
  let analysisData = null;
  if (textToAnalyze) {
    analysisData = runAllDataAnalysis(textToAnalyze);
    currentAnalysisResult = analysisData;
  }

  // Build comprehensive prompt with analysis
  const systemPrompt = `
You are Ray Ray, a writing assistant embedded inside a scene editor. 
You speak as the *element being analyzed* — grammar, pacing, theme, etc. 
You respond in first person: "I'm your grammar. My verbs carry too much weight."

Rules:
- Do not rewrite or complete the user's text.
- Never say "As an AI language model…"
- You are insightful but clinical — no flattery or encouragement.
- Stay specific and describe what you observe in the writing.
- Use real terminology when applicable (e.g. passive voice, comma splice, rising tension).
`;
  
  let userPrompt = msg;
  if (analysisData && textToAnalyze) {
    userPrompt = `${msg}

--- Text to Analyze ---
${textToAnalyze}

--- Textual Telemetry ---
Word Count: ${analysisData.telemetry.wordCount}
Sentence Count: ${analysisData.telemetry.sentenceCount}
Average Sentence Length: ${analysisData.telemetry.avgSentenceLength} words
Dialogue Percentage: ${analysisData.telemetry.dialoguePercent}%
Most Common Word: ${analysisData.telemetry.mostCommonWord}
Adverb Count: ${analysisData.telemetry.adverbCount}
Reading Level: ${analysisData.telemetry.readingLevel}
Passive Voice: ${analysisData.telemetry.passiveVoicePercent}%

--- Motif Analysis ---
${analysisData.motifMap.map(m => `${m.word}: ${m.count}`).join(', ')}

--- Emotion Heatmap ---
${Object.entries(analysisData.emotionHeatmap).filter(([key, value]) => value > 0).map(([emotion, count]) => `${emotion}: ${count}`).join(', ')}

--- Character Analysis ---
${analysisData.characterMap.map(c => `${c.name}: ${c.count}`).join(', ')}

Please provide feedback on this text considering:
1. Writing style and technique
2. Emotional resonance and themes
3. Character development and dialogue
4. Areas for improvement
5. Strengths to build upon`;
  }

  // Call Ray Ray API
  const chatMessages = [
    {
      role: "system",
      content: systemPrompt
    },
    {
      role: "user",
      content: userPrompt
    }
  ];

  fetch('/api/deepseek/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500
    })
  })
  .then(response => response.json())
  .then(data => {
    messages.removeChild(loadingMsg);
    
    const botMsg = document.createElement('div');
    botMsg.style.color = '#ffe877';
    botMsg.style.marginBottom = '8px';
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      botMsg.textContent = "Ray Ray: " + data.choices[0].message.content;
      latestRayRayReply = data.choices[0].message.content;
      
      // Add feedback to tray
      const sceneTitle = currentSceneIndex !== null ? 
        (projects[currentProject].scenes[currentSceneIndex].title || `Scene ${currentSceneIndex + 1}`) : 
        'Text Analysis';
      addFeedbackToTray(sceneTitle, data.choices[0].message.content);
      
      // Update visualization with analysis data
      if (analysisData) {
        redrawAllLayers(analysisData);
      }
    } else if (data.error) {
      // Server returned an error (e.g., API connectivity issue)
      // Trigger demo mode with analysis data
      if (analysisData) {
        let demoFeedback = `I've analyzed your text and here's what I found:

**📊 Writing Style Analysis:**
- Your text is ${analysisData.telemetry.wordCount} words with ${analysisData.telemetry.sentenceCount} sentences
- Average sentence length: ${analysisData.telemetry.avgSentenceLength} words (${analysisData.telemetry.avgSentenceLength > 15 ? 'complex, literary style' : 'clear and accessible'})
- Dialogue: ${analysisData.telemetry.dialoguePercent}% of your text
- Reading level: ${analysisData.telemetry.readingLevel} (${analysisData.telemetry.readingLevel > 70 ? 'very accessible' : 'moderate complexity'})
- Passive voice: ${analysisData.telemetry.passiveVoicePercent}% ${analysisData.telemetry.passiveVoicePercent > 20 ? '(consider reducing for more dynamic prose)' : '(good balance)'}
- Adverbs: ${analysisData.telemetry.adverbCount} ${analysisData.telemetry.adverbCount > 5 ? '(try reducing for stronger verbs)' : '(good restraint)'}

**🎯 Key Themes & Motifs:**
${analysisData.motifMap.map(m => `- "${m.word}" appears ${m.count} times`).join('\n')}

**😊 Emotional Content:**
${Object.entries(analysisData.emotionHeatmap)
  .filter(([key, value]) => value > 0)
  .map(([emotion, count]) => `- ${emotion}: ${count} occurrences`)
  .join('\n') || '- Neutral emotional tone detected'}

**👥 Character Analysis:**
${analysisData.characterMap.length > 0 ? 
  analysisData.characterMap.map(c => `- "${c.name}" mentioned ${c.count} times`).join('\n') : 
  '- No major character names detected'}

**✍️ Writing Feedback:**
Your writing shows ${analysisData.telemetry.avgSentenceLength > 15 ? 'sophisticated, complex' : 'clear and direct'} sentence structure. The ${analysisData.telemetry.dialoguePercent > 20 ? 'dialogue-heavy approach creates dynamic character interaction' : 'narrative-focused style builds atmospheric tension'}.

**💡 Recommendations:**
- ${analysisData.telemetry.passiveVoicePercent > 20 ? 'Consider reducing passive voice for more engaging prose' : 'Good use of active voice keeps the narrative dynamic'}
- ${analysisData.telemetry.avgSentenceLength > 20 ? 'Try varying sentence lengths for better flow' : 'Sentence length works well for readability'}
- ${Object.values(analysisData.emotionHeatmap).some(v => v > 0) ? 'Strong emotional content detected - good for reader engagement' : 'Consider adding more emotional stakes'}

**🎨 Story Elements:**
- Atmospheric tension: ${analysisData.motifMap.some(m => ['dark', 'shadow', 'mystery', 'fear'].includes(m.word)) ? 'Strong' : 'Moderate'}
- Character development: ${analysisData.characterMap.length > 0 ? 'Clear character focus' : 'Setting/atmosphere focused'}
- Pacing: ${analysisData.telemetry.avgSentenceLength > 18 ? 'Slow, contemplative' : 'Balanced and engaging'}

[Demo Mode: Full AI analysis available when API is connected]`;
        
        botMsg.textContent = "Ray Ray: " + demoFeedback;
        latestRayRayReply = demoFeedback;
        
        // Add feedback to tray
        const sceneTitle = currentSceneIndex !== null ? 
          (projects[currentProject].scenes[currentSceneIndex].title || `Scene ${currentSceneIndex + 1}`) : 
          'Text Analysis';
        addFeedbackToTray(sceneTitle, demoFeedback);
        
        // Update visualization with analysis data
        redrawAllLayers(analysisData);
      } else {
        // If no analysis data, still try to get text and analyze
        const textForAnalysis = getSelectedOrCurrentText();
        if (textForAnalysis) {
          const quickAnalysis = runAllDataAnalysis(textForAnalysis);
          const simpleFeedback = `I've analyzed your text (${quickAnalysis.telemetry.wordCount} words, ${quickAnalysis.telemetry.sentenceCount} sentences). The writing shows ${quickAnalysis.telemetry.avgSentenceLength > 15 ? 'complex structure' : 'clear flow'} with ${quickAnalysis.telemetry.dialoguePercent}% dialogue. Key themes include: ${quickAnalysis.motifMap.map(m => m.word).join(', ')}. [Demo mode - API connection needed for full analysis]`;
          botMsg.textContent = "Ray Ray: " + simpleFeedback;
          latestRayRayReply = simpleFeedback;
          addFeedbackToTray("Quick Analysis", simpleFeedback);
        } else {
          botMsg.textContent = "Ray Ray: I'm having trouble understanding. Could you rephrase that?";
        }
      }
    } else {
      botMsg.textContent = "Ray Ray: I'm having trouble understanding. Could you rephrase that?";
    }
    
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  })
  .catch(error => {
    messages.removeChild(loadingMsg);
    console.error('Error:', error);
    
    const botMsg = document.createElement('div');
    botMsg.style.color = '#ffe877';
    botMsg.style.marginBottom = '8px';
    
    // Demo mode - show analysis when API is not available
    if (analysisData) {
      let demoFeedback = `I've analyzed your text and here's what I found:

**Writing Style Analysis:**
- Your text is ${analysisData.telemetry.wordCount} words with ${analysisData.telemetry.sentenceCount} sentences
- Average sentence length: ${analysisData.telemetry.avgSentenceLength} words (good pacing)
- Dialogue: ${analysisData.telemetry.dialoguePercent}% of your text
- Reading level: ${analysisData.telemetry.readingLevel}
- Passive voice: ${analysisData.telemetry.passiveVoicePercent}% (consider reducing if high)

**Key Themes & Motifs:**
${analysisData.motifMap.map(m => `- "${m.word}" appears ${m.count} times`).join('\n')}

**Emotional Content:**
${Object.entries(analysisData.emotionHeatmap)
  .filter(([key, value]) => value > 0)
  .map(([emotion, count]) => `- ${emotion}: ${count} occurrences`)
  .join('\n')}

**Character Analysis:**
${analysisData.characterMap.length > 0 ? 
  analysisData.characterMap.map(c => `- "${c.name}" mentioned ${c.count} times`).join('\n') : 
  '- No major character names detected'}

**Recommendations:**
- Strong atmospheric writing with good tension buildup
- Consider varying sentence lengths for better rhythm
- The emotional content creates effective mood
- Good use of sensory details (sound, smell, touch)

[Note: This is demo mode - connect to DeepSeek API for full personalized feedback]`;
      
      botMsg.textContent = "Ray Ray: " + demoFeedback;
      latestRayRayReply = demoFeedback;

      // Add feedback to tray
      const sceneTitle = currentSceneIndex !== null ? 
        (projects[currentProject].scenes[currentSceneIndex].title || `Scene ${currentSceneIndex + 1}`) : 
        'Text Analysis';
      addFeedbackToTray(sceneTitle, demoFeedback);
      
      // Update visualization with analysis data
      redrawAllLayers(analysisData);
    } else {
      // If no analysis data, still try to get text and analyze
      const textForAnalysis = getSelectedOrCurrentText();
      if (textForAnalysis) {
        const quickAnalysis = runAllDataAnalysis(textForAnalysis);
        currentAnalysisResult = quickAnalysis;
        const simpleFeedback = `I've analyzed your text (${quickAnalysis.telemetry.wordCount} words, ${quickAnalysis.telemetry.sentenceCount} sentences). The writing shows ${quickAnalysis.telemetry.avgSentenceLength > 15 ? 'complex structure' : 'clear flow'} with ${quickAnalysis.telemetry.dialoguePercent}% dialogue. Key themes include: ${quickAnalysis.motifMap.map(m => m.word).join(', ')}. [Demo mode - API connection needed for full analysis]`;
        botMsg.textContent = "Ray Ray: " + simpleFeedback;
        latestRayRayReply = simpleFeedback;
        addFeedbackToTray("Quick Analysis", simpleFeedback);
      } else {
        botMsg.textContent = "Ray Ray: I'm having trouble understanding. Could you rephrase that?";
      }
    }
    
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  });

  input.value = "";
}

// ===============================================
// EVENT LISTENERS
// ===============================================

// Project management
createProjectBtn.onclick = createProject;
saveStoryCheckBtn.onclick = saveStoryCheck;

// Scene management
addSceneBtn.onclick = addScene;
saveSceneBtn.onclick = saveScene;
closeSceneBtn.onclick = closeScene;
sceneText.addEventListener('input', autosaveScene);

// Add analyze button handler
const analyzeSceneBtn = document.getElementById('analyze-scene');
if (analyzeSceneBtn) {
  analyzeSceneBtn.onclick = () => {
    const input = document.getElementById('rayray-input');
    input.value = "Please analyze this scene and provide detailed feedback.";
    sendRayRay();
  };
}

// Scene notes auto-save
[sceneGoal, sceneEmotion, sceneCharacters, sceneAct, desireSlider, conflictSlider, revealSlider].forEach(el => {
  el.addEventListener('input', saveSceneNotes);
});
sceneNote.addEventListener('input', saveSceneNote);
junkDrawerText.addEventListener('input', () => saveJunkDrawer(junkDrawerNotes));

// UI toggles
toggleDrawerBtn.onclick = () => drawer.classList.toggle('hidden');
toggleJunkDrawerBtn.onclick = () => junkDrawer.classList.toggle('hidden');
toggleVisualizerBtn.onclick = () => {
  visualizerSection.classList.toggle('hidden');
  if (!visualizerSection.classList.contains('hidden')) {
    redrawAllLayers();
  }
};

const DRAW_FUNCTIONS = {
  motif: drawMotifLayer,
  emotion: drawEmotionLayer,
  character: drawCharacterLayer,
  pacing: drawPacingLayer,
  structure: drawStructureLayer,
  theme: drawThemeLayer
};

Object.entries(DRAW_FUNCTIONS).forEach(([name, fn]) => {
  const checkbox = document.getElementById(`toggle-${name}-layer`);
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      toggleLayer(name, fn, currentAnalysisResult);
    });
  }
});

// Junk drawer
addNoteBtn.onclick = addJunkNote;

if (insertTemplateBtn) {
  insertTemplateBtn.addEventListener('click', () => {
    const tpl = templateSelector ? templateSelector.value : '';
    insertTemplateBeat(tpl);
  });
}

if (suggestTemplateBtn) {
  suggestTemplateBtn.addEventListener('click', () => {
    const context = collectContext();
    const suggestions = suggestTemplates(context).slice(0, 3);
    if (templateSuggestions) {
      templateSuggestions.innerHTML = '';
      suggestions.forEach(tpl => {
        const card = document.createElement('div');
        card.className = 'template-card';

        const nameEl = document.createElement('div');
        nameEl.textContent = tpl.name;
        card.appendChild(nameEl);

        const previewEl = document.createElement('div');
        previewEl.textContent = tpl.scaffold;
        card.appendChild(previewEl);

        const btn = document.createElement('button');
        btn.textContent = 'Insert';
        btn.addEventListener('click', () => {
          insertTemplateBeat(tpl.name);
          templateSuggestions.innerHTML = '';
        });
        card.appendChild(btn);

        templateSuggestions.appendChild(card);
      });
      templateSuggestions.classList.remove('hidden');
    }
  });
}

// ===============================================
// INITIALIZATION
// ===============================================

window.onload = function() {
  loadProjects();
  renderProjects();
  loadJunkDrawer();
  redrawAllLayers();
  
  // Initialize Ray Ray with welcome message
  const rayrayMessages = document.getElementById('rayray-messages');
  const welcomeMsg = document.createElement('div');
  welcomeMsg.style.color = '#ffe877';
  welcomeMsg.textContent = 'Ray Ray: Hello! I\'m here to help you with your writing. Ask me about your scenes or writing techniques!';
  rayrayMessages.appendChild(welcomeMsg);
};