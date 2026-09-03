import { extractTextFromPdf } from "./pdf";
import { extractTextFromDocx } from "./docx";

// Dispatches by mimetype and returns extracted text. The buffer is processed
// in memory only and never persisted — see project decision on resume storage.
export async function extractResumeText(buffer: Buffer, mimeType: string): Promise<string> {
  switch (mimeType) {
    case "application/pdf":
      return extractTextFromPdf(buffer);
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return extractTextFromDocx(buffer);
    default:
      throw new Error(`Unsupported resume mime type: ${mimeType}`);
  }
}
