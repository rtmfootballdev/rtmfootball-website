import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getDictionary();
  return { title: dict.auth.registerMetaTitle };
}

export default async function RegisterPage() {
  const { dict } = await getDictionary();
  return (
    <AuthCard title={dict.auth.registerTitle} description={dict.auth.registerDescription}>
      <RegisterForm />
    </AuthCard>
  );
}
