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
import type { PublicUser } from "@/lib/types";

export function AccountMenu({ user }: { user: PublicUser | null }) {
  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
          Log in
        </Button>
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          nativeButton={false}
          render={<Link href="/register" />}
        >
          Sign up
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
              <span className="text-[11px] font-semibold text-gold">★ {user.points} pts</span>
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Signed in as {user.username}</DropdownMenuLabel>
          <p className="px-1.5 pb-1.5 text-xs text-muted-foreground">
            ★ {user.points} points accumulated
          </p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/account" />}>
            <User /> My Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
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
              <LogOut /> Log out
            </DropdownMenuItem>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
