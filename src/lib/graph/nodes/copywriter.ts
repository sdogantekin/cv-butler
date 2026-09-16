import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { CoverLetterResultSchema, type CoverLetterResult } from "@/lib/schemas/analysis";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { Locale } from "@/lib/i18n/locales";
import { buildOutputLanguageInstruction } from "./output-language";

const CopywriterLlmOutputSchema = z.object({
  letterText: z.string(),
});

// Condensed from github.com/blader/humanizer (MIT licensed) — adapted into
// the prompt itself per CLAUDE.md/requirements.md 6.4, not taken as a
// runtime dependency (the skill is built for interactive rewrite sessions,
// not a callable generation step). Trimmed to the patterns that matter when
// generating a short letter from scratch; rewrite-specific ones (curly
// quotes, decorative headings, "writing about the previous version") are
// dropped since there's no prior draft to inherit them from.
const HUMANIZER_GUIDANCE = `Write in a natural, human voice. Avoid these common AI-writing tells:

- Never use "not just X, it's Y" or "not only X, but Y" constructions, or split the same contrast across two sentences ("This isn't about X. It's about Y.").
- No one-line dramatic closers that just restate the point ("That's the difference.", "Let that sink in.").
- No staged run-up openers ("I'm excited to share...", "Let me tell you why...").
- No forced groups of three (three adjectives, three examples) unless the content genuinely has three distinct, necessary parts.
- No em dashes or en dashes as a universal connector — use a period, comma, or parentheses instead.
- Avoid these overused AI words entirely: actually, additionally, align with, bolstered, crucial, deep dive, delve, emphasizing, enduring, enhance, fostering, garner, highlight (as a verb), interplay, intricate, key (as an adjective), landscape (abstract), meticulous, pivotal, quietly, robust (unless technical), showcase, tapestry (abstract), testament, underscore (as a verb), valuable, vibrant.
- No inflated-significance phrasing ("stands as a testament to", "marks a pivotal moment", "a step in the right direction").
- No sales/marketing language ("boasts", "renowned", "breathtaking", "nestled", "diverse array").
- Prefer simple verbs: "is/are/has" instead of "serves as/boasts/features/represents".
- No bolded words or bulleted lists with labels — this is a letter, written in full prose paragraphs.
- Vary sentence length and structure; do not start consecutive sentences with the same subject.
- No chatbot-style openers or closers ("I hope this helps", "Great question"), and no generic uplifting send-off ("I look forward to bringing my passion and dedication to your team") — end on something specific instead.

Write like a specific person addressing a specific role, not a template.`;

// Adapted for Turkish, not translated word-for-word from the English list
// above — English AI-writing tells ("delve", em dashes as connectors) don't
// map 1:1 onto what reads as generic/AI-generated Turkish prose. Same
// category structure (overused words, forced triads, staged openers,
// dramatic closers, sales language, generic send-offs), populated with the
// actual Turkish equivalents of those tells.
const HUMANIZER_GUIDANCE_TR = `Doğal, insan bir üslupla yazın. Şu yapay zekâ metinlerine özgü klişelerden kaçının:

- "Sadece X değil, aynı zamanda Y" veya "yalnızca X değil, Y de" kalıplarını kullanmayın; aynı karşıtlığı iki cümleye bölmeyin ("Bu X ile ilgili değil. Bu Y ile ilgili.").
- Cümleyi tekrar eden tek satırlık dramatik kapanışlar kullanmayın ("İşte fark bu.", "Bunu bir düşünün.").
- Sahnelenmiş, hazırlık cümleleriyle başlamayın ("Sizlerle paylaşmaktan büyük mutluluk duyuyorum...", "İzin verirseniz şunu belirtmek isterim...").
- İçerik gerçekten üç ayrı ve gerekli unsur içermiyorsa, zorlama üçlü gruplamalar kullanmayın (üç sıfat, üç örnek).
- Şu aşırı kullanılan, klişeleşmiş kelime ve ifadelerden tamamen kaçının: adeta, bütünsel, derinlemesine, elbette, güçlü bir şekilde, ivme kazandırmak, kritik öneme sahip, kusursuz, köklü, önemli bir rol oynamak, özenle, sinerji, şüphesiz, vurgulamak (fiil olarak), yolculuk (soyut anlamda), zengin bir deneyim/birikim, zenginleştirmek.
- Abartılı önem atfeden ifadeler kullanmayın ("bir dönüm noktası niteliğinde", "gerçek bir kanıt niteliğinde", "doğru yönde atılmış bir adım").
- Satış/pazarlama diline kaçmayın ("eşsiz", "benzersiz", "nadide", "seçkin").
- Basit fiilleri tercih edin: "temsil eder/sunar/sergiler" yerine "-dır/-dir", "var", "sahip".
- Kalın yazılmış kelimeler veya etiketli madde işaretleri kullanmayın — bu bir mektup, tam cümlelerle akıcı bir şekilde yazılmalı.
- Cümle uzunluğunu ve yapısını çeşitlendirin; art arda gelen cümlelere aynı özneyle başlamayın.
- Sohbet robotu tarzı açılış veya kapanışlardan kaçının ("Umarım bu yardımcı olur"), ve genel geçer, içi boş bir kapanış cümlesi kullanmayın ("Ekibinize tutkumu ve özverimi getirmeyi dört gözle bekliyorum") — bunun yerine somut bir noktayla bitirin.

Belirli bir kişinin, belirli bir role yazdığı gibi yazın; şablon gibi değil.`;

