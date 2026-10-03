# SANGYAN Investor Resilience Hackathon: Independent Judge Review

## 1. Competition Verification

**Mission:** Build a technology-driven product that strengthens the financial resilience of Indian investors, addressing problems before, during, or after a financial decision.
**Target Users:** First-time Tier-2/3 investors, regional-language users, senior citizens, and victims of scams.
**Mandatory Guardrails:** No commercial/speculative outcomes (tips/predictions), no monetisation funnels (broker commissions), privacy by design, and strict public-good ethos.
**Tracks:**
- Track A: Digital Fraud & Scam Resilience
- Track B: Investor Awareness, Rights & Grievance Redressal
- Track C: Investor Education for Bharat
- Track D: Financial Habits & Behavioural Resilience
- Track E: Misinformation & Financial Content Literacy
- **Open Track:** Any software solution that meaningfully strengthens investor resilience (explicitly mentions accessibility-first tools, offline/IVR systems, DPI integrations, community fraud reporting).
**Expected Submission:** Live Demo Link, 3-5 min Video, PPT.
**Evaluation Criteria:** Resilience & Safety (30%), Tier-2/3 Usability (25%), Guardrail Compliance & Trust (15%), Technical Execution (15%), Feasibility & Scalability (15%).

**What the previous research report missed:**
- **Ignored the Open Track:** The report completely missed the Open Track, which explicitly invites powerful Tier-2/3 specific solutions like IVR, USSD, and Account Aggregator integrations.
- **Misaligned Mediums:** The report heavily suggested browser extensions (e.g., YouTube Finfluencer Fact-Checker, Fake Broker URL Scanner). The target demographic (Tier-2/3, emerging digital users) consumes content almost entirely on mobile apps (WhatsApp, YouTube Android app), where browser extensions do not work.

## 2. Research Audit

**Audit of `SANGYAN_Research_Report.md`:**
- **Claim:** Build browser extensions for URL scanning and YouTube fact-checking.
  - **Verdict:** Technically unrealistic and practically useless for the target user. Tier-2/3 users do not use desktop Chrome.
- **Claim:** Deepfake Audio/Video Analyzer.
  - **Verdict:** Technically unrealistic for a 4-day sprint by students. High risk of false positives, which would violate the "Trust" evaluation criterion.
- **Claim:** Mock broker with a "Pause Nudge" (Circuit Breaker).
  - **Verdict:** Fails the "Feasibility & Scalability" criterion (15%). Brokers will not voluntarily integrate a 3rd-party friction tool that reduces their trading volumes. It cannot extend beyond the hackathon.
- **Claim:** Portfolio Stress Tester via CSV upload.
  - **Verdict:** Assumptions presented as facts. Emerging Tier-2/3 investors do not download CSVs of their portfolios to upload to third-party sites; they barely navigate their broker apps.
- **Claim:** SEBI APIs are readily available for WhatsApp bots.
  - **Verdict:** Unsupported. SEBI's intermediary data is often locked in PDFs or clunky web tables. Teams will need to scrape and build their own API layer.

## 3. Important Missing Insights

**Real User Problems (The "Bharat" Reality):**
1. **The "WhatsApp Uncle" Problem:** Scams spread via forwarded messages. Interventions must happen inside WhatsApp, not on a separate portal.
2. **The "Language Barrier in Justice":** Filing a SCORES complaint requires drafting formal English legal text. Victims know they were wronged but cannot articulate it in the system's required language.
3. **The "No-Smartphone" Senior Citizen:** Many vulnerable senior citizens rely on feature phones. Web-apps and chatbots exclude them. IVR/USSD is a massive untapped opportunity.
4. **The "PDF Wall":** Corporate actions, rights issues, and mutual fund factsheets are impenetrable walls of English text. 

## 4. 12 Product Concepts

1. **SachiBaat WhatsApp Bot (Track A):**
   - **User:** Tier-2/3 smartphone user.
   - **Problem:** Cannot verify WhatsApp stock tips.
   - **Solution:** Forward tip to bot; bot extracts entities and checks against SEBI registry.
   - **Journey:** Receives forward -> Forwards to Bot -> Gets Green/Red flag in Hindi.
   - **Tech:** LLM NER + WhatsApp API + Scraped SEBI DB.
   - **Risks:** WhatsApp API rate limits; parsing Hinglish accurately.

