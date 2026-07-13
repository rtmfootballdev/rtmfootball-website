import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function NotFound() {
  const { dict } = await getDictionary();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-heading text-6xl tracking-wide text-gold">404</p>
      <h1 className="mt-3 font-heading text-2xl tracking-wide">{dict.notFound.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{dict.notFound.description}</p>
      <Button className="mt-8" nativeButton={false} render={<Link href="/" />}>
        {dict.notFound.backHome}
      </Button>
    </div>
  );
}
