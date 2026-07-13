"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { createUser, verifyCredentials } from "@/lib/data/users";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export type AuthFormState = { error?: string } | undefined;

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const { dict } = await getDictionary();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: dict.auth.errorMissingFields };
  }

  const user = await verifyCredentials(username, password);
  if (!user) {
    return { error: dict.auth.errorInvalidCredentials };
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
  const { dict } = await getDictionary();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (username.length < 3) {
    return { error: dict.auth.errorUsernameTooShort };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: dict.auth.errorUsernameInvalidChars };
  }
  if (password.length < 6) {
    return { error: dict.auth.errorPasswordTooShort };
  }
  if (password !== confirmPassword) {
    return { error: dict.auth.errorPasswordMismatch };
  }

  try {
    const user = await createUser(username, password);
    const session = await getSession();
    session.username = user.username;
    session.isAdmin = user.isAdmin;
    await session.save();
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    return {
      error: message === "USERNAME_TAKEN" ? dict.auth.errorUsernameTaken : dict.auth.errorCouldNotCreate,
    };
  }

  redirect("/account");
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
