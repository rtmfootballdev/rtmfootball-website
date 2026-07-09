"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/instagram-glyph";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/search/search-bar";
import { BRAND_SLOGAN, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from "@/lib/constants";
import { logoutAction } from "@/lib/auth/actions";
import type { Jersey, PublicUser } from "@/lib/types";

const navItemClass =
  "block rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary";
const utilItemClass =
  "block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary";

export function MobileMenu({ jerseys, user }: { jerseys: Jersey[]; user: PublicUser | null }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[85vw] flex-col gap-0 p-0">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle>RTM Football</SheetTitle>
          <p className="text-xs text-muted-foreground">{BRAND_SLOGAN}</p>
        </SheetHeader>

        <div className="p-4">
          <SearchBar jerseys={jerseys} />
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={<Link href={link.href} className={navItemClass} />}
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="flex flex-col gap-1 px-4">
          {user ? (
            <>
              <SheetClose
                nativeButton={false}
                render={<Link href="/account" className={utilItemClass} />}
              >
                My Account · <span className="text-gold">★ {user.points} pts</span>
              </SheetClose>
              {user.isAdmin && (
                <>
                  <SheetClose
                    nativeButton={false}
                    render={<Link href="/admin/inventario" className={utilItemClass} />}
                  >
                    Inventário
                  </SheetClose>
                  <SheetClose
                    nativeButton={false}
                    render={<Link href="/admin/usuarios" className={utilItemClass} />}
                  >
                    Usuários
                  </SheetClose>
                </>
              )}
              <form action={logoutAction}>
                <SheetClose
                  render={
                    <button
                      type="submit"
                      className={`${utilItemClass} text-destructive hover:bg-destructive/10`}
                    />
                  }
                >
                  Log out
                </SheetClose>
              </form>
            </>
          ) : (
            <>
              <SheetClose
                nativeButton={false}
                render={<Link href="/login" className={utilItemClass} />}
              >
                Log in
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={<Link href="/register" className={utilItemClass} />}
              >
                Sign up
              </SheetClose>
            </>
          )}
        </div>

        <div className="mt-auto border-t border-border p-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <InstagramGlyph className="h-4 w-4" /> {INSTAGRAM_HANDLE}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
