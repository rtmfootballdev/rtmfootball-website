import "server-only";
import { randomUUID } from "crypto";
import { cache } from "react";
import { getDb, isFirebaseConfigured } from "./firebase-admin";
import { isCloudinaryConfigured, uploadJerseyPhotoToCloudinary } from "./cloudinary";
import { getMockDb } from "./mock-db";
import type { Jersey, JerseyInput } from "@/lib/types";

const COLLECTION = "inventory";

export const listJerseys = cache(async (): Promise<Jersey[]> => {
  if (isFirebaseConfigured) {
    const snap = await getDb().collection(COLLECTION).get();
    return snap.docs
      .map((doc) => doc.data() as Jersey)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
  return Array.from(getMockDb().jerseys.values()).sort((a, b) => b.createdAt - a.createdAt);
});

export const getJerseyById = cache(async (id: string): Promise<Jersey | null> => {
  if (isFirebaseConfigured) {
    const doc = await getDb().collection(COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as Jersey) : null;
  }
  return getMockDb().jerseys.get(id) ?? null;
});

export async function createJersey(input: JerseyInput): Promise<Jersey> {
  const now = Date.now();
  const jersey: Jersey = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  if (isFirebaseConfigured) {
    await getDb().collection(COLLECTION).doc(jersey.id).set(jersey);
  } else {
    getMockDb().jerseys.set(jersey.id, jersey);
  }
  return jersey;
}

export async function updateJersey(id: string, patch: Partial<JerseyInput>): Promise<Jersey | null> {
  const updatedAt = Date.now();
  if (isFirebaseConfigured) {
    const ref = getDb().collection(COLLECTION).doc(id);
    const existing = await ref.get();
    if (!existing.exists) return null;
    await ref.set({ ...patch, updatedAt }, { merge: true });
    const updated = await ref.get();
    return updated.data() as Jersey;
  }
  const db = getMockDb();
  const existing = db.jerseys.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updatedAt };
  db.jerseys.set(id, updated);
  return updated;
}

export async function deleteJersey(id: string): Promise<void> {
  if (isFirebaseConfigured) {
    await getDb().collection(COLLECTION).doc(id).delete();
  } else {
    getMockDb().jerseys.delete(id);
  }
}

export async function uploadJerseyPhoto(id: string, file: File): Promise<string> {
  if (isCloudinaryConfigured) {
    return uploadJerseyPhotoToCloudinary(file);
  }

  // Local fallback for development without any image host configured.
  // Not suitable for production on Vercel (the filesystem there is ephemeral).
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${id}-${randomUUID()}.${ext}`;
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}
