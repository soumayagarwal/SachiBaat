# SANGYAN Investor Resilience Hackathon: Strategic Research & Ideation Report

## 1. Official Requirements Extraction

**Mission**
Build a technology-driven product that strengthens the financial resilience of Indian investors, helping them lose less, decide rationally, recognize risks, and build healthy habits under pressure. Focus must be on Tier-2/Tier-3 cities and emerging digital-finance users.

**Target Users**
- First-time investors from Tier-2/3 cities.
- Users more comfortable in a regional language than English.
- Senior citizens vulnerable to impersonation.
- Users who have recently faced or nearly faced a scam.

**Mandatory Guardrails**
- **No commercial or speculative outcome**: Zero stock tips, buy/sell/hold signals, price predictions, or trading algorithms.
- **No monetisation funnels**: No broking commissions, margin nudges, or paid upsells.
- **Privacy by design**: No unauthorized harvesting of SMS, OTPs, or financial records.
- **Public-good ethos**: Must read as investor-protection infrastructure, not a growth product.

**Constraints**
- Financial or market data may be used for educational, awareness, simulation, safety, or analytical purposes only.
- It must **never** turn data into a personalised investment recommendation (e.g., "Based on your profile, buy XYZ" is banned).

**Evaluation Criteria & Weights**
1. **Resilience & Safety Impact (30%)**
2. **Tier-2/3 Usability (Bharat-First) (25%)**
3. **Guardrail Compliance & Trust (15%)**
4. **Technical Execution (15%)**
5. **Feasibility & Scalability (15%)**

**Expected Submission**
- Live Demo Link (working prototype of core functionality).
- Video (3–5 minute realistic user scenario end to end).
- PPT (Solution, approach, tech stack, user journey).

---

## 2. Track-by-Track Research & Analysis

### Track A: Digital Fraud & Scam Resilience
*Detecting, warning against, and intercepting deceptive financial vectors.*

- **Problem**: Fraudsters exploit fake SEBI registration numbers, clone broker platforms, run Telegram pump-and-dump schemes, and use deepfakes. Victims realize the fraud only when withdrawals are blocked.
- **Evidence**: SEBI routinely issues orders against unregistered investment advisors operating via Telegram/WhatsApp. The Indian Cyber Crime Coordination Centre (I4C) reports trading scams as a leading source of cybercrime financial loss.
- **Existing Landscape**: SEBI's website has lists of registered intermediaries. Gov portals like Chakshu (Sanchar Saathi) allow reporting.
- **Gap**: Existing lists are static, not mobile-friendly, and require proactive searching. Users lack real-time, in-context verification where the fraud happens (WhatsApp/Telegram).
- **5 Concrete Product Opportunities**:
  1. WhatsApp Forward Verifier Bot (cross-checks claims/IDs against SEBI registries).
  2. Fake Broker URL Scanner (browser extension or search bar for cloned domains).
  3. Screenshot Forensics Tool (detects edited P&L screenshots).
  4. Deepfake Audio/Video Analyzer for Finfluencer clips.
  5. SMS Phishing Interceptor for financial links (on-device processing).
- **Technical Feasibility**: High for URL and text matching using SEBI registries and LLMs for entity extraction. Image/video forensics is harder to build robustly in 4 days.
- **Demo Feasibility**: Very high (a WhatsApp bot or simple chat UI is easy to demonstrate).
- **Tier-2/3 Fit**: Extremely high. Scams disproportionately target lower digital-literacy users via messaging apps.
- **Guardrail Risk**: Low, provided the tool only flags risk and doesn't recommend alternative investments.
- **Privacy Risk**: Medium. If processing WhatsApp forwards or SMS, it must strictly avoid storing PII.
- **Scalability Potential**: High. Can integrate with public registries and scale as a public utility.

### Track B: Investor Awareness, Rights & Grievance Redressal
*Making investor rights, protections, and complaint mechanisms usable.*

- **Problem**: Processes like SCORES, nominee registration, and IEPF recovery are intimidating, heavily rely on English legalese, and require specific metadata (DP IDs, folios) that first-time users struggle to find.
- **Evidence**: The Investor Education and Protection Fund (IEPF) holds thousands of crores in unclaimed dividends and shares. SEBI had to mandate and extend nomination deadlines multiple times due to low compliance.
- **Existing Landscape**: SEBI SCORES 2.0 portal, IEPF web portal, NSDL/CDSL online portals.
- **Gap**: High cognitive friction. The UI/UX is built for compliance professionals, not rural senior citizens or grieving legal heirs.
- **5 Concrete Product Opportunities**:
  1. Voice-to-SCORES Drafter (translates regional spoken complaints into formal text).
  2. IEPF Claim Assistant (guided, localized step-by-step checklist generator for heirs).
  3. Demat Nominee Status Aggregator (mocked via Account Aggregator patterns).
  4. Plain-Language Corporate Action Decoder (simplifies AGM notices or rights issues).
  5. Grievance Tracking Dashboard for Senior Citizens (simplified status updates).
