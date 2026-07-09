import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";
import type { FavoriteSlot, Jersey } from "@/lib/types";

const FAVORITE_LABELS: Record<Exclude<FavoriteSlot, "None">, string> = {
  Modern: "Modern",
  Retro: "Retro",
  National: "National Team",
  Promotions: "Promotions",
};

function buildHeroSlides(jerseys: Jersey[]): HeroSlide[] {
  const favorited = jerseys.filter((j): j is Jersey & { favorite: Exclude<FavoriteSlot, "None"> } => j.favorite !== "None");
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
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="140" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-18 lg:py-24">
        <Reveal className="w-full">
          <span className="text-xs font-medium tracking-[0.25em] text-gold/80 uppercase">
            Featured Jerseys
          </span>

          <div className="mt-6">
            <HeroCarousel slides={slides} />
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
        </Reveal>
      </div>
    </section>
  );
}
