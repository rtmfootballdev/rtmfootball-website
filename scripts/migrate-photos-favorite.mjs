// One-time migration: converts any inventory document still on the old
// single `fotoUrl` schema to the new `fotos` array + `favorite` schema.
// Safe to run multiple times — already-migrated documents are skipped.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-photos-favorite.mjs

import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.\n" +
      "Run this with: node --env-file=.env.local scripts/migrate-photos-favorite.mjs"
  );
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore();

async function main() {
  const snap = await db.collection("inventory").get();
  let migrated = 0;

  const batch = db.batch();
  snap.docs.forEach((doc) => {
    const data = doc.data();
    if (Array.isArray(data.fotos) && typeof data.favorite === "string") {
      return; // already on the new schema
    }
    const fotos = typeof data.fotoUrl === "string" && data.fotoUrl ? [data.fotoUrl] : [];
    batch.set(
      doc.ref,
      {
        fotos,
        favorite: data.favorite ?? "None",
        fotoUrl: FieldValue.delete(),
      },
      { merge: true }
    );
    migrated += 1;
  });

  if (migrated === 0) {
    console.log("Nothing to migrate — all documents already use the new schema.");
    return;
  }

  await batch.commit();
  console.log(`Migrated ${migrated} document(s) to the fotos[] + favorite schema.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