- **Technical Feasibility**: High. Bhashini APIs can handle translation/voice, and LLMs excel at drafting formal complaints from unstructured input.
- **Demo Feasibility**: High. A voice-input demo showing a formal output is visually and functionally impressive.
- **Tier-2/3 Fit**: Very high. Bypasses the need for English literacy and typing skills.
- **Guardrail Risk**: Low.
- **Privacy Risk**: High if dealing with actual Account Aggregator data; requires strict use of dummy data for the hackathon.
- **Scalability Potential**: High, especially if designed as a plug-in for existing grievance portals.

### Track C: Investor Education for Bharat
*Replacing jargon-heavy disclosures with understanding-first, regional-language learning.*

- **Problem**: Financial terminology (NAV, volatility, compounding) alienates users, driving them toward simplified but often fraudulent "advice" from unauthorized influencers.
- **Evidence**: The explosion of finfluencers simplifying concepts (often with hidden agendas) proves the demand for accessible education.
- **Existing Landscape**: SEBI's Saaarthi App, NISM courses, broker education modules (e.g., Zerodha Varsity).
- **Gap**: Official apps often lack engagement, while broker modules are text-heavy and English-first.
- **5 Concrete Product Opportunities**:
  1. Voice-First Financial Dictionary (explains concepts via local analogies, e.g., farming or local business).
  2. Market Crash / Volatility Simulator (experience a 20% portfolio drop safely).
  3. F&O Leverage Wipeout Simulator (visualizes capital loss speed with 10x margin).
  4. Jargon Translator Camera (OCR scans a document, translates terms into simple regional phrases).
  5. Interactive "Choose Your Own Adventure" Risk Game.
- **Technical Feasibility**: High. LLMs are great at analogies. Simulators are frontend-heavy but doable.
- **Demo Feasibility**: Very high. Simulators provide excellent, interactive visual demos.
- **Tier-2/3 Fit**: High, if localized effectively and built for low-bandwidth.
- **Guardrail Risk**: High for simulators. They must not feel like "paper trading" games that encourage gambling; the focus must remain strictly on risk/loss visualization.
- **Privacy Risk**: Low. No personal data needed.
- **Scalability Potential**: High as a standalone educational module.

### Track D: Financial Habits & Behavioural Resilience
*Helping investors pause, reflect, and build discipline.*

- **Problem**: FOMO, greed, herd behavior, and revenge trading push investors toward impulsive decisions, often funded by emergency savings or instant loans.
- **Evidence**: SEBI's 2023 study revealed that 9 out of 10 individual traders in equity F&O incur net losses, averaging ₹1.1 lakh per person.
- **Existing Landscape**: Some brokers offer a "Kill Switch" (e.g., Zerodha Nudge), but it is optional and often deactivated by users.
- **Gap**: Existing friction is post-facto (after the trade) or easily bypassed. There is little cognitive friction at the moment of the impulsive decision.
- **5 Concrete Product Opportunities**:
  1. Pre-Trade Decision Journal (forces user to type/speak their reasoning before executing).
  2. Cooling-Off Circuit Breaker (detects erratic patterns and forces a 15-min pause or puzzle).
  3. "Loan for Trading" Warning (heuristic detection of instant loan activity preceding deposits).
  4. Emotion-based Nudge (self-reported mood check before unlocking F&O segments).
  5. Portfolio Stress Tester (visualizes over-exposure to a single risky asset).
- **Technical Feasibility**: Medium. True integration requires broker APIs which aren't available. Must rely on building a "mock" broker UI to demonstrate the intercept.
- **Demo Feasibility**: High, provided the mock broker UI looks realistic enough to sell the concept.
- **Tier-2/3 Fit**: Medium. Behavioral biases are universal, but the UI must remain dead-simple.
- **Guardrail Risk**: High. Intercepting a trade could be misconstrued as giving a "hold" or "don't buy" recommendation. It must be framed entirely around behavioral pausing.
- **Privacy Risk**: High if attempting to parse SMS for loans.
- **Scalability Potential**: Low without direct buy-in and API access from major brokers.

### Track E: Misinformation & Financial Content Literacy
*Helping users evaluate the flood of financial content.*

