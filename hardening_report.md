# SachiBaat Deployment Hardening Report

The live demo reliability and deployment-hardening fixes have been successfully implemented according to the specified requirements.

## 1. Files Changed
- `frontend/src/App.jsx` (API URL, Fallback UX)
- `frontend/.env.example` (Created with VITE_API_URL)
- `backend/package.json` (Added `start` script)
- `backend/src/index.js` (Environment-aware CORS)
- `backend/.env.example` (Added FRONTEND_URL)
- `backend/src/services/geminiService.js` (Retry policy, timeout, removed logs)
- `backend/test/geminiService.test.js` (Created tests for transient/timeout handling)
- `backend/smoke.js` (Created local smoke test script, verified endpoint)

## 2. API URL Configuration
- Hardcoded `localhost` URLs have been removed from the frontend.
- `fetch` calls now use `${import.meta.env.VITE_API_URL}/api/analyze`.
- Added `frontend/.env.example` with `VITE_API_URL=http://localhost:3001` for safe local development.
- Verified `.env` remains safely ignored in `.gitignore`.

## 3. CORS Configuration
- Replaced the unrestricted `cors()` with an environment-aware configuration in `backend/src/index.js`.
- **Production:** Only allows requests from the origin specified in `process.env.FRONTEND_URL`.
- **Development:** Still safely permits local origins (`localhost`, `127.0.0.1`) without breaking the current workflow.
- Included `FRONTEND_URL` in `backend/.env.example`.

## 4. Gemini Timeout/Retry Policy
- Implemented a stricter and more responsive timeout/retry policy in `geminiService.js`:
  - **Timeout:** Capped at exactly 3 seconds per attempt.
  - **Transient Errors (500, 502, 503, 504, 408):** Retries exactly ONE time (falling back to the backup model after a small jitter/delay).
  - **Quota Exhaustion (429):** Will NOT retry. It immediately triggers a fast fallback instead of waiting.
  - **Invalid/Malformed (400, 401, 403):** Will NOT retry and immediately falls back.

## 5. Fallback UX
- Updated the frontend UI in `App.jsx` to gracefully handle the fallback mode (`result.aiExplanation.source === "fallback"`).
- Displays a clear, non-alarming notice: *"AI explanation is temporarily unavailable. The risk assessment below is based on SachiBaat's deterministic safety rules."*
- Fully supports Hindi when the `HI` explanation is toggled: *"AI स्पष्टीकरण अस्थायी रूप से अनुपलब्ध है। नीचे दिया गया जोखिम मूल्यांकन SachiBaat के सुरक्षित नियमों पर आधारित है।"*
- Kept the UI consistent—only injecting the banner above the rules, leaving the core rules, risk level, and safe actions unchanged.

## 6. Tests Passed
- Mocked Gemini responses natively and updated Jest tests.
- Simulated and verified: Gemini 503 (retries once), 429 (no retry, falls back), Timeout (falls back), and Invalid API Key (falls back).
- Executed `npm test`, successfully passing all 17 cases across 5 test suites.
- Verified the `riskLevel` and `actions` remain strictly deterministic and unchanged when falling back.

## 7. Frontend Build Result
- Executed `npm run build` using Vite. 
- Build succeeded (533ms) with all assets minified successfully, ensuring production readiness.

## 8. Local Smoke-Test Result
- Executed local POST to the server successfully without a Gemini token.
- Ensured it reliably fell back to deterministic rules within a second.
- Verified payload correctness (`riskLevel: "HIGH"`, `source: "fallback"`).

## 9. Confirmation on Localhost Hardcoding
- Verified `http://localhost` is entirely absent from any production-impacting code in the frontend.

## 10. Confirmation on API Keys
- Verified `GEMINI_API_KEY` and other sensitive artifacts remain entirely strictly backend-only, read via `process.env`.
- Explicitly removed all `console.log("DEBUG: Raw Gemini Response:", ...)` commands to avoid leaking user data or system state into logs.

## 11. Confirmation on Deterministic Classification
- No changes were made to the core logic engine. R001-R005 semantics, Action Library, and thresholds are exactly the same, ensuring perfect live demo reliability even if AI drops.
