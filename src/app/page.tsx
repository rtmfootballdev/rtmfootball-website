import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { Reveal } from "@/components/motion/reveal";
import { HeroSection } from "@/components/home/hero-section";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { listJerseys } from "@/lib/data/inventory";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { FavoriteSlot, Jersey } from "@/lib/types";

const CATEGORY_SHOWCASE: Array<{
  href: string;
  key: keyof Dictionary["home"]["categories"];
  favoriteSlot: FavoriteSlot;
  filter: (jersey: Jersey) => boolean;
}> = [
  { href: "/modern", key: "modern", favoriteSlot: "Modern", filter: (j) => j.era === "Atual" },
  { href: "/retro", key: "retro", favoriteSlot: "Retro", filter: (j) => j.era === "Retro" },
  {
    href: "/national-team",
    key: "nationalTeam",
    favoriteSlot: "National",
    filter: (j) => j.categoria === "Seleção",
  },
  {
    href: "/promotions",
    key: "promotions",
    favoriteSlot: "Promotions",
    filter: (j) => j.promocao,
  },
];

export default async function HomePage() {
  const [jerseys, { dict }] = await Promise.all([listJerseys(), getDictionary()]);
  const promotions = jerseys.filter((j) => j.promocao).slice(0, 8);
  const fallbackJersey = jerseys[0];

  const steps = [
    { icon: Sparkles, title: dict.home.steps.browse.title, description: dict.home.steps.browse.description },
    { icon: MessageCircle, title: dict.home.steps.contact.title, description: dict.home.steps.contact.description },
    { icon: Truck, title: dict.home.steps.delivery.title, description: dict.delivery.message },
  ];

  return (
    <div>
      <HeroSection />

      {/* Category showcase */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">
            {dict.home.categoryHeading}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {dict.home.categorySubheading}
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_SHOWCASE.map((category, index) => {
            const representative =
              jerseys.find((j) => j.favorite === category.favoriteSlot) ??
              jerseys.find(category.filter) ??
              fallbackJersey;
            const label = dict.home.categories[category.key];
            return (
              <Reveal key={category.href} delay={index * 0.05}>
                <Link
                  href={category.href}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border"
                >
                  {representative && (
                    <JerseyImage
                      clube={representative.clube}
                      tipo={representative.tipo}
                      era={representative.era}
                      photoUrl={representative.fotos[0]}
                      className="absolute inset-0 h-full w-full [&>svg]:transition-transform [&>svg]:duration-500 group-hover:[&>svg]:scale-110"
                    />
                  )}
                  <div className="relative z-10 bg-gradient-to-t from-pitch/95 via-pitch/50 to-transparent p-5 pt-20 text-pitch-foreground">
                    <p className="font-heading text-xl tracking-wide">{label.label}</p>
                    <p className="mt-1 text-xs text-pitch-foreground/80">{label.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                      {dict.home.shopNow} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Reveal>
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">
            {dict.home.howItWorksHeading}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {dict.home.howItWorksSubheading}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon className="h-5 w-5" />
              </span>
              <p className="font-heading text-lg tracking-wide">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Promotions */}
      {promotions.length > 0 && (
        <section className="bg-secondary/40 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">
                  {dict.home.promotionsHeading}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {dict.home.promotionsSubheading}
                </p>
              </div>
              <Button variant="outline" nativeButton={false} render={<Link href="/promotions" />}>
                {dict.home.viewAllPromotions}
              </Button>
            </Reveal>
            <div className="mt-8">
              <ProductGrid jerseys={promotions} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
