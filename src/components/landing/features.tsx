import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Features({ dict }: { dict: Dictionary["landing"]["features"] }) {
  return (
    <section id="features" className="scroll-mt-20 bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.heading}</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">{dict.subheading}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.items.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
