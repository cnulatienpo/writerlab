// Moved from drafting room/All-in-One Local Data Analysis Script

// --- STOPWORDS for motif tracker ---
const STOPWORDS = [
  "the","and","a","to","of","in","that","is","for","on","it","as","with","was","but","be","at","by",
  "an","are","this","from","or","which","you","one","had","not","were","her","all","she","his","they",
  "have","has","we","my","so","me","their","if","no","he"
];

function getAverageSentenceLength(text) {
  const sentences = text.match(/[^\.\!?]+[\.\!?]+/g) || [];
  if (sentences.length === 0) return 0;
  const totalWords = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).filter(w => w).length, 0);
  return +(totalWords / sentences.length).toFixed(2);
}

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(w => w).length;
}

function getSentenceCount(text) {
  const sentences = text.match(/[^\.\!?]+[\.\!?]+/g) || [];
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
  const sentences = text.match(/[^\.\!?]+[\.\!?]+/g) || [];
  if (sentences.length === 0) return 0;
  let passive = 0;
  const passiveRegex = /\b(was|were|is|are|been|being|be)\b\s+\w+ed\b/i;
  for (let s of sentences) if (passiveRegex.test(s)) passive++;
  return +(100 * passive / sentences.length).toFixed(1);
}

function getMotifMap(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z'\s-]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.includes(w));
  const freq = {};
  for (let w of words) freq[w] = (freq[w] || 0) + 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
}

const EMOTION_WORDS = ["fear","anger","love","joy","sad","hate","hope","envy","pain","shame","trust"];
function getEmotionHeatmap(text) {
  const result = {};
  for (let emotion of EMOTION_WORDS) {
    const regex = new RegExp(`\\b${emotion}\\w*\\b`, 'gi');
    result[emotion] = (text.match(regex) || []).length;
  }
  return result;
}

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

export function runAllDataAnalysis(text) {
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
