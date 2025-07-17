import { Book, Act, Chapter, Scene, saveItem, getBookSceneTones } from '../public/js/storyModel.js';

// Simple in-memory localStorage stub for Node environment
global.localStorage = {
  _store: {},
  getItem(key) { return this._store[key] || null; },
  setItem(key, val) { this._store[key] = String(val); },
  removeItem(key) { delete this._store[key]; }
};

// Create sample scenes with analysis data
const scene1 = new Scene({ title: 'Scene One' });
scene1.analysis = { emotionHeatmap: { joy: 3, fear: 1 } };
saveItem(scene1);

const scene2 = new Scene({ title: 'Scene Two' });
scene2.analysis = { emotionHeatmap: { sadness: 4, anger: 2 } };
saveItem(scene2);

// Create chapter and act structure
const chapter = new Chapter({ name: 'Chapter 1' });
chapter.addScene(scene1);
chapter.addScene(scene2);
saveItem(chapter);

const act = new Act({ name: 'Act 1' });
act.addChapter(chapter);
saveItem(act);

const book = new Book({ title: 'Demo Book' });
book.addAct(act);

// Run tone analysis
const tones = getBookSceneTones(book);
console.log(tones);
