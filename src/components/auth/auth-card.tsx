import Link from "next/link";
import { LogoMark } from "@/components/layout/logo-mark";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <Link href="/" className="mx-auto flex items-center gap-2.5">
        <LogoMark />
      </Link>
      <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-center font-heading text-2xl tracking-wide">{title}</h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
