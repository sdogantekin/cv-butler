export function LogoIcon({ size = 20 }: { size?: number }) {
  // Rendered via a currentColor mask (rather than <img>) so the icon keeps
  // inheriting text color automatically, same as the inline SVG it replaced —
  // needed since it sits on both light and dark/primary-colored backgrounds.
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: "url(/logo-icon.png)",
        maskImage: "url(/logo-icon.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
