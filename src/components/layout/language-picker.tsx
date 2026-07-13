"use client";

import { useTransition } from "react";
import { setLocaleAction } from "@/lib/i18n/actions";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguagePicker({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const { locale, dict } = useLocale();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(() => {
      setLocaleAction(next);
    });
  }

  return (
    <div
      role="group"
      aria-label={dict.languagePicker.ariaLabel}
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-semibold",
        variant === "dark" ? "border-white/25" : "border-border/60",
        className
      )}
    >
      {(["en", "pt"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          disabled={isPending}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-2 py-0.5 uppercase transition-colors",
            locale === code
              ? variant === "dark"
                ? "bg-gold text-gold-foreground"
                : "bg-primary text-primary-foreground"
              : variant === "dark"
                ? "text-pitch-foreground/70 hover:text-pitch-foreground"
                : "text-muted-foreground hover:text-foreground"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
