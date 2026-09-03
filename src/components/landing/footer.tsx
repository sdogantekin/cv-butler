import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto px-6 py-6">
      <Separator className="mb-4" />
      <p className="text-center text-sm text-muted-foreground">
        CV Butler is independent, open-source software — not affiliated with any commercial career
        platform.
      </p>
    </footer>
  );
}
