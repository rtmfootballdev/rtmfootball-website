# RTM Football

Online shop for Modern, Retro, National Team and Promotional football jerseys, with
name-and-number personalization and a WhatsApp-based ordering flow. Built with
Next.js (App Router), Tailwind CSS, shadcn/ui, Framer Motion, Zustand, Firebase
(Firestore) and Cloudinary.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs immediately with
**no setup required** — it ships with a built-in in-memory mock database (seeded
from `src/lib/data/seed-jerseys.json`) that's used automatically whenever Firebase
environment variables aren't present. This is the "demo mode" described below.

Log in as the admin with:
- Username: `adminRTM`
- Password: `RTMq1w2e3!!`

## How data storage works (mock mode vs. real backend)

Every read/write to inventory and user data goes through `src/lib/data/*`. Those
modules check `isFirebaseConfigured` (from `src/lib/data/firebase-admin.ts`) and
`isCloudinaryConfigured` (from `src/lib/data/cloudinary.ts`) independently:

- **Neither configured (default):** data lives in an in-memory store
  (`src/lib/data/mock-db.ts`), reset whenever the server process restarts. Photo
  uploads are written to `public/uploads/`. This is perfect for local development
  and for trying out the site before setting anything up.
- **Firebase configured:** all inventory/user reads and writes go to Firestore.
- **Cloudinary configured:** photo uploads go to Cloudinary instead of
  `public/uploads/`.

These two are independent — you need both for a real production deployment, but
each falls back gracefully on its own if only one is set up. No code changes are
needed to switch between them — just add the environment variables below.

**Why two separate services?** Firebase Storage now requires the paid Blaze plan
to enable at all (even to stay within its free quota, you must add a credit
card). Cloudinary's free tier needs no card and covers photo hosting, while
Firestore stays on Firebase's free Spark plan for the database.

## Setting up Firestore (the database)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Firestore Database** (Build → Firestore Database → Create database →
   Production mode). This is free on the Spark plan, no card required.
3. Go to Project Settings (gear icon) → **Service accounts** tab → **Generate new
   private key**. This downloads a JSON file with `project_id`, `client_email`
   and `private_key`.
4. Copy `.env.local.example` to `.env.local` and fill in:
   - `SESSION_SECRET` — any random string, 32+ characters (`openssl rand -base64 32`)
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` — from
     the service account JSON (keep the `\n` sequences in the private key as-is,
     wrapped in double quotes)
5. Seed the starter catalog and the admin account into Firestore:
   ```bash
   npm run seed:firebase
   ```
6. Restart `npm run dev` — the site now reads/writes real Firestore data.

### Firestore security

This app never talks to Firestore from the browser — every access goes through
the Firebase Admin SDK on the server (Server Components and Server Actions),
gated by the session cookie and an explicit admin check (`requireAdmin()`). You
don't need to write Firestore security rules for client access; the default
"deny all" rules are fine since no client SDK is used.

## Setting up Cloudinary (photo uploads)

1. Create a free account at [cloudinary.com](https://cloudinary.com) — no card
   required.
2. On your Cloudinary dashboard home page, copy the **Cloud name**, **API Key**,
   and **API Secret** shown in the "Product Environment Credentials" panel.
3. Add them to `.env.local`:
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
4. Restart `npm run dev`. Uploading a photo in `/admin/inventario` now stores it
   in your Cloudinary account (under the `rtm-football/jerseys` folder) and
   serves it from Cloudinary's CDN.

## Authentication

Accounts use a **username + password only** (no email), stored as a Firestore
document keyed by the lowercased username, with a bcrypt-hashed password.
Sessions are signed, httpOnly cookies (`iron-session`). The `adminRTM` account is
seeded automatically (in mock mode) or via `npm run seed:firebase` (for Firebase),
and is the only account with access to `/admin/inventario` and `/admin/usuarios`.

Regular accounts only ever display their accumulated points — points themselves
are managed manually by the admin from `/admin/usuarios`, since there's no
automated checkout to award them from.

## Ordering flow

There's no payment checkout. Every product page has:
- **Add to Cart** — saves the jersey, size and personalization to a
  browser-persisted cart (Zustand + localStorage).
- **Contact to Buy** (or **Contact us to Confirm Availability**, if the jersey's
  Disponibilidade isn't Confirmado, or if XXL is selected — XXL always requires
  confirmation) — opens WhatsApp (`+351 929 394 598`) with a pre-filled message.

The cart page aggregates every saved item into a single WhatsApp message via the
same "Contact to Buy" pattern.

## Project structure

```
src/
  app/                  Routes (App Router)
  components/
    layout/             Header, footer, mobile nav, account menu
    product/            Product cards, grids, filters, configurator
    admin/               Editable Inventário / Usuários tables
    auth/                Login/register forms
    jersey/              Product image + generated placeholder art
    marketing/           Trust badges
    motion/              Framer Motion scroll-reveal wrapper
  lib/
    data/                Inventory/user repositories (Firestore or mock)
    auth/                Sessions and server actions
    admin/               Admin-only server actions
    cart/                Zustand cart store
    pricing.ts, whatsapp.ts, catalog-filters.ts, constants.ts, types.ts
scripts/
  seed-firebase.mjs      One-time Firestore seeding script
```

## Placeholder jersey art

Until the admin uploads a real photo for a jersey (via `/admin/inventario`), the
site renders a generated placeholder graphic (deterministic gradient + initials
per club) instead of a broken image. This is intentional — no third-party photos
are bundled.

## Deploying to Vercel

**Both Firestore and Cloudinary should be set up before deploying for real.**
Mock mode only works locally with `npm run dev` because it relies on an
in-memory variable kept alive by one long-running process, and local file
uploads only work because the filesystem is persistent on your machine. Vercel
runs the app as serverless functions with an ephemeral filesystem, created,
reused, and recycled unpredictably — without a real database, admin edits could
disappear within minutes and different visitors could see inconsistent versions
of the catalog; without Cloudinary, uploaded photos wouldn't survive past the
request that uploaded them. Complete the two setup sections above first.

1. Push this repo to GitHub and import it in Vercel, or run `vercel` from this
   directory.
2. Add every variable from `.env.local.example` (`SESSION_SECRET`, the three
   `FIREBASE_*` ones, and the three `CLOUDINARY_*` ones) in the Vercel project's
   Settings → Environment Variables.
3. Deploy.
4. If you haven't already, run `npm run seed:firebase` locally once (pointed at
   the same Firebase project via your local `.env.local`) to populate it —
   there's no separate migration step needed beyond that.

## Tech stack

Next.js 16 (App Router, Server Actions), TypeScript, Tailwind CSS v4, shadcn/ui
(Base UI primitives), Framer Motion, Zustand, Firebase Admin SDK (Firestore),
Cloudinary, iron-session, bcryptjs, Fuse.js.
