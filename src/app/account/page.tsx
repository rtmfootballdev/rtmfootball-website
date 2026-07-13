import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.account.metaTitle };
}

export default async function AccountPage() {
  const [user, { dict }] = await Promise.all([getSessionUser(), getDictionary()]);
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
      <p className="text-sm text-muted-foreground">{dict.account.signedInAsLabel}</p>
      <h1 className="mt-1 font-heading text-3xl tracking-wide">{user.username}</h1>

      <div className="mt-8 rounded-2xl bg-pitch p-8 text-pitch-foreground">
        <p className="text-xs uppercase tracking-wide text-pitch-foreground/70">
          {dict.account.yourPoints}
        </p>
        <p className="mt-2 font-heading text-5xl tracking-wide text-gold">★ {user.points}</p>
      </div>

      <form action={logoutAction} className="mt-8">
        <Button type="submit" variant="outline">
          {dict.auth.logout}
        </Button>
      </form>
    </div>
  );
}
