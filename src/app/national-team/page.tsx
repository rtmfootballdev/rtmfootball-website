import type { Metadata } from "next";
import { CategoryPageHeader } from "@/components/product/category-page-header";
import { CategoryFilters } from "@/components/product/category-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { filterAndSortJerseys, type CatalogSearchParams } from "@/lib/catalog-filters";

export const metadata: Metadata = { title: "National Team Jerseys" };

export default async function NationalTeamPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const jerseys = await listJerseys();
  const filtered = filterAndSortJerseys(
    jerseys.filter((j) => j.categoria === "Seleção"),
    params
  );

  return (
    <div>
      <CategoryPageHeader
        title="National Team"
        description="Represent your country, home or away, modern or retro."
        count={filtered.length}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex justify-end">
          <CategoryFilters basePath="/national-team" showEraFilter />
        </div>
        <ProductGrid
          jerseys={filtered}
          emptyMessage="No national team jerseys match these filters yet."
        />
      </div>
    </div>
  );
}