2. **Bol-Bhashini SCORES Drafter (Track B):**
   - **User:** First-time investor wronged by broker.
   - **Problem:** Cannot write a formal English complaint.
   - **Solution:** Speak in regional language; output formal English PDF.
   - **Journey:** Clicks mic -> Tells story -> Reviews extracted facts -> Downloads PDF.
   - **Tech:** Bhashini Voice API + LLM drafting.
   - **Risks:** Hallucinating complaint details.

3. **Call-A-Verify IVR (Open Track):**
   - **User:** Senior citizen / Feature phone user.
   - **Problem:** Cannot use websites to verify a broker's SEBI registration.
   - **Solution:** Dial a toll-free number, enter SEBI registration digits via keypad, hear status.
   - **Journey:** Dials number -> Punches INA10000XXXX -> Hears "This is a valid advisor named X".
   - **Tech:** Twilio/Exotel IVR + SEBI DB.
   - **Risks:** High latency during the live phone call demo.

4. **Corporate Action Decoder (Open Track):**
   - **User:** Retail investor.
   - **Problem:** Does not understand AGM notices or buyback PDFs.
   - **Solution:** Upload PDF/Photo, get a 3-point plain-language summary.
   - **Journey:** Uploads doc -> Gets "What this means for your money" summary in local language.
   - **Tech:** OCR + LLM summarization.
   - **Risks:** Hallucinating financial implications.

5. **Viraasat Claim Wizard (Track B):**
   - **User:** Legal heir in a smaller town.
   - **Problem:** IEPF unclaimed shares process is too complex.
   - **Solution:** TurboTax-style Q&A that generates a personalized document checklist.
   - **Journey:** Answers 5 simple questions -> Gets exact roadmap and forms needed.
   - **Tech:** Static decision tree (No AI needed).
   - **Risks:** Output is still too legally complex.

6. **F&O Wipeout Simulator (Track C):**
   - **User:** Young impulsive trader.
   - **Problem:** Doesn't understand the speed of margin loss.
   - **Solution:** Interactive game where user "trades" with 10x margin and inevitably loses.
   - **Journey:** Enters 10k -> Uses margin -> Market drops 2% -> Account wiped.
   - **Tech:** React frontend with charting.
   - **Risks:** Might inadvertently teach/gamify F&O trading.

7. **App-Blocker "Pause Nudge" (Track D):**
   - **User:** Addictive trader.
   - **Problem:** Opens broker app impulsively.
   - **Solution:** Android Accessibility service that detects broker app launch and forces a 30-sec breathing exercise.
   - **Journey:** Taps Zerodha -> Screen overlays breathing circle -> Broker app opens after 30s.
   - **Tech:** Android native accessibility API.
   - **Risks:** Feels like malware; hard to demo quickly.

8. **Telegram Tip Tracker (Track E):**
   - **User:** User tempted by Telegram groups.
   - **Problem:** Groups delete losing trades, faking a 100% win rate.
   - **Solution:** Bot joins group, logs all tips, and generates a real historical success rate dashboard.
   - **Journey:** User queries group name -> Sees actual 15% success rate.
   - **Tech:** Telegram MTProto API scraper.
   - **Risks:** Telegram bans the scraper bot.

9. **Chitra-Bhasha Financial Lens (Track C):**
   - **User:** Low-literacy user.
   - **Problem:** Printed financial documents are incomprehensible.
   - **Solution:** AR camera app that translates terms on the fly.
   - **Journey:** Points camera at "Volatility" -> Screen overlays "Bhav ka utaar-chadhaav".
   - **Tech:** Mobile OCR + On-device translation.
   - **Risks:** Very hard to build in 4 days.

10. **Community Scam Radar (Open Track):**
    - **User:** Local community members.
    - **Problem:** Scams are hyper-localized but reporting is national/disconnected.
    - **Solution:** Map-based dashboard of reported WhatsApp scams by Pin Code.
    - **Journey:** User checks map -> Sees 5 reports of "Task Fraud" in their zip code.
    - **Tech:** Web app with mapping library (Leaflet/Mapbox).
    - **Risks:** Cold start problem (no data for demo).

11. **Claim Evidence-Checker (Track E):**
    - **User:** Content consumer.
    - **Problem:** Cannot verify confident claims.
    - **Solution:** Paste claim, get SEBI-backed fact-check.
    - **Journey:** Pastes "XYZ gives 20% guaranteed" -> Tool flags as illegal.
    - **Tech:** RAG with SEBI master circulars.
    - **Risks:** Boring UI; generic LLM answers.

