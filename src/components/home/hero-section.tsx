import Link from "next/link";
import { PackageCheck, ShieldCheck, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import { TRUST_FEATURES } from "@/lib/constants";
import type { FavoriteSlot, Jersey } from "@/lib/types";

const TRUST_ICONS = [ShieldCheck, Sparkles, Tag, PackageCheck];

const FAVORITE_LABELS: Record<Exclude<FavoriteSlot, "None">, string> = {
  Modern: "Modern",
  Retro: "Retro",
  National: "National Team",
  Promotions: "Promotions",
};

function buildHeroSlides(jerseys: Jersey[]): HeroSlide[] {
  const favorited = jerseys.filter(
    (j): j is Jersey & { favorite: Exclude<FavoriteSlot, "None"> } => j.favorite !== "None"
  );
  if (favorited.length > 0) {
    return favorited.map((jersey) => ({ jersey, label: FAVORITE_LABELS[jersey.favorite] }));
  }
  return jerseys
    .filter((jersey, index, all) => all.findIndex((j) => j.clube === jersey.clube) === index)
    .slice(0, 4)
    .map((jersey) => ({ jersey, label: jersey.era === "Retro" ? "Retro" : "Modern" }));
}

export function HeroSection({ jerseys }: { jerseys: Jersey[] }) {
  const slides = buildHeroSlides(jerseys);

  return (
    <section className="relative overflow-hidden bg-pitch text-pitch-foreground">
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] opacity-[0.06] lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:py-20">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold">
            Official Club &amp; National Team Jerseys
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            More than just a jersey.
          </h1>
          <p className="mt-2 font-heading text-xl tracking-wide text-gold sm:text-2xl">
            It&apos;s a passion in action.
          </p>

          <p className="mt-5 max-w-md text-base text-pitch-foreground/80">
            Premium quality, true embroidery and protected packaging on every order —
            personalize yours with a name and number, from clubs and countries around
            the world.
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
              Explore Collection
            </Button>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-6 sm:flex sm:flex-wrap sm:gap-x-6">
            {TRUST_FEATURES.map((feature, index) => {
              const Icon = TRUST_ICONS[index];
              return (
                <div key={feature.title} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs font-medium text-pitch-foreground/80">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroCarousel slides={slides} />
        </Reveal>
      </div>
    </section>
  );
}
