"use client";

import { useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { JerseyArt } from "@/components/jersey/jersey-art";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { Era, Tipo } from "@/lib/types";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 40;

export function ProductGallery({
  clube,
  tipo,
  era,
  fotos,
  className,
}: {
  clube: string;
  tipo: Tipo;
  era: Era;
  fotos: string[];
  className?: string;
}) {
  const { dict } = useLocale();
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = fotos.length;
  const hasPhotos = count > 0;

  function goPrev() {
    setIndex((i) => (i - 1 + count) % count);
  }
  function goNext() {
    setIndex((i) => (i + 1) % count);
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current == null || count < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  }

  return (
    <div className={className}>
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-secondary"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasPhotos ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={dict.gallery.viewFullSizeAriaLabel}
            className="absolute inset-0 cursor-zoom-in"
          >
            <Image
              src={fotos[index]}
              alt={dict.gallery.photoAlt(clube, index + 1, count)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </button>
        ) : (
          <JerseyArt jersey={{ clube, tipo, era }} className="h-full w-full" />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={dict.gallery.previousPhotoAriaLabel}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={dict.gallery.nextPhotoAriaLabel}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow transition-colors hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {fotos.map((foto, i) => (
                <button
                  key={foto}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={dict.gallery.goToPhotoAriaLabel(i + 1)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-gold" : "w-1.5 bg-background/80"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {hasPhotos && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={dict.gallery.expandPhotoAriaLabel}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100"
          >
            <Expand className="h-4 w-4" />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {fotos.map((foto, i) => (
            <button
              key={foto}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={dict.gallery.showPhotoAriaLabel(i + 1)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                i === index ? "border-primary" : "border-transparent hover:border-border"
              )}
            >
              <Image src={foto} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {hasPhotos && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent
            showCloseButton
            className="max-w-[95vw] border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-[90vw]"
          >
            <DialogTitle className="sr-only">
              {dict.gallery.photoAlt(clube, index + 1, count)}
            </DialogTitle>
            <div
              className="relative flex h-[80vh] w-full items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={fotos[index]}
                alt={dict.gallery.photoAlt(clube, index + 1, count)}
                fill
                sizes="95vw"
                className="object-contain"
              />
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={dict.gallery.previousPhotoAriaLabel}
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={dict.gallery.nextPhotoAriaLabel}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium">
                    {index + 1} / {count}
                  </span>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
