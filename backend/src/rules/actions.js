const actionLibrary = [
  {
    id: "ACT_VERIFY",
    text: "Check SEBI Registration: Always verify if the person or app is officially registered on the SEBI Registered Intermediaries portal."
  },
  {
    id: "ACT_STOP",
    text: "Stop and Block: Do not transfer any money, cryptocurrency, or pay any fees. Block the contact immediately."
  },
  {
    id: "ACT_REPORT",
    text: "Report Cyber Fraud: If you have already lost money or shared an OTP, immediately call the National Cyber Crime Helpline at 1930 or visit cybercrime.gov.in."
  },
  {
    id: "ACT_AVOID_LINKS",
    text: "Avoid Unknown Links: Do not click on unknown APK links or log into trading platforms you do not recognize."
  },
  {
    id: "ACT_COMPLAIN",
    text: "File a Complaint: If this is a dispute with a registered broker, file a complaint on the SEBI SCORES portal."
  }
];

function getActions(riskLevel, triggeredRules, text) {
   let actions = [];
   actions.push(actionLibrary.find(a => a.id === "ACT_VERIFY").text);
   
   if (riskLevel === "HIGH") {
       actions.push(actionLibrary.find(a => a.id === "ACT_STOP").text);
       actions.push(actionLibrary.find(a => a.id === "ACT_REPORT").text);
   }
   
   const lower = text.toLowerCase();
   if (lower.includes("http") || lower.includes("www.") || lower.includes(".apk")) {
       actions.push(actionLibrary.find(a => a.id === "ACT_AVOID_LINKS").text);
   }
   
   if (lower.includes("zerodha") || lower.includes("upstox") || lower.includes("groww") || lower.includes("angelone")) {
       actions.push(actionLibrary.find(a => a.id === "ACT_COMPLAIN").text);
   } else if (riskLevel === "LOW") {
       actions.push(actionLibrary.find(a => a.id === "ACT_COMPLAIN").text);
   }

   return [...new Set(actions)];
}

module.exports = { getActions };
