# SACHIBAAT - MVP Product Specification

**Mission:** Strengthen the financial resilience of Indian investors (especially Tier-2/Tier-3) by helping them detect digital financial scams, misleading claims, and fraud *before* money changes hands.
**Format:** A lightweight, mobile-first website (No apps, no dashboards, no WhatsApp bot).

---

## 1. DEFINE THE EXACT USER

**Primary Persona:** Ramesh Kumar (45)
*   **Context:** Small business owner in a Tier-3 city (e.g., Meerut, UP).
*   **Financial Literacy:** Low-to-moderate. He knows FDs and LIC, recently opened a Demat account via a discount broker, and watches YouTube "finfluencers" for tips.
*   **Language Preference:** Conversational Hindi, reads simple English / Hinglish.
*   **Device Assumptions:** Budget Android smartphone ($100-$150 range) with a potentially slow or intermittent 4G internet connection.
*   **Typical Scam Scenario:** He is added to a Telegram or WhatsApp group by a stranger. The group admins post daily screenshots of "₹50,000 profit" and offer a "Premium VIP Group" promising 20% guaranteed weekly returns if he transfers a ₹5,000 fee via UPI.
*   **Exact Pain Point:** Ramesh is tempted by FOMO (Fear Of Missing Out) but lacks a reliable, instant way to verify if this is a standard market practice or a scam.
*   **Current Behaviour:** Asks a friend, trusts confident-sounding messages, or takes a small gamble because the fee seems low.
*   **Desired Safe Behaviour:** Ramesh pauses, takes a screenshot of the WhatsApp message, uploads it to SachiBaat, reads the simple Hindi explanation of the red flags, and blocks the number instead of paying.

---

## 2. DEFINE THE CORE USER JOURNEY

**One excellent end-to-end journey (Target: < 2 minutes):**

1.  **Initial State (Landing Page):** User visits the site. Sees a clean, bilingual (Hindi/English) interface with a clear proposition: "Check if a financial message is safe." User chooses either "Paste Text" or "Upload Screenshot".
2.  **Input Submission:** User pastes a Telegram message or uploads a screenshot of a fake P&L with a UPI payment request.
3.  **OCR Processing (if image):** The image is parsed. *If OCR fails or confidence is low*, the user is shown the fallback: "We couldn't read the image clearly. Please type or paste the text here."
4.  **Extracted Text Review:** The extracted text is briefly presented to the user to confirm/edit before analysis (prevents garbage-in, garbage-out).
5.  **Loading State:** "Analyzing for risk signals... / जोखिम के संकेतों की जांच हो रही है..." (Simple CSS spinner).
6.  **Rule Engine Analysis:** The deterministic rules engine scans the text for specific red-flag patterns (no AI involved in the classification yet).
7.  **Risk Classification (Results Page):** The system calculates a risk score and displays the primary result: **LOW**, **SUSPICIOUS**, or **HIGH RISK**.
8.  **AI Explanation:** Below the risk score, the AI generates a simple-language explanation (in English and Hindi) of *why* the specific rules were triggered, avoiding jargon.
9.  **Action Guidance:** The system provides context-aware next steps from the verified Action Library (e.g., "Do not share OTP", "Report to 1930").
10. **Reset:** A sticky "Check Another Message" button allows repeating the loop.

**Failure States Handled:**
*   **OCR Failed / Unreadable Image:** Prompt user for manual text entry.
*   **Unsupported Input:** (e.g., PDF uploaded instead of image) Show simple error: "Please upload a valid image (JPG/PNG) or paste text."
*   **AI Unavailable:** Hide AI explanation; display only the hardcoded explanations from the Rule Engine. Risk classification remains 100% functional.
*   **Rule Engine Error:** Graceful fallback message recommending manual verification via SEBI/1930.

---

## 3. DEFINE THE DETECTION ENGINE

The detection engine is **strictly rule-based and deterministic**. AI is NOT the sole source of risk classification.

