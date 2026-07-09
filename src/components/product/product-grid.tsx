import { ProductCard } from "./product-card";
import type { Jersey } from "@/lib/types";

export function ProductGrid({
  jerseys,
  emptyMessage,
}: {
  jerseys: Jersey[];
  emptyMessage?: string;
}) {
  if (jerseys.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
        {emptyMessage ?? "No jerseys found."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {jerseys.map((jersey) => (
        <ProductCard key={jersey.id} jersey={jersey} />
      ))}
    </div>
  );
}
