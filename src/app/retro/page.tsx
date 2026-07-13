import type { Metadata } from "next";
import { CategoryPageHeader } from "@/components/product/category-page-header";
import { CategoryFilters } from "@/components/product/category-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { listJerseys } from "@/lib/data/inventory";
import { filterAndSortJerseys, type CatalogSearchParams } from "@/lib/catalog-filters";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.categoryPages.retro.metaTitle };
}

export default async function RetroPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const params = await searchParams;
  const [jerseys, { dict }] = await Promise.all([listJerseys(), getDictionary()]);
  const filtered = filterAndSortJerseys(
    jerseys.filter((j) => j.era === "Retro"),
    params
  );

  return (
    <div>
      <CategoryPageHeader
        title={dict.nav.retro}
        description={dict.categoryPages.retro.description}
        count={filtered.length}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex justify-end">
          <CategoryFilters basePath="/retro" showEraFilter={false} />
        </div>
        <ProductGrid jerseys={filtered} emptyMessage={dict.categoryPages.retro.empty} />
      </div>
    </div>
  );
}
