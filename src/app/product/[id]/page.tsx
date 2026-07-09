import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductConfigurator } from "@/components/product/product-configurator";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { getJerseyById, listJerseys } from "@/lib/data/inventory";
import { DELIVERY_MESSAGE } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const jersey = await getJerseyById(id);
  if (!jersey) return { title: "Jersey not found" };
  return {
    title: `${jersey.clube} ${jersey.ano} ${jersey.tipo} Jersey`,
    description: `${jersey.clube} ${jersey.ano} ${jersey.tipo} jersey — ${jersey.era === "Retro" ? "retro classic" : "current season"}. Personalize with a name and number.`,
  };
}

export async function generateStaticParams() {
  const jerseys = await listJerseys();
  return jerseys.map((jersey) => ({ id: jersey.id }));
}

const CATEGORY_LINKS: Record<string, { href: string; label: string }> = {
  Atual: { href: "/modern", label: "Modern" },
  Retro: { href: "/retro", label: "Retro" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jersey = await getJerseyById(id);
  if (!jersey) notFound();

  const categoryLink = CATEGORY_LINKS[jersey.era];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {categoryLink && (
          <>
            {" / "}
            <Link href={categoryLink.href} className="hover:text-foreground">
              {categoryLink.label}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-foreground">
          {jersey.clube} {jersey.ano}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery
          clube={jersey.clube}
          tipo={jersey.tipo}
          era={jersey.era}
          fotos={jersey.fotos}
        />
        <ProductConfigurator jersey={jersey} />
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
        <TrustBadges />
        <p className="mt-6 border-t border-border pt-6 text-sm text-muted-foreground">
          {DELIVERY_MESSAGE}
        </p>
      </div>
    </div>
  );
}