- **Problem**: Investors cannot distinguish education from promotion, or evidence-backed claims from confident-sounding falsehoods.
- **Evidence**: SEBI has taken numerous actions against prominent "finfluencers" for unregistered advisory services and hidden promotional fees.
- **Existing Landscape**: General fact-checking sites (AltNews). SEBI's list of registered RAs/IAs.
- **Gap**: No real-time, financial-specific evaluation of content at the point of consumption (e.g., while watching YouTube).
- **5 Concrete Product Opportunities**:
  1. YouTube Finfluencer Fact-Checker (extension analyzing transcripts for promotional language).
  2. Claim Evidence-Checker (paste a claim, receive an uncertainty score and SEBI-backed context).
  3. Disclosure Scanner (checks if content includes mandatory SEBI RA/IA disclosures).
  4. Telegram Tip Tracker (logs tips from a channel to expose historical failure rates).
  5. "Too Good To Be True" Calculator (compares promised returns vs. standard benchmarks).
- **Technical Feasibility**: High. LLMs can efficiently classify education vs. promotion and extract claims from transcripts.
- **Demo Feasibility**: High (Browser extension or web app).
- **Tier-2/3 Fit**: Medium. Extensions don't work well on mobile apps where Tier-2/3 users consume most content. A web-app/bot approach is better.
- **Guardrail Risk**: Low.
- **Privacy Risk**: Low.
- **Scalability Potential**: High.

---

## 3. Cross-Track Comparison via Judging Criteria

How different approaches will be evaluated based on the official rubric:

| Criterion | What Drives a HIGH Score | What Drives a LOW Score |
| :--- | :--- | :--- |
| **Resilience & Safety (30%)** | Active prevention of loss (Track A), stopping impulsive F&O trades (Track D). Measurable friction. | Passive education (Track C) that users might ignore. Tools that don't directly stop a bad decision. |
| **Tier-2/3 Usability (25%)** | Voice interfaces (Bhashini), WhatsApp integration, regional analogies, zero-typing flows. | English-only text, complex web dashboards, desktop browser extensions, dense charts. |
| **Guardrail Compliance (15%)** | Relying strictly on SEBI/Gov data. Clear disclaimers. No financial advice generated. | Simulators that look like paper-trading games. Accidentally suggesting alternative stocks. |
| **Technical Execution (15%)** | Meaningful use of AI for unstructured data (voice-to-text, OCR for screenshots, transcript analysis). | AI added just as a chatbot wrapper without solving a core workflow problem. |
| **Feasibility & Scalability (15%)** | Standalone public utilities (WhatsApp bots, web claim drafters) that require no broker API integrations. | Concepts that strictly require private broker APIs or massive regulatory changes to work. |

---

## 4. Shortlist: 10 Promising Product Concepts

### 1. "SachiBaat" (WhatsApp Fraud Verifier) - *Track A*
- **User Journey**: User forwards a suspicious Telegram stock tip to a WhatsApp bot. Bot extracts the entity/claim, checks SEBI registries, and replies with a Red/Green risk flag.
- **Riskiest Assumption**: Users will actually pause to check the bot before acting on FOMO.
- **Hardest Part (4 Days)**: Accurate Named Entity Recognition (NER) on mixed Hindi-English (Hinglish) text.
- **Most Likely Demo Failure**: API rate limits or slow LLM response times on WhatsApp.
- **Minimum Viable Version (MVV)**: A web-based chat UI simulating WhatsApp, with a hardcoded SEBI registry database.
- **Exclude**: Giving an opinion on the stock itself (stick strictly to verifying the sender/claim).

### 2. "BhashaGrievance" (Voice-to-SCORES Drafter) - *Track B*
- **User Journey**: User speaks their grievance in regional language. App translates it, extracts key entities (Broker name, date, issue), and generates a formal English PDF ready for SCORES.
- **Riskiest Assumption**: Users know enough details (e.g., broker name) to make the complaint actionable.
- **Hardest Part (4 Days)**: Handling incomplete information smoothly via follow-up voice prompts.
- **Most Likely Demo Failure**: Bhashini/Voice API latency or poor transcription of financial terms in Hindi.
- **MVV**: Web app with a mic button outputting a structured JSON or PDF.
- **Exclude**: Actually submitting the data to SCORES (too risky/complex).

### 3. "F&O Wipeout Simulator" - *Track C*
- **User Journey**: User inputs ₹10,000, selects 10x margin, and clicks "Start". They experience a simulated 3-day volatile market where their capital vanishes due to margin calls, followed by an educational debrief.
- **Riskiest Assumption**: The simulation acts as a deterrent rather than gamifying and encouraging trading.
- **Hardest Part (4 Days)**: Building a visceral, realistic charting UI that clearly explains the *math* of the loss.
- **Most Likely Demo Failure**: The UI feels cheap or too much like a casino slot machine.
- **MVV**: A 3-screen interactive web flow with hardcoded market drop scenarios.
- **Exclude**: Leaderboards, "winning" scenarios, or historical replay of specific real stocks.

