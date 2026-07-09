import bcrypt from "bcryptjs";
import type { Jersey, UserRecord } from "@/lib/types";
import { ADMIN_PASSWORD, ADMIN_USERNAME, SEED_JERSEYS } from "./seed";

interface MockDB {
  jerseys: Map<string, Jersey>;
  users: Map<string, UserRecord>;
}

const globalForMockDb = globalThis as unknown as { __rtmMockDb?: MockDB };

function createDb(): MockDB {
  const jerseys = new Map<string, Jersey>();
  for (const jersey of SEED_JERSEYS) jerseys.set(jersey.id, jersey);

  const users = new Map<string, UserRecord>();
  users.set(ADMIN_USERNAME.toLowerCase(), {
    username: ADMIN_USERNAME,
    passwordHash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
    points: 0,
    isAdmin: true,
    createdAt: Date.now(),
  });

  return { jerseys, users };
}

/**
 * Local, in-memory data store used when Firebase env vars are not configured.
 * Persisted on globalThis so it survives Next.js dev-server module reloads.
 */
export function getMockDb(): MockDB {
  if (!globalForMockDb.__rtmMockDb) {
    globalForMockDb.__rtmMockDb = createDb();
  }
  return globalForMockDb.__rtmMockDb;
}
