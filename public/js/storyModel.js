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

// Determine the dominant emotion for a scene
export function getSceneTone(sceneObj) {
  const heatmap = sceneObj && sceneObj.analysis && sceneObj.analysis.emotionHeatmap;
  if (!heatmap || Object.keys(heatmap).length === 0) return 'neutral';
  let top = 'neutral';
  let max = -Infinity;
  for (const [emotion, count] of Object.entries(heatmap)) {
    if (count > max) {
      max = count;
      top = emotion;
    }
  }
  return top;
}

// Run getSceneTone for every scene in the book structure
export function getBookSceneTones(book) {
  const tones = {};
  if (!book || !book.actIds) return tones;
  for (const actId of book.actIds) {
    const act = loadItem(actId);
    if (!act || !act.chapterIds) continue;
    for (const chapterId of act.chapterIds) {
      const chapter = loadItem(chapterId);
      if (!chapter || !chapter.sceneIds) continue;
      for (const sceneId of chapter.sceneIds) {
        const scene = loadItem(sceneId);
        if (!scene) continue;
        tones[scene.id] = getSceneTone(scene);
      }
    }
  }
  return tones;
}


// Estimate a tension score for a scene object
// Returns an integer from 0 (no tension) to 10 (high tension)
export function getTensionScore(sceneObj) {
  if (!sceneObj) return 0;
  let score = 0;

  const heatmap = sceneObj.analysis && sceneObj.analysis.emotionHeatmap;
  if (heatmap) {
    const weights = { fear: 2, anger: 2, sadness: 1, surprise: 1, joy: -1 };
    for (const [emotion, weight] of Object.entries(weights)) {
      score += weight * (heatmap[emotion] || 0);
    }
  }

  const beatsCount = Array.isArray(sceneObj.beats) ? sceneObj.beats.length : 0;
  score += beatsCount * 0.5;

  let pacingScore = 0;
  if (typeof sceneObj.pacing === 'number') {
    pacingScore = sceneObj.pacing;
  } else if (sceneObj.analysis && sceneObj.analysis.telemetry) {
    const len = sceneObj.analysis.telemetry.avgSentenceLength;
    if (typeof len === 'number' && len > 0) {
      pacingScore = 20 / len;
    }
  }
  score += pacingScore;

  score = Math.round(Math.max(0, Math.min(10, score)));
  return score;
}
