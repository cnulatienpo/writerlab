// pages/api/rayray-chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { messages } = req.body;
  // Build prompt from messages
  const prompt = messages.map(m => (m.role === 'user' ? `User: ${m.content}` : `Ray Ray: ${m.content}`)).join('\n') + '\nRay Ray:';
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-926f63eec9df4db9ac732295b2571613',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-llm-model-name',
        prompt,
        max_tokens: 400,
      }),
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.text || data.result || 'No reply.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: 'Error: Could not reach Ray Ray.' });
  }
}
