import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Sign up" };

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Just a username and password — no email needed."
    >
      <RegisterForm />
    </AuthCard>
  );
}
