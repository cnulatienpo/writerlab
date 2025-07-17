// Basic data model for beats, scenes, chapters, acts and book
// Stored in localStorage by ID for now (Firebase later)

const STORAGE_PREFIX = 'story_';

function storageKey(id) {
  return `${STORAGE_PREFIX}${id}`;
}

export function saveItem(item) {
  if (!item || !item.id) throw new Error('Item must have an id');
  localStorage.setItem(storageKey(item.id), JSON.stringify(item));
}

export function loadItem(id) {
  const data = localStorage.getItem(storageKey(id));
  return data ? JSON.parse(data) : null;
}

export function deleteItem(id) {
  localStorage.removeItem(storageKey(id));
}

export function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export class Beat {
  constructor({ id = generateId('beat'), type = '', content = '' } = {}) {
    this.id = id;
    this.type = type;
    this.content = content;
  }
}

export class Scene {
  constructor({ id = generateId('scene'), title = '', summary = '', beats = [] } = {}) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.beats = beats; // array of Beat objects
  }

  addBeat(beat) {
    this.beats.push(beat);
  }
}

export class Chapter {
  constructor({ id = generateId('chapter'), name = '', sceneIds = [] } = {}) {
    this.id = id;
    this.name = name;
    this.sceneIds = sceneIds; // array of Scene IDs
  }

  addScene(scene) {
    this.sceneIds.push(scene.id);
    saveItem(scene);
  }
}

export class Act {
  constructor({ id = generateId('act'), name = '', chapterIds = [] } = {}) {
    this.id = id;
    this.name = name;
    this.chapterIds = chapterIds; // array of Chapter IDs
  }

  addChapter(chapter) {
    this.chapterIds.push(chapter.id);
    saveItem(chapter);
  }
}

export class Book {
  constructor({ id = 'book-root', title = '', actIds = [] } = {}) {
    this.id = id;
    this.title = title;
    this.actIds = actIds; // array of Act IDs
  }

  addAct(act) {
    this.actIds.push(act.id);
    saveItem(act);
  }
}

