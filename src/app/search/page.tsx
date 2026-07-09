import type { Metadata } from "next";
import Fuse from "fuse.js";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";

export const metadata: Metadata = { title: "Search results" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const jerseys = await listJerseys();

  let results = jerseys;
  if (query) {
    const index = jerseys.map((jersey) => ({
      jersey,
      haystack: `${jersey.clube} ${jersey.ano} ${jersey.tipo} ${jersey.era} ${jersey.categoria}`,
    }));
    const fuse = new Fuse(index, {
      keys: ["haystack"],
      threshold: 0.34,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
    results = fuse.search(query).map((r) => r.item.jersey);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl tracking-wide">
        {query ? `Search results for “${query}”` : "Search"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {results.length} jersey{results.length === 1 ? "" : "s"} found
      </p>
      <div className="mt-8">
        <ProductGrid
          jerseys={results}
          emptyMessage={
            query
              ? `No jerseys found for “${query}”. Try a different club, year or type.`
              : "Start typing in the search bar above to find a jersey."
          }
        />
      </div>
    </div>
  );
}
