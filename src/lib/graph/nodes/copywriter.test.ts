import { describe, expect, it, vi } from "vitest";
import type { ParsedResume } from "@/lib/schemas/resume";
import { copywriterNode } from "./copywriter";

const FAKE_RESUME: ParsedResume = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  phone: null,
  summary: null,
  experience: [],
  education: [],
  skills: ["TypeScript"],
  languages: [],
  location: null,
};

const FAKE_LETTER_TEXT = "Dear Hiring Manager,\n\nI am writing to express my interest.\n\nAda Lovelace";

let capturedPrompt = "";

vi.mock("@/lib/llm/provider", () => ({
  getChatModel: vi.fn(() => ({
    withStructuredOutput: () => ({
      invoke: async (prompt: string) => {
        capturedPrompt = prompt;
        return { letterText: FAKE_LETTER_TEXT };
      },
    }),
  })),
}));

describe("copywriterNode", () => {
  it("produces a 'general' variant when no job description is given", async () => {
    const result = await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null, locale: "en" });

    expect(result).toEqual({
      coverLetter: { variant: "general", letterText: FAKE_LETTER_TEXT },
    });
  });

  it("produces a 'targeted' variant when a job description is given", async () => {
    const result = await copywriterNode({
      parsedResume: FAKE_RESUME,
      jobDescriptionText: "Senior Engineer role at Acme Corp.",
      locale: "en",
    });

    expect(result).toEqual({
      coverLetter: { variant: "targeted", letterText: FAKE_LETTER_TEXT },
    });
  });

  it("uses the English humanizer guidance and instructs English output for locale 'en'", async () => {
    await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null, locale: "en" });

    expect(capturedPrompt).toContain("Avoid these common AI-writing tells");
    expect(capturedPrompt).toContain("fluent English");
    expect(capturedPrompt).not.toContain("Doğal, insan bir üslupla yazın");
  });

  it("uses the Turkish humanizer guidance and instructs Turkish output for locale 'tr'", async () => {
    await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null, locale: "tr" });

    expect(capturedPrompt).toContain("Doğal, insan bir üslupla yazın");
    expect(capturedPrompt).toContain("fluent Turkish");
    expect(capturedPrompt).not.toContain("Avoid these common AI-writing tells");
  });

  it("uses the German humanizer guidance and instructs German output for locale 'de'", async () => {
    await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null, locale: "de" });

    expect(capturedPrompt).toContain("Schreiben Sie in einem natürlichen, menschlichen Ton");
    expect(capturedPrompt).toContain("fluent German");
    expect(capturedPrompt).not.toContain("Avoid these common AI-writing tells");
    expect(capturedPrompt).not.toContain("Doğal, insan bir üslupla yazın");
  });

  it("returns errors instead of throwing when the LLM call fails", async () => {
    const { getChatModel } = await import("@/lib/llm/provider");
    vi.mocked(getChatModel).mockReturnValueOnce({
      withStructuredOutput: () => ({
        invoke: async () => {
          throw new Error("boom");
        },
      }),
    } as unknown as ReturnType<typeof getChatModel>);

    const result = await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null, locale: "en" });

    expect("errors" in result).toBe(true);
    if ("errors" in result) {
      expect(result.errors[0]).toContain("boom");
    }
  });
});
