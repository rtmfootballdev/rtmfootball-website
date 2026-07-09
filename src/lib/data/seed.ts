import raw from "./seed-jerseys.json";
import type { Jersey, JerseyInput } from "@/lib/types";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawJerseys = raw as unknown as JerseyInput[];

export const SEED_JERSEYS: Jersey[] = rawJerseys.map((jersey, index) => {
  const now = Date.now() - index * 1_000;
  return {
    ...jersey,
    id: slugify(`${jersey.clube}-${jersey.ano}-${jersey.tipo}-${jersey.era}`),
    createdAt: now,
    updatedAt: now,
  };
});

export const ADMIN_USERNAME = "adminRTM";
export const ADMIN_PASSWORD = "RTMq1w2e3!!";
