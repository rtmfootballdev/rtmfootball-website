import Link from "next/link";
import { InstagramGlyph } from "@/components/icons/instagram-glyph";
import { LogoMark } from "./logo-mark";
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_LINKS,
  TRUST_FEATURE_KEYS,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function Footer() {
  const { dict } = await getDictionary();

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
            <h3 className="font-heading text-sm tracking-wide text-gold">
              {dict.footer.shopHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-pitch-foreground/80">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {dict.nav[link.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cart" className="transition-colors hover:text-white">
                  {dict.nav.cart}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm tracking-wide text-gold">
              {dict.footer.goodToKnowHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-pitch-foreground/80">
              {TRUST_FEATURE_KEYS.map((key) => (
                <li key={key}>{dict.trust[key].title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm tracking-wide text-gold">
              {dict.footer.deliveryHeading}
            </h3>
            <p className="mt-3 text-sm text-pitch-foreground/80">{dict.delivery.message}</p>
            <p className="mt-3 text-sm text-pitch-foreground/80">
              {dict.footer.whatsappPrefix}: {WHATSAPP_DISPLAY}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-pitch-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. {dict.footer.rightsReserved}
          </p>
          <p>{dict.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
