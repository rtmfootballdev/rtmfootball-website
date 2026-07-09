import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

/**
 * When these env vars are absent (e.g. a fresh checkout before the shop owner
 * has created a Firebase project), the app transparently falls back to an
 * in-memory mock data store so the site still runs end-to-end locally.
 *
 * Only Firestore lives here — jersey photos go to Cloudinary instead, since
 * Firebase Storage now requires the paid Blaze plan.
 */
export const isFirebaseConfigured = Boolean(projectId && clientEmail && privateKey);

function getAdminApp(): App {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Set the FIREBASE_* environment variables.");
  }
  const existing = getApps();
  if (existing.length) return existing[0];
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getDb() {
  return getFirestore(getAdminApp());
}
