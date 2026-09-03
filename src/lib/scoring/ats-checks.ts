import type { ExperienceEntry, ParsedResume } from "@/lib/schemas/resume";

export interface AtsCategoryResult {
  name: string;
  score: number;
  findings: string[];
}

export const ATS_CATEGORY_WEIGHTS: Readonly<Record<string, number>> = {
  "Contact Information": 10,
  "Section Structure": 15,
  "Date Formatting": 15,
  "Resume Length & Content Depth": 15,
  "Quantified Achievements": 15,
  // LLM-judged (see score.ts); weighted highest as the most predictive,
  // genuinely-judgment-based signal.
  "Keyword & Content Relevance": 30,
};

export function computeOverallAtsScore(categories: { name: string; score: number }[]): number {
  let weightedSum = 0;
  let weightTotal = 0;
  for (const category of categories) {
    const weight = ATS_CATEGORY_WEIGHTS[category.name];
    if (weight === undefined) {
      throw new Error(`computeOverallAtsScore: unknown category "${category.name}"`);
    }
    weightedSum += category.score * weight;
    weightTotal += weight;
  }
  if (weightTotal === 0) return 0;
  return Math.round(weightedSum / weightTotal);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d][\d\s().-]{6,}\d$/;

export function checkContactInformation(resume: ParsedResume): AtsCategoryResult {
  const findings: string[] = [];
  let passed = 0;

  if (resume.fullName.trim()) {
    passed++;
    findings.push("Full name is present.");
  } else {
    findings.push("Full name is missing.");
  }

  if (!resume.email) {
    findings.push("Email address is missing.");
  } else if (EMAIL_REGEX.test(resume.email)) {
    passed++;
    findings.push("Email address is present and well-formed.");
  } else {
    findings.push(`Email address "${resume.email}" does not look like a valid email address.`);
  }

  if (!resume.phone) {
    findings.push("Phone number is missing.");
  } else if (PHONE_REGEX.test(resume.phone)) {
    passed++;
    findings.push("Phone number is present and plausible.");
  } else {
    findings.push(`Phone number "${resume.phone}" does not look like a valid phone number.`);
  }

  return { name: "Contact Information", score: Math.round((passed / 3) * 100), findings };
}

export function checkSectionStructure(resume: ParsedResume): AtsCategoryResult {
  const findings: string[] = [];
  let passed = 0;

  if (resume.summary && resume.summary.trim()) {
    passed++;
    findings.push("Summary section is present.");
  } else {
    findings.push("Summary section is missing.");
  }

  if (resume.experience.length > 0) {
    passed++;
    findings.push(`Experience section has ${resume.experience.length} entry/entries.`);
  } else {
    findings.push("Experience section is empty — no work experience entries found.");
  }

  if (resume.education.length > 0) {
    passed++;
    findings.push(`Education section has ${resume.education.length} entry/entries.`);
  } else {
    findings.push("Education section is empty — no education entries found.");
  }

  if (resume.skills.length > 0) {
    passed++;
    findings.push(`Skills section lists ${resume.skills.length} skill(s).`);
  } else {
    findings.push("Skills section is empty — no skills listed.");
  }

  return { name: "Section Structure", score: Math.round((passed / 4) * 100), findings };
}

const DATE_PATTERNS: { name: string; regex: RegExp }[] = [
  { name: "YYYY-MM-DD", regex: /^\d{4}-\d{2}-\d{2}$/ },
  { name: "YYYY-MM", regex: /^\d{4}-\d{2}$/ },
  { name: "YYYY", regex: /^\d{4}$/ },
  { name: "Month YYYY", regex: /^[A-Za-z]{3,9}\.? \d{4}$/ },
];

function isBlank(value: string | null): boolean {
  return !value || !value.trim();
}

function matchedDateFormat(value: string): string | null {
  const trimmed = value.trim();
  return DATE_PATTERNS.find((pattern) => pattern.regex.test(trimmed))?.name ?? null;
}

