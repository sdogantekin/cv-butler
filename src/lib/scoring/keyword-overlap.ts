import type { ParsedResume } from "@/lib/schemas/resume";

export interface KeywordOverlapResult {
  matchedSkills: string[];
  unmatchedSkills: string[];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Turkish has two letter pairs that the regex "i" flag's standard
// (non-locale-aware) case folding doesn't equate: dotted İ/i and dotless
// I/ı. Standard folding only maps I<->i, so a skill written "İngilizce"
// won't match JD text "ingilizce", and "Yazılım" won't match "YAZILIM".
// Expanding just these four characters into a class that matches any of
// them — rather than lowercasing the whole text with a Turkish locale —
// fixes that without risking a false match/mismatch elsewhere: naive
// Turkish-locale lowercasing would turn an English acronym like "IoT" into
// "ıot", breaking matches for non-Turkish content sharing the same signal.
function toIFamilyPattern(escaped: string): string {
  return escaped.replace(/[iIİı]/g, "[iIİı]");
}

// Word-boundary matching (\b) breaks on skills ending in symbols like "C++"
// or "C#", since the character right after the symbol is itself non-word.
// A lookaround checks only whether the surrounding character is alphanumeric,
// which handles that correctly and also naturally prevents "Java" from
// falsely matching inside "JavaScript" (the next character, "S", is
// alphanumeric, so the lookahead fails).
function skillAppearsInText(skill: string, text: string): boolean {
  const trimmed = skill.trim();
  if (!trimmed) return false;
  const body = toIFamilyPattern(escapeRegExp(trimmed));
  const pattern = new RegExp(`(?<![A-Za-z0-9])${body}(?![A-Za-z0-9])`, "i");
  return pattern.test(text);
}

// Deterministic grounding signal fed into the JD-matching prompt: which of
// the candidate's own resume.skills entries literally appear in the job
// description text. Not the final word on skill match (a candidate can have
// a skill under different wording) — see match.ts.
export function computeKeywordOverlap(
  resume: ParsedResume,
  jobDescriptionText: string,
): KeywordOverlapResult {
  const matchedSkills: string[] = [];
  const unmatchedSkills: string[] = [];
  for (const skill of resume.skills) {
    if (skillAppearsInText(skill, jobDescriptionText)) {
      matchedSkills.push(skill);
    } else {
      unmatchedSkills.push(skill);
    }
  }
  return { matchedSkills, unmatchedSkills };
}
