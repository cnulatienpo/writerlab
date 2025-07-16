// Project management for Drafting Room

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi23iRWj7rE4gMssuoKx8NxO5cdnUNj7E",
  authDomain: "pfp-data-14b9a.firebaseapp.com",
  projectId: "pfp-data-14b9a",
  storageBucket: "pfp-data-14b9a.firebasestorage.app",
  messagingSenderId: "932276405722",
  appId: "1:932276405722:web:d9cd4cc1a5a4856ee82ce3",
  measurementId: "G-DGYDTSHHV8"
};

// Initialize Firebase (using compat version)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to save user to Google Sheet
async function saveUserToSheet(user) {
  const userData = {
    user_id: user.uid,
    email: user.email,
    tokens_current: 0,
    tokens_total: 0,
    tokens_spent: 0,
    last_refill_date: new Date().toISOString(),
    role: "user",
    created_at: new Date().toISOString(),
    notes: ""
  };
  try {
    const response = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: userData })
    });
    const result = await response.json();
    console.log("Saved user to sheet:", result);
  } catch (err) {
    console.error("Error saving to sheet:", err.message);
  }
}

// Function to fetch user data from Google Sheet
async function getUserFromSheet(user_id) {
  try {
    // SheetDB lets you filter like this: /search?user_id=VALUE
    const response = await fetch(`${SHEETDB_URL}/search?user_id=${user_id}`);
    const data = await response.json();
    
    if (data.length > 0) {
      // Found the user
      const userRow = data[0];
      console.log("Fetched user:", userRow);
      return userRow;
    } else {
      // No user found
      console.log("No user found with id:", user_id);
      return null;
    }
  } catch (err) {
    console.error("Error fetching user from sheet:", err.message);
    return null;
  }
}

// Firebase Authentication functions
async function signUp(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Signed up:", user.uid, user.email);
    // Add this:
    await saveUserToSheet(user);
    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
  }
}

async function logIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Logged in:", user.uid, user.email);
    
    // Fetch user's token data from Google Sheet
    const userRow = await getUserFromSheet(user.uid);
    if (userRow) {
      console.log("Current tokens:", userRow.tokens_current);
      // You can store this in a global variable or use it in your app
      window.currentUserData = userRow;
    } else {
      console.log("User not found in sheet - might need to be saved first");
    }
    
    return user;
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

// SheetDB and Firebase Authentication
const SHEETDB_URL = "https://sheetdb.io/api/v1/14f5e5la3laxh";

async function testSheetDB() {
  const testData = {
    user_id: "testuser",
    email: "test@example.com", 
    tokens_current: 0,
    tokens_total: 0,
    tokens_spent: 0,
    last_refill_date: new Date().toISOString(),
    role: "user",
    created_at: new Date().toISOString(),
    notes: "test row"
  };

  try {
    const response = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: testData })
    });
    
    const result = await response.json();
    console.log("Test row saved:", result);
  } catch (err) {
    console.error("Error saving to sheet:", err.message);
  }
}

// Call the test function
testSheetDB();

// Grab DOM elements
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
const wordCount = document.getElementById('word-count');
const sceneGoal = document.getElementById('scene-goal');
const sceneEmotion = document.getElementById('scene-emotion');
const sceneCharacters = document.getElementById('scene-characters');
const desireSlider = document.getElementById('desire-slider');
const conflictSlider = document.getElementById('conflict-slider');
const revealSlider = document.getElementById('reveal-slider');

function showSection(id) {
  sceneEditor.classList.add('hidden');
  outlineSection.classList.add('hidden');
  storyCheckSection.classList.add('hidden');
  document.getElementById(id).classList.remove('hidden');
}

// Utility helpers
function saveProjectData(name, data) {
  localStorage.setItem(`project:${name}`, JSON.stringify(data));
}

function loadProjectData(name) {
  const raw = localStorage.getItem(`project:${name}`);
  return raw ? JSON.parse(raw) : null;
}

