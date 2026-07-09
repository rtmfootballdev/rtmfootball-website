"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { JerseyImage } from "@/components/jersey/jersey-image";
import type { Jersey } from "@/lib/types";

export function HeroJerseyStack({
  jerseys,
  totalCount,
}: {
  jerseys: Jersey[];
  totalCount: number;
}) {
  const [center, left, right] = jerseys;

  return (
    <div className="relative mx-auto flex h-[300px] w-full max-w-xs items-center justify-center sm:h-[380px] sm:max-w-sm lg:h-[440px] lg:max-w-none">
      <div className="absolute h-full w-full rounded-full bg-[radial-gradient(circle,var(--gold)_0%,transparent_65%)] opacity-25 blur-2xl" />

      {left && (
        <motion.div
          className="absolute hidden h-[220px] w-[220px] -translate-x-16 rotate-[-10deg] sm:block sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px] lg:-translate-x-24"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <JerseyImage
            clube={left.clube}
            tipo={left.tipo}
            era={left.era}
            photoUrl={left.fotos[0]}
            className="h-full w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </motion.div>
      )}

      {right && (
        <motion.div
          className="absolute hidden h-[220px] w-[220px] translate-x-16 rotate-[10deg] sm:block sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px] lg:translate-x-24"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <JerseyImage
            clube={right.clube}
            tipo={right.tipo}
            era={right.era}
            photoUrl={right.fotos[0]}
            className="h-full w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </motion.div>
      )}

      {center && (
        <motion.div
          className="relative z-10 h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <JerseyImage
            clube={center.clube}
            tipo={center.tipo}
            era={center.era}
            photoUrl={center.fotos[0]}
            priority
            className="h-full w-full rounded-2xl border border-white/10 shadow-2xl"
          />
        </motion.div>
      )}

      {totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-pitch-light/90 px-4 py-2 text-xs font-medium whitespace-nowrap text-pitch-foreground shadow-lg backdrop-blur sm:bottom-6 sm:left-auto sm:right-0 sm:translate-x-0"
        >
          <Star className="h-3.5 w-3.5 shrink-0 text-gold" fill="currentColor" />
          {totalCount}+ jerseys in the collection
        </motion.div>
      )}
    </div>
  );
}
