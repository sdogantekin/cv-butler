"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-base font-bold tracking-tight text-primary-foreground"
        >
          <LogoIcon size={20} />
          CV Butler
        </Link>

        {/* Below lg, this row (plus the language/login/GitHub row) is
            replaced by the hamburger-triggered panel: keeps the sticky
            header a small, constant height at every viewport width, so
            anchor-scroll offsets (scroll-mt-*) stay accurate — a header
            that wraps into multiple rows on narrow screens would otherwise
            grow well past any fixed offset. */}
        <nav className="hidden flex-wrap items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Button asChild size="sm">
            <Link href="/auth/signin">{dict.landing.header.logIn}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              {dict.common.openOnGithub}
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-md p-1.5 hover:bg-muted lg:hidden"
        >
          {mobileMenuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-md px-2.5 py-2 text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t pt-4">
            <LanguageSwitcher locale={locale} />
            <Button asChild size="sm">
              <Link href="/auth/signin" onClick={closeMobileMenu}>
                {dict.landing.header.logIn}
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://github.com/sdogantekin/cv-butler"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                {dict.common.openOnGithub}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
