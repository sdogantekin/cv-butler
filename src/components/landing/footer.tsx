import { Separator } from "@/components/ui/separator";
import { LogoIcon } from "@/components/landing/logo-icon";

const PRODUCT_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#roadmap", label: "Roadmap" },
];

const RESOURCE_LINKS = [
  { href: "#learning-hub", label: "Learning Hub" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
            <LogoIcon size={17} />
            CV Butler
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Open-source AI career assistant. MIT licensed.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">Product</h4>
          <div className="flex flex-col gap-2 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">Resources</h4>
          <div className="flex flex-col gap-2 text-sm">
            {RESOURCE_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold tracking-wide text-muted-foreground uppercase">Community</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://github.com/sdogantekin/cv-butler/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Issues &amp; discussions
            </a>
            <a
              href="https://github.com/sdogantekin/cv-butler/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>
      <Separator className="mx-auto mt-8 max-w-6xl" />
      <p className="mx-auto mt-6 max-w-6xl text-sm text-muted-foreground">
        © 2026 CV Butler · Open source under the MIT license · Independent project, not affiliated
        with any commercial career platform.
      </p>
    </footer>
  );
}