// Adapted for German the same way as the Turkish block above — the actual
// German equivalents of these AI-writing tells, not a literal translation.
const HUMANIZER_GUIDANCE_DE = `Schreiben Sie in einem natürlichen, menschlichen Ton. Vermeiden Sie diese typischen KI-Textmerkmale:

- Verwenden Sie nie Konstruktionen wie "nicht nur X, sondern auch Y", und teilen Sie denselben Gegensatz nicht auf zwei Sätze auf ("Hier geht es nicht um X. Hier geht es um Y.").
- Keine dramatischen Ein-Satz-Schlusszeilen, die nur den Punkt wiederholen ("Genau das macht den Unterschied.", "Das sagt alles.").
- Keine inszenierten Anlauf-Sätze zu Beginn ("Ich freue mich, Ihnen mitteilen zu können...", "Lassen Sie mich erklären, warum...").
- Keine erzwungenen Dreiergruppen (drei Adjektive, drei Beispiele), außer der Inhalt hat tatsächlich drei eigenständige, notwendige Teile.
- Keine Gedankenstriche als durchgängiges Verbindungselement — verwenden Sie stattdessen Punkt, Komma oder Klammern.
- Vermeiden Sie diese abgenutzten, floskelhaften Wörter und Wendungen vollständig: zudem, darüber hinaus, maßgeblich, ganzheitlich, maßgeschneidert, essenziell, entscheidend, facettenreich, Vielzahl, Synergien, Mehrwert, auf Augenhöhe, im Fokus stehen, eine wichtige Rolle spielen, unterstreichen (als Verb), hervorheben (als Verb), Reise (im übertragenen Sinn), nachhaltig (außer im wörtlichen, technischen Sinn), innovativ (als Füllwort), vielfältig (als Füllwort).
- Keine übertriebenen Bedeutungsfloskeln ("ein echter Meilenstein", "ein entscheidender Wendepunkt", "ein Schritt in die richtige Richtung").
- Keine Verkaufs-/Marketingsprache ("einzigartig", "erstklassig", "beeindruckend", "vielfältiges Angebot").
- Bevorzugen Sie einfache Verben: "ist/hat" statt "fungiert als/bietet/verfügt über/zeichnet sich aus durch".
- Keine fett gedruckten Wörter oder Aufzählungslisten mit Labels — dies ist ein Brief, geschrieben in vollständigen, zusammenhängenden Absätzen.
- Variieren Sie Satzlänge und -struktur; beginnen Sie nicht mehrere Sätze hintereinander mit demselben Subjekt.
- Keine Chatbot-artigen Eröffnungen oder Abschlüsse ("Ich hoffe, das hilft"), und kein generischer, inhaltsleerer Schlusssatz ("Ich freue mich darauf, meine Leidenschaft und mein Engagement in Ihr Team einzubringen") — enden Sie stattdessen mit etwas Konkretem.

Schreiben Sie wie eine bestimmte Person, die sich an eine bestimmte Stelle wendet, nicht wie eine Vorlage.`;

const HUMANIZER_GUIDANCE_BY_LOCALE: Record<Locale, string> = {
  en: HUMANIZER_GUIDANCE,
  tr: HUMANIZER_GUIDANCE_TR,
  de: HUMANIZER_GUIDANCE_DE,
};

function buildCopywriterPrompt(
  resume: ParsedResume,
  jobDescriptionText: string | null,
  locale: Locale,
): string {
  const variantInstructions = jobDescriptionText
    ? `Write a TARGETED cover letter for the specific role described in the job description below. Reference the company name, the role title, and specific stated requirements from that job description where the candidate's actual background genuinely supports them.`
    : `Write a GENERAL cover letter — no specific job description was provided. Write it as a professional introduction of the candidate that could open a conversation about relevant roles, without inventing a specific company or job title to address.`;

  return `You are a professional cover-letter writer helping a job candidate. ${variantInstructions}

${HUMANIZER_GUIDANCE_BY_LOCALE[locale]}

CRITICAL constraint: every name, company, title, number, date, or achievement you mention must come directly from the candidate's resume data below. Never invent, estimate, or embellish a fact to sound more impressive. If the job description asks for something the resume doesn't show, you may write around that gap in general terms, but never fabricate specific evidence for it.

Write 3-4 paragraphs, roughly 250-400 words total: an opening establishing interest and fit, one or two body paragraphs connecting specific resume experience to what the role needs, and a closing. Use a standard greeting and sign-off appropriate for a formal cover letter in the target language (using the candidate's own name from the resume as the signature) — these are letter conventions, not the AI tells described above.

## Candidate resume (parsed)

${JSON.stringify(resume, null, 2)}
${
  jobDescriptionText
    ? `
## Job description

${jobDescriptionText}`
    : ""
}

${buildOutputLanguageInstruction(locale)}`;
}

// Copywriter Node (v2). Not part of the compiled StateGraph — a cover letter
// isn't consumed by recommendNode, so this is invoked standalone from its
// own route, the same way matchDiffNode is for the compare-resume flow.
export async function copywriterNode(input: {
  parsedResume: ParsedResume;
  jobDescriptionText: string | null;
  locale: Locale;
}): Promise<{ coverLetter: CoverLetterResult } | { errors: string[] }> {
  try {
    const model = getChatModel().withStructuredOutput(CopywriterLlmOutputSchema);
    const { letterText } = await model.invoke(
      buildCopywriterPrompt(input.parsedResume, input.jobDescriptionText, input.locale),
    );
    const coverLetter = CoverLetterResultSchema.parse({
      variant: input.jobDescriptionText ? "targeted" : "general",
      letterText,
    });
    return { coverLetter };
  } catch (err) {
    return { errors: [`copywriter: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