export function checkDateFormatting(resume: ParsedResume): AtsCategoryResult {
  const entries = [
    ...resume.experience.map((e) => ({ startDate: e.startDate, endDate: e.endDate, label: `${e.company} — ${e.title}` })),
    ...resume.education.map((e) => ({ startDate: e.startDate, endDate: e.endDate, label: e.institution })),
  ];

  if (entries.length === 0) {
    return {
      name: "Date Formatting",
      score: 100,
      findings: ["No experience or education entries to check for date formatting."],
    };
  }

  const missingStart = entries.filter((e) => isBlank(e.startDate)).map((e) => e.label);
  const dateValues = entries.flatMap((e) => [e.startDate, e.endDate]).filter((v): v is string => !isBlank(v));
  const unrecognized = dateValues.filter((v) => matchedDateFormat(v) === null);
  const formatNames = new Set(dateValues.map(matchedDateFormat).filter((f): f is string => f !== null));

  const findings: string[] = [];

  if (missingStart.length === 0) {
    findings.push("All experience and education entries have a startDate.");
  } else {
    findings.push(
      `startDate missing on ${missingStart.length} of ${entries.length} entries (${missingStart.join(", ")}).`,
    );
  }

  if (unrecognized.length === 0) {
    findings.push("All present date values use a recognizable format (YYYY-MM-DD, YYYY-MM, YYYY, or Month YYYY).");
  } else {
    findings.push(
      `${unrecognized.length} date value(s) use a format other than YYYY-MM-DD, YYYY-MM, YYYY, or "Month YYYY": ${unrecognized.join(", ")}.`,
    );
  }

  if (formatNames.size > 1 && dateValues.length >= 2) {
    findings.push(`Dates use ${formatNames.size} different format styles (${[...formatNames].join(", ")}) across entries — inconsistent formatting.`);
  } else {
    findings.push("Date format is consistent across all entries.");
  }

  const score = Math.max(
    0,
    Math.round(
      100 - 15 * missingStart.length - 10 * unrecognized.length - (formatNames.size > 1 && dateValues.length >= 2 ? 10 : 0),
    ),
  );

  return { name: "Date Formatting", score, findings };
}

const MIN_DESC_LEN = 40;
const MAX_DESC_LEN = 2000;

export function checkContentDepth(resume: ParsedResume): AtsCategoryResult {
  const n = resume.experience.length;
  const findings: string[] = [`Resume has ${n} experience entry/entries.`];

  let subScoreA: number;
  if (n === 0) {
    subScoreA = 0;
  } else if (n <= 8) {
    subScoreA = 30;
  } else {
    subScoreA = 20;
    findings.push(`Resume has an unusually high number of experience entries (${n}); consider consolidating older or less relevant roles.`);
  }

  let subScoreB: number;
  if (n === 0) {
    subScoreB = 0;
    findings.push("No experience descriptions to evaluate.");
  } else {
    const tooShort = resume.experience.filter((e) => e.description.trim().length < MIN_DESC_LEN);
    const tooLong = resume.experience.filter((e) => e.description.trim().length > MAX_DESC_LEN);
    const adequateCount = n - tooShort.length - tooLong.length;
    subScoreB = Math.round((adequateCount / n) * 70);

    if (tooShort.length > 0) {
      findings.push(
        `${tooShort.length} of ${n} experience description(s) are missing or too short (<${MIN_DESC_LEN} characters) to convey real accomplishments: ${tooShort.map((e) => `${e.company} — ${e.title}`).join(", ")}.`,
      );
    } else {
      findings.push(`0 of ${n} experience descriptions are too short.`);
    }
    if (tooLong.length > 0) {
      findings.push(
        `${tooLong.length} of ${n} experience description(s) are unusually long (>${MAX_DESC_LEN} characters): ${tooLong.map((e) => `${e.company} — ${e.title}`).join(", ")}.`,
      );
    } else {
      findings.push(`0 of ${n} experience descriptions are unusually long.`);
    }
  }

  return { name: "Resume Length & Content Depth", score: Math.min(100, subScoreA + subScoreB), findings };
}

export const QUANTIFIED_ACHIEVEMENT_REGEX = /(\d+(\.\d+)?%|[$€£]\s?\d+(?:[.,]\d+)?|\b\d+(?:,\d{3})*(?:\.\d+)?\b)/;

export function checkQuantifiedAchievements(experience: ExperienceEntry[]): AtsCategoryResult {
  const n = experience.length;

  if (n === 0) {
    return {
      name: "Quantified Achievements",
      score: 0,
      findings: ["No experience entries, so no quantified achievements are present."],
    };
  }

  const withoutMetrics = experience.filter((e) => !QUANTIFIED_ACHIEVEMENT_REGEX.test(e.description));
  const quantifiedCount = n - withoutMetrics.length;

  const findings = [
    `${quantifiedCount} of ${n} experience description(s) contain a quantified metric (number, %, or currency); ${withoutMetrics.length} do not.`,
  ];
  if (withoutMetrics.length > 0) {
    findings.push(
      `Entries without quantified metrics: ${withoutMetrics.slice(0, 5).map((e) => `${e.company} — ${e.title}`).join(", ")}.`,
    );
  }

  return { name: "Quantified Achievements", score: Math.round((quantifiedCount / n) * 100), findings };
}

export function runDeterministicAtsChecks(resume: ParsedResume): AtsCategoryResult[] {
  return [
    checkContactInformation(resume),
    checkSectionStructure(resume),
    checkDateFormatting(resume),
    checkContentDepth(resume),
    checkQuantifiedAchievements(resume.experience),
  ];
}
