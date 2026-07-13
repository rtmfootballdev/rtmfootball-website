"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LoginForm() {
  const { dict } = useLocale();
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="username">{dict.auth.username}</Label>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          required
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="password">{dict.auth.password}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5"
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" size="lg" disabled={pending} className="mt-2">
        {pending ? dict.auth.loggingIn : dict.auth.login}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {dict.auth.noAccount}{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          {dict.auth.signup}
        </Link>
      </p>
    </form>
  );
}
