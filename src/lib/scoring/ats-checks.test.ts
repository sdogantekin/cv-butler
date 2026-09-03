import { describe, expect, it } from "vitest";
import type { ExperienceEntry, ParsedResume } from "@/lib/schemas/resume";
import {
  ATS_CATEGORY_WEIGHTS,
  checkContactInformation,
  checkContentDepth,
  checkDateFormatting,
  checkQuantifiedAchievements,
  checkSectionStructure,
  computeOverallAtsScore,
  runDeterministicAtsChecks,
} from "./ats-checks";

function baseResume(overrides: Partial<ParsedResume> = {}): ParsedResume {
  return {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    phone: "+44 20 7946 0958",
    summary: "Experienced software engineer.",
    experience: [],
    education: [],
    skills: ["TypeScript"],
    languages: [],
    location: "London, UK",
    ...overrides,
  };
}

function experienceEntry(overrides: Partial<ExperienceEntry> = {}): ExperienceEntry {
  return {
    company: "Acme Corp",
    title: "Software Engineer",
    startDate: "2020-01",
    endDate: null,
    description: "Led a team of 5 engineers and grew revenue by 20%.",
    ...overrides,
  };
}

describe("checkContactInformation", () => {
  it("scores 100 when name, email, and phone are all present and valid", () => {
    const result = checkContactInformation(baseResume());
    expect(result.score).toBe(100);
  });

  it("scores 0 when everything is missing", () => {
    const result = checkContactInformation(
      baseResume({ fullName: "", email: null, phone: null }),
    );
    expect(result.score).toBe(0);
    expect(result.findings).toContain("Full name is missing.");
    expect(result.findings).toContain("Email address is missing.");
    expect(result.findings).toContain("Phone number is missing.");
  });

  it("flags a malformed email distinctly from a missing one", () => {
    const result = checkContactInformation(baseResume({ email: "not-an-email" }));
    expect(result.score).toBe(67);
    expect(result.findings.some((f) => f.includes("does not look like a valid email"))).toBe(true);
  });

  it("scores 67 when only phone is missing", () => {
    const result = checkContactInformation(baseResume({ phone: null }));
    expect(result.score).toBe(67);
  });
});

describe("checkSectionStructure", () => {
  it("scores 100 when all sections are populated", () => {
    const result = checkSectionStructure(
      baseResume({ experience: [experienceEntry()], education: [{ institution: "MIT", degree: "BSc", field: null, startDate: null, endDate: null }] }),
    );
    expect(result.score).toBe(100);
  });

  it("scores 25 when only skills is present", () => {
    const result = checkSectionStructure(baseResume({ summary: null }));
    expect(result.score).toBe(25);
    expect(result.findings).toContain("Summary section is missing.");
    expect(result.findings).toContain("Experience section is empty — no work experience entries found.");
  });
});

describe("checkDateFormatting", () => {
  it("scores 100 (neutral) when there are no entries", () => {
    const result = checkDateFormatting(baseResume());
    expect(result.score).toBe(100);
    expect(result.findings[0]).toMatch(/no experience or education entries/i);
  });

  it("deducts for a missing startDate on an education entry", () => {
    const result = checkDateFormatting(
      baseResume({
        education: [{ institution: "Acme University", degree: "BSc", field: null, startDate: null, endDate: "2020" }],
      }),
    );
    expect(result.score).toBe(85);
    expect(result.findings.some((f) => f.includes("Acme University"))).toBe(true);
  });

  it("flags inconsistent date format styles across entries", () => {
    const result = checkDateFormatting(
      baseResume({
        experience: [
          experienceEntry({ startDate: "2020-01", endDate: "2021-01" }),
          experienceEntry({ startDate: "Jan 2019", endDate: "Jan 2020" }),
        ],
      }),
    );
    expect(result.findings.some((f) => f.includes("different format styles"))).toBe(true);
    expect(result.score).toBe(90);
  });

  it("floors the score at 0 rather than going negative", () => {
    const result = checkDateFormatting(
      baseResume({
        education: [
          { institution: "A", degree: "BSc", field: null, startDate: null, endDate: null },
          { institution: "B", degree: "MSc", field: null, startDate: null, endDate: null },
          { institution: "C", degree: "PhD", field: null, startDate: null, endDate: null },
          { institution: "D", degree: "Postdoc", field: null, startDate: null, endDate: null },
          { institution: "E", degree: "Fellowship", field: null, startDate: null, endDate: null },
          { institution: "F", degree: "Cert", field: null, startDate: null, endDate: null },
          { institution: "G", degree: "Cert 2", field: null, startDate: null, endDate: null },
        ],
      }),
    );
    expect(result.score).toBe(0);
  });
});

describe("checkContentDepth", () => {
  it("scores 0 when there is no experience", () => {
    expect(checkContentDepth(baseResume()).score).toBe(0);
  });

  it("treats a 39-character description as too short and a 40-character one as adequate", () => {
    const short = "a".repeat(39);
    const adequate = "a".repeat(40);
    const result = checkContentDepth(
      baseResume({
        experience: [experienceEntry({ description: short }), experienceEntry({ description: adequate })],
      }),
    );
    expect(result.findings.some((f) => f.includes("1 of 2 experience description(s)"))).toBe(true);
  });

  it("reduces the count sub-score for more than 8 experience entries", () => {
    const many = Array.from({ length: 9 }, () => experienceEntry());
    const result = checkContentDepth(baseResume({ experience: many }));
    expect(result.findings.some((f) => f.includes("unusually high number"))).toBe(true);
  });

  it("flags a description longer than 2000 characters", () => {
    const result = checkContentDepth(
      baseResume({ experience: [experienceEntry({ description: "a".repeat(2001) })] }),
    );
    expect(result.findings.some((f) => f.includes("unusually long"))).toBe(true);
  });
});

describe("checkQuantifiedAchievements", () => {
  it("scores 0 when there is no experience", () => {
    expect(checkQuantifiedAchievements([]).score).toBe(0);
  });

  it("computes the ratio of quantified to non-quantified descriptions", () => {
    const result = checkQuantifiedAchievements([
      experienceEntry({ company: "Acme", description: "Grew revenue by 20%." }),
      experienceEntry({ company: "Beta", description: "Worked on various projects." }),
    ]);
    expect(result.score).toBe(50);
    expect(result.findings.some((f) => f.includes("Beta"))).toBe(true);
  });
});

describe("computeOverallAtsScore", () => {
  it("weights sum to 100", () => {
    const total = Object.values(ATS_CATEGORY_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(total).toBe(100);
  });

  it("computes a known weighted average", () => {
    const score = computeOverallAtsScore([
      { name: "Contact Information", score: 100 },
      { name: "Section Structure", score: 0 },
    ]);
    // (100*10 + 0*15) / (10+15) = 40
    expect(score).toBe(40);
  });

  it("throws on an unrecognized category name", () => {
    expect(() => computeOverallAtsScore([{ name: "Nonexistent", score: 50 }])).toThrow();
  });
});

describe("runDeterministicAtsChecks", () => {
  it("returns exactly 5 categories with the expected names", () => {
    const results = runDeterministicAtsChecks(baseResume());
    expect(results.map((r) => r.name)).toEqual([
      "Contact Information",
      "Section Structure",
      "Date Formatting",
      "Resume Length & Content Depth",
      "Quantified Achievements",
    ]);
  });
});
