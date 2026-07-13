import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { HeroBackgroundCarousel } from "@/components/home/hero-background-carousel";

export function HeroSection() {
  return (
    <section className="relative flex h-[85vh] max-h-[880px] min-h-[560px] items-end overflow-hidden text-white sm:items-center">
      <HeroBackgroundCarousel />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 text-center sm:px-6 sm:pb-0">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            RTM Football
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-balance drop-shadow-lg sm:text-5xl lg:text-6xl">
            More than just a jersey.
          </h1>
          <p className="mt-2 font-heading text-xl text-gold drop-shadow sm:text-2xl">
            It&apos;s a passion in action.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
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
