import type { Metadata } from "next";
import { InventoryTable } from "@/components/admin/inventory-table";
import { listJerseys } from "@/lib/data/inventory";

export const metadata: Metadata = { title: "Inventário" };

export default async function AdminInventoryPage() {
  const jerseys = await listJerseys();
  return <InventoryTable jerseys={jerseys} />;
}
