import { createWorker } from 'tesseract.js';

let worker = null;

export const sanitizeOCRText = (text) => {
  if (!text) return text;
  // Remove zero-width space (U+200B), zero-width non-joiner (U+200C),
  // zero-width joiner (U+200D), BOM (U+FEFF), form feed (U+000C)
  return text.replace(/[\u200B\u200C\u200D\uFEFF\u000C]/g, '');
};

export const extractTextFromImage = async (file, onProgress) => {
  try {
    if (!worker) {
      if (onProgress) onProgress(10, 'initializing');
      worker = await createWorker('eng+hin', 1, {
        logger: m => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(Math.floor(m.progress * 100), 'recognizing');
          } else if (onProgress) {
            onProgress(10, 'initializing');
          }
        }
      });
    }
    
    if (onProgress) onProgress(0, 'recognizing');
    
    const { data: { text } } = await worker.recognize(file);
    return sanitizeOCRText(text).trim();
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to process image. Please try again or type the text manually.');
  }
};

export const terminateWorker = async () => {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
};
