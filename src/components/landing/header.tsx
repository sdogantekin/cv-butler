import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { LanguageSwitcher } from "@/components/language-switcher";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#learning-hub", label: "Learning Hub" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-base font-bold tracking-tight text-primary-foreground">
          <LogoIcon size={20} />
          CV Butler
        </div>

        <nav className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">Log in</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
