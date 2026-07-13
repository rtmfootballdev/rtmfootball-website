import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.auth.loginMetaTitle };
}

export default async function LoginPage() {
  const { dict } = await getDictionary();
  return (
    <AuthCard title={dict.auth.loginTitle} description={dict.auth.loginDescription}>
      <LoginForm />
    </AuthCard>
  );
}
