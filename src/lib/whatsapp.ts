import { WHATSAPP_NUMBER } from "@/lib/constants";
import { formatEUR } from "@/lib/pricing";
import type { CartItem, Jersey, Personalization, Size } from "@/lib/types";

function buildLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function personalizationLine(p: Personalization | null): string {
  if (!p) return "";
  const parts = [p.name && `Name: ${p.name}`, p.number && `Number: ${p.number}`].filter(Boolean);
  return parts.length ? `\n   ${parts.join(" / ")}` : "";
}

export function buildProductWhatsAppLink(params: {
  jersey: Jersey;
  size: Size;
  personalization: Personalization | null;
  unitPrice: number;
  needsConfirmation: boolean;
}): string {
  const { jersey, size, personalization, unitPrice, needsConfirmation } = params;
  const lines = [
    needsConfirmation
      ? "Hi RTM Football! I'd like to confirm availability for:"
      : "Hi RTM Football! I'd like to buy:",
    "",
    `1. ${jersey.clube} ${jersey.ano} (${jersey.tipo}) — Size ${size}${personalizationLine(personalization)}`,
    `   Price: ${formatEUR(unitPrice)}`,
    "",
    `Total: ${formatEUR(unitPrice)}`,
  ];
  return buildLink(lines.join("\n"));
}

export function buildCartWhatsAppLink(
  items: Array<{ item: CartItem; jersey: Jersey | null }>
): string {
  const lines = ["Hi RTM Football! I'd like to buy:", ""];
  let total = 0;
  items.forEach(({ item, jersey }, index) => {
    const clube = jersey?.clube ?? item.snapshot.clube;
    const ano = jersey?.ano ?? item.snapshot.ano;
    const tipo = jersey?.tipo ?? item.snapshot.tipo;
    const price =
      item.snapshot.unitPrice + (item.personalization ? 2 : 0);
    total += price;
    lines.push(
      `${index + 1}. ${clube} ${ano} (${tipo}) — Size ${item.size}${personalizationLine(item.personalization)}`
    );
    lines.push(`   Price: ${formatEUR(price)}`);
    lines.push("");
  });
  lines.push(`Total: ${formatEUR(total)}`);
  return buildLink(lines.join("\n"));
}
