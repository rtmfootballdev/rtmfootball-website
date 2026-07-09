import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import { TRUST_FEATURES } from "@/lib/constants";
import type { FavoriteSlot, Jersey } from "@/lib/types";

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
      {/* One shared atmosphere behind the whole scene, not per-column decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,var(--gold)_0%,transparent_70%)] opacity-[0.07] blur-3xl" />
      </div>
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:py-24">
        <Reveal className="max-w-lg">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            Official Club &amp; National Team Jerseys
          </p>

          <h1 className="mt-5 font-heading text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            More than just a jersey.
          </h1>
          <p className="mt-1 font-heading text-xl text-gold sm:text-2xl">
            It&apos;s a passion in action.
          </p>

          <p className="mt-5 max-w-md text-base text-pitch-foreground/75">
            Premium quality, true embroidery and protected packaging on every order —
            personalized with your name and number, from clubs and countries around
            the world.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
              nativeButton={false}
              render={<Link href="/promotions" />}
            >
              Shop Promotions
            </Button>
            <Link
              href="/modern"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-pitch-foreground/80 transition-colors hover:text-white"
            >
              Explore the collection <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p className="mt-10 text-xs text-pitch-foreground/50">
            {TRUST_FEATURES.map((f) => f.title).join("   ·   ")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroCarousel slides={slides} />
        </Reveal>
      </div>
    </section>
  );
}
