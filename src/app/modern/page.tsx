import type { Metadata } from "next";
import { CategoryPageHeader } from "@/components/product/category-page-header";
import { CategoryFilters } from "@/components/product/category-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { filterAndSortJerseys, type CatalogSearchParams } from "@/lib/catalog-filters";

export const metadata: Metadata = { title: "Modern Jerseys" };

export default async function ModernPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const jerseys = await listJerseys();
  const filtered = filterAndSortJerseys(
    jerseys.filter((j) => j.era === "Atual"),
    params
  );

  return (
    <div>
      <CategoryPageHeader
        title="Modern"
        description="Current-season club and national team kits, fresh off the pitch."
        count={filtered.length}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex justify-end">
          <CategoryFilters basePath="/modern" showEraFilter={false} />
        </div>
        <ProductGrid jerseys={filtered} emptyMessage="No modern jerseys match these filters yet." />
      </div>
    </div>
  );
}
