"use client";

import Link from "next/link";
import { LogOut, Settings2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/auth/actions";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { PublicUser } from "@/lib/types";

export function AccountMenu({ user }: { user: PublicUser | null }) {
  const { dict } = useLocale();

  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
          {dict.auth.login}
        </Button>
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          nativeButton={false}
          render={<Link href="/register" />}
        >
          {dict.auth.signup}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-xs font-medium">{user.username}</span>
              <span className="text-[11px] font-semibold text-gold">
                ★ {user.points} {dict.account.pts}
              </span>
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{dict.account.signedInAs(user.username)}</DropdownMenuLabel>
          <p className="px-1.5 pb-1.5 text-xs text-muted-foreground">
            {dict.account.pointsAccumulated(user.points)}
          </p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/account" />}>
            <User /> {dict.account.myAccount}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{dict.account.adminHeading}</DropdownMenuLabel>
              <DropdownMenuItem render={<Link href="/admin/inventario" />}>
                <Settings2 /> Inventário
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/admin/usuarios" />}>
                <Settings2 /> Usuários
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form action={logoutAction}>
            <DropdownMenuItem
              variant="destructive"
              nativeButton
              render={<button type="submit" className="w-full" />}
            >
              <LogOut /> {dict.auth.logout}
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
