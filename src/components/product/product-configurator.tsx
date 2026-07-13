"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MessageCircle, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/lib/cart/store";
import { basePrice, formatEUR, hasDiscount, jerseyNeedsConfirmation } from "@/lib/pricing";
import { buildProductWhatsAppLink } from "@/lib/whatsapp";
import { PERSONALIZATION_FEE } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-provider";
import { tipoLabel, categoriaLabel, eraLabel } from "@/lib/i18n/labels";
import { SIZES, type Jersey, type Size } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductConfigurator({ jersey }: { jersey: Jersey }) {
  const { locale, dict } = useLocale();
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
        locale,
        dict,
      })
    : null;

  function handleAddToCart() {
    if (!size) {
      toast.error(dict.product.toastSelectSize);
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
        fotoUrl: jersey.fotos[0] ?? "",
        unitPrice: price,
      },
    });
    toast.success(dict.product.toastAddedToCart(jersey.clube, jersey.ano));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          {tipoLabel(jersey.tipo, locale)} · {categoriaLabel(jersey.categoria, locale)} ·{" "}
          {eraLabel(jersey.era, locale)}
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
              {dict.product.promotionBadge}
            </span>
          )}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <p className="text-sm font-medium">{dict.product.sizeLabel}</p>
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
              ? dict.availability.confirmMessage
              : dict.product.sizeConfirmedInStock
            : dict.product.sizeHintDefault}
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
            {dict.product.personalizeLabel(formatEUR(PERSONALIZATION_FEE))}
          </Label>
        </div>
        {personalize && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="custom-name" className="text-xs text-muted-foreground">
                {dict.product.nameLabel}
              </Label>
              <Input
                id="custom-name"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 15))}
                placeholder={dict.product.namePlaceholder}
                className="mt-1 uppercase"
              />
            </div>
            <div>
              <Label htmlFor="custom-number" className="text-xs text-muted-foreground">
                {dict.product.numberLabel}
              </Label>
              <Input
                id="custom-number"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                placeholder={dict.product.numberPlaceholder}
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
          <ShoppingBag className="h-4 w-4" /> {dict.product.addToCart}
        </Button>
        {whatsappLink ? (
          <Button
            size="lg"
            className="flex-1 gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
            nativeButton={false}
            render={<a href={whatsappLink} target="_blank" rel="noreferrer" />}
          >
            <MessageCircle className="h-4 w-4" />
            {needsConfirmation ? dict.product.contactConfirmAvailability : dict.product.contactToBuy}
          </Button>
        ) : (
          <Button size="lg" className="flex-1 gap-2" disabled>
            <MessageCircle className="h-4 w-4" /> {dict.product.selectSizeToContinue}
          </Button>
        )}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Truck className="h-3.5 w-3.5 shrink-0" /> {dict.delivery.mailFee}
      </p>
      <p className="text-xs text-muted-foreground">
        {dict.product.cartHintPrefix}{" "}
        <Link href="/cart" className="font-medium text-primary hover:underline">
          {dict.product.cartHintLink}
        </Link>{" "}
        {dict.product.cartHintSuffix}
      </p>
    </div>
  );
}