### Aggregation Mechanism
*   **HIGH RISK:** 1+ Critical flags OR 3+ High flags.
*   **SUSPICIOUS:** 1-2 High flags OR 2+ Medium flags.
*   **LOW RISK:** 0 High flags AND <= 1 Medium flag.
*   **Transparency:** The UI will state: "Risk Level: High (3 red flags detected)", ensuring the user knows the system is relying on evidence, not a black-box "AI thought".

### Rule Definitions

**Rule ID:** R001
*   **Category:** Guaranteed Returns
*   **Trigger Condition:** Regex match for phrases like "guaranteed profit", "sure return", "100% risk free", "fix return", "zero risk".
*   **Severity:** CRITICAL
*   **Explanation Shown:** "The message promises guaranteed profits. In real stock markets, returns can never be legally guaranteed."
*   **Possible False Positive:** "Guaranteed returns on Bank FD."
*   **Test:** Pass: "Guaranteed 10% monthly on options." Fail: "FD gives guaranteed 7%."

**Rule ID:** R002
*   **Category:** Unofficial Payment Channels
*   **Trigger Condition:** Regex for "UPI", "GPay", "PhonePe", "Paytm", "Crypto", "Wallet" combined with investment terms.
*   **Severity:** HIGH
*   **Explanation Shown:** "Legitimate brokers and mutual funds only accept payments through official bank gateways to verified accounts, never personal UPI IDs or crypto."
*   **Possible False Positive:** "Pay your account maintenance fee via UPI on our official app."
*   **Test:** Pass: "Send fee to this UPI ID to join premium." Fail: "Zerodha UPI mandate."

**Rule ID:** R003
*   **Category:** Unrealistic Profit Claims
*   **Trigger Condition:** Regex matching high percentages in short times (e.g., "double your money", "200% return", "daily 5000 profit").
*   **Severity:** HIGH
*   **Explanation Shown:** "The profit claims are extremely high and unrealistic for standard investments."
*   **Possible False Positive:** News articles quoting historical multi-bagger returns.
*   **Test:** Pass: "Earn 5000 daily with no effort."

**Rule ID:** R004
*   **Category:** Urgency / Pressure
*   **Trigger Condition:** Regex for "limited time", "offer ends today", "only 5 spots left", "act now".
*   **Severity:** MEDIUM
*   **Explanation Shown:** "The message creates false urgency. Scammers do this so you pay before thinking or checking facts."
*   **Possible False Positive:** Legitimate IPO closing dates.
*   **Test:** Pass: "Only 2 VIP spots left, pay now."

**Rule ID:** R005
*   **Category:** Suspicious Contact Channels
*   **Trigger Condition:** Investment offers paired with "WhatsApp me", "Join my Telegram channel", "DM for tips".
*   **Severity:** MEDIUM
*   **Explanation Shown:** "SEBI-registered advisors rarely solicit investments through random WhatsApp or Telegram messages."

---

## 4. DEFINE THE THREE RISK LEVELS

**1. LOW RISK**
*   **Trigger:** 0 High flags, <= 1 Medium flag.
*   **What user sees:** Green shield icon.
*   **Wording to use:** "We did not find common scam patterns in this text."
*   **Wording NOT to use:** "This is 100% safe," "This is a legitimate company," "You should invest."
*   **Recommended actions:** "Always verify the registration of the advisor on the official SEBI website before investing."

**2. SUSPICIOUS**
*   **Trigger:** 1-2 High flags OR 2+ Medium flags.
*   **What user sees:** Yellow warning triangle.
*   **Wording to use:** "This message shows some suspicious patterns often used in misleading claims."
*   **Wording NOT to use:** "This is probably a scam."
*   **Recommended actions:** "Do not share OTPs or passwords. Verify the sender's identity independently."

**3. HIGH RISK**
*   **Trigger:** 1+ Critical flags OR 3+ High flags.
*   **What user sees:** Red stop sign/alert icon.
*   **Wording to use:** "This message contains multiple high-risk scam indicators."
*   **Wording NOT to use:** "This person is a scammer," "This is a fraud."
*   **Recommended actions:** "Do not send any money. If you have already paid, contact 1930 immediately."

