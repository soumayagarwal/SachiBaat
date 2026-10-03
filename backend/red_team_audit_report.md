# SachiBaat Deterministic Engine: Red-Team & Accuracy Audit

## 1. Executive Summary

A comprehensive test corpus of 41 messages was created to stress-test the deterministic rules engine without relying on AI. The corpus covered clear scams, Hindi/Hinglish variations, legitimate messages, edge cases (punctuation/newlines), and adversarial obfuscation.

**Confusion Matrix:**
- **True Positives (TP):** 19 (Correctly flagged as HIGH/SUSPICIOUS)
- **True Negatives (TN):** 6 (Correctly flagged as LOW)
- **False Positives (FP):** 2 (Legitimate messages flagged as scam)
- **False Negatives (FN):** 14 (Scam messages missed)

**Accuracy:** ~61%
**Precision:** 90.4% (19 / 21)
**Recall:** 57.5% (19 / 33)

The engine has strong precision but suffers in recall, specifically against punctuation variations, newlines, and adversarial obfuscation.

---

## 2. Fact-Checking User-Facing Explanations & Actions

The current action strings in `actions.js` were reviewed for factual regulatory accuracy:
- **"Verify on SEBI Registered Intermediaries portal"**: Accurate. SEBI maintains this public directory.
- **"Call National Cyber Crime Helpline at 1930"**: Accurate. 1930 and `cybercrime.gov.in` are the official GoI reporting channels.
- **"File a complaint on the SEBI SCORES portal"**: Accurate. SCORES is the official grievance redressal mechanism.

**Verdict:** No regulatory hallucinations found. The action strings are factual and safe.

---

## 3. Legitimate Examples Accidentally Flagged (False Positives)

1. **News/Historical Context:**
   - *Input:* "Historically, some stocks have given multi-bagger returns, but past performance is not indicative of future results."
   - *Result:* SUSPICIOUS (Triggered R003: "multi-bagger returns").
   - *Issue:* R003 lacks an `ignorePattern` for standard financial disclaimers and historical context.

2. **Educational Warnings:**
   - *Input:* "SEBI warns investors against schemes offering unrealistic profit or guaranteed income."
   - *Result:* HIGH (Triggered R001: "guaranteed income").
   - *Issue:* R001's `ignorePattern` handles "not guaranteed", but misses educational framing like "warns against".

---

## 4. Scam Examples That Escaped Detection (False Negatives)

1. **Newline/Formatting Breaks:**
   - *Input:* "guaranteed\nprofit"
   - *Issue:* R001 uses `guaranteed.*profit`. The `.*` regex token does not match newlines by default, causing it to miss vertical text blocks common in OCR.

2. **Punctuation & Hyphens:**
   - *Input:* "100% Risk-Free." or "Double. your. money."
   - *Issue:* R001 looks for `100% risk free` (no hyphen). R003 looks for `double your money` (no periods).

3. **Missing Hindi/Hinglish Vocabulary:**
   - *Input:* "Nifty options mein pakka munafa. GPay par paise bhejo aur tips pao."
   - *Issue:* "pakka munafa" is missing from R001. "tips" is missing from R002's list of investment words.

4. **Spacing and Leetspeak Obfuscation (Adversarial):**
   - *Input:* "G u a r a n t e e d", "p@isa double", "1OO% risk free" (Ohs instead of Zeros).
   - *Issue:* Literal regex matching completely fails when characters are spaced out or replaced with lookalikes.

---

## 5. Rule-by-Rule Weaknesses

- **R001 (Guaranteed Returns):** Extremely vulnerable to newlines and lacks comprehensive Hindi trigger words (e.g., *pakka munafa*, *100% guarantee*). Its ignore list needs expansion for regulatory warnings.
- **R002 (Unofficial Payment Channels):** The secondary condition `investmentWords` is too narrow. It misses words like *tips*, *calls*, and *advisory*, allowing scammers to ask for GPay transfers for "tips" without triggering the rule.
- **R003 (Unrealistic Profit Claims):** Susceptible to punctuation breaks and frequently catches legitimate news discussing past "multibagger" stocks.
- **R004 (Urgency):** Fails on minor variations like "only 2 seats left" vs "spots left".
- **R005 (Suspicious Channels):** Fails if the user obfuscates the platform name ("W h a t s a p p").

---

## 6. Recommended Improvements

### Safe for the 4-Day Hackathon (DO THESE)
1. **Pre-process Whitespace:** Before running rules, collapse all whitespace and newlines: `const normalizedText = text.replace(/\s+/g, ' ');`. This instantly fixes the `guaranteed\nprofit` issue without altering complex regex.
2. **Add Optional Hyphens/Punctuation:** Update exact phrases to handle hyphens (e.g., `100%\s*risk[-\s]*free`).
3. **Expand `ignorePattern`:**
   - For R001: Add `warns`, `warning`, `fake`, `scam` to prevent flagging educational content.
   - Add an `ignorePattern` to R003 to skip sentences containing `historically`, `past performance`, or `news`.
4. **Enrich Hinglish Vocabulary:** Add `pakka munafa`, `paisa double` to R001/R003. Add `tips`, `calls` to R002's investment trigger words.

### Do NOT Attempt (Risky / Overfitting)
1. **Stripping All Spaces:** Removing all spaces to catch `g u a r a n t e e d` will cause catastrophic false positives (e.g., matching "guarantee" inside "this **guy ran tee**th").
2. **Global Leetspeak Normalization:** Replacing all `0`s with `o`s, or `@` with `a`, is highly risky in financial contexts where precise numbers matter. It may break legitimate amount parsing or OCR text.
3. **Overly Broad Fuzzy Matching:** Using heavy fuzzy string matching libraries will break the deterministic, predictable nature of the MVP and consume too much development time. Stick to Regex for the hackathon.
