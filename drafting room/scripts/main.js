// Project management for Drafting Room with Firebase Auth
console.log('Drafting Room script loaded');

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// SheetDB URL for user management
const SHEETDB_URL = "https://sheetdb.io/api/v1/14f5e5la3laxh";

// Global state
let currentProject = null;
let allProjects = {};
let currentUser = null;

// Firebase Auth Functions
async function saveUserToSheet(user) {
  const userData = {
    user_id: user.uid,
    email: user.email,
    tokens_current: 100,
    tokens_total: 100,
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
    console.log("User saved to sheet");
  } catch (err) {
    console.error("Error saving to sheet:", err);
  }
}

async function getUserFromSheet(user_id) {
  try {
    const response = await fetch(`${SHEETDB_URL}/search?user_id=${user_id}`);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

// Authentication state observer
auth.onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user;
    console.log("User signed in:", user.email);
    
    // Check if user exists in sheet, if not create them
    const userRow = await getUserFromSheet(user.uid);
    if (!userRow) {
      await saveUserToSheet(user);
    }
    
    // Load user's projects
    loadUserProjects();
  } else {
    currentUser = null;
    console.log("User signed out");
    // Fall back to localStorage
    loadFromLocalStorage();
  }
});

// Core Functions
function showSection(id) {
  console.log('showSection called with id:', id);
  
  // Hide all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
  });
  
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.remove('hidden');
    console.log('Successfully showed section:', id);
  } else {
    console.error('Section not found:', id);
  }
}

function saveToLocalStorage() {
  const key = currentUser ? `draftingRoom_${currentUser.uid}` : 'draftingRoomProjects';
  localStorage.setItem(key, JSON.stringify(allProjects));
}

function loadFromLocalStorage() {
  const key = currentUser ? `draftingRoom_${currentUser.uid}` : 'draftingRoomProjects';
  const stored = localStorage.getItem(key);
  if (stored) {
    allProjects = JSON.parse(stored);
    renderProjects();
  }
}

function loadUserProjects() {
  loadFromLocalStorage();
}

function renderProjects() {
  const projectList = document.getElementById('project-list');
  if (!projectList) return;
  
  projectList.innerHTML = '';
  
  Object.keys(allProjects).forEach(projectName => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item';
    projectDiv.innerHTML = `
      <span>${projectName}</span>
      <button onclick="loadProject('${projectName}')">Open</button>
      <button onclick="deleteProject('${projectName}')">Delete</button>
    `;
    projectList.appendChild(projectDiv);
  });
}

