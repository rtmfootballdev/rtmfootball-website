"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { cn } from "@/lib/utils";
import type { Jersey } from "@/lib/types";

export interface HeroSlide {
  jersey: Jersey;
  label: string;
}

const AUTO_ADVANCE_MS = 4500;
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
  const slide = slides[index];

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
      className="mx-auto w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.jersey.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Link
              href={`/product/${slide.jersey.id}`}
              className="block h-full w-full"
              onClick={(e) => {
                if (didSwipe.current) {
                  e.preventDefault();
                  didSwipe.current = false;
                }
              }}
            >
              <JerseyImage
                clube={slide.jersey.clube}
                tipo={slide.jersey.tipo}
                era={slide.jersey.era}
                photoUrl={slide.jersey.fotos[0]}
                priority={index === 0}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 512px"
                className="h-full w-full"
              />
            </Link>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5">
              <p className="font-heading text-lg tracking-wide text-white">
                {slide.jersey.clube} {slide.jersey.ano}
              </p>
              <p className="text-xs font-medium text-gold">{slide.label}</p>
            </div>
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
