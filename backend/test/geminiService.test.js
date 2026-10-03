const { GoogleGenAI } = require("@google/genai");

jest.mock("@google/genai", () => {
  const generateContentMock = jest.fn();
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: generateContentMock
      }
    })),
    Type: { OBJECT: 'OBJECT', STRING: 'STRING', ARRAY: 'ARRAY' }
  };
});

describe("Gemini Service", () => {
  let geminiService;
  let generateContentMock;

  beforeEach(() => {
    jest.resetModules();
    process.env.GEMINI_API_KEY = "test-key";
    
    const { GoogleGenAI } = require("@google/genai");
    generateContentMock = new GoogleGenAI().models.generateContent;
    generateContentMock.mockReset();
    
    geminiService = require("../src/services/geminiService");
  });

  const dummyRules = [{ id: "R001", category: "Urgency", explanation: "Test" }];

  it("B. Gemini 503 -> one retry -> fallback if still unavailable", async () => {
    const error503 = new Error("503 Service Unavailable");
    error503.status = 503;
    generateContentMock.mockRejectedValueOnce(error503).mockRejectedValueOnce(error503);
    
    const result = await geminiService.getGeminiExplanation("text", "HIGH", dummyRules);
    
    expect(generateContentMock).toHaveBeenCalledTimes(2);
    expect(result).toBeNull(); // fallback
  });

  it("C. Gemini 429 -> fast fallback", async () => {
    const error429 = new Error("429 Too Many Requests");
    error429.status = 429;
    generateContentMock.mockRejectedValueOnce(error429);
    
    const result = await geminiService.getGeminiExplanation("text", "HIGH", dummyRules);
    
    expect(generateContentMock).toHaveBeenCalledTimes(1); // no retry
    expect(result).toBeNull();
  });

  it("D. Gemini timeout -> fast fallback", async () => {
    const timeoutError = new Error("Gemini timeout");
    generateContentMock.mockRejectedValueOnce(timeoutError).mockRejectedValueOnce(timeoutError);
    
    const result = await geminiService.getGeminiExplanation("text", "HIGH", dummyRules);
    
    expect(generateContentMock).toHaveBeenCalledTimes(2);
    expect(result).toBeNull();
  });

  it("E. invalid API key -> immediate fallback", async () => {
    const error401 = new Error("Invalid API key");
    error401.status = 401;
    generateContentMock.mockRejectedValueOnce(error401);
    
    const result = await geminiService.getGeminiExplanation("text", "HIGH", dummyRules);
    
    expect(generateContentMock).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});
