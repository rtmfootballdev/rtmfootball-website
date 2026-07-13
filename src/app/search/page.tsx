import type { Metadata } from "next";
import Fuse from "fuse.js";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.search.metaTitle };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const [jerseys, { dict }] = await Promise.all([listJerseys(), getDictionary()]);

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
        {query ? dict.search.resultsFor(query) : dict.search.title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {dict.search.jerseysFound(results.length)}
      </p>
      <div className="mt-8">
        <ProductGrid
          jerseys={results}
          emptyMessage={
            query ? dict.search.noResultsDetailed(query) : dict.search.promptStart
          }
        />
      </div>
    </div>
  );
}
