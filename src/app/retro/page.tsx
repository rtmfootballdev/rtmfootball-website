import type { Metadata } from "next";
import { CategoryPageHeader } from "@/components/product/category-page-header";
import { CategoryFilters } from "@/components/product/category-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { filterAndSortJerseys, type CatalogSearchParams } from "@/lib/catalog-filters";

export const metadata: Metadata = { title: "Retro Jerseys" };

export default async function RetroPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const jerseys = await listJerseys();
  const filtered = filterAndSortJerseys(
    jerseys.filter((j) => j.era === "Retro"),
    params
  );

  return (
    <div>
      <CategoryPageHeader
        title="Retro"
        description="Legendary kits from years past — classic cuts, iconic eras."
        count={filtered.length}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex justify-end">
          <CategoryFilters basePath="/retro" showEraFilter={false} />
        </div>
        <ProductGrid jerseys={filtered} emptyMessage="No retro jerseys match these filters yet." />
      </div>
    </div>
  );
}
