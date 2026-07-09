"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import {
  addJerseyPhoto,
  createJersey,
  deleteJersey,
  removeJerseyPhoto,
  setJerseyFavorite,
  updateJersey,
} from "@/lib/data/inventory";
import type { FavoriteSlot, Jersey, JerseyInput } from "@/lib/types";

function revalidateCatalog() {
  revalidatePath("/", "layout");
}

export async function createJerseyRowAction(): Promise<Jersey> {
  await requireAdmin();
  const jersey = await createJersey({
    clube: "New Club",
    ano: new Date().getFullYear(),
    era: "Atual",
    tipo: "Home",
    categoria: "Clube",
    disponibilidade: "Sujeita a Confirmação",
    promocao: false,
    preco: 0,
    novoPreco: null,
    fotos: [],
    favorite: "None",
  });
  revalidateCatalog();
  return jersey;
}

export async function updateJerseyFieldAction(
  id: string,
  patch: Partial<JerseyInput>
): Promise<void> {
  await requireAdmin();
  await updateJersey(id, patch);
  revalidateCatalog();
}

export async function deleteJerseyRowAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteJersey(id);
  revalidateCatalog();
}

export async function uploadJerseyPhotoAction(
  id: string,
  formData: FormData
): Promise<Jersey> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided.");
  }
  const updated = await addJerseyPhoto(id, file);
  if (!updated) {
    throw new Error("Jersey not found.");
  }
  revalidateCatalog();
  return updated;
}

export async function deleteJerseyPhotoAction(id: string, url: string): Promise<Jersey> {
  await requireAdmin();
  const updated = await removeJerseyPhoto(id, url);
  if (!updated) {
    throw new Error("Jersey not found.");
  }
  revalidateCatalog();
  return updated;
}

export async function setJerseyFavoriteAction(
  id: string,
  favorite: FavoriteSlot
): Promise<{ updated: Jersey; clearedJersey: Jersey | null }> {
  await requireAdmin();
  const result = await setJerseyFavorite(id, favorite);
  revalidateCatalog();
  return result;
}
