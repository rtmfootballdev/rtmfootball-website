"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  textClassName,
}: {
  items: string[];
  className?: string;
  textClassName?: string;
}) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: Math.max(items.length * 2.5, 12), repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex shrink-0 items-center gap-8 pr-8 font-heading text-lg tracking-wide whitespace-nowrap uppercase",
              textClassName
            )}
          >
            {item}
            <span aria-hidden className="text-gold">
              ●
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
