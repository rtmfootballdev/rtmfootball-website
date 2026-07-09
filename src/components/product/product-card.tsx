import Link from "next/link";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { Badge } from "@/components/ui/badge";
import { basePrice, formatEUR, hasDiscount } from "@/lib/pricing";
import type { Jersey } from "@/lib/types";

export function ProductCard({ jersey }: { jersey: Jersey }) {
  const discounted = hasDiscount(jersey);

  return (
    <Link
      href={`/product/${jersey.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative">
        <JerseyImage
          clube={jersey.clube}
          tipo={jersey.tipo}
          era={jersey.era}
          photoUrl={jersey.fotos[0]}
          className="aspect-square w-full [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {jersey.promocao && (
            <Badge className="border-transparent bg-gold text-gold-foreground">Promotion</Badge>
          )}
          {jersey.era === "Retro" && <Badge variant="secondary">Retro</Badge>}
        </div>
        {jersey.disponibilidade !== "Confirmado" && (
          <div className="absolute inset-x-0 bottom-0 bg-pitch/90 px-3 py-1.5 text-center text-[11px] font-medium text-pitch-foreground">
            Confirm availability
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-heading text-base tracking-wide">
          {jersey.clube} {jersey.ano}
        </p>
        <p className="text-xs text-muted-foreground">
          {jersey.tipo} · {jersey.categoria}
        </p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {discounted && (
            <span className="text-sm text-muted-foreground line-through">
              {formatEUR(jersey.preco)}
            </span>
          )}
          <span className="text-lg font-semibold text-primary">
            {formatEUR(basePrice(jersey))}
          </span>
        </div>
      </div>
    </Link>
  );
}