---

## 5. DEFINE OCR

*   **Accepted Formats:** JPG, PNG, WebP.
*   **Size Limit:** 5 MB.
*   **OCR Process:** Use a cloud API (e.g., Google Cloud Vision API) in the backend. It is significantly faster and more accurate for Hindi/English mixed text than frontend `tesseract.js`.
*   **Preprocessing:** Image compression on the frontend before upload to save bandwidth for Tier-2/3 users.
*   **Extracted Text:** Shown in an editable `<textarea>`.
*   **Low Confidence / Failure:** If the API fails or returns < 10 words, prompt: "We couldn't extract the text clearly. Please paste it manually."
*   **Hindi/Hinglish:** Cloud Vision supports mixed languages well. The rule engine will include Hinglish transliterations in its regex (e.g., "paisa double", "guarantee").
*   **Images + Text:** The OCR will pull all text. Irrelevant text is ignored by the rule engine.

---

## 6. DEFINE AI'S EXACT ROLE

The AI (e.g., Gemini API) is used **strictly for translation and humanizing the explanation of the deterministic rule output**.

*   **Responsibilities:**
    *   Take the list of triggered rules (e.g., [R001, R004]) and generate a 2-sentence explanation in simple Hindi and English.
    *   Explain unfamiliar terms (e.g., if the text says "F&O tips", briefly explain that F&O is highly risky).
*   **Strict Forbidden Outputs (System Prompt constraints):**
    *   NEVER recommend buying, selling, or holding any financial instrument.
    *   NEVER predict market prices.
    *   NEVER declare an entity as a verified scam or legally guilty (use "shows patterns of").
    *   NEVER invent regulatory statuses or SEBI numbers.
    *   NEVER override the Rule Engine's risk classification.

---

## 7. DEFINE ACTION GUIDANCE (ACTION LIBRARY)

Actions are hardcoded based on the risk level and specific rules triggered. They are NOT generated by AI.

| Trigger Condition | Exact User-Facing Instruction (En/Hi) | Official Destination / Process | Source |
| :--- | :--- | :--- | :--- |
| Any rule triggered | **Check SEBI Registration:** Always verify if the person or app is officially registered. | SEBI Registered Intermediaries portal | SEBI |
| High Risk (Money NOT sent) | **Stop and Block:** Do not transfer any money, cryptocurrency, or pay any "fees". Block the contact immediately. | N/A (Preventative) | Best Practice |
| High Risk (If Money Sent / OTP shared) | **Report Cyber Fraud:** If you have already lost money or shared an OTP, immediately call the National Cyber Crime Helpline at **1930** or visit the official portal. | cybercrime.gov.in (I4C) | Govt of India / I4C |
| Fake App / Link detected | **Avoid Unknown Links:** Do not click on unknown APK links or log into trading platforms you do not recognize. | N/A (Preventative) | RBI Kehta Hai |
| Legitimate Grievance | **File a Complaint:** If this is a dispute with a registered broker, file a complaint on the SEBI SCORES portal. | scores.sebi.gov.in | SEBI |

---

## 8. DESIGN THE WEBSITE

**Design Principles:** Mobile-first, low cognitive load, accessible (high contrast, large fonts), bilingual toggle (EN/HI) at the top.

*   **Page 1: Landing / Input**
    *   Header: "SachiBaat - Investor Protection" + EN/HI toggle.
    *   Subhead: "Check if a financial message or screenshot is safe."
    *   UI: Two large, touch-friendly buttons: `[ 📝 Paste Text ]` and `[ 📸 Upload Screenshot ]`.
*   **Page 2: Processing (Transient)**
    *   UI: Simple loading spinner. "Scanning for 15+ known scam patterns..."
*   **Page 3: Results**
    *   **Information Hierarchy:**
        1.  **Risk Level (Visual):** Large colored banner (Red/Yellow/Green) stating the risk level.
        2.  **Summary:** "We found 3 high-risk indicators."
        3.  **Detailed Explanation (AI-generated):** Simple bilingual text explaining *why* it's suspicious based on the rules.
        4.  **Action Steps:** Bold, clear next steps (e.g., "Call 1930 if you paid").
        5.  **Reset:** `[ Check Another Message ]` button.

