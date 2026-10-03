describe('OCR Text Sanitization', () => {
  const sanitizeOCRText = (text) => {
    if (!text) return text;
    return text.replace(/[\u200B\u200C\u200D\uFEFF\u000C]/g, '');
  };

  it('proves "abc\\u200B\\nxyz\\f" becomes "abc\\nxyz" without removing legitimate characters', () => {
    const input = "abc\u200B\nxyz\f";
    const expected = "abc\nxyz";
    const result = sanitizeOCRText(input);
    expect(result).toBe(expected);
  });

  it('preserves Hindi and English characters and ₹', () => {
    const input = "हिंदी English ₹100 \u200B \f";
    const expected = "हिंदी English ₹100  ";
    expect(sanitizeOCRText(input)).toBe(expected);
  });
});
