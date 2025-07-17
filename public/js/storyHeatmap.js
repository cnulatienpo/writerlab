import { loadItem, getSceneTone } from "./storyModel.js";
function buildStoryHeatmapData(bookObj) {
  const data = [];
  if (!bookObj || !bookObj.actIds) return data;

  for (const actId of bookObj.actIds) {
    const act = loadItem(actId);
    if (!act || !act.chapterIds) continue;

    for (const chapterId of act.chapterIds) {
      const chapter = loadItem(chapterId);
      if (!chapter || !chapter.sceneIds) continue;

      for (const sceneId of chapter.sceneIds) {
        const scene = loadItem(sceneId);
        if (!scene) continue;
        data.push({
          act: act.name || 'Act',
          chapter: chapter.name || 'Chapter',
          scene: scene.title || 'Scene',
          emotion: getSceneTone(scene),
          sceneId: scene.id
        });
      }
    }
  }

  return data;
}

function renderStoryHeatmap(data) {
  const container = document.getElementById('story-heatmap');
  if (!container) return;
  container.innerHTML = '';

  const COLORS = window.EMOTION_COLORS || {
    fear: '#4a90e2',
    anger: '#d0021b',
    sadness: '#4a4a4a',
    joy: '#f5a623',
    disgust: '#7ed321',
    surprise: '#bd10e0',
    neutral: '#dddddd'
  };

  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.act]) grouped[item.act] = {};
    if (!grouped[item.act][item.chapter]) grouped[item.act][item.chapter] = [];
    grouped[item.act][item.chapter].push(item);
  });

  Object.entries(grouped).forEach(([actName, chapters]) => {
    const actHeading = document.createElement('h3');
    actHeading.textContent = actName;
    container.appendChild(actHeading);

    Object.entries(chapters).forEach(([chapName, scenes]) => {
      const chapterHeading = document.createElement('h4');
      chapterHeading.textContent = `Chapter: ${chapName}`;
      container.appendChild(chapterHeading);

      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.marginBottom = '4px';

      scenes.forEach(scene => {
        const block = document.createElement('div');
        block.className = 'scene-block';
        block.dataset.id = scene.sceneId;
        block.title = `${scene.scene} (${scene.emotion})`;
        block.style.background = COLORS[scene.emotion] || '#dddddd';
        block.onclick = () => {
          if (typeof loadScene === 'function') {
            loadScene(scene.sceneId);
          }
        };
        row.appendChild(block);
      });

      container.appendChild(row);
    });
  });
}


function drawStoryHeatmap(bookObj) {
  const data = buildStoryHeatmapData(bookObj);
  renderStoryHeatmap(data);
}


export { buildStoryHeatmapData, renderStoryHeatmap, drawStoryHeatmap };

window.buildStoryHeatmapData = buildStoryHeatmapData;
window.renderStoryHeatmap = renderStoryHeatmap;
window.drawStoryHeatmap = drawStoryHeatmap;