*(Note: Pages 1, 2, and 3 are handled via React state on a single page to prevent slow page reloads).*

---

## 9. TECHNICAL ARCHITECTURE

**Simplest Robust Stack (4-Person Team, 4 Days):**

*   **Frontend:** React + Vite + Tailwind CSS. (Deployed on Vercel). Lightweight, fast, mobile-responsive.
*   **Backend:** Node.js + Express. (Deployed on Render/Railway). Handles API keys securely, orchestrates OCR, Rule Engine, and AI.
*   **Database:** **NONE (Stateless).** MongoDB is completely unnecessary for the MVP. Avoiding a DB accelerates development, guarantees privacy by design, and removes infrastructure complexity.
*   **OCR Component:** Google Cloud Vision API (called securely from the Node backend).
*   **Rule Engine:** A hardcoded JavaScript module in the backend containing the Regex arrays and scoring logic.
*   **AI Service:** Google Gemini API (called from Node backend) strictly configured with system prompts for formatting and guardrails.

**Data Flow:**
1. React sends Text/Image to Express `/api/analyze`.
2. Express sends Image to Cloud Vision -> gets Text.
3. Express passes Text to local Rule Engine -> gets Risk Level & Triggered Rules.
4. Express passes Triggered Rules + Text to Gemini API -> gets humanized explanation.
5. Express returns JSON (Risk Level, Explanation, Actions) to React.

---

## 10. PRIVACY DESIGN

*   **Storage:** Screenshots and text are processed entirely in-memory on the backend. **Nothing is written to disk or a database.**
*   **Retention:** Zero retention. Once the HTTP request closes, the data is gone.
*   **PII Handling:** Because data is not stored, PII leakage is structurally prevented. The AI system prompt will explicitly instruct it to ignore phone numbers and names in its explanation.
*   **API Security:** All external API calls (Vision, Gemini) happen server-side. No API keys are exposed to the React frontend.

---

## 11. FAILURE & TRUST DESIGN

*   **OCR Fails:** Backend returns a specific error code. Frontend catches it and shows: "Image unreadable. Please paste the text manually."
*   **AI Fails / Times out:** The backend catches the timeout and returns a fallback JSON containing the Rule Engine's hardcoded explanations instead of the AI's version. The app remains 100% functional for risk detection.
*   **Network Failure:** Standard React error boundaries display a "Check your internet connection" message.
*   **Ambiguous Claims:** If the text contains no rules but mentions stocks, the system defaults to LOW RISK but always appends the disclaimer: "Verify all advisors on the SEBI website."

---

## 12. DEMO DESIGN

**Scenario:** Ramesh receives a Telegram message from "Premium VIP Trading".
**Message Text:** *"Join VIP group now! 100% Guaranteed profit of ₹5000 daily on Nifty options. SEBI registered. Only 2 spots left. Pay ₹2000 fee on this UPI: scammer@upi to join."*

**Live Presenter Actions:**
1.  **Context (15s):** Show the fake Telegram message on a slide. "Ramesh just got this message. Should he pay?"
2.  **Action (15s):** Presenter opens SachiBaat on a mobile emulator. Clicks "Paste Text" and pastes the message.
3.  **Processing (5s):** Click "Analyze". Show the fast loading state.
4.  **Result (30s):** The screen flashes RED (HIGH RISK).
5.  **Explanation (45s):** Presenter reads the output: "SachiBaat caught 3 things: The word 'Guaranteed' (illegal), the 'UPI' payment request (unprofessional), and false 'Urgency'. The AI explains this in simple Hindi, advising Ramesh not to pay."
6.  **Conclusion (10s):** "Ramesh saves ₹2000. Public good achieved without storing any user data."

---

## 13. MAP FEATURES TO THE SANGYAN RUBRIC

