import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
        <Link
          href="/admin/inventario"
          className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-secondary"
        >
          Inventário
        </Link>
        <Link
          href="/admin/usuarios"
          className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-secondary"
        >
          Usuários
        </Link>
      </div>
      {children}
    </div>
  );
}