12. **Fake Broker URL Scanner (Track A):**
    - **User:** Web user.
    - **Problem:** Phishing domains clone real brokers.
    - **Solution:** Web app to check domain age and official registry.
    - **Journey:** Pastes URL -> Gets warning.
    - **Tech:** WHOIS API + SEBI DB.
    - **Risks:** Doesn't solve the mobile app problem.

## 5. Detailed Comparison Matrix

*Scores out of 10. Weights: Resilience (0.3), Tier-2/3 (0.25), Guardrails (0.15), Tech (0.15), Feasibility (0.15).*

| Concept | Resilience (3) | Tier-2/3 (2.5) | Guardrails (1.5) | Tech (1.5) | Feas. (1.5) | Weighted Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1. SachiBaat Bot | 9 | 10 | 9 | 8 | 8 | **8.95** |
| 2. Bol-Bhashini | 8 | 9 | 10 | 9 | 8 | **8.70** |
| 3. Call-A-Verify | 9 | 10 | 10 | 6 | 9 | **8.95** |
| 4. Corp Action Dec. | 6 | 8 | 9 | 8 | 8 | **7.55** |
| 5. Viraasat Wizard | 7 | 8 | 10 | 5 | 10 | **7.85** |
| 6. F&O Simulator | 8 | 6 | 6 | 7 | 9 | **7.20** |
| 7. App-Blocker | 8 | 7 | 8 | 7 | 4 | **7.00** |
| 8. Telegram Tracker | 9 | 7 | 9 | 8 | 5 | **7.75** |
| 9. Chitra-Bhasha | 6 | 9 | 9 | 4 | 3 | **6.45** |
| 10. Scam Radar | 7 | 8 | 9 | 6 | 8 | **7.55** |
| 11. Claim Checker | 6 | 6 | 9 | 8 | 9 | **7.20** |
| 12. URL Scanner | 7 | 4 | 9 | 6 | 9 | **6.70** |

## 6. Top 5 Concepts with Weighted Analysis

### 1. SachiBaat WhatsApp Bot (Score: 8.95)
- **Strongest Criterion:** Tier-2/3 Usability (10/10). Meets the user exactly where scams happen.
- **Weakest Criterion:** Tech Execution (8/10). Relying on WhatsApp APIs can be brittle during a demo.
- **Biggest Uncertainty:** Can we scrape and clean the SEBI registry data in 4 days?
- **Analysis:** This directly intercepts the most common fraud vector (WhatsApp forwards) before money is lost. It uses tech (LLM NER) effectively without hallucinating advice.

### 2. Call-A-Verify IVR (Score: 8.95)
- **Strongest Criterion:** Guardrails & Trust (10/10). Relies purely on official SEBI data, zero LLM hallucination risk.
- **Weakest Criterion:** Tech Execution (6/10). IVR trees are relatively simple to build.
- **Biggest Uncertainty:** Latency of the Twilio/Exotel call during a live demo.
- **Analysis:** A brilliant, non-obvious solution for the most vulnerable demographic (senior citizens with feature phones). It screams "public good infrastructure".

### 3. Bol-Bhashini SCORES Drafter (Score: 8.70)
- **Strongest Criterion:** Guardrail Compliance (10/10). Solves an administrative problem, not an investment one.
- **Weakest Criterion:** Feasibility (8/10). Handling incomplete voice inputs gracefully is tough.
- **Biggest Uncertainty:** Translating rural dialects accurately to extract specific financial entities.
- **Analysis:** Highly impactful. It turns a frustrating, complex web portal into an accessible, empathetic voice interface. High visual/audio demo impact.

### 4. Viraasat Claim Wizard (Score: 7.85)
- **Strongest Criterion:** Feasibility (10/10). Just conditional logic and frontend; almost impossible to fail technically.
- **Weakest Criterion:** Tech Execution (5/10). Very little advanced technology (AI/ML) used.
- **Biggest Uncertainty:** Can we actually simplify the IEPF rules enough to make the output useful?
- **Analysis:** A safe, highly reliable project. It might lose points on "Tech Execution" but will score perfectly on solving a real-world resilience problem.

### 5. Telegram Tip Tracker (Score: 7.75)
- **Strongest Criterion:** Resilience & Safety (9/10). Directly exposes the lies of pump-and-dump groups.
- **Weakest Criterion:** Feasibility (5/10). Scraping Telegram reliably is technically fraught and easily blocked.
- **Biggest Uncertainty:** Dealing with Telegram API limits and bans.
- **Analysis:** If it works, it's a showstopper demo. Showing a "100% accurate" guru actually has a 15% success rate is the ultimate investor protection tool.

