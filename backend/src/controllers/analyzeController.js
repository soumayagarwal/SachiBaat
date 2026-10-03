const { analyzeText } = require("../rules/engine");
const { getGeminiExplanation } = require("../services/geminiService");

async function analyze(req, res) {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is missing or empty" });
    }
    
    if (text.length > 50000) {
      return res.status(400).json({ error: "Text is excessively large" });
    }

    const result = analyzeText(text);

    let aiExplanation = {
      english: { summary: "No rules triggered.", points: [] },
      hindi: { summary: "कोई नियम ट्रिगर नहीं हुआ।", points: [] },
      source: "fallback"
    };

    if (result.triggeredRules.length > 0) {
      const geminiData = await getGeminiExplanation(text, result.riskLevel, result.triggeredRules);
      
      if (geminiData) {
        aiExplanation = {
          english: geminiData.english,
          hindi: geminiData.hindi,
          source: "gemini"
        };
      } else {
        // Fallback
        aiExplanation = {
          english: {
            summary: `We found ${result.triggeredRules.length} warning sign(s) in this message.`,
            points: result.triggeredRules.map(r => r.explanation)
          },
          hindi: {
            summary: `इस संदेश में ${result.triggeredRules.length} चेतावनी संकेत मिले हैं।`,
            points: result.triggeredRules.map(r => r.explanation)
          },
          source: "fallback"
        };
      }
    }

    result.aiExplanation = aiExplanation;
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { analyze };
