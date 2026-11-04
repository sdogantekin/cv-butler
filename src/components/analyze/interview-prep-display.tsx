import { Badge } from "@/components/ui/badge";
import type { InterviewPrepResult } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-base font-bold">{children}</h2>;
}

export function InterviewPrepDisplay({
  plan,
  dict,
}: {
  plan: InterviewPrepResult;
  dict: Dictionary["dashboard"]["interviewPrep"];
}) {
  return (
    <div className="flex flex-col gap-9">
      {plan.interviewer && (
        <section>
          <SectionHeading>{dict.aboutInterviewer}</SectionHeading>
          <div className="rounded-xl border bg-muted/40 p-5 text-sm leading-relaxed">
            <p>{plan.interviewer.summary}</p>
            {plan.interviewer.approachTips.length > 0 && (
              <>
                <div className="mt-4 mb-1.5 text-xs font-semibold text-muted-foreground">
                  {dict.approachInterviewer}
                </div>
                <ul className="list-disc space-y-1 pl-5">
                  {plan.interviewer.approachTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {plan.researchUsed.interviewer && (
            <p className="mt-2 text-xs text-muted-foreground">{dict.researchInterviewer}</p>
          )}
        </section>
      )}

      {plan.reviewBeforeInterview.length > 0 && (
        <section>
          <SectionHeading>{dict.reviewBefore}</SectionHeading>
          <ol className="flex flex-col gap-2.5">
            {plan.reviewBeforeInterview.map((item, i) => (
              <li key={item} className="flex gap-3 rounded-xl border px-4 py-3 text-sm">
                <span className="font-bold text-muted-foreground">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          {plan.researchUsed.company && (
            <p className="mt-2 text-xs text-muted-foreground">{dict.researchCompany}</p>
          )}
        </section>
      )}

      <section>
        <SectionHeading>{dict.likelyQuestions}</SectionHeading>
        <div className="flex flex-col gap-3">
          {plan.likelyQuestions.map((q) => (
            <div key={q.question} className="rounded-xl border p-5">
              <div className="mb-1.5 flex flex-wrap items-start justify-between gap-2">
                <div className="font-semibold">{q.question}</div>
                <Badge variant="outline">{dict.categories[q.category]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{q.answerGuidance}</p>
            </div>
          ))}
        </div>
      </section>

      {plan.questionsToAsk.length > 0 && (
        <section>
          <SectionHeading>{dict.questionsToAsk}</SectionHeading>
          <div className="flex flex-col gap-3">
            {plan.questionsToAsk.map((q) => (
              <div key={q.question} className="rounded-xl border p-5">
                <div className="mb-1.5 font-semibold">{q.question}</div>
                <p className="text-sm text-muted-foreground">{q.why}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {plan.tips.length > 0 && (
        <section>
          <SectionHeading>{dict.tips}</SectionHeading>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            {plan.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
