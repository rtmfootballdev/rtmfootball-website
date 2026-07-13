import { WHATSAPP_NUMBER } from "@/lib/constants";
import { formatEUR } from "@/lib/pricing";
import { tipoLabel } from "@/lib/i18n/labels";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { CartItem, Jersey, Personalization, Size } from "@/lib/types";

function buildLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function personalizationLine(p: Personalization | null, dict: Dictionary): string {
  if (!p) return "";
  const parts = [
    p.name && `${dict.whatsapp.nameLabel} ${p.name}`,
    p.number && `${dict.whatsapp.numberLabel} ${p.number}`,
  ].filter(Boolean);
  return parts.length ? `\n   ${parts.join(" / ")}` : "";
}

export function buildProductWhatsAppLink(params: {
  jersey: Jersey;
  size: Size;
  personalization: Personalization | null;
  unitPrice: number;
  needsConfirmation: boolean;
  locale: Locale;
  dict: Dictionary;
}): string {
  const { jersey, size, personalization, unitPrice, needsConfirmation, locale, dict } = params;
  const lines = [
    needsConfirmation ? dict.whatsapp.confirmIntro : dict.whatsapp.buyIntro,
    "",
    `1. ${jersey.clube} ${jersey.ano} (${tipoLabel(jersey.tipo, locale)}) — ${dict.product.sizeLabel} ${size}${personalizationLine(personalization, dict)}`,
    `   ${dict.whatsapp.priceLabel} ${formatEUR(unitPrice)}`,
    "",
    `${dict.whatsapp.totalLabel} ${formatEUR(unitPrice)}`,
  ];
  return buildLink(lines.join("\n"));
}

export function buildCartWhatsAppLink(
  items: Array<{ item: CartItem; jersey: Jersey | null }>,
  locale: Locale,
  dict: Dictionary
): string {
  const lines = [dict.whatsapp.buyIntro, ""];
  let total = 0;
  items.forEach(({ item, jersey }, index) => {
    const clube = jersey?.clube ?? item.snapshot.clube;
    const ano = jersey?.ano ?? item.snapshot.ano;
    const tipo = jersey?.tipo ?? item.snapshot.tipo;
    const price = item.snapshot.unitPrice + (item.personalization ? 2 : 0);
    total += price;
    lines.push(
      `${index + 1}. ${clube} ${ano} (${tipoLabel(tipo, locale)}) — ${dict.product.sizeLabel} ${item.size}${personalizationLine(item.personalization, dict)}`
    );
    lines.push(`   ${dict.whatsapp.priceLabel} ${formatEUR(price)}`);
    lines.push("");
  });
  lines.push(`${dict.whatsapp.totalLabel} ${formatEUR(total)}`);
  return buildLink(lines.join("\n"));
}
