import "server-only";
import bcrypt from "bcryptjs";
import { getDb, isFirebaseConfigured } from "./firebase-admin";
import { getMockDb } from "./mock-db";
import type { UserRecord } from "@/lib/types";

const COLLECTION = "users";

function normalize(username: string): string {
  return username.trim().toLowerCase();
}

export async function getUserByUsername(username: string): Promise<UserRecord | null> {
  const key = normalize(username);
  if (isFirebaseConfigured) {
    const doc = await getDb().collection(COLLECTION).doc(key).get();
    return doc.exists ? (doc.data() as UserRecord) : null;
  }
  return getMockDb().users.get(key) ?? null;
}

export async function listUsers(): Promise<UserRecord[]> {
  if (isFirebaseConfigured) {
    const snap = await getDb().collection(COLLECTION).get();
    return snap.docs
      .map((doc) => doc.data() as UserRecord)
      .sort((a, b) => a.username.localeCompare(b.username));
  }
  return Array.from(getMockDb().users.values()).sort((a, b) =>
    a.username.localeCompare(b.username)
  );
}

export async function createUser(username: string, password: string): Promise<UserRecord> {
  const trimmed = username.trim();
  const key = normalize(trimmed);
  const existing = await getUserByUsername(key);
  if (existing) {
    throw new Error("USERNAME_TAKEN");
  }

  const record: UserRecord = {
    username: trimmed,
    passwordHash: await bcrypt.hash(password, 10),
    points: 0,
    isAdmin: false,
    createdAt: Date.now(),
  };

  if (isFirebaseConfigured) {
    await getDb().collection(COLLECTION).doc(key).set(record);
  } else {
    getMockDb().users.set(key, record);
  }
  return record;
}

export async function verifyCredentials(
  username: string,
  password: string
): Promise<UserRecord | null> {
  const user = await getUserByUsername(username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export async function updateUserPoints(username: string, points: number): Promise<void> {
  const key = normalize(username);
  if (isFirebaseConfigured) {
    await getDb().collection(COLLECTION).doc(key).set({ points }, { merge: true });
    return;
  }
  const db = getMockDb();
  const existing = db.users.get(key);
  if (existing) db.users.set(key, { ...existing, points });
}
