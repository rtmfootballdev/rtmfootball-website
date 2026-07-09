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

  return (
    <div
      className="mx-auto w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-pitch-light/50 shadow-2xl backdrop-blur">
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
                <span className="absolute left-3 top-3 z-10 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground">
                  Promotion
                </span>
              )}
              <Link
                href={`/product/${jersey.id}`}
                className="block h-full w-full"
                onClick={(e) => {
                  if (didSwipe.current) {
                    e.preventDefault();
                    didSwipe.current = false;
                  }
                }}
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

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-heading text-base tracking-wide text-pitch-foreground">
              {jersey.clube} {jersey.ano}
            </p>
            <p className="text-xs text-pitch-foreground/60">
              {jersey.tipo} · {label}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {discounted && (
              <p className="text-xs text-pitch-foreground/50 line-through">{formatEUR(jersey.preco)}</p>
            )}
            <p className="font-heading text-lg text-gold">{formatEUR(price)}</p>
          </div>
        </div>

        <Link
          href={`/product/${jersey.id}`}
          className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-white/5 py-3 text-sm font-medium text-pitch-foreground transition-colors hover:bg-white/10"
        >
          View Jersey <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {count > 1 && (
        <div className="mt-5 flex justify-center gap-2">
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
