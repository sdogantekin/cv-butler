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

vi.mock("@/lib/llm/provider", () => ({
  getChatModel: vi.fn(() => ({
    withStructuredOutput: () => ({
      invoke: async () => ({ letterText: FAKE_LETTER_TEXT }),
    }),
  })),
}));

describe("copywriterNode", () => {
  it("produces a 'general' variant when no job description is given", async () => {
    const result = await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null });

    expect(result).toEqual({
      coverLetter: { variant: "general", letterText: FAKE_LETTER_TEXT },
    });
  });

  it("produces a 'targeted' variant when a job description is given", async () => {
    const result = await copywriterNode({
      parsedResume: FAKE_RESUME,
      jobDescriptionText: "Senior Engineer role at Acme Corp.",
    });

    expect(result).toEqual({
      coverLetter: { variant: "targeted", letterText: FAKE_LETTER_TEXT },
    });
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

    const result = await copywriterNode({ parsedResume: FAKE_RESUME, jobDescriptionText: null });

    expect("errors" in result).toBe(true);
    if ("errors" in result) {
      expect(result.errors[0]).toContain("boom");
    }
  });
});
