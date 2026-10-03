# SachiBaat Red-Team Audit - Final Report

## 1. Executive Summary
The deterministic rule engine for SachiBaat (`engine.js` and `rulesList.js`) was audited against a 41-message test corpus covering English, Hindi, Hinglish, legitimate messages, and adversarial evasion cases. 

We improved the engine's accuracy **without** resorting to unpredictable global fuzzy matching, stripping of all spaces, or using Gemini classification for risk evaluation. 

**Accuracy Improvements (Out of 41 Messages):**
- **True Positives (TP):** Improved from 19 to 23
- **True Negatives (TN):** Improved from 6 to 8 (Zero False Positives remaining!)
- **False Positives (FP):** Reduced from 2 to 0
- **False Negatives (FN):** Reduced from 14 to 10

## 2. Changes Implemented
All changes strictly adhered to the instruction of remaining deterministic and avoiding overfitting.

### 2.1 Engine Normalization
- Added a preprocessing step in `engine.js` to create a `normalizedText` representation of inputs.
- Collapsed all excessive spaces and newlines (`\s+`) into a single space.
- Trimmed leading/trailing whitespace.
- Preserved Devanagari, English text, and essential symbols like the ₹ sign.
- Did **not** strip all spaces globally to prevent high-risk false positives on unrelated joined words.

### 2.2 Rule Refinements
- **R001 (Guaranteed Returns):** Added ignore patterns to skip legitimate educational content (`not guaranteed`, `impossible`, `warns against`). Added regex coverage for `100% risk free` with varying spacing/hyphens, as well as Hinglish terms `pakka munafa` and `bina kisi risk`.
- **R002 (Unofficial Payment Channels):** Updated investment keywords to capture variations like `tip` and `tips`.
- **R003 (Unrealistic Profit Claims):** Added ignore contexts for `past performance` and `historically`. Expanded tracking to include exact numeric Hinglish patterns like `roz \d+` and `paisa double`.
- **R004 (Urgency / Pressure):** Enhanced to catch variations like `spots left`, `seats left`, and `limited time`.
- **R005 (Suspicious Contact Channels):** Improved keyword coverage to detect variations like `t.me` and standard investment terms.

## 3. Metrics Validation

We ran the automated test corpus (`test-corpus.js`) to validate our results. 

### Before Improvements
```json
{ "tp": 19, "tn": 6, "fp": 2, "fn": 14 }
```

### After Improvements
```json
{ "tp": 23, "tn": 8, "fp": 0, "fn": 10 }
```

### Remaining False Negatives (FN)
The 10 remaining False Negatives are exclusively extreme adversarial/evasion attempts (leetspeak and heavy spacing):
1. `G u a r a n t e e d   r e t u r n s !!!`
2. `g-u-a-r-a-n-t-e-e-d p-r-o-f-i-t`
3. `G U A R A N T E E D  profit`
4. `p@isa double`
5. `guarante3d r3turns`
6. `on1y 2 spots left`
7. `1OO% risk free`
8. `d0uble your m0ney`
9. `da!ly 5000 pr0f!t`
10. `T e l e g r a m me for tips`

As requested by the guidelines, we **intentionally opted against** implementing broad leetspeak conversion or aggressive spacing removals, which can cause unpredictable and devastating False Positives across Indian languages and informal chats. These edge cases require a robust ML model down the line if this threat vector becomes prevalent.

## 4. Constraint Checklist & Validation
- ✅ **Deterministic:** All rule matching remains regex-driven and explainable.
- ✅ **No Gemini Classification:** Gemini is still strictly used for explanation generation, not for overriding the rule-engine's risk score.
- ✅ **No New Features:** The pipeline remained functionally identical, only the evaluation logic was improved.
- ✅ **Zero False Positives:** We successfully fixed the 2 False Positives caused by educational contexts and historical references.
- ✅ **Regression Tested:** The primary `jest` regression suite (`npm test`) executed successfully without any breaking changes to existing endpoints.
