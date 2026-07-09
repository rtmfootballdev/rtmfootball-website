"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import {
  createJersey,
  deleteJersey,
  updateJersey,
  uploadJerseyPhoto,
} from "@/lib/data/inventory";
import type { Jersey, JerseyInput } from "@/lib/types";

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
    fotoUrl: "",
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
): Promise<string> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided.");
  }
  const url = await uploadJerseyPhoto(id, file);
  await updateJersey(id, { fotoUrl: url });
  revalidateCatalog();
  return url;
}
