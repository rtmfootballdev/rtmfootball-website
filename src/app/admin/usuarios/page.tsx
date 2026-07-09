import type { Metadata } from "next";
import { UsersTable } from "@/components/admin/users-table";
import { listUsers } from "@/lib/data/users";

export const metadata: Metadata = { title: "Usuários" };

export default async function AdminUsersPage() {
  const users = await listUsers();
  const publicUsers = users.map((u) => ({
    username: u.username,
    points: u.points,
    isAdmin: u.isAdmin,
  }));
  return <UsersTable users={publicUsers} />;
}
