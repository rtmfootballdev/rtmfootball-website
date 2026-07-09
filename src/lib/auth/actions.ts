"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { createUser, verifyCredentials } from "@/lib/data/users";

export type AuthFormState = { error?: string } | undefined;

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Please enter a username and password." };
  }

  const user = await verifyCredentials(username, password);
  if (!user) {
    return { error: "Incorrect username or password." };
  }

  const session = await getSession();
  session.username = user.username;
  session.isAdmin = user.isAdmin;
  await session.save();

  redirect(user.isAdmin ? "/admin/inventario" : "/account");
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (username.length < 3) {
    return { error: "Username must be at least 3 characters." };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: "Username can only contain letters, numbers and underscores." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    const user = await createUser(username, password);
    const session = await getSession();
    session.username = user.username;
    session.isAdmin = user.isAdmin;
    await session.save();
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not create account." };
  }

  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