*   **Resilience & Safety Impact (30%):** High. Directly intercepts a scam *before* the user sends money via UPI.
*   **Tier-2/3 Usability (25%):** High. Mobile-first, zero-login, bilingual (Hindi/English), handles Hinglish inputs.
*   **Guardrail Compliance & Trust (15%):** Perfect. Gives zero investment advice, doesn't mention specific stocks, uses deterministic rules over AI hallucinations, and stores zero personal data.
*   **Technical Execution (15%):** Good. Combines OCR, RegEx pattern matching, and AI summarization in a seamless, fast pipeline.
*   **Feasibility & Scalability (15%):** Exceptional. Stateless architecture costs pennies to run, scales infinitely, and requires no complex broker API integrations.

**Current MVP Weakness:** Regex rules can be bypassed if scammers use complex emojis or heavily misspelled words (e.g., "G.u.a.r.a.n.t.e.e"). *Mitigation for future:* Implement fuzzy matching.

---

## 14. 4-DAY IMPLEMENTATION PLAN

**Team:** 2 Frontend, 1 Backend, 1 Product/QA.

*   **DAY 1: Infrastructure & Engine**
    *   *Deliverables:* React scaffolding, Express server setup. Rule Engine core logic (RegEx arrays and scoring) built and unit-tested locally.
    *   *Owner:* Backend Lead.
*   **DAY 2: Integrations**
    *   *Deliverables:* Integrate Google Cloud Vision for OCR. Integrate Gemini API for explanations. Connect Frontend to Backend `/analyze` endpoint.
    *   *Owner:* Backend & Frontend Leads.
*   **DAY 3: UI/UX Polish & Bilingual Support**
    *   *Deliverables:* Build the 3-state UI (Red/Yellow/Green). Implement Hindi/English toggle. Finalize Action Library text.
    *   *Owner:* Frontend Lead & Product.
    *   *Integration Checkpoint:* Ensure the fallback works if AI is disconnected.
*   **DAY 4: Testing & Pitch Prep**
    *   *Deliverables:* Code freeze by noon. Test with 20 real scam messages. Record the 3-minute video demo. Build PPT.
    *   *Owner:* Whole Team.

---

## 15. FEATURE FREEZE

**MUST HAVE (Core MVP):**
*   Text paste & Screenshot upload.
*   Cloud Vision OCR integration.
*   Deterministic Rule Engine with 10-15 solid RegEx rules.
*   High/Suspicious/Low risk classification UI.
*   Action guidance (1930 / SEBI links).
*   Stateless backend.

**SHOULD HAVE (If time permits on Day 3):**
*   AI (Gemini) simple-language explanations (can fall back to hardcoded strings if time runs out).
*   Hindi language toggle.

**DO NOT BUILD (Strictly Excluded):**
*   User accounts / Login / Auth.
*   Database (MongoDB, PostgreSQL).
*   Dashboard of past scans.
*   WhatsApp Bot integration (keep it purely web-based as requested).
*   Complex image forensics (font analysis, metadata extraction).

---

### Executive Summary
*   **Architecture:** Stateless React + Express app using Cloud Vision for OCR and Gemini for summarization. Zero database.
*   **Core Journey:** Paste message -> Deterministic Scan -> Risk Score -> Simple Explanation -> Safe Action.
*   **Detection Engine:** Transparent, RegEx-based rule engine that acts as the source of truth, preventing AI hallucinations.
*   **Top 5 Implementation Risks:** 1) Cloud Vision API rate limits/billing setup. 2) OCR failing on heavily compressed WhatsApp images. 3) LLM timing out during demo. 4) Mobile layout breaking on small screens. 5) Over-engineering the UI instead of focusing on the rules.
*   **Top 5 Judging Risks:** 1) Judges think it's just a "ChatGPT wrapper" (Must emphasize the deterministic rule engine). 2) False positives on legitimate messages. 3) Not enough Tier-2/3 context in the demo. 4) Assuming users know how to take screenshots. 5) Being penalized for lacking a database (Must pitch statelessness as a "Privacy by Design" feature).
