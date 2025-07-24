import React, { useState } from 'react';

const initialProject = {
  name: 'My Project',
  scenes: [],
};

export default function DraftingRoom() {
  const [project, setProject] = useState(initialProject);
  const [sceneTitle, setSceneTitle] = useState('');

  // Add a new scene
  const addScene = () => {
    if (!sceneTitle.trim()) return;
    setProject(prev => ({
      ...prev,
      scenes: [
        ...prev.scenes,
        {
          id: Date.now(),
          title: sceneTitle,
          content: '',
          notes: '',
          showNotes: false,
        },
      ],
    }));
    setSceneTitle('');
  };

  // Toggle notes panel for a scene
  const toggleSceneNotes = id => {
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.map(scene =>
        scene.id === id ? { ...scene, showNotes: !scene.showNotes } : scene
      ),
    }));
  };

  // Update notes for a scene
  const updateSceneNotes = (id, value) => {
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.map(scene =>
        scene.id === id ? { ...scene, notes: value } : scene
      ),
    }));
  };

  // Remove a scene
  const deleteScene = id => {
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.filter(scene => scene.id !== id),
    }));
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1>📘 Drafting Room - Next.js</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={sceneTitle}
          onChange={e => setSceneTitle(e.target.value)}
          placeholder="New scene title"
          style={{ padding: 10, borderRadius: 4, border: '1px solid #ddd', marginRight: 10 }}
        />
        <button onClick={addScene} style={{ background: '#007acc', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 5, cursor: 'pointer', fontSize: 16 }}>
          Add Scene
        </button>
      </div>
      {project.scenes.length === 0 ? (
        <p>No scenes yet. Add one above.</p>
      ) : (
        project.scenes.map(scene => (
          <div key={scene.id} style={{ background: '#f8f9fa', padding: 10, margin: '5px 0', borderRadius: 5, border: '1px solid #ddd', position: 'relative' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{scene.title}</h4>
            <p>{scene.content || 'No content yet'}</p>
            <button onClick={() => deleteScene(scene.id)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 14px', marginRight: 10 }}>Delete</button>
            <button className="plus-btn" onClick={() => toggleSceneNotes(scene.id)} style={{ background: '#43a047', color: '#fff', borderRadius: '50%', width: 32, height: 32, fontSize: 22, padding: 0, marginLeft: 10, verticalAlign: 'middle', border: 'none', cursor: 'pointer' }}>+</button>
            {scene.showNotes && (
              <div style={{ position: 'absolute', left: '100%', top: 0, width: '100%', minHeight: '100%', background: '#fffbe7', border: '1px solid #e0c97f', boxShadow: '0 2px 12px #0002', zIndex: 100, padding: 20, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Scene Notes</strong>
                  <button onClick={() => toggleSceneNotes(scene.id)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px' }}>Close</button>
                </div>
                <textarea
                  placeholder="Add notes for this scene..."
                  style={{ width: '100%', height: 120, marginTop: 10, borderRadius: 4, border: '1px solid #ddd', padding: 10 }}
                  value={scene.notes}
                  onChange={e => updateSceneNotes(scene.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
