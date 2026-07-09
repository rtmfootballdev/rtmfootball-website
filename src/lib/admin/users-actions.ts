"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { updateUserPoints } from "@/lib/data/users";

export async function updateUserPointsAction(username: string, points: number): Promise<void> {
  await requireAdmin();
  const safePoints = Number.isFinite(points) ? Math.max(0, Math.round(points)) : 0;
  await updateUserPoints(username, safePoints);
  revalidatePath("/admin/usuarios");
}
