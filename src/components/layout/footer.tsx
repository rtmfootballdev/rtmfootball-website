import Link from "next/link";
import { InstagramGlyph } from "@/components/icons/instagram-glyph";
import { LogoMark } from "./logo-mark";
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  DELIVERY_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_LINKS,
  TRUST_FEATURES,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-pitch text-pitch-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-heading text-lg tracking-wide">
                {BRAND_NAME.toUpperCase()}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-pitch-foreground/70">{BRAND_SLOGAN}</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-soft"
            >
              <InstagramGlyph className="h-4 w-4" /> {INSTAGRAM_HANDLE}
            </a>
          </div>

          <div>
            <h3 className="font-heading text-sm tracking-wide text-gold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm text-pitch-foreground/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cart" className="transition-colors hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm tracking-wide text-gold">Good to know</h3>
            <ul className="mt-3 space-y-2 text-sm text-pitch-foreground/80">
              {TRUST_FEATURES.map((feature) => (
                <li key={feature.title}>{feature.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm tracking-wide text-gold">Delivery &amp; contact</h3>
            <p className="mt-3 text-sm text-pitch-foreground/80">{DELIVERY_MESSAGE}</p>
            <p className="mt-3 text-sm text-pitch-foreground/80">WhatsApp: {WHATSAPP_DISPLAY}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-pitch-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>Made for supporters, by supporters.</p>
        </div>
      </div>
    </footer>
  );
}
