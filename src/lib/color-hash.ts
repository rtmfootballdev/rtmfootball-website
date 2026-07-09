const PALETTES: Array<{ from: string; to: string; ink: string }> = [
  { from: "#0e3b2c", to: "#1d6f4f", ink: "#f7f4ea" },
  { from: "#7a1f2b", to: "#c23b4a", ink: "#f7f4ea" },
  { from: "#1b2a5e", to: "#3a56b0", ink: "#f7f4ea" },
  { from: "#5c1a1a", to: "#a83232", ink: "#f7f4ea" },
  { from: "#0b3d4b", to: "#137a8f", ink: "#f7f4ea" },
  { from: "#2c2c2c", to: "#585858", ink: "#f7f4ea" },
  { from: "#5a1330", to: "#a02458", ink: "#f7f4ea" },
  { from: "#1f3d0e", to: "#4c7a24", ink: "#f7f4ea" },
  { from: "#3b2410", to: "#8a5a22", ink: "#f7f4ea" },
  { from: "#241a4d", to: "#4d38a0", ink: "#f7f4ea" },
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function paletteFor(seed: string) {
  const index = hashString(seed) % PALETTES.length;
  return PALETTES[index];
}

export function initialsFor(clube: string): string {
  const words = clube.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
