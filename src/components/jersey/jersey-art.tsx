import { initialsFor, paletteFor } from "@/lib/color-hash";
import type { Jersey } from "@/lib/types";
import { cn } from "@/lib/utils";

type JerseyArtInput = Pick<Jersey, "clube" | "tipo" | "era">;

/**
 * Generated placeholder jersey artwork, used until the admin uploads a real
 * product photo for a given item. Deterministic per club+type so the same
 * jersey always renders with the same colors.
 */
export function JerseyArt({ jersey, className }: { jersey: JerseyArtInput; className?: string }) {
  const seed = `${jersey.clube}-${jersey.tipo}`;
  const palette = paletteFor(seed);
  const initials = initialsFor(jersey.clube).slice(0, 2);
  const gradientId = `jersey-grad-${seed.replace(/[^a-zA-Z0-9]/g, "")}`;
  const isAway = jersey.tipo === "Away";
  const isRetro = jersey.era === "Retro";

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${jersey.clube} jersey`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isAway ? palette.to : palette.from} />
          <stop offset="100%" stopColor={isAway ? palette.from : palette.to} />
        </linearGradient>
      </defs>
      <path
        d="M140 58 L260 58 L260 82 L332 116 L310 192 L266 164 L266 336 Q266 352 250 352 L150 352 Q134 352 134 336 L134 164 L90 192 L68 116 L140 82 Z"
        fill={`url(#${gradientId})`}
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="2"
      />
      <path
        d="M168 58 Q200 96 232 58"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {isRetro && (
        <g opacity="0.16" stroke="#fff" strokeWidth="9">
          <line x1="152" y1="128" x2="152" y2="346" />
          <line x1="248" y1="128" x2="248" y2="346" />
        </g>
      )}
      <text
        x="200"
        y="270"
        textAnchor="middle"
        className="font-heading"
        fontWeight={700}
        fontSize="88"
        fill={palette.ink}
        opacity={0.92}
      >
        {initials}
      </text>
    </svg>
  );
}
