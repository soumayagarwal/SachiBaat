const { GoogleGenAI, Type } = require("@google/genai");

// Initialize GoogleGenAI. It defaults to process.env.GEMINI_API_KEY if not passed, 
// but we explicitly pass it for clarity if needed, or just let the SDK handle it.
// We must handle cases where API key is missing gracefully.
let ai = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const SYSTEM_INSTRUCTION = `ROLE:
You are SachiBaat, an investor-protection explanation assistant.

PURPOSE:
Explain already-detected scam-risk signals in simple language.

RULE:
The supplied risk level and triggered rule IDs come from a deterministic rule engine.
You MUST NOT change them.

SAFETY:
Never:
- provide buy/sell/hold advice
- recommend financial products
- predict prices or profits
- declare someone a criminal/scammer
- invent regulatory facts
- invent evidence
- claim certainty beyond the detected signals

LANGUAGE:
Return BOTH:
- English explanation
- Hindi explanation

STYLE:
- simple
- short
- understandable to a first-time investor
- avoid financial jargon
- use Hindi naturally, not word-for-word robotic translation

TRUST:
Use wording such as:
"This message contains..."
"This pattern can be associated with..."
"These are warning signs..."

Avoid:
"This person is definitely a scammer."
"This investment is definitely fake."

The model must explain only the supplied rule findings.`;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getGeminiExplanation(text, riskLevel, triggeredRules) {
  if (!ai) {
    return null; // Missing API Key
  }

  if (!triggeredRules || triggeredRules.length === 0) {
    return null; // Nothing to explain
  }

  const rulesContext = triggeredRules.map(r => `Rule ID: ${r.id}\nCategory: ${r.category}\nDeterministic explanation: "${r.explanation}"`).join("\n\n");

  const prompt = `Risk:
${riskLevel}

Triggered rules:
${rulesContext}

User message (context):
"${text}"

Explain these findings in simple English and Hindi.`;

  const config = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.1,
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        english: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            points: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "points"]
        },
        hindi: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            points: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "points"]
        }
      },
      required: ["english", "hindi"]
    }
  };

  const tryCall = async (modelName) => {
    const responsePromise = ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config
    });
    // 3 seconds timeout per attempt
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini timeout")), 3000)
    );
    return Promise.race([responsePromise, timeoutPromise]);
  };

  const isTransient = (error) => {
    if (error.message === "Gemini timeout") return true;
    const status = error.status || (error.response && error.response.status) || (error.error && error.error.code) || 0;
    if ([408, 500, 502, 503, 504].includes(status)) return true;
    if (error.message.includes("503") || error.message.includes("504") || error.message.includes("500") || error.message.includes("502")) return true;
    return false;
  };

  let response = null;
  try {
    // Attempt 1: Primary
    try {
      response = await tryCall("gemini-3.8-flash");
    } catch (error) {
      if (!isTransient(error)) {
        console.log(`[Gemini] Non-transient failure (${error.message}). Falling back immediately.`);
        throw error;
      }
      console.log(`[Gemini] Attempt 1 failed (${error.message}). Retrying once with backup model...`);
      await delay(500 + Math.random() * 200); // small backoff/jitter

      // Attempt 2: Backup
      response = await tryCall("gemini-3.7-flash");
    }

    if (response && response.text) {
      let rawText = response.text.trim();
      if (rawText.startsWith('```json')) {
        rawText = rawText.substring(7);
      } else if (rawText.startsWith('```')) {
        rawText = rawText.substring(3);
      }
      if (rawText.endsWith('```')) {
        rawText = rawText.substring(0, rawText.length - 3);
      }
      
      const parsed = JSON.parse(rawText.trim());
      if (parsed.english && parsed.hindi && parsed.english.summary && parsed.hindi.summary) {
        return parsed;
      } else {
        console.log("[Gemini] Parsed JSON missing required fields.");
      }
    } else {
      console.log("[Gemini] Empty response or missing text.");
    }
    return null;
  } catch (error) {
    console.error("Gemini Explanation Error:", error.message, error);
    return null;
  }
}

module.exports = { getGeminiExplanation };
