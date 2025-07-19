import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// --- Utility for localStorage
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadData = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

// --- Scene Editor Component
function SceneEditor({ scene, onSave, onCancel }) {
  const [title, setTitle] = useState(scene?.title || "");
  const [text, setText] = useState(scene?.text || "");
  const [tags, setTags] = useState(scene?.tags?.join(", ") || "");

  return (
    <div style={{ padding: 10, background: "#eee", marginBottom: 10 }}>
      <input
        value={title}
        placeholder="Scene Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "98%" }}
      />
      <br />
      <textarea
        value={text}
        placeholder="Scene text"
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{ width: "98%", marginTop: 8 }}
      />
      <br />
      <input
        value={tags}
        placeholder="Tags (comma separated)"
        onChange={(e) => setTags(e.target.value)}
        style={{ width: "98%", marginTop: 8 }}
      />
      <br />
      <button onClick={() => onSave({ ...scene, title, text, tags: tags.split(",").map(s=>s.trim()).filter(Boolean) })}>
        Save
      </button>
      <button onClick={onCancel} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
}

// --- Main App Component
function App() {
  // --- Main story state
  const [scenes, setScenes] = useState(() => loadData("scenes", []));
  const [editing, setEditing] = useState(null); // {index, data}
  const [search, setSearch] = useState("");
  const [snapshots, setSnapshots] = useState(() => loadData("snapshots", []));
  const [snapshotNote, setSnapshotNote] = useState("");
  const [restoring, setRestoring] = useState(false);

  // --- Save scenes & snapshots to localStorage
  useEffect(() => saveData("scenes", scenes), [scenes]);
  useEffect(() => saveData("snapshots", snapshots), [snapshots]);

  // --- Add/Edit/Delete scenes
  const addScene = () => setEditing({ index: null, data: { title: "", text: "", tags: [] } });
  const editScene = (i) => setEditing({ index: i, data: scenes[i] });
  const deleteScene = (i) => {
    if (window.confirm("Delete this scene?")) {
      setScenes(scenes.filter((_, idx) => idx !== i));
    }
  };
  const saveScene = (scene) => {
    if (editing.index === null) setScenes([...scenes, scene]);
    else setScenes(scenes.map((sc, i) => (i === editing.index ? scene : sc)));
    setEditing(null);
  };

  // --- Drag-and-drop reorder logic
  function onDragEnd(result) {
    if (!result.destination) return;
    const newScenes = Array.from(scenes);
    const [moved] = newScenes.splice(result.source.index, 1);
    newScenes.splice(result.destination.index, 0, moved);
    setScenes(newScenes);
  }

  // --- Filtering/searching
  const filteredScenes = scenes.filter(
    (scene) =>
      (!search ||
        scene.title.toLowerCase().includes(search.toLowerCase()) ||
        scene.text.toLowerCase().includes(search.toLowerCase()) ||
        (scene.tags || []).some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
  );

  // --- Snapshots/commit system
  const takeSnapshot = () => {
    if (!snapshotNote.trim()) {
      alert("Please add a note for this snapshot!");
      return;
    }
    const newSnap = {
      timestamp: new Date().toISOString(),
      note: snapshotNote,
      scenes,
    };
    setSnapshots([newSnap, ...snapshots]);
    setSnapshotNote("");
  };
  const restoreSnapshot = (snap) => {
    if (window.confirm("Restore this version? Your current story will be replaced.")) {
      setScenes(snap.scenes);
      setRestoring(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Story Git MVP</h1>
      <div style={{ marginBottom: 8 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scenes or tags"
          style={{ width: 250, marginRight: 10 }}
        />
        <button onClick={addScene}>Add Scene</button>
        <button onClick={() => setRestoring((v) => !v)} style={{ marginLeft: 10 }}>
          {restoring ? "Back to Story" : "Show Snapshots"}
        </button>
      </div>

      {editing && (
        <SceneEditor
          scene={editing.data}
          onSave={saveScene}
          onCancel={() => setEditing(null)}
        />
      )}

      {!restoring && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="scene-list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredScenes.map((scene, idx) => (
                    <Draggable key={idx} draggableId={"scene-" + idx} index={idx}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: 6,
                            padding: 12,
                            marginBottom: 8,
                            background: "#fafcff",
                            ...prov.draggableProps.style,
                          }}
                        >
                          <b>{scene.title || <i>[Untitled Scene]</i>}</b>
                          <div style={{ marginTop: 4, fontSize: 13, color: "#555" }}>
                            {scene.tags && scene.tags.length > 0 ? (
                              <span>
                                Tags:{" "}
                                {scene.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      background: "#e1e7f5",
                                      padding: "2px 8px",
                                      borderRadius: 6,
                                      marginRight: 5,
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </span>
                            ) : (
                              <span style={{ color: "#aaa" }}>No tags</span>
                            )}
                          </div>
                          <div style={{ margin: "8px 0" }}>{scene.text}</div>
                          <button onClick={() => editScene(idx)}>Edit</button>
                          <button
                            onClick={() => deleteScene(idx)}
                            style={{ marginLeft: 6, color: "crimson" }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div style={{ margin: "30px 0 0 0", borderTop: "1px solid #ddd", paddingTop: 16 }}>
            <h3>Save Snapshot (Commit)</h3>
            <input
              value={snapshotNote}
              onChange={(e) => setSnapshotNote(e.target.value)}
              placeholder="What changed? (add a note)"
              style={{ width: 320, marginRight: 8 }}
            />
            <button onClick={takeSnapshot}>Save Snapshot</button>
          </div>
        </>
      )}

      {restoring && (
        <div style={{ marginTop: 20 }}>
          <h2>Snapshots / Commits</h2>
          <ol>
            {snapshots.length === 0 && <li>No snapshots yet.</li>}
            {snapshots.map((snap, i) => (
              <li key={i} style={{ marginBottom: 12 }}>
                <div>
                  <b>{new Date(snap.timestamp).toLocaleString()}</b>
                  <span style={{ marginLeft: 10 }}>{snap.note}</span>
                </div>
                <button onClick={() => restoreSnapshot(snap)} style={{ marginTop: 4 }}>
                  Restore this snapshot
                </button>
              </li>
            ))}
          </ol>
          <button onClick={() => setRestoring(false)}>Back to Story</button>
        </div>
      )}
    </div>
  );
}

export default App;
