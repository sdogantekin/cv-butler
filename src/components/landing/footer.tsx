import { Separator } from "@/components/ui/separator";
import { LogoIcon } from "@/components/logo-icon";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Footer({ dict }: { dict: Dictionary["landing"] }) {
  const PRODUCT_LINKS = [
    { href: "#features", label: dict.header.navFeatures },
    { href: "#how-it-works", label: dict.header.navHowItWorks },
    { href: "#roadmap", label: dict.header.navRoadmap },
  ];

  const RESOURCE_LINKS = [
    { href: "#learning-hub", label: dict.header.navLearningHub },
    { href: "#faq", label: dict.header.navFaq },
  ];

  return (
    <footer className="mt-auto border-t px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
            <LogoIcon size={17} />
            CV Butler
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dict.footer.tagline}</p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            {dict.footer.productHeading}
          </h4>
          <div className="flex flex-col gap-2 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            {dict.footer.resourcesHeading}
          </h4>
          <div className="flex flex-col gap-2 text-sm">
            {RESOURCE_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            {dict.footer.communityHeading}
          </h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://github.com/sdogantekin/cv-butler/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.footer.issuesDiscussions}
            </a>
            <a
              href="https://github.com/sdogantekin/cv-butler/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.footer.mitLicense}
            </a>
          </div>
        </div>
      </div>
      <Separator className="mx-auto mt-8 max-w-6xl" />
      <p className="mx-auto mt-6 max-w-6xl text-sm text-muted-foreground">{dict.footer.copyright}</p>
    </footer>
  );
}
