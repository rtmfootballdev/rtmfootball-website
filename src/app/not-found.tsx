import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-heading text-6xl tracking-wide text-gold">404</p>
      <h1 className="mt-3 font-heading text-2xl tracking-wide">Offside — page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button className="mt-8" nativeButton={false} render={<Link href="/" />}>
        Back to home
      </Button>
    </div>
  );
}
