"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { basePrice, formatEUR, hasDiscount } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Jersey } from "@/lib/types";

export interface HeroSlide {
  jersey: Jersey;
  label: string;
}

const AUTO_ADVANCE_MS = 5000;
const SWIPE_THRESHOLD = 40;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;
  const { jersey, label } = slides[index];
  const price = basePrice(jersey);
  const discounted = hasDiscount(jersey);
  const href = `/product/${jersey.id}`;

  function goPrev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function goNext() {
    setIndex((i) => (i + 1) % count);
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    didSwipe.current = false;
  }
  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current == null || count < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      didSwipe.current = true;
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  }

  function stopIfSwiped(e: React.MouseEvent) {
    if (didSwipe.current) {
      e.preventDefault();
      didSwipe.current = false;
    }
  }

  return (
    <div
      className="relative mx-auto w-full max-w-md pb-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden className="absolute inset-6 -z-10 rounded-full bg-gold/10 blur-3xl" />

      <div
        className="group relative aspect-square"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={jersey.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {discounted && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground shadow">
                Promotion
              </span>
            )}
            <Link
              href={href}
              className="block h-full w-full overflow-hidden rounded-[2.5rem] drop-shadow-2xl"
              onClick={stopIfSwiped}
            >
              <JerseyImage
                clube={jersey.clube}
                tipo={jersey.tipo}
                era={jersey.era}
                photoUrl={jersey.fotos[0]}
                priority={index === 0}
                sizes="(max-width: 640px) 384px, 420px"
                className="h-full w-full"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous jersey"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground opacity-100 shadow transition-opacity hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next jersey"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground opacity-100 shadow transition-opacity hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Floating price tag — overlaps the image edge instead of stacking a separate panel */}
      <Link
        href={href}
        onClick={stopIfSwiped}
        className="absolute inset-x-6 -bottom-2 flex items-center justify-between gap-3 rounded-2xl bg-pitch-light/95 px-5 py-3.5 shadow-xl ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-pitch-light"
      >
        <span className="min-w-0">
          <span className="block truncate font-heading text-sm tracking-wide text-white">
            {jersey.clube} {jersey.ano}
          </span>
          <span className="block text-[11px] text-pitch-foreground/60">
            {jersey.tipo} · {label}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {discounted && (
            <span className="text-[11px] text-pitch-foreground/50 line-through">
              {formatEUR(jersey.preco)}
            </span>
          )}
          <span className="font-heading text-base text-gold">{formatEUR(price)}</span>
          <ArrowRight className="h-3.5 w-3.5 text-gold" />
        </span>
      </Link>

      {count > 1 && (
        <div className="absolute inset-x-0 -bottom-10 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.jersey.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
