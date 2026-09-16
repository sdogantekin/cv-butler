import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // "/#section" rather than a bare "#section": works both from the landing
  // page itself (Next.js Link recognizes the pathname already matches and
  // just scrolls, no reload) and from any other page (e.g. /learning-hub),
  // where it navigates to "/" and then scrolls to the section.
  const NAV_LINKS = [
    { href: "/#features", label: dict.landing.header.navFeatures },
    { href: "/#how-it-works", label: dict.landing.header.navHowItWorks },
    { href: "/#roadmap", label: dict.landing.header.navRoadmap },
    { href: "/#learning-hub", label: dict.landing.header.navLearningHub },
    { href: "/#faq", label: dict.landing.header.navFaq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-base font-bold tracking-tight text-primary-foreground"
        >
          <LogoIcon size={20} />
          CV Butler
        </Link>

        <nav className="flex flex-wrap items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher locale={locale} />
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/signin">{dict.landing.header.logIn}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              {dict.common.openOnGithub}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
