"use client";

import Link from "next/link";
import { MessageCircle, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { useCartStore } from "@/lib/cart/store";
import { cartLineTotal, formatEUR } from "@/lib/pricing";
import { buildCartWhatsAppLink } from "@/lib/whatsapp";
import { PERSONALIZATION_FEE } from "@/lib/constants";
import { useLocale } from "@/lib/i18n/locale-provider";
import { tipoLabel } from "@/lib/i18n/labels";

export function CartView() {
  const { locale, dict } = useLocale();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const total = items.reduce((sum, item) => sum + cartLineTotal(item), 0);
  const whatsappLink =
    items.length > 0
      ? buildCartWhatsAppLink(
          items.map((item) => ({ item, jersey: null })),
          locale,
          dict
        )
      : null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-heading text-3xl tracking-wide">{dict.cart.emptyTitle}</h1>
        <p className="mt-3 text-muted-foreground">{dict.cart.emptyDescription}</p>
        <Button className="mt-6" nativeButton={false} render={<Link href="/modern" />}>
          {dict.cart.startShopping}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl tracking-wide">{dict.cart.title}</h1>
        <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">
          {dict.cart.clearCart}
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.lineId} className="flex gap-4 rounded-xl border border-border p-4">
              <JerseyImage
                clube={item.snapshot.clube}
                tipo={item.snapshot.tipo}
                era={item.snapshot.era}
                photoUrl={item.snapshot.fotoUrl}
                className="h-24 w-24 shrink-0 rounded-lg"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-base tracking-wide">
                      {item.snapshot.clube} {item.snapshot.ano}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tipoLabel(item.snapshot.tipo, locale)} · {dict.product.sizeLabel}{" "}
                      {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.lineId)}
                    aria-label={dict.cart.removeItemAriaLabel}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {item.personalization && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {dict.cart.nameNumberLine(
                      item.personalization.name,
                      item.personalization.number
                    )}
                  </p>
                )}
                <p className="mt-auto pt-2 text-sm font-semibold text-primary">
                  {formatEUR(cartLineTotal(item))}
                  {item.personalization && (
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      {dict.cart.personalizationIncl(formatEUR(PERSONALIZATION_FEE))}
                    </span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-xl border border-border bg-secondary/40 p-6">
          <h2 className="font-heading text-lg tracking-wide">{dict.cart.orderSummary}</h2>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{dict.cart.itemCount(items.length)}</span>
            <span className="font-semibold">{formatEUR(total)}</span>
          </div>
          {whatsappLink && (
            <Button
              size="lg"
              className="mt-6 w-full gap-2 bg-[#25D366] text-white hover:bg-[#1ebe57]"
              nativeButton={false}
              render={<a href={whatsappLink} target="_blank" rel="noreferrer" />}
            >
              <MessageCircle className="h-4 w-4" /> {dict.product.contactToBuy}
            </Button>
          )}
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5 shrink-0" /> {dict.delivery.mailFee}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{dict.delivery.message}</p>
        </div>
      </div>
    </div>
  );
}
