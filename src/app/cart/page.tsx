import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.cart.metaTitle };
}

export default function CartPage() {
  return <CartView />;
}
