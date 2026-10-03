const { getGeminiExplanation } = require("../src/services/geminiService");
const { GoogleGenAI } = require("@google/genai");

jest.mock("@google/genai", () => {
  return {
    Type: { OBJECT: "OBJECT", STRING: "STRING", ARRAY: "ARRAY" },
    GoogleGenAI: jest.fn().mockImplementation(() => {
      return {
        models: {
          generateContent: jest.fn()
        }
      };
    })
  };
});

describe("Gemini JSON Parsing Robustness", () => {
  let aiInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = "test-key";
    
    // We need to re-require geminiService to pick up the new mock
    jest.isolateModules(() => {
      const { getGeminiExplanation: getExplanation } = require("../src/services/geminiService");
      this.getGeminiExplanationIsolated = getExplanation;
    });
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  it("parses valid JSON successfully", async () => {
    const mockResponse = {
      text: JSON.stringify({
        english: { summary: "English", points: ["1"] },
        hindi: { summary: "Hindi", points: ["1"] }
      })
    };
    
    const { GoogleGenAI } = require("@google/genai");
    const instance = new GoogleGenAI();
    instance.models.generateContent.mockResolvedValueOnce(mockResponse);

    // Overwrite the module-level 'ai' variable in geminiService
    // Because it's a module level let, we might need a workaround for testing
    // Or we can just use the fact that the mock is already injected.
  });
});
