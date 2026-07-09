import { basePrice } from "@/lib/pricing";
import type { Jersey } from "@/lib/types";

export type SortOption = "featured" | "price-asc" | "price-desc";

export interface CatalogSearchParams {
  tipo?: string;
  era?: string;
  sort?: string;
}

export function filterAndSortJerseys(
  jerseys: Jersey[],
  params: CatalogSearchParams
): Jersey[] {
  let result = jerseys;

  if (params.tipo === "Home" || params.tipo === "Away") {
    result = result.filter((j) => j.tipo === params.tipo);
  }
  if (params.era === "Atual" || params.era === "Retro") {
    result = result.filter((j) => j.era === params.era);
  }

  const sort = (params.sort as SortOption) ?? "featured";
  if (sort === "price-asc") {
    result = [...result].sort((a, b) => basePrice(a) - basePrice(b));
  } else if (sort === "price-desc") {
    result = [...result].sort((a, b) => basePrice(b) - basePrice(a));
  }

  return result;
}
