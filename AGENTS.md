# SANGYAN Hackathon — Project Rules

## 1. Source of truth
The official SANGYAN Problem Statement & Participant Charter is the primary source for:
- challenge mission
- tracks
- target users
- mandatory guardrails
- constraints
- evaluation criteria
- expected submission

Do not invent competition requirements.

## 2. Mission
The product must strengthen financial resilience of Indian investors, especially users from Tier-2/Tier-3 cities and emerging digital-finance users.

The product should help users identify risk, avoid fraud, understand financial products/processes, build safer habits, reduce impulsive decisions, understand investor protection mechanisms, or recover safely after something goes wrong.

## 3. Mandatory guardrails
Never build or recommend:
- stock tips
- buy/sell/hold signals
- price predictions
- trading algorithms intended to produce speculative outcomes
- promotion of a specific financial instrument or broker
- monetisation funnels
- broker commissions or similar commercial nudges
- unauthorised harvesting of SMS, OTPs, or personally identifiable financial records
- personalised investment recommendations

The product must remain clearly public-good / investor-protection oriented.

## 4. Trust and accuracy
For financial, regulatory, legal, or investor-protection claims:
- prefer authoritative primary sources
- prefer SEBI, NSDL, RBI, Government of India, and official public infrastructure
- clearly distinguish verified facts from assumptions
- never fabricate statistics, regulations, APIs, citations, or official procedures
- communicate uncertainty honestly

## 5. Target-user design
Prioritize:
- first-time investors
- Tier-2/Tier-3 users
- regional-language users
- low-literacy users
- senior citizens
- users exposed to scams or misleading financial content

Consider:
- low-end devices
- slow internet
- low bandwidth
- minimal cognitive load
- voice and visual accessibility
- plain language

## 6. Evaluation priorities
Every major feature should be evaluated against the official SANGYAN scoring criteria:
- Resilience & Safety Impact: 30%
- Tier-2/3 Usability: 25%
- Guardrail Compliance & Trust: 15%
- Technical Execution: 15%
- Feasibility & Scalability: 15%

Do not add technology merely for novelty.

## 7. Product-development principles
- Prefer one excellent end-to-end user journey over many incomplete features.
- Prefer a simple reliable MVP over an ambitious fragile system.
- Keep the core demo working after every major change.
- Avoid unnecessary libraries and infrastructure.
- Do not refactor working code without a concrete reason.
- Do not remove existing functionality while implementing new functionality.
- Verify important functionality in the browser.
- Test loading, error, empty, invalid-input, and failure states.
- Never expose API keys or secrets.

## 8. Hackathon discipline
When time is limited:
1. Core user journey first
2. Reliability second
3. Bharat-first usability third
4. Technical depth fourth
5. Optional features last

Do not continuously expand scope.

## 9. Agent behaviour
Before making major architectural changes:
- inspect the existing project
- explain the proposed approach
- identify risks and dependencies
- avoid unnecessary changes

When a task is ambiguous, make reasonable assumptions only when they are safe and explicitly state them.

After implementing substantial functionality:
- run relevant tests/build
- check for errors
- verify the affected user journey
- report what changed and any remaining risks
