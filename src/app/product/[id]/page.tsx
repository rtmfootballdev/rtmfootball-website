import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductConfigurator } from "@/components/product/product-configurator";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { getJerseyById, listJerseys } from "@/lib/data/inventory";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { tipoLabel } from "@/lib/i18n/labels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [jersey, { locale, dict }] = await Promise.all([getJerseyById(id), getDictionary()]);
  if (!jersey) return { title: dict.productPage.notFoundMetaTitle };
  const tipo = tipoLabel(jersey.tipo, locale);
  const eraPhrase =
    jersey.era === "Retro" ? dict.productPage.eraRetroPhrase : dict.productPage.eraCurrentPhrase;
  return {
    title: dict.productPage.metaTitle(jersey.clube, jersey.ano, tipo),
    description: dict.productPage.metaDescription(jersey.clube, jersey.ano, tipo, eraPhrase),
  };
}

export async function generateStaticParams() {
  const jerseys = await listJerseys();
  return jerseys.map((jersey) => ({ id: jersey.id }));
}

const CATEGORY_LINKS: Record<string, { href: string; key: "modern" | "retro" }> = {
  Atual: { href: "/modern", key: "modern" },
  Retro: { href: "/retro", key: "retro" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [jersey, { dict }] = await Promise.all([getJerseyById(id), getDictionary()]);
  if (!jersey) notFound();

  const categoryLink = CATEGORY_LINKS[jersey.era];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          {dict.productPage.homeBreadcrumb}
        </Link>
        {categoryLink && (
          <>
            {" / "}
            <Link href={categoryLink.href} className="hover:text-foreground">
              {dict.nav[categoryLink.key]}
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
          {dict.delivery.message}
        </p>
      </div>
    </div>
  );
}