function listAllProjects() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith('project:'))
    .map(k => k.slice(8));
}

// App state
let currentProject = null;
let currentSceneId = null;

// ------------------------ UI Rendering ------------------------ //
function refreshProjectList() {
  projectList.innerHTML = '';
  listAllProjects().forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.addEventListener('click', () => switchProject(name));
    projectList.appendChild(btn);
  });
}

function renderOutline() {
  if (!currentProject) return;
  outlineContainer.innerHTML = '';
  currentProject.scenes.forEach(scene => {
    const btn = document.createElement('button');
    btn.textContent = scene.title || 'Scene';
    btn.addEventListener('click', () => openScene(scene.id));
    outlineContainer.appendChild(btn);
  });
}

function updateWordCount() {
  const text = sceneText.value.trim();
  const count = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = `Words: ${count}`;
}

// ------------------------ Actions ------------------------ //
function createProject() {
  const name = newProjectInput.value.trim();
  if (!name) return;
  const data = {
    name,
    scenes: [],
    notes: [],
    storyCheck: '',
    createdAt: Date.now()
  };
  saveProjectData(name, data);
  newProjectInput.value = '';
  currentProject = data;
  refreshProjectList();
  switchProject(name);
}

function switchProject(name) {
  const data = loadProjectData(name);
  if (!data) return;
  currentProject = data;
  storyCheckInput.value = data.storyCheck || '';
  renderOutline();
  storyCheckSection.classList.remove('hidden');
  outlineSection.classList.remove('hidden');
  sceneEditor.classList.add('hidden');
  currentSceneId = null;
}

function saveStoryCheck() {
  if (!currentProject) return;
  currentProject.storyCheck = storyCheckInput.value;
  saveProjectData(currentProject.name, currentProject);
}

function addScene() {
  if (!currentProject) return;
  const id = `scene-${Date.now()}`;
  const scene = { id, title: `Scene ${currentProject.scenes.length + 1}` };
  currentProject.scenes.push(scene);
  saveProjectData(currentProject.name, currentProject);
  renderOutline();
}

function openScene(sceneId) {
  currentSceneId = sceneId;
  fetch(`projects/${currentProject.name}/scenes/${sceneId}.json`)
    .then(res => res.json())
    .then(data => {
      sceneTitle.textContent = `✍️ Editing ${data.title}`;
      sceneText.value = data.content || '';
      sceneGoal.value = data.goal || '';
      sceneEmotion.value = data.emotion || '';
      sceneCharacters.value = data.characters || '';
      desireSlider.value = data.desire || 0;
      conflictSlider.value = data.conflict || 0;
      revealSlider.value = data.reveal || 0;
      updateWordCount();
      showSection('scene-editor');
    });
}

function saveScene() {
  if (!currentProject || !currentSceneId) return;

  const data = {
    title: sceneTitle.textContent.replace('✍️ Editing ', ''),
    content: sceneText.value,
    goal: sceneGoal.value,
    emotion: sceneEmotion.value,
    characters: sceneCharacters.value,
    desire: parseInt(desireSlider.value),
    conflict: parseInt(conflictSlider.value),
    reveal: parseInt(revealSlider.value)
  };

  fetch(`projects/${currentProject.name}/scenes/${currentSceneId}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => {
    alert('Scene saved!');
  });
}

function closeScene() {
  sceneEditor.classList.add('hidden');
  outlineSection.classList.remove('hidden');
  currentSceneId = null;
}

// ------------------------ Event Listeners ------------------------ //
window.addEventListener('load', refreshProjectList);
createProjectBtn.addEventListener('click', createProject);
saveStoryCheckBtn.addEventListener('click', saveStoryCheck);
addSceneBtn.addEventListener('click', addScene);
saveSceneBtn.addEventListener('click', saveScene);
closeSceneBtn.addEventListener('click', closeScene);
sceneText.addEventListener('input', updateWordCount);
