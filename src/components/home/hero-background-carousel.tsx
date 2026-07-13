"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const PHOTOS = [
  "/herophotos/Aimar_Foto7_2novembro_new.jpg",
  "/herophotos/Gv6o_A0WYAIi-9o.jpg",
  "/herophotos/balls-13-min.jpg",
  "/herophotos/images.jpg",
];

const SLIDE_DURATION_MS = 6000;

export function HeroBackgroundCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-pitch">
      <AnimatePresence>
        <motion.div
          key={PHOTOS[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION_MS / 1000 + 1.2, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={PHOTOS[index]}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Legibility + brand-color wash, consistent across every photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
      <div className="absolute inset-0 bg-pitch/25" />

      {index >= 0 && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show background photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
