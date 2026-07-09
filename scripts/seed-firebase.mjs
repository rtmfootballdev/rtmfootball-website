// One-time script to populate a real Firebase project with the starter
// catalog and the adminRTM account. Only needed once Firebase env vars are
// configured — local development works without it via the built-in mock DB.
//
// Usage:
//   node --env-file=.env.local scripts/seed-firebase.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import bcrypt from "bcryptjs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.\n" +
      "Run this with: node --env-file=.env.local scripts/seed-firebase.mjs"
  );
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore();

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const raw = JSON.parse(
    readFileSync(path.join(__dirname, "../src/lib/data/seed-jerseys.json"), "utf-8")
  );
  const now = Date.now();

  const batch = db.batch();
  raw.forEach((jersey, index) => {
    const id = slugify(`${jersey.clube}-${jersey.ano}-${jersey.tipo}-${jersey.era}`);
    const ref = db.collection("inventory").doc(id);
    batch.set(ref, {
      ...jersey,
      id,
      createdAt: now - index * 1000,
      updatedAt: now - index * 1000,
    });
  });
  await batch.commit();
  console.log(`Seeded ${raw.length} jerseys into Firestore.`);

  const adminRef = db.collection("users").doc("adminrtm");
  const adminSnap = await adminRef.get();
  if (!adminSnap.exists) {
    await adminRef.set({
      username: "adminRTM",
      passwordHash: bcrypt.hashSync("RTMq1w2e3!!", 10),
      points: 0,
      isAdmin: true,
      createdAt: now,
    });
    console.log("Created adminRTM account.");
  } else {
    console.log("adminRTM account already exists — left untouched.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
