"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { JerseyImage } from "@/components/jersey/jersey-image";
import { basePrice, formatEUR } from "@/lib/pricing";
import type { Jersey } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAX_PREVIEW_RESULTS = 5;

export function SearchBar({ jerseys, className }: { jerseys: Jersey[]; className?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const searchIndex = useMemo(
    () =>
      jerseys.map((jersey) => ({
        jersey,
        haystack: `${jersey.clube} ${jersey.ano} ${jersey.tipo} ${jersey.era} ${jersey.categoria}`,
      })),
    [jerseys]
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["haystack"],
        threshold: 0.34,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [searchIndex]
  );

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return fuse.search(trimmed).map((r) => r.item.jersey);
  }, [fuse, query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToFullResults() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToFullResults();
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search by club, year, home or away…"
          aria-label="Search jerseys"
          className="h-11 rounded-full border-border bg-background pl-9 pr-9 shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No jerseys found for “{query}”.
            </p>
          ) : (
            <>
              <ul className="max-h-[70vh] overflow-y-auto py-2">
                {results.slice(0, MAX_PREVIEW_RESULTS).map((jersey) => (
                  <li key={jersey.id}>
                    <Link
                      href={`/product/${jersey.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-secondary"
                    >
                      <JerseyImage
                        clube={jersey.clube}
                        tipo={jersey.tipo}
                        era={jersey.era}
                        photoUrl={jersey.fotos[0]}
                        className="h-12 w-12 shrink-0 rounded-md"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {jersey.clube} {jersey.ano}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {jersey.tipo} · {jersey.era}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-primary">
                        {formatEUR(basePrice(jersey))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > MAX_PREVIEW_RESULTS && (
                <button
                  type="button"
                  onClick={goToFullResults}
                  className="w-full border-t border-border bg-secondary/60 px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary"
                >
                  View all {results.length} results
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
