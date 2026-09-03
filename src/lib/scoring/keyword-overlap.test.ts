import { describe, expect, it } from "vitest";
import type { ParsedResume } from "@/lib/schemas/resume";
import { computeKeywordOverlap } from "./keyword-overlap";

function resumeWithSkills(skills: string[]): ParsedResume {
  return {
    fullName: "Test User",
    email: null,
    phone: null,
    summary: null,
    experience: [],
    education: [],
    skills,
    languages: [],
    location: null,
  };
}

describe("computeKeywordOverlap", () => {
  it("matches case-insensitively", () => {
    const result = computeKeywordOverlap(
      resumeWithSkills(["typescript"]),
      "We use TypeScript extensively.",
    );
    expect(result.matchedSkills).toEqual(["typescript"]);
    expect(result.unmatchedSkills).toEqual([]);
  });

  it("matches a multi-word skill phrase", () => {
    const result = computeKeywordOverlap(
      resumeWithSkills(["Team Leadership"]),
      "Looking for someone with strong Team Leadership experience.",
    );
    expect(result.matchedSkills).toEqual(["Team Leadership"]);
  });

  it("does not match a partial phrase for a multi-word skill", () => {
    const result = computeKeywordOverlap(
      resumeWithSkills(["Team Leadership"]),
      "Must be a great team player.",
    );
    expect(result.unmatchedSkills).toEqual(["Team Leadership"]);
  });

  it("does not falsely match Java inside JavaScript", () => {
    const result = computeKeywordOverlap(
      resumeWithSkills(["Java"]),
      "5+ years of experience with JavaScript required.",
    );
    expect(result.unmatchedSkills).toEqual(["Java"]);
  });

  it("matches skills ending in symbols like C++ and C#", () => {
    const result = computeKeywordOverlap(
      resumeWithSkills(["C++", "C#"]),
      "Strong background in C++ and C# development.",
    );
    expect(result.matchedSkills).toEqual(["C++", "C#"]);
  });

  it("handles an empty skills list", () => {
    const result = computeKeywordOverlap(resumeWithSkills([]), "Some job description.");
    expect(result.matchedSkills).toEqual([]);
    expect(result.unmatchedSkills).toEqual([]);
  });

  it("treats every skill as unmatched against empty job description text", () => {
    const result = computeKeywordOverlap(resumeWithSkills(["TypeScript"]), "");
    expect(result.unmatchedSkills).toEqual(["TypeScript"]);
  });

  it("does not throw on regex-special characters in a skill", () => {
    expect(() => computeKeywordOverlap(resumeWithSkills(["C++", ".NET"]), "Experience with .NET.")).not.toThrow();
  });
});
