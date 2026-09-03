import { PDFParse } from "pdf-parse";

// Text-layer PDFs only — scanned/image-only PDFs are out of scope for v1 (no OCR).
export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  try {
    const { text } = await parser.getText();
    return text.trim();
  } finally {
    await parser.destroy();
  }
}
