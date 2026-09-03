import mammoth from "mammoth";

// Modern Office Open XML .docx only — mammoth cannot read legacy binary .doc.
export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const { value } = await mammoth.extractRawText({ buffer });
  return value.trim();
}
