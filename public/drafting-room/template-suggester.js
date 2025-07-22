// Act template suggestions based on scene context (act, emotion, etc.)
export function getActTemplateSuggestions(context) {
  const { emotion = 'neutral', act = 'Act 1' } = context;
  const templates = [];

  if (/1/i.test(act)) {
    templates.push(
      {
        id: 'origin-setup',
        label: 'Origin / Setup',
        description: 'Introduce characters, setting, and stakes. End with a push toward conflict.'
      },
      {
        id: 'inciting-incident',
        label: 'Inciting Incident',
        description: 'Start with stability, then hit the story with a major disruption.'
      }
    );
  }

  if (/2/i.test(act)) {
    templates.push(
      {
        id: 'rising-tension',
        label: 'Rising Tension',
        description: 'Escalating conflict, growing stakes, and small losses. Characters adapt or spiral.'
      },
      {
        id: 'false-victory',
        label: 'False Victory / Retreat',
        description: 'A temporary win or dangerous pause before things get worse.'
      }
    );
  }

  if (/3/i.test(act)) {
    templates.push(
      {
        id: 'climax-collapse',
        label: 'Climax & Collapse',
        description: 'The breaking point. Final confrontations. Truths revealed.'
      },
      {
        id: 'resolution',
        label: 'Resolution',
        description: 'Aftermath. Fallout. Choices made permanent.'
      }
    );
  }

  // Optional: Tone-based suggestions
  if (emotion === 'joy' || emotion === 'surprise') {
    templates.push({
      id: 'celebration-beat',
      label: 'Hope or Relief Beat',
      description: 'Insert a beat of joy, bonding, or relief to shift tone upward.'
    });
  } else if (emotion === 'anger' || emotion === 'fear') {
    templates.push({
      id: 'descent-beat',
      label: 'Descent / Breakdown Beat',
      description: 'Highlight emotional fracture, conflict, or fear spiraling.'
    });
  }

  return templates;
}