### 4. "Viraasat" (IEPF Claim Checklist Generator) - *Track B*
- **User Journey**: A grieving relative answers 5 simple Yes/No questions about the deceased’s assets. The app generates a plain-language checklist of exact documents needed for IEPF recovery.
- **Riskiest Assumption**: IEPF legal rules can be simplified into a standardized, universally accurate flow.
- **Hardest Part (4 Days)**: Mapping the complex legal decision tree accurately.
- **Most Likely Demo Failure**: The output looks like a boring wall of text rather than a helpful tool.
- **MVV**: A Typeform-style wizard outputting a clean, downloadable PDF roadmap.
- **Exclude**: Offering legal representation or direct document filing.

### 5. "Pause Nudge" (Behavioral Circuit Breaker) - *Track D*
- **User Journey**: User tries to execute a 4th F&O trade in a day on a mock broker app. The app intercepts, forces them to type *why* they are trading, and enforces a 30-second cooling timer.
- **Riskiest Assumption**: Brokers would willingly adopt a feature that reduces their trading volume.
- **Hardest Part (4 Days)**: Building the mock trading UI to make the interception feel authentic.
- **Most Likely Demo Failure**: The interception feels like a bug rather than an intentional feature.
- **MVV**: A fake broker screen with one hardcoded asset to trade and the intercept logic.
- **Exclude**: Real market data integration.

### 6. "Finfluencer X-Ray" (Misinformation Scanner) - *Track E*
- **User Journey**: User pastes a YouTube link into the app. The app fetches the transcript, highlights promotional language or absolute guarantees ("100% returns"), and gives a "Hype Score".
- **Riskiest Assumption**: Transcripts are accurate enough for reliable NLP classification.
- **Hardest Part (4 Days)**: Bypassing YouTube's transcript API blocks reliably.
- **Most Likely Demo Failure**: Fails to fetch the transcript during the live pitch.
- **MVV**: Text-area input where the user pastes transcript text manually as a fallback.
- **Exclude**: Rating the creator's overall credibility (rate only the specific video/claims).

### 7. "LinkGuard" (Phishing Portal Detector) - *Track A*
- **User Journey**: User is unsure about a broker login link. They paste it into the app, which cross-references the domain against the official SEBI registered intermediaries list and checks domain age.
- **Riskiest Assumption**: Fraud domains can be distinguished purely by URL and age without deep scraping.
- **Hardest Part (4 Days)**: Extracting and maintaining the clean list of official SEBI broker domains.
- **Most Likely Demo Failure**: False positives on legitimate white-label broker platforms.
- **MVV**: A simple search bar UI that checks a local database of known good/bad domains.
- **Exclude**: Password management or credential storing.

### 8. "JargonBuster Shorts" - *Track C*
- **User Journey**: User swipes through TikTok-style vertical cards. Each card takes one complex term (e.g., 'Volatility') and explains it using a local, relatable analogy (e.g., 'Monsoon crop yields').
- **Riskiest Assumption**: Text/Audio cards can hold attention as well as video for low-bandwidth users.
- **Hardest Part (4 Days)**: Writing analogies that are culturally relevant and financially accurate.
- **Most Likely Demo Failure**: The analogies sound robotic or culturally tone-deaf if purely AI-generated.
- **MVV**: A Progressive Web App (PWA) with 5 hand-crafted, high-quality swipeable cards.
- **Exclude**: Video generation (too heavy/risky for a 4-day sprint).

### 9. "Portfolio Stress Tester" - *Track D*
- **User Journey**: User uploads a dummy CSV of their holdings. The app visualizes "What happens to your money if the market drops 20% tomorrow?" to highlight dangerous over-concentration.
- **Riskiest Assumption**: Novice users will understand the risk visualizations (Beta, concentration).
- **Hardest Part (4 Days)**: Calculating realistic stress scenarios without complex financial modeling backends.
- **Most Likely Demo Failure**: Math errors or charts failing to render.
- **MVV**: Hardcoded math for 3 specific dummy portfolios (Safe, Risky, F&O heavy).
- **Exclude**: Suggesting which stocks to sell or buy to fix the portfolio (violates guardrails).

### 10. "Screenshot Reality Check" - *Track E*
- **User Journey**: User uploads a screenshot of a "₹1 Crore Profit" P&L. The app runs basic forensics (font mismatch, meta-data, known fake templates) and explains how these are commonly fabricated.
- **Riskiest Assumption**: Image forensics can be done reliably with simple heuristics in 4 days.
- **Hardest Part (4 Days)**: Building robust image processing/OCR to detect font tampering.
- **Most Likely Demo Failure**: App flags a real screenshot as fake, or misses a glaring fake.
- **MVV**: Hardcoded logic targeting the 2 most common fake P&L generator templates.
- **Exclude**: Accusing specific individuals of fraud publicly.
