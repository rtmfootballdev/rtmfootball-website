import type { Metadata } from "next";
import { CategoryPageHeader } from "@/components/product/category-page-header";
import { CategoryFilters } from "@/components/product/category-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { filterAndSortJerseys, type CatalogSearchParams } from "@/lib/catalog-filters";

export const metadata: Metadata = { title: "Promotions" };

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const jerseys = await listJerseys();
  const filtered = filterAndSortJerseys(
    jerseys.filter((j) => j.promocao),
    params
  );

  return (
    <div>
      <CategoryPageHeader
        title="Promotions"
        description="Limited-time prices on selected jerseys — Contact to Buy before they're gone."
        count={filtered.length}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex justify-end">
          <CategoryFilters basePath="/promotions" showEraFilter />
        </div>
        <ProductGrid jerseys={filtered} emptyMessage="No promotions are running right now — check back soon." />
      </div>
    </div>
  );
}
