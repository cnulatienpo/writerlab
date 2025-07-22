// Moved from drafting room/main.js
// ...existing code...

export function saveScene(scene) {
  // Example implementation for localStorage
  const project = JSON.parse(localStorage.getItem('writingProject'));
  const sceneIndex = project.scenes.findIndex(s => s.id === scene.id);
  if (sceneIndex !== -1) {
    project.scenes[sceneIndex] = scene;
    localStorage.setItem('writingProject', JSON.stringify(project));
  }
}
