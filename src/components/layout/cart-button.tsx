"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart/store";
import { useLocale } from "@/lib/i18n/locale-provider";

export function CartButton() {
  const { dict } = useLocale();
  const count = useCartStore((s) => s.items.length);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      nativeButton={false}
      render={<Link href="/cart" aria-label={dict.header.viewCartAriaLabel} />}
    >
      <ShoppingBag />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
          {count}
        </span>
      )}
    </Button>
  );
}
