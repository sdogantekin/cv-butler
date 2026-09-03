import { z } from "zod";

export const ExperienceEntrySchema = z.object({
  company: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  description: z.string(),
});

export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

export const EducationEntrySchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

export const LanguageEntrySchema = z.object({
  language: z.string(),
  // e.g. "C1", "Native", "Fluent" — kept as stated on the resume, not
  // normalized to a fixed enum since resumes phrase this inconsistently.
  proficiency: z.string().nullable(),
});

export const ParsedResumeSchema = z.object({
  fullName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  summary: z.string().nullable(),
  experience: z.array(ExperienceEntrySchema),
  education: z.array(EducationEntrySchema),
  skills: z.array(z.string()),
  languages: z.array(LanguageEntrySchema),
  // Current city/country as stated on the resume (e.g. "Berlin, Germany") —
  // the practical proxy for residency; null if not stated, never inferred.
  location: z.string().nullable(),
});

export type ParsedResume = z.infer<typeof ParsedResumeSchema>;
