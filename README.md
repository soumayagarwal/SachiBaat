# SachiBaat

<!-- "Pause before you pay." -->

SachiBaat helps users assess suspicious financial messages and screenshots by identifying known scam patterns, explaining why they were flagged, and suggesting safe next actions.

**Live Demo:** https://sachibaat-frontend.onrender.com/


## 1. Problem


Financial scam messages often use guaranteed-return claims, fake urgency, unofficial payment requests, and suspicious communication channels. These messages frequently use Hindi or Hinglish, and sometimes arrive as screenshots that users cannot easily copy as text to verify.


## 2. Solution


**AI explains what the deterministic rules decide.**

The core user flow is simple:
1. Paste text OR Upload a screenshot.
2. (For screenshots) Client-side OCR extracts the text.
3. The Deterministic Rule Engine analyzes the text.
4. The message is classified as LOW, SUSPICIOUS, or HIGH risk.
5. Gemini provides a natural language explanation of the red flags.
6. The user is provided with safe next actions.

*Note: Gemini is NOT responsible for determining the risk level. It acts solely as an explanation layer.*


## 3. Key Features


- Paste financial text for analysis
- Screenshot upload
- Client-side OCR using Tesseract.js
- OCR text review/edit before analysis
- Deterministic scam-pattern detection
- LOW / SUSPICIOUS / HIGH risk classification
- Detected red flags
- Gemini-generated English/Hindi explanations when available
- Deterministic fallback explanations when Gemini is unavailable
- English/Hindi UI
- Safe next actions
- SEBI verification guidance
- Cyber Crime Helpline 1930 guidance
- cybercrime.gov.in reporting guidance
- Sample demo messages
- Privacy-focused/stateless architecture


## 4. Detection Engine


The custom rule engine uses deterministic pattern matching and severity-based aggregation to classify messages as LOW, SUSPICIOUS, or HIGH.

Current rule categories include:
- R001 — Guaranteed Returns
- R002 — Unofficial Payment Channels
- R003 — Unrealistic Profit Claims
- R004 — Urgency / Pressure
- R005 — Suspicious Contact Channels
- R006 — KYC Scam
- R007 — Fake IPO Allotment
- R008 — Fake SEBI Claims



## 5. Tech Stack


**Frontend:**
- React 19.2.8
- Vite 8.3.0
- CSS
- Tesseract.js 7.0.0

**Backend:**
- Node.js
- Express 5.2.1
- CORS 2.8.6
- dotenv 18.0.5

**AI:**
- Google Gen AI SDK (@google/genai 2.25.0)
- Gemini 3.8 Flash (with Gemini 3.7 Flash as backup)

**Detection:**
- Custom deterministic JavaScript Regex Rule Engine


**Deployment:**
- Render
- Frontend as a static site
- Backend as a Node web service

## 6. Privacy & Safety


- Screenshot OCR is performed locally in the user's browser.
- Images are not uploaded to the backend for OCR.
- The backend is stateless.
- Gemini is used only for explanation, not risk classification.
- If Gemini is unavailable, deterministic analysis still works.
- The application does not provide stock tips or buy/sell/hold recommendations.
- Risk results should be understood as pattern-based assessments, not guarantees.

## 7. Getting Started

### Clone the repository
```bash
git clone https://github.com/soumayagarwal/SachiBaat.git
cd SachiBaat
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` using the variables in `.env.example`:
```
PORT=3001
GEMINI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:5173
```
*(Note: `.env.example` contains placeholders only. Do not commit your real `.env` file.)*

Start the backend:
```bash
npm start
```

### Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` using `.env.example`:
```
VITE_API_URL=http://localhost:3001
```

Start the frontend development server:
```bash
npm run dev
```

## 8. Deployment

- The frontend is deployed as a Render Static Site.
- The backend is deployed as a Render Web Service.
- The frontend communicates with the backend using the `VITE_API_URL` environment variable.
- The backend uses environment variables for `GEMINI_API_KEY` and `FRONTEND_URL`.

**Live Demo:** https://sachibaat-frontend.onrender.com/

## 9. Scalability

- More regional languages
- WhatsApp integration
- Browser extension
- Community scam reporting
- Voice accessibility improvements
