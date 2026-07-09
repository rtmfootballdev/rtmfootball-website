import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/marketing/marquee";
import { HeroJerseyStack } from "@/components/home/hero-jersey-stack";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from "@/lib/constants";
import type { Jersey } from "@/lib/types";

export function HeroSection({ jerseys }: { jerseys: Jersey[] }) {
  const heroJerseys = jerseys
    .filter((jersey, index, all) => all.findIndex((j) => j.clube === jersey.clube) === index)
    .slice(0, 3);
  const clubNames = Array.from(new Set(jerseys.map((j) => j.clube.toUpperCase())));

  return (
    <section className="relative overflow-hidden bg-pitch text-pitch-foreground">
      {/* Decorative center-circle ring */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07] lg:-right-20 lg:top-1/2 lg:-translate-y-1/2"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="300" r="120" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="300" y1="20" x2="300" y2="580" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-24">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold">
            The home of football culture
          </span>

          <h1 className="mt-6 font-heading text-5xl leading-[0.95] tracking-tight uppercase sm:text-6xl lg:text-7xl">
            More than
            <br />
            just a jersey.
          </h1>
          <p className="mt-2 font-heading text-2xl tracking-wide text-gold sm:text-3xl">
            It&apos;s a passion in action.
          </p>

          <p className="mt-5 max-w-md text-base text-pitch-foreground/80">
            Premium quality jerseys with true embroidery, official labels and protected
            packaging — personalized with your name and number, from clubs and countries
            around the world.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:border-gold/50 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
              nativeButton={false}
              render={<Link href="/promotions" />}
            >
              Shop Promotions
            </Button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-pitch-foreground/70 hover:text-gold"
            >
              Follow {INSTAGRAM_HANDLE} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroJerseyStack jerseys={heroJerseys} totalCount={jerseys.length} />
        </Reveal>
      </div>

      <div className="relative border-t border-white/10 bg-black/10 py-4">
        <Marquee items={clubNames} textClassName="text-pitch-foreground/50" />
      </div>
    </section>
  );
}
