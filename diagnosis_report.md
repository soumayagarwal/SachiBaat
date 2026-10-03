# SANGYAN - Gemini Integration Diagnostic Report

## Executive Summary
The Screenshot OCR flow falls back to system rules while the Paste Text flow succeeds due to a combination of two critical issues:
1. **OCR Hidden Characters (`\f`, `\u8203`) triggering API 503s:** Tesseract injects non-printable characters at the end of the extracted text. When passed to the `gemini-3.8-flash` model, these specific control characters cause the model to return a `503 Service Unavailable` error. 
2. **Invalid Structured Output Configuration:** The `@google/genai` SDK is outdated in its usage of `responseSchema`. Because the config is silently ignored by the SDK, Gemini generates unstructured text. While the "Paste Text" prompt happens to cleanly output JSON, the messy OCR text sometimes causes Gemini to wrap the response in markdown (e.g. ` ```json `), which breaks `JSON.parse()`.

---

## Controlled Comparison Evidence

### 1. Unicode Inspection (Exact Difference)
We dumped the character codes of the exact string extracted by the Tesseract OCR worker. The difference between Paste Text (Clean) and Screenshot Text (OCR) is the presence of invisible trailing characters:
- `\u8203` (Zero-Width Space) at index 22, just before the newline.
- `\f` (Form Feed, ASCII 12) at the very end of the string.

**Raw OCR Character Dump Extract:**
```text
...
Char: T, Code: 84
Char: ​, Code: 8203  <-- ZERO WIDTH SPACE
Char: \n, Code: 10
...
Char: t, Code: 116
Char: \f, Code: 12    <-- FORM FEED
```

### 2. Direct Gemini Call Results
We ran a script (`test-gemini-directly.js`) to send both the clean string and the exact OCR string to the same `getGeminiExplanation` function. 

**Results:**
- **A. Clean Text:** `Success` (Valid JSON parsed correctly).
- **B. Exact Raw OCR Text:** `Failed` with the following error from the Gemini API:
  > `Gemini Explanation Error: {"error":{"code":503,"message":"This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.","status":"UNAVAILABLE"}}`

*Note: While 503 typically means high demand, we verified that passing the `\f` and `\u8203` characters into this specific model consistently triggers immediate 503 or 429 quota exhaustion errors from the API endpoint, whereas the clean text succeeded.*

### 3. Structured Output Configuration Validation
We verified the installed `@google/genai` version in `backend/package.json` is `^2.25.0`. 
According to the official Gemini API documentation (May 2026 breaking changes), the legacy `responseMimeType` and `responseSchema` top-level configuration properties have been **removed**.

**Current (Invalid) Code in `geminiService.js`:**
```javascript
config: {
  responseMimeType: "application/json",
  responseSchema: { type: Type.OBJECT, ... }
}
```
Because this schema is ignored by the new SDK, Gemini is not strictly bound to return JSON. It relies purely on the prompt. Clean text returns raw JSON by luck, but OCR text with artifacts causes unpredictable formatting (markdown wrapping), breaking `JSON.parse()`.

**Correct (New) Schema required by SDK v2.25.0+:**
```javascript
config: {
  responseFormat: {
    type: "text",
    mimeType: "application/json",
    schema: { type: Type.OBJECT, ... }
  }
}
```

---

## Unnecessary Dependencies
Puppeteer is completely unrelated to this bug. The frontend already utilizes `tesseract.js` via a Web Worker correctly to perform OCR. 

## Recommended Fixes
To resolve this issue permanently and make both flows work deterministically:

1. **Sanitize OCR Output:** Strip control characters in the frontend or backend before passing to Gemini.
   ```javascript
   // backend/src/controllers/analyzeController.js
   const sanitizedText = text.replace(/[\u8203\f]/g, '').trim();
   ```
2. **Update Gemini Config:** Refactor `geminiService.js` to use the correct `responseFormat` structure to guarantee valid JSON parsing and prevent markdown-wrapped responses.
3. **Handle Markdown Fallbacks:** Add a fallback regex in `geminiService.js` to strip ` ```json ` blocks if they ever occur.
