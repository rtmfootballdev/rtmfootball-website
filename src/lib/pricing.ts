import { PERSONALIZATION_FEE } from "@/lib/constants";
import type { CartItem, Jersey, Size } from "@/lib/types";

/** The price actually charged for a jersey, accounting for an active promotion. */
export function basePrice(jersey: Jersey): number {
  if (jersey.promocao && jersey.novoPreco != null) return jersey.novoPreco;
  return jersey.preco;
}

export function hasDiscount(jersey: Jersey): boolean {
  return jersey.promocao && jersey.novoPreco != null && jersey.novoPreco < jersey.preco;
}

export function priceWithPersonalization(jersey: Jersey, personalized: boolean): number {
  return basePrice(jersey) + (personalized ? PERSONALIZATION_FEE : 0);
}

/** XXL always requires manual confirmation, regardless of the catalog's Disponibilidade value. */
export function sizeNeedsConfirmation(size: Size): boolean {
  return size === "XXL";
}

export function jerseyNeedsConfirmation(jersey: Jersey, size: Size): boolean {
  return sizeNeedsConfirmation(size) || jersey.disponibilidade !== "Confirmado";
}

export function cartLineTotal(item: CartItem): number {
  return item.snapshot.unitPrice + (item.personalization ? PERSONALIZATION_FEE : 0);
}

export function formatEUR(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
