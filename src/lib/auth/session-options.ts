import type { SessionOptions } from "iron-session";

const password =
  process.env.SESSION_SECRET ??
  "rtm-football-dev-only-insecure-secret-please-set-a-real-one";

if (password.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters long.");
}

export const sessionOptions: SessionOptions = {
  cookieName: "rtm_session",
  password,
  ttl: 60 * 60 * 24 * 30,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};
