import type { Locale } from "./config";
import type { Categoria, Disponibilidade, Era, FavoriteSlot, Tipo } from "@/lib/types";

/**
 * Displayed labels for fixed data-model values (Tipo/Era/Categoria/
 * Disponibilidade/FavoriteSlot). The underlying stored values never change —
 * only how they're shown to the customer, per locale.
 */
export function tipoLabel(tipo: Tipo, locale: Locale): string {
  if (locale === "pt") return tipo === "Home" ? "Casa" : "Fora";
  return tipo;
}

export function eraLabel(era: Era, locale: Locale): string {
  if (locale === "pt") return era === "Retro" ? "Retro" : "Atual";
  return era === "Retro" ? "Retro" : "Modern";
}

export function categoriaLabel(categoria: Categoria, locale: Locale): string {
  if (locale === "pt") return categoria;
  return categoria === "Clube" ? "Club" : "National Team";
}

export function disponibilidadeLabel(disponibilidade: Disponibilidade, locale: Locale): string {
  if (locale === "pt") return disponibilidade;
  return disponibilidade === "Confirmado" ? "Confirmed" : "Pending Confirmation";
}

export function favoriteSlotLabel(slot: FavoriteSlot, locale: Locale): string {
  if (locale === "en") return slot === "National" ? "National Team" : slot;
  const map: Record<FavoriteSlot, string> = {
    None: "Nenhum",
    Modern: "Modern",
    Retro: "Retro",
    National: "Seleção",
    Promotions: "Promoções",
  };
  return map[slot];
}
