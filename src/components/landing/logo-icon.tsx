export function LogoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <circle cx="12" cy="9" r="2.2" />
      <path d="M8 14.8a4 4 0 0 1 8 0" />
      <path d="M8 17.3h8M8 19.8h6" />
    </svg>
  );
}
