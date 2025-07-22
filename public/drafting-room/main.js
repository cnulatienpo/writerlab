// Slideout drawer toggle logic
document.addEventListener('DOMContentLoaded', function() {
  const toggleDrawerBtn = document.getElementById('toggle-drawer');
  const slideoutDrawer = document.getElementById('slideout-drawer');
  if (toggleDrawerBtn && slideoutDrawer) {
    toggleDrawerBtn.addEventListener('click', () => {
      slideoutDrawer.classList.toggle('visible');
    });
  }
});
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