function createProject() {
  const nameInput = document.getElementById('new-project-name');
  const name = nameInput.value.trim();
  
  if (!name) {
    alert('Please enter a project name');
    return;
  }
  
  if (allProjects[name]) {
    alert('Project already exists');
    return;
  }
  
  currentProject = {
    name: name,
    storyCheck: '',
    scenes: [],
    settings: [],
    characters: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  allProjects[name] = currentProject;
  saveToLocalStorage();
  renderProjects();
  nameInput.value = '';
  showSection('story-check');
}

function loadProject(name) {
  currentProject = allProjects[name];
  currentProject.updatedAt = new Date().toISOString();
  
  // Load story check content
  const storyCheckInput = document.getElementById('story-check-input');
  if (storyCheckInput) {
    storyCheckInput.value = currentProject.storyCheck || '';
  }
  
  // Render all sections
  renderSettings();
  renderCharacters();
  renderOutline();
  
  showSection('story-check');
}

function deleteProject(name) {
  if (confirm(`Delete project "${name}"?`)) {
    delete allProjects[name];
    saveToLocalStorage();
    renderProjects();
    
    if (currentProject && currentProject.name === name) {
      currentProject = null;
      showSection('project-dashboard');
    }
  }
}

function saveStoryCheck() {
  if (!currentProject) return;
  
  const storyCheckInput = document.getElementById('story-check-input');
  if (storyCheckInput) {
    currentProject.storyCheck = storyCheckInput.value;
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
  }
}

// Settings management
function renderSettings() {
  const container = document.getElementById('settings-container');
  if (!container || !currentProject) return;
  
  container.innerHTML = '';
  
  if (currentProject.settings.length === 0) {
    container.innerHTML = '<p>No settings created yet. Click "Add Setting" to create your first setting.</p>';
    return;
  }
  
  currentProject.settings.forEach(setting => {
    const div = document.createElement('div');
    div.className = 'setting-item';
    div.innerHTML = `
      <h4>${setting.name}</h4>
      <p>${setting.description || 'No description'}</p>
      <div class="item-actions">
        <button onclick="editSetting(${setting.id})">Edit</button>
        <button onclick="deleteSetting(${setting.id})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addSetting() {
  if (!currentProject) return;
  
  const name = prompt('Setting name:');
  if (!name) return;
  
  const description = prompt('Setting description:');
  
  const setting = {
    id: Date.now(),
    name: name,
    description: description || '',
    notes: '',
    createdAt: new Date().toISOString()
  };
  
  currentProject.settings.push(setting);
  currentProject.updatedAt = new Date().toISOString();
  saveToLocalStorage();
  renderSettings();
}

function editSetting(id) {
  if (!currentProject) return;
  
  const setting = currentProject.settings.find(s => s.id === id);
  if (!setting) return;
  
  const newName = prompt('Edit setting name:', setting.name);
  if (newName !== null) {
    setting.name = newName;
    
    const newDescription = prompt('Edit setting description:', setting.description);
    if (newDescription !== null) {
      setting.description = newDescription;
    }
    
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderSettings();
  }
}

function deleteSetting(id) {
  if (!currentProject) return;
  
  if (confirm('Delete this setting?')) {
    currentProject.settings = currentProject.settings.filter(s => s.id !== id);
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderSettings();
  }
}

// Character management
function renderCharacters() {
  const container = document.getElementById('characters-container');
  if (!container || !currentProject) return;
  
  container.innerHTML = '';
  
  if (currentProject.characters.length === 0) {
    container.innerHTML = '<p>No characters created yet. Click "Add Character" to create your first character.</p>';
    return;
  }
  
  currentProject.characters.forEach(character => {
    const div = document.createElement('div');
    div.className = 'character-item';
    div.innerHTML = `
      <h4>${character.name}</h4>
      <p>${character.description || 'No description'}</p>
      <div class="item-actions">
        <button onclick="editCharacter(${character.id})">Edit</button>
        <button onclick="deleteCharacter(${character.id})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addCharacter() {
  if (!currentProject) return;
  
  const name = prompt('Character name:');
  if (!name) return;
  
  const description = prompt('Character description:');
  
  const character = {
    id: Date.now(),
    name: name,
    description: description || '',
    background: '',
    notes: '',
    createdAt: new Date().toISOString()
  };
  
  currentProject.characters.push(character);
  currentProject.updatedAt = new Date().toISOString();
  saveToLocalStorage();
  renderCharacters();
}

function editCharacter(id) {
  if (!currentProject) return;
  
  const character = currentProject.characters.find(c => c.id === id);
  if (!character) return;
  
  const newName = prompt('Edit character name:', character.name);
  if (newName !== null) {
    character.name = newName;
    
    const newDescription = prompt('Edit character description:', character.description);
    if (newDescription !== null) {
      character.description = newDescription;
    }
    
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderCharacters();
  }
}

function deleteCharacter(id) {
  if (!currentProject) return;
  
  if (confirm('Delete this character?')) {
    currentProject.characters = currentProject.characters.filter(c => c.id !== id);
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderCharacters();
  }
}

// Outline management
function renderOutline() {
  const container = document.getElementById('outline-container');
  if (!container || !currentProject) return;
  
  container.innerHTML = '';
  
  if (currentProject.scenes.length === 0) {
    container.innerHTML = '<p>No scenes yet. Click "Add Scene" to start building your story.</p>';
    return;
  }
  
  currentProject.scenes.forEach(scene => {
    const div = document.createElement('div');
    div.className = 'scene-item';
    div.innerHTML = `
      <h4>${scene.title}</h4>
      <p>${scene.content || 'No content yet'}</p>
      <div class="item-actions">
        <button onclick="editScene(${scene.id})">Edit</button>
        <button onclick="deleteScene(${scene.id})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addScene() {
  if (!currentProject) return;
  
  const title = prompt('Scene title:');
  if (!title) return;
  
  const scene = {
    id: Date.now(),
    title: title,
    content: '',
    createdAt: new Date().toISOString()
  };
  
  currentProject.scenes.push(scene);
  currentProject.updatedAt = new Date().toISOString();
  saveToLocalStorage();
  renderOutline();
}

function editScene(id) {
  if (!currentProject) return;
  
  const scene = currentProject.scenes.find(s => s.id === id);
  if (!scene) return;
  
  const newTitle = prompt('Edit scene title:', scene.title);
  if (newTitle !== null) {
    scene.title = newTitle;
    
    const newContent = prompt('Edit scene content:', scene.content);
    if (newContent !== null) {
      scene.content = newContent;
    }
    
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderOutline();
  }
}

function deleteScene(id) {
  if (!currentProject) return;
  
  if (confirm('Delete this scene?')) {
    currentProject.scenes = currentProject.scenes.filter(s => s.id !== id);
    currentProject.updatedAt = new Date().toISOString();
    saveToLocalStorage();
    renderOutline();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Project management
  const createProjectBtn = document.getElementById('create-project');
  if (createProjectBtn) {
    createProjectBtn.addEventListener('click', createProject);
  }
  
  // Story check
  const saveStoryCheckBtn = document.getElementById('save-story-check');
  if (saveStoryCheckBtn) {
    saveStoryCheckBtn.addEventListener('click', saveStoryCheck);
  }
  
  // Navigation buttons
  const goToOutlineBtn = document.getElementById('go-to-outline');
  const goToSettingsBtn = document.getElementById('go-to-settings');
  const goToCharactersBtn = document.getElementById('go-to-characters');
  const goToVisualizerBtn = document.getElementById('go-to-visualizer');
  
  if (goToOutlineBtn) {
    goToOutlineBtn.addEventListener('click', () => showSection('outline'));
  }
  if (goToSettingsBtn) {
    goToSettingsBtn.addEventListener('click', () => showSection('settings-docs'));
  }
  if (goToCharactersBtn) {
    goToCharactersBtn.addEventListener('click', () => showSection('character-docs'));
  }
  if (goToVisualizerBtn) {
    goToVisualizerBtn.addEventListener('click', () => showSection('visualizer-section'));
  }
  
  // Settings and characters
  const addSettingBtn = document.getElementById('add-setting');
  const addCharacterBtn = document.getElementById('add-character');
  const addSceneBtn = document.getElementById('add-scene');
  
  if (addSettingBtn) {
    addSettingBtn.addEventListener('click', addSetting);
  }
  if (addCharacterBtn) {
    addCharacterBtn.addEventListener('click', addCharacter);
  }
  if (addSceneBtn) {
    addSceneBtn.addEventListener('click', addScene);
  }
  
  console.log('Event listeners attached');
});

// Initialize
console.log('Drafting Room initialized');
