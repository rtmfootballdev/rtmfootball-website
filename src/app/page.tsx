import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { ProductGrid } from "@/components/product/product-grid";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { Reveal } from "@/components/motion/reveal";
import { listJerseys } from "@/lib/data/inventory";
import { BRAND_SLOGAN, DELIVERY_MESSAGE, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import type { FavoriteSlot, Jersey } from "@/lib/types";

const CATEGORY_SHOWCASE: Array<{
  href: string;
  label: string;
  description: string;
  favoriteSlot: FavoriteSlot;
  filter: (jersey: Jersey) => boolean;
}> = [
  {
    href: "/modern",
    label: "Modern",
    description: "Current-season club and national kits.",
    favoriteSlot: "Modern",
    filter: (j) => j.era === "Atual",
  },
  {
    href: "/retro",
    label: "Retro",
    description: "Legendary kits from years past.",
    favoriteSlot: "Retro",
    filter: (j) => j.era === "Retro",
  },
  {
    href: "/national-team",
    label: "National Team",
    description: "Represent your country, home or away.",
    favoriteSlot: "National",
    filter: (j) => j.categoria === "Seleção",
  },
  {
    href: "/promotions",
    label: "Promotions",
    description: "Limited-time prices on selected jerseys.",
    favoriteSlot: "Promotions",
    filter: (j) => j.promocao,
  },
];

const STEPS = [
  {
    icon: Sparkles,
    title: "Browse & personalize",
    description: "Pick your jersey and size, then add a name & number for just +€2.",
  },
  {
    icon: MessageCircle,
    title: "Contact to confirm",
    description: "Send your order on WhatsApp — we confirm availability, usually within 24h.",
  },
  {
    icon: Truck,
    title: "Delivery in 6–18 days",
    description: DELIVERY_MESSAGE,
  },
];

export default async function HomePage() {
  const jerseys = await listJerseys();
  const promotions = jerseys.filter((j) => j.promocao).slice(0, 8);
  const fallbackJersey = jerseys[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pitch text-pitch-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <Reveal className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold">
              Modern · Retro · National Team · Promotions
            </span>
            <h1 className="mt-5 font-heading text-4xl leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
              More than just a jersey,
              <br />
              it&apos;s a <span className="text-gold">passion in action</span>.
            </h1>
            <p className="mt-5 max-w-md text-base text-pitch-foreground/80">
              {BRAND_SLOGAN}. Premium quality jerseys with true embroidery, official
              labels and protected packaging — personalized with your name and number.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90"
                nativeButton={false}
                render={<Link href="/promotions" />}
              >
                Shop Promotions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pitch-foreground/30 bg-transparent text-pitch-foreground hover:bg-white/10"
                nativeButton={false}
                render={<Link href="/modern" />}
              >
                Explore Modern Kits
              </Button>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-pitch-foreground/70 hover:text-gold"
            >
              Follow {INSTAGRAM_HANDLE} on Instagram <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>

          <Reveal delay={0.1} className="grid w-full max-w-sm grid-cols-2 gap-4 lg:w-auto">
            {jerseys.slice(0, 4).map((jersey, index) => (
              <div
                key={jersey.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                style={{ transform: index % 2 === 1 ? "translateY(1.5rem)" : undefined }}
              >
                <JerseyImage
                  clube={jersey.clube}
                  tipo={jersey.tipo}
                  era={jersey.era}
                  photoUrl={jersey.fotos[0]}
                  className="aspect-square w-full"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Category showcase */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">Shop by category</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            From this season&apos;s kits to legendary retro classics and national team pride.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_SHOWCASE.map((category, index) => {
            const representative =
              jerseys.find((j) => j.favorite === category.favoriteSlot) ??
              jerseys.find(category.filter) ??
              fallbackJersey;
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
                    <p className="font-heading text-xl tracking-wide">{category.label}</p>
                    <p className="mt-1 text-xs text-pitch-foreground/80">{category.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                      Shop now <ArrowRight className="h-3.5 w-3.5" />
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
          <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">How ordering works</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            No complicated checkout — just a quick chat to lock in your order.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, index) => (
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
                <h2 className="font-heading text-2xl tracking-wide sm:text-3xl">Current promotions</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Limited-time prices — Contact to Buy before they&apos;re gone.
                </p>
              </div>
              <Button variant="outline" nativeButton={false} render={<Link href="/promotions" />}>
                View all promotions
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
