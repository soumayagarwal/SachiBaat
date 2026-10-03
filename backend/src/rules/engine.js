const rules = require("./rulesList");
const { getActions } = require("./actions");

function analyzeText(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input");
  }

  const triggeredRules = [];
  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;

  const normalizedText = text.replace(/\s+/g, ' ').trim();

  for (const rule of rules) {
    if (rule.condition(normalizedText)) {
      triggeredRules.push({
        id: rule.id,
        category: rule.category,
        severity: rule.severity,
        explanation: rule.explanation
      });

      if (rule.severity === "CRITICAL") criticalCount++;
      else if (rule.severity === "HIGH") highCount++;
      else if (rule.severity === "MEDIUM") mediumCount++;
    }
  }

  let riskLevel = "LOW";
  
  if (criticalCount >= 1 || highCount >= 3) {
    riskLevel = "HIGH";
  } else if ((highCount >= 1 && highCount <= 2) || mediumCount >= 2) {
    riskLevel = "SUSPICIOUS";
  } else if (highCount === 0 && mediumCount <= 1) {
    riskLevel = "LOW";
  }

  const explanations = triggeredRules.map(r => r.explanation);
  const actions = getActions(riskLevel, triggeredRules, text);

  return {
    riskLevel,
    triggeredRules,
    redFlagCount: triggeredRules.length,
    explanations,
    actions,
    disclaimer: "Verify all advisors on the SEBI website."
  };
}

module.exports = { analyzeText };
