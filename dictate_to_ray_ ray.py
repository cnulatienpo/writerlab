# dictate_to_rayray.py (DeepSeek Version)

import subprocess
import os
import requests

# === CONFIGURATION ===
AUDIO_FILE = "my_scene.m4a"                  # Your audio file
TRANSCRIPT_FILE = "transcript.txt"           # Whisper output
FORMATTED_OUTPUT_FILE = "scene_output.txt"   # Final prose output
WHISPER_MODEL = "base"                       # Can also use "medium", "large"
DEEPSEEK_API_KEY = os.getenv("sk-926f63eec9df4db9ac732295b2571613")
DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"             # or other available models

# === SYSTEM INSTRUCTIONS FOR RAY RAY ===
SYSTEM_PROMPT = """
Your job is to format this exactly like prose.
- Add paragraph breaks where the speaker shifts or tone changes.
- Wrap all spoken dialogue in quotes.
- Add question marks, exclamation points, em dashes, ellipses where appropriate.
- Do NOT change any words. Do not correct grammar. Preserve slang and tone exactly.
- Never add dialogue tags or rewrite the structure.
Only apply standard punctuation and formatting rules.
"""

# === STEP 1: TRANSCRIBE AUDIO USING WHISPER ===
print("🎧 Transcribing audio with Whisper...")
subprocess.run(
    f'whisper "{AUDIO_FILE}" --model {WHISPER_MODEL} --output_format txt --output_dir .',
    shell=True,
    check=True
)

# === STEP 2: LOAD TRANSCRIPT ===
print("📄 Loading transcript...")
with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as f:
    transcript = f.read()

# === STEP 3: FORMAT TRANSCRIPT WITH DEEPSEEK ===
print("🧠 Formatting with DeepSeek...")

headers = {
    "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": DEEPSEEK_MODEL,
    "messages": [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": transcript}
    ],
    "temperature": 0.2
}

response = requests.post(DEEPSEEK_URL, headers=headers, json=payload)
response.raise_for_status()
formatted_text = response.json()["choices"][0]["message"]["content"]

# === STEP 4: SAVE FINAL SCENE ===
print("💾 Saving formatted scene...")
with open(FORMATTED_OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(formatted_text)

print(f"\n✅ All done. Scene saved to {FORMATTED_OUTPUT_FILE}")

