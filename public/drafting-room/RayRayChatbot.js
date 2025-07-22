import React, { useState } from 'react';

export default function RayRayChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    setInput('');
    try {
      const response = await fetch('/api/rayray-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await response.json();
      setMessages(msgs => [...msgs, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Error: Could not get reply.' }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <button
        style={{
          background: '#222', color: '#fff', borderRadius: '50%', width: '60px', height: '60px', fontSize: '2rem', border: 'none', boxShadow: '0 2px 8px #0006', cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '70px', right: 0, width: '350px', background: '#222', color: '#fff', borderRadius: '1rem', boxShadow: '0 2px 16px #000a', padding: '1rem' }}>
          <h3>Ray Ray Chatbot</h3>
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1rem', fontSize: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '0.5rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal' }}>{msg.role === 'user' ? 'You:' : 'Ray Ray:'}</span> {msg.content}
              </div>
            ))}
            {loading && <div>Ray Ray is thinking...</div>}
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
            style={{ display: 'flex', gap: '0.5rem' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about this page..."
              style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #444', background: '#111', color: '#fff' }}
              disabled={loading}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#444', color: '#fff', border: 'none' }} disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
