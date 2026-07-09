import { cn } from "@/lib/utils";

/** Placeholder brand mark — swap for the real uploaded logo when available. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9 shrink-0", className)}
      role="img"
      aria-label="RTM Football crest"
    >
      <defs>
        <linearGradient id="rtm-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#123626" />
          <stop offset="100%" stopColor="#0a2318" />
        </linearGradient>
      </defs>
      <path
        d="M32 3 L58 12 V30 C58 46 47 56 32 61 C17 56 6 46 6 30 V12 Z"
        fill="url(#rtm-logo-grad)"
        stroke="#d8a23b"
        strokeWidth="2"
      />
      <path
        d="M32 9 L52 16 V30 C52 42.5 43.5 50.5 32 54.5 C20.5 50.5 12 42.5 12 30 V16 Z"
        fill="none"
        stroke="#d8a23b"
        strokeWidth="1"
        opacity="0.5"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="var(--font-heading), sans-serif"
        fontWeight={700}
        fontSize="20"
        fill="#f3e3c2"
      >
        RTM
      </text>
    </svg>
  );
}
