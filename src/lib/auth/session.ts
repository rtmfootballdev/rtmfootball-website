import "server-only";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { sessionOptions } from "./session-options";
import { getUserByUsername } from "@/lib/data/users";
import type { PublicUser, SessionData } from "@/lib/types";

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const session = await getSession();
  if (!session.username) return null;
  const record = await getUserByUsername(session.username);
  if (!record) return null;
  return { username: record.username, points: record.points, isAdmin: record.isAdmin };
}

/** Defense-in-depth check used inside admin Server Actions themselves. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) {
    redirect("/login");
  }
  return session;
}