## 7. 4-Day Feasibility Analysis (For Top 5)

**Day-by-Day Build Plan (Applicable framework for all top 5)**

- **DAY 1: Data & Core Engine Proof-of-Concept (POC)**
  - **Must exist:** The foundational database (e.g., scraped SEBI registry CSV) or the core API connection (Twilio, WhatsApp API, Bhashini).
  - **Parallel work:** Frontend team builds the mock UI (React/Next.js). Backend team scripts the data extraction.
  - **Biggest tech risk:** API rate limits or inability to scrape unstructured SEBI data.
  - **What gets cut if behind:** Live API connections. Fallback to a hardcoded local JSON database for the demo.

- **DAY 2: Integration & AI Processing**
  - **Must exist:** The "Magic Moment" works locally (e.g., LLM correctly extracts the broker name from a WhatsApp message; Bhashini transcribes voice to text).
  - **Parallel work:** Connecting the UI to the backend engine.
  - **Biggest tech risk:** LLM hallucinations or slow response times breaking the UX.
  - **What gets cut if behind:** Advanced NLP processing. Fallback to exact keyword matching.

- **DAY 3: End-to-End User Journey & Polish**
  - **Must exist:** A complete, unbroken flow from user input to final result.
  - **Integration points:** Finalizing error handling (what happens if the user mumbles or uploads a blurry photo).
  - **Biggest tech risk:** State management bugs or UI freezing on mobile views.
  - **What gets cut if behind:** Edge case handling. Hardcode the demo to follow the "happy path".

- **DAY 4: Demo, Video & Pitch Prep**
  - **Must exist:** A frozen codebase (no new features), a recorded 3-5 min video of the user journey, and the PPT deck.
  - **Parallel work:** 2 members script/record the video, 1 makes the PPT, 1 handles deployment (Vercel/Render).
  - **Biggest tech risk:** Live demo environment crashing due to free-tier hosting sleep modes.
  - **What gets cut if behind:** Live demo complexities. Rely entirely on the recorded video if the live build is too fragile.

## 8. Red-Team Risks (What could cause judges to reject?)

- **SachiBaat WhatsApp Bot:** Judges will reject it if the bot accidentally says "This stock is bad" instead of strictly saying "This sender is unregistered." Strict guardrails against financial advice are needed.
- **Bol-Bhashini SCORES Drafter:** Judges will distrust it if the LLM hallucinates details (e.g., making up a trade date that the user didn't speak). False positives in legal drafting are fatal.
- **Call-A-Verify IVR:** Judges might score it poorly on "Tech Execution" if it is perceived as *too* simple (just a DB lookup), unless the pitch heavily emphasizes the Tier-2/3 impact.
- **Viraasat Claim Wizard:** May be rejected for lacking "Technical Execution" novelty if it looks like a generic web form without smart localized logic.
- **Telegram Tip Tracker:** High risk of regulatory ambiguity or violating terms of service. Judges might view scraping private Telegram groups as a privacy/security risk, even for a good cause.

## 9. Questions Our Team MUST Answer Before Choosing

1. **Do we have WhatsApp API / Twilio experience?** (If no, drop SachiBaat and Call-A-Verify, or allocate Day 1 purely to learning them).
2. **Can we reliably scrape SEBI PDFs into a clean JSON database in 4 hours?** (If no, drop Track A ideas that rely on registries).
3. **Does our team have strong frontend/UX skills?** (If yes, lean towards Viraasat or Bol-Bhashini. If backend heavy, lean towards Telegram Tracker).
4. **Who is recording the demo?** (If we don't have a good Hindi speaker on the team, Bol-Bhashini will be hard to demo effectively).

## 10. Recommended Decision Process

1. **Rule out unfeasible formats:** Do not build browser extensions or heavy web dashboards. They fail the Tier-2/3 reality check.
2. **Choose your medium:** Match the tech to the user. WhatsApp for fraud interception, Voice for grievances, IVR for senior citizens.
3. **Data spikes:** Spend 2 hours checking if you can actually obtain the necessary data (e.g., SEBI registries). If the data is inaccessible, pivot immediately to Track B (Grievance/IEPF) which relies on logic and LLM capabilities rather than external databases.
4. **Prioritize the Demo:** Choose the concept where the 3-minute video will make the judges *feel* something (e.g., an elderly person finally being heard by the Bol-Bhashini app, or a scammer being instantly blocked on WhatsApp). Impact wins hackathons.
