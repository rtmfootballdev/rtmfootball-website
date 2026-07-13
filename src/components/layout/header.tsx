import Link from "next/link";
import { InstagramGlyph } from "@/components/icons/instagram-glyph";
import { LogoMark } from "./logo-mark";
import { AccountMenu } from "./account-menu";
import { CartButton } from "./cart-button";
import { MobileMenu } from "./mobile-menu";
import { LanguagePicker } from "./language-picker";
import { SearchBar } from "@/components/search/search-bar";
import { BRAND_NAME, BRAND_SLOGAN, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from "@/lib/constants";
import { listJerseys } from "@/lib/data/inventory";
import { getSessionUser } from "@/lib/auth/session";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function Header() {
  const [jerseys, user, { dict }] = await Promise.all([
    listJerseys(),
    getSessionUser(),
    getDictionary(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden bg-pitch text-pitch-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <p>{dict.delivery.message}</p>
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-gold"
            >
              <InstagramGlyph className="h-3.5 w-3.5" /> {INSTAGRAM_HANDLE}
            </a>
            <LanguagePicker variant="dark" />
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-3 lg:h-20 lg:gap-6">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <LogoMark />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg tracking-wide lg:text-xl">
                  {BRAND_NAME.toUpperCase()}
                </span>
                <span className="hidden text-[11px] tracking-wide text-muted-foreground lg:block">
                  {BRAND_SLOGAN}
                </span>
              </span>
            </Link>

            <nav className="ml-2 hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {dict.nav[link.key]}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden max-w-sm flex-1 lg:block">
              <SearchBar jerseys={jerseys} />
            </div>

            <div className="ml-auto flex items-center gap-1 lg:ml-3">
              <AccountMenu user={user} />
              <CartButton />
              <MobileMenu jerseys={jerseys} user={user} />
            </div>
          </div>

          <div className="pb-3 lg:hidden">
            <SearchBar jerseys={jerseys} />
          </div>
        </div>
      </div>
    </header>
  );
}
