"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/lib/cart/store";
import { basePrice, formatEUR, hasDiscount, jerseyNeedsConfirmation } from "@/lib/pricing";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import { AVAILABILITY_CONFIRM_MESSAGE, PERSONALIZATION_FEE } from "@/lib/constants";
import { SIZES, type Jersey, type Size } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductConfigurator({ jersey }: { jersey: Jersey }) {
  const [size, setSize] = useState<Size | null>(null);
  const [personalize, setPersonalize] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  const price = basePrice(jersey);
  const total = price + (personalize ? PERSONALIZATION_FEE : 0);
  const discounted = hasDiscount(jersey);

  const needsConfirmation = size ? jerseyNeedsConfirmation(jersey, size) : false;

  const personalization = useMemo(() => {
    if (!personalize) return null;
    const trimmedName = name.trim();
    const trimmedNumber = number.trim();
    if (!trimmedName && !trimmedNumber) return null;
    return { name: trimmedName, number: trimmedNumber };
  }, [personalize, name, number]);

  const whatsappLink = size
    ? buildProductWhatsAppLink({
        jersey,
        size,
        personalization,
        unitPrice: total,
        needsConfirmation,
      })
    : null;

  function handleAddToCart() {
    if (!size) {
      toast.error("Please select a size first.");
      return;
    }
    addItem({
      jerseyId: jersey.id,
      size,
      personalization,
      snapshot: {
        clube: jersey.clube,
        ano: jersey.ano,
        era: jersey.era,
        tipo: jersey.tipo,
        fotoUrl: jersey.fotoUrl,
        unitPrice: price,
      },
    });
    toast.success(`${jersey.clube} ${jersey.ano} added to cart.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {jersey.tipo} · {jersey.categoria} · {jersey.era === "Retro" ? "Retro" : "Modern"}
        </p>
        <h1 className="font-heading text-3xl tracking-wide sm:text-4xl">
          {jersey.clube} {jersey.ano}
        </h1>
        <div className="mt-3 flex items-baseline gap-2">
          {discounted && (
            <span className="text-base text-muted-foreground line-through">
              {formatEUR(jersey.preco)}
            </span>
          )}
          <span className="text-2xl font-semibold text-primary">{formatEUR(price)}</span>
          {discounted && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground">
              Promotion
            </span>
          )}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <p className="text-sm font-medium">Size</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors",
                size === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-secondary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {size
            ? needsConfirmation
              ? AVAILABILITY_CONFIRM_MESSAGE
              : "This size is confirmed in stock."
            : "XXL and any jersey pending confirmation require us to confirm stock first (usually less than 24h)."}
        </p>
      </div>

      {/* Personalization */}
      <div className="rounded-xl border border-border p-4">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="personalize"
            checked={personalize}
            onCheckedChange={(checked) => setPersonalize(checked === true)}
          />
          <Label htmlFor="personalize" className="text-sm font-medium">
            Add name &amp; number (+{formatEUR(PERSONALIZATION_FEE)})
          </Label>
        </div>
        {personalize && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="custom-name" className="text-xs text-muted-foreground">
                Name
              </Label>
              <Input
                id="custom-name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 15))}
                placeholder="e.g. RONALDO"
                className="mt-1 uppercase"
              />
            </div>
            <div>
              <Label htmlFor="custom-number" className="text-xs text-muted-foreground">
                Number
              </Label>
              <Input
                id="custom-number"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                placeholder="e.g. 7"
                inputMode="numeric"
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" variant="outline" className="flex-1 gap-2" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </Button>
        {whatsappLink ? (
          <Button
            size="lg"
            className="flex-1 gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
            nativeButton={false}
            render={<a href={whatsappLink} target="_blank" rel="noreferrer" />}
          >
            <MessageCircle className="h-4 w-4" />
            {needsConfirmation ? "Contact us to Confirm Availability" : "Contact to Buy"}
          </Button>
        ) : (
          <Button size="lg" className="flex-1 gap-2" disabled>
            <MessageCircle className="h-4 w-4" /> Select a size to continue
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Prefer to browse a bit more?{" "}
        <Link href="/cart" className="font-medium text-primary hover:underline">
          View your cart
        </Link>{" "}
        anytime — everything you add is saved for your WhatsApp order.
      </p>
    </div>
  );
}
