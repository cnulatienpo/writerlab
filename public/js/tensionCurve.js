import { buildTensionMap } from "./storyModel.js";
let chart;

function drawTensionCurve(bookObj) {
  const map = buildTensionMap(bookObj);
  const canvas = document.getElementById('tension-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (chart) chart.destroy();

  const labels = map.map((d, i) => d.scene || `Scene ${i + 1}`);
  const tensionData = map.map(d => d.tension);
  const acts = map.map(d => d.act || '');

  const actColors = ['#ff5722','#03a9f4','#8bc34a','#9c27b0'];
  const actColorMap = {};
  let colorIndex = 0;
  acts.forEach(a => {
    if (!actColorMap[a]) {
      actColorMap[a] = actColors[colorIndex % actColors.length];
      colorIndex++;
    }
  });
  const pointColors = acts.map(a => actColorMap[a]);

  const actIndices = [];
  let prevAct = acts[0];
  for (let i = 0; i < acts.length; i++) {
    if (acts[i] !== prevAct) actIndices.push(i);
    prevAct = acts[i];
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Tension',
        data: tensionData,
        borderColor: '#ff6384',
        backgroundColor: pointColors,
        fill: false,
        tension: 0.4,
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 10, title: { display: true, text: 'Tension Score' } },
        x: { title: { display: true, text: 'Scenes' } }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: context => labels[context[0].dataIndex],
            label: context => `${acts[context.dataIndex]}: ${tensionData[context.dataIndex]}`
          }
        }
      },
      onClick(evt) {
        const point = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        if (point.length) {
          const idx = point[0].index;
          if (typeof loadScene === 'function') {
            loadScene(map[idx].sceneId);
          }
        }
      }
    },
    plugins: [{
      id: 'actDividers',
      afterDraw(c) {
        const {ctx, chartArea: {top,bottom}} = c;
        ctx.save();
        ctx.strokeStyle = '#888';
        actIndices.forEach(i => {
          const meta = c.getDatasetMeta(0);
          if (meta.data[i]) {
            const x = meta.data[i].x;
            ctx.beginPath();
            ctx.moveTo(x, top);
            ctx.lineTo(x, bottom);
            ctx.stroke();
          }
        });
        ctx.restore();
      }
    }]
  });
}

function summarizeTensionCurve(data) {
  if (!Array.isArray(data) || data.length === 0) return '';
  const tensions = data.map(d => d.tension);
  const acts = data.map(d => d.act);
  const spikes = [];
  for (let i=1;i<tensions.length;i++) {
    if (tensions[i] - tensions[i-1] >= 3) spikes.push(i+1);
  }
  const plateaus = [];
  let start = 0;
  for (let i=1;i<=tensions.length;i++) {
    if (tensions[i] !== tensions[i-1]) {
      if (i - start >= 3) plateaus.push([start+1,i]);
      start = i;
    }
  }
  const drops = [];
  for (let i=1;i<tensions.length;i++) {
    if (acts[i] && acts[i].toLowerCase().includes('act ii') && tensions[i-1] - tensions[i] >= 3) {
      drops.push(i+1);
    }
  }
  const parts = [];
  if (drops.length) parts.push(`Act II starts strong but dips around Scene ${drops[0]}`);
  if (plateaus.length) parts.push(`a plateau from Scene ${plateaus[0][0]} to ${plateaus[0][1]-1}`);
  if (spikes.length) parts.push(`sharp spikes near Scene ${spikes[0]}`);
  if (parts.length === 0) return 'The tension curve is well-paced throughout.';
  return parts.join('. ') + '.';
}

export { drawTensionCurve, summarizeTensionCurve };
window.drawTensionCurve = drawTensionCurve;
window.summarizeTensionCurve = summarizeTensionCurve;

