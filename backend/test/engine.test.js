const { analyzeText } = require("../src/rules/engine");

describe("Rule Engine Tests", () => {
  test("R001: Guaranteed 10% monthly profit should trigger", () => {
    const res = analyzeText("Guaranteed 10% monthly profit on options");
    expect(res.triggeredRules.find(r => r.id === "R001")).toBeDefined();
    expect(res.riskLevel).toBe("HIGH");
  });

  test("R001 false-positive case: FD gives guaranteed 7% should NOT trigger", () => {
    const res = analyzeText("FD gives guaranteed 7%");
    expect(res.triggeredRules.find(r => r.id === "R001")).toBeUndefined();
    expect(res.riskLevel).toBe("LOW");
  });

  test("R002: Pay ₹2000 to this UPI ID to join our premium trading group should trigger", () => {
    const res = analyzeText("Pay ₹2000 to this UPI ID to join our premium trading group");
    expect(res.triggeredRules.find(r => r.id === "R002")).toBeDefined();
  });

  test("R004: Only 2 spots left, act now should trigger", () => {
    const res = analyzeText("Only 2 spots left, act now");
    expect(res.triggeredRules.find(r => r.id === "R004")).toBeDefined();
  });

  test("R005: DM me on Telegram for guaranteed trading tips should trigger relevant rules", () => {
    const res = analyzeText("DM me on Telegram for guaranteed trading tips");
    expect(res.triggeredRules.find(r => r.id === "R005")).toBeDefined();
    expect(res.triggeredRules.find(r => r.id === "R001")).toBeDefined();
    expect(res.riskLevel).toBe("HIGH");
  });

  test("A clean educational sentence should not blindly trigger R001", () => {
    const res = analyzeText("This article explains why guaranteed returns are impossible");
    expect(res.triggeredRules.find(r => r.id === "R001")).toBeUndefined();
  });

  test("R001: Should not trigger on negated statements", () => {
    const cases = [
      "There is no guaranteed profit.",
      "Guaranteed profit does not exist.",
      "Returns are not guaranteed."
    ];
    for (const text of cases) {
      const res = analyzeText(text);
      expect(res.triggeredRules.find(r => r.id === "R001")).toBeUndefined();
    }
  });

  test("R006: Demat account will be blocked, update KYC immediately", () => {
    const res = analyzeText(
      "Your demat account will be blocked. Update KYC immediately."
    );

    expect(res.triggeredRules.find(r => r.id === "R006")).toBeDefined();
  });

  test("R007: Guaranteed IPO allotment should trigger", () => {
    const res = analyzeText(
      "Guaranteed IPO allotment. Pay now to reserve shares."
    );

    expect(res.triggeredRules.find(r => r.id === "R007")).toBeDefined();
  });

  test("R008: SEBI approved guaranteed returns should trigger", () => {
    const res = analyzeText(
      "SEBI approved guaranteed returns. Join our premium group."
    );

    expect(res.triggeredRules.find(r => r.id === "R008")).toBeDefined();
  });
  test("Hindi scam phrase: Paisa double should trigger", () => {
    const res = analyzeText("Paisa double in 30 days");

    expect(res.triggeredRules.find(r => r.id === "R001")).toBeDefined();
  });
  test("Hindi scam phrase: Pakka munafa should trigger", () => {
    const res = analyzeText("Pakka munafa aur guaranteed kamai");

    expect(res.triggeredRules.find(r => r.id === "R001")).toBeDefined();
  });
  test("Educational IPO message should not trigger scam detection", () => {
    const res = analyzeText(
      "IPO allotment process is explained in this article."
    );

    expect(res.triggeredRules.find(r => r.id === "R007")).toBeUndefined();
  });
  test("Educational KYC article should not trigger scam detection", () => {
    const res = analyzeText(
      "This article explains how to update your KYC."
    );

    expect(res.triggeredRules.find(r => r.id === "R006")).toBeUndefined();
  });
});
