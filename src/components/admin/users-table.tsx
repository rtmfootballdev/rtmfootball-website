"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updateUserPointsAction } from "@/lib/admin/users-actions";
import type { PublicUser } from "@/lib/types";

export function UsersTable({ users }: { users: PublicUser[] }) {
  const [rows, setRows] = useState(users);
  const [, startTransition] = useTransition();

  function handlePointsChange(username: string, points: number) {
    setRows((prev) => prev.map((u) => (u.username === username ? { ...u, points } : u)));
    startTransition(async () => {
      try {
        await updateUserPointsAction(username, points);
      } catch {
        toast.error("Could not save points.");
      }
    });
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-heading text-2xl tracking-wide">Usuários</h1>
        <p className="text-sm text-muted-foreground">{rows.length} registered accounts.</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-secondary/60 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Usuário</th>
              <th className="p-3">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.username} className="border-t border-border">
                <td className="p-3 font-medium">
                  {user.username}
                  {user.isAdmin && (
                    <Badge variant="secondary" className="ml-2">
                      Admin
                    </Badge>
                  )}
                </td>
                <td className="p-3">
                  <Input
                    key={`points-${user.username}-${user.points}`}
                    type="number"
                    min={0}
                    defaultValue={user.points}
                    onBlur={(e) => {
                      const value = Number(e.target.value);
                      if (Number.isFinite(value) && value !== user.points) {
                        handlePointsChange(user.username, value);
                      }
                    }}
                    className="w-28"
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-muted-foreground">
                  No registered users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
