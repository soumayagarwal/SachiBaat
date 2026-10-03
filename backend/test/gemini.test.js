const request = require("supertest");
const app = require("../src/index");
const { getGeminiExplanation } = require("../src/services/geminiService");

jest.mock("../src/services/geminiService");

describe("API Analyze endpoint with Gemini", () => {
  const mockText = "Join VIP group now! 100% Guaranteed profit of 5000 daily. Pay 2000 fee on this UPI.";
  
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("A. Gemini success -> returns valid structured bilingual explanation", async () => {
    getGeminiExplanation.mockResolvedValueOnce({
      english: { summary: "AI summary", points: ["Point 1"] },
      hindi: { summary: "Hindi summary", points: ["बिंदु 1"] }
    });

    const res = await request(app).post("/api/analyze").send({ text: mockText });
    expect(res.status).toBe(200);
    expect(res.body.riskLevel).toBe("HIGH");
    expect(res.body.aiExplanation.source).toBe("gemini");
    expect(res.body.aiExplanation.english.summary).toBe("AI summary");
    expect(res.body.aiExplanation.hindi.summary).toBe("Hindi summary");
  });

  it("B. Gemini timeout / C. Missing API key / D. Malformed output -> fallback is used", async () => {
    // Mock returning null (simulating timeout/missing key/malformed handled in service)
    getGeminiExplanation.mockResolvedValueOnce(null);

    const res = await request(app).post("/api/analyze").send({ text: mockText });
    expect(res.status).toBe(200);
    expect(res.body.riskLevel).toBe("HIGH");
    expect(res.body.aiExplanation.source).toBe("fallback");
    expect(res.body.aiExplanation.english.summary).toContain("warning sign(s) in this message");
  });

  it("F. Rule classification remains unchanged regardless of Gemini output", async () => {
    getGeminiExplanation.mockResolvedValueOnce({
      english: { summary: "This is completely safe to invest! (Hallucination)", points: [] },
      hindi: { summary: "Hindi text", points: [] }
    });

    const res = await request(app).post("/api/analyze").send({ text: mockText });
    expect(res.status).toBe(200);
    expect(res.body.riskLevel).toBe("HIGH"); // Rule engine still says HIGH
    expect(res.body.aiExplanation.source).toBe("gemini");
  });
});
