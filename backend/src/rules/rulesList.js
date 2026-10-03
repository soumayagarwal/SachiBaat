const rules = [
  {
    id: "R001",
    category: "Guaranteed Returns",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();
      // Ignore valid contexts like FD or educational text
      const ignorePattern = /(fd|fixed deposit|impossible|cannot be|no guaranteed|not guaranteed|does not exist|are not guaranteed|isn't guaranteed|warns investors against|warning against|warns against)/i;
      if (ignorePattern.test(lower)) {
        return false;
      }
      return /(guaranteed.*?(profit|return|income|\d+%|monthly|daily|tips|trading)|sure return|100%\s*risk[-\s]*free|100%\s*guarantee|fixed return|fix return|zero risk|bina\s*(kisi\s*)?risk|pakka munafa|paisa double|guaranteed kamai|ghar baithe kamai|jaldi paisa)/i.test(lower);
    },
    severity: "CRITICAL",
    explanation: "The message promises guaranteed profits. In real stock markets, returns can never be legally guaranteed."
  },
  {
    id: "R002",
    category: "Unofficial Payment Channels",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();
      if (lower.includes("upi mandate") || lower.includes("zerodha") || lower.includes("upstox") || lower.includes("groww") || lower.includes("angelone")) {
        return false;
      }
      const paymentWords = /(upi|gpay|phonepe|paytm|crypto|wallet)/i.test(lower);
      const investmentWords = /(fee|premium|join|group|channel|trade|trading|invest|tips|tip|calls|advisory)/i.test(lower);
      return paymentWords && investmentWords;
    },
    severity: "HIGH",
    explanation: "Legitimate brokers and mutual funds only accept payments through official bank gateways to verified accounts, never personal UPI IDs or crypto."
  },
  {
    id: "R003",
    category: "Unrealistic Profit Claims",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();
      const ignorePattern = /(historically|past performance)/i;
      if (ignorePattern.test(lower)) {
        return false;
      }
      return /(double\W*your\W*money|100%\s*return|200%\s*return|300%\s*return|daily \d+ profit|\d+ daily profit|earn \d+ daily|roz\W*\d+|jackpot|multi-bagger|multibagger|paisa double|pakka munafa)/i.test(lower);
    },
    severity: "HIGH",
    explanation: "The profit claims are extremely high and unrealistic for standard investments."
  },
  {
    id: "R004",
    category: "Urgency / Pressure",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();
      if (lower.includes("ipo closing") || lower.includes("ipo allotment")) {
        return false;
      }
      return /(limited time|offer ends today|only \d+ (spots|seats)( left)?|act now|hurry|last chance|spots left|seats left)/i.test(lower);
    },
    severity: "MEDIUM",
    explanation: "The message creates false urgency. Scammers do this so you pay before thinking or checking facts."
  },
  {
    id: "R005",
    category: "Suspicious Contact Channels",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();
      const contactWords = /(whats\s*app|telegram|t\.me|wa\.me|dm|pm|message me)/i.test(lower);
      const investmentWords = /(guaranteed|profit|trade|trading|options|nifty|banknifty|tips|tip|calls)/i.test(lower);
      return contactWords && investmentWords;
    },
    severity: "MEDIUM",
    explanation: "SEBI-registered advisors rarely solicit investments through random WhatsApp or Telegram messages."
  },
  {
    id: "R006",
    category: "KYC Scam",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();

      return /(update kyc immediately|kyc expired|complete kyc now|account suspended|demat account.*blocked|pan verification pending)/i.test(lower);
    },
    severity: "HIGH",
    explanation: "Scammers often create panic by claiming your account or KYC needs urgent action."
  },

  {
    id: "R007",
    category: "Fake IPO Allotment",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();

      return /(guaranteed ipo allotment|assured ipo allotment|reserve ipo shares now|pay.*ipo allotment)/i.test(lower);
    },
    severity: "HIGH",
    explanation: "No one can legally guarantee IPO allotment in advance."
  },

  {
    id: "R008",
    category: "Fake SEBI Claims",
    condition: (normalizedText) => {
      const lower = normalizedText.toLowerCase();

      return /(sebi.*(guaranteed returns|profit|tips)|official sebi trading group|sebi approved|sebi certified)/i.test(lower);
    },
    severity: "HIGH",
    explanation: "Fraudsters often misuse SEBI's name to appear trustworthy."
  }
];

module.exports = rules;
