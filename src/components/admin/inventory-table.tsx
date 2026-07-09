"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { JerseyImage } from "@/components/jersey/jersey-image";
import {
  createJerseyRowAction,
  deleteJerseyRowAction,
  updateJerseyFieldAction,
  uploadJerseyPhotoAction,
} from "@/lib/admin/inventory-actions";
import type { Jersey, JerseyInput } from "@/lib/types";

export function InventoryTable({ jerseys }: { jerseys: Jersey[] }) {
  const [rows, setRows] = useState<Jersey[]>(jerseys);
  const [, startTransition] = useTransition();

  function patchRow(id: string, patch: Partial<JerseyInput>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    startTransition(async () => {
      try {
        await updateJerseyFieldAction(id, patch);
      } catch {
        toast.error("Could not save that change.");
      }
    });
  }

  function handleAdd() {
    startTransition(async () => {
      try {
        const created = await createJerseyRowAction();
        setRows((prev) => [created, ...prev]);
        toast.success("New jersey row added — fill in the details below.");
      } catch {
        toast.error("Could not add a new row.");
      }
    });
  }

  function handleDelete(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
    startTransition(async () => {
      try {
        await deleteJerseyRowAction(id);
      } catch {
        toast.error("Could not delete that row.");
      }
    });
  }

  function handleUpload(id: string, file: File) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const url = await uploadJerseyPhotoAction(id, formData);
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, fotoUrl: url } : r)));
        toast.success("Photo uploaded.");
      } catch {
        toast.error("Upload failed.");
      }
    });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl tracking-wide">Inventário</h1>
          <p className="text-sm text-muted-foreground">{rows.length} jerseys in the catalog.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add jersey
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[1200px] border-collapse text-sm">
          <thead className="bg-secondary/60 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Foto</th>
              <th className="p-3">Clube</th>
              <th className="p-3">Ano</th>
              <th className="p-3">Era</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Disponibilidade</th>
              <th className="p-3">Promoção</th>
              <th className="p-3">Preço</th>
              <th className="p-3">NovoPreço</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((jersey) => (
              <InventoryRow
                key={jersey.id}
                jersey={jersey}
                onPatch={(patch) => patchRow(jersey.id, patch)}
                onDelete={() => handleDelete(jersey.id)}
                onUpload={(file) => handleUpload(jersey.id, file)}
              />
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} className="p-8 text-center text-muted-foreground">
                  No jerseys yet — click &quot;Add jersey&quot; to create the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventoryRow({
  jersey,
  onPatch,
  onDelete,
  onUpload,
}: {
  jersey: Jersey;
  onPatch: (patch: Partial<JerseyInput>) => void;
  onDelete: () => void;
  onUpload: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <tr className="border-t border-border align-top">
      <td className="p-3">
        <div className="h-14 w-14 overflow-hidden rounded-lg border border-border">
          <JerseyImage jersey={jersey} className="h-full w-full" />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-1 flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Upload className="h-3 w-3" /> Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = "";
          }}
        />
      </td>
      <td className="p-3">
        <Input
          key={`clube-${jersey.id}-${jersey.clube}`}
          defaultValue={jersey.clube}
          onBlur={(e) => {
            if (e.target.value !== jersey.clube) onPatch({ clube: e.target.value });
          }}
          className="w-36"
        />
      </td>
      <td className="p-3">
        <Input
          key={`ano-${jersey.id}-${jersey.ano}`}
          type="number"
          defaultValue={jersey.ano}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (Number.isFinite(value) && value !== jersey.ano) onPatch({ ano: value });
          }}
          className="w-20"
        />
      </td>
      <td className="p-3">
        <Select value={jersey.era} onValueChange={(value) => onPatch({ era: value as Jersey["era"] })}>
          <SelectTrigger className="w-28">
            <SelectValue>{(value: string) => value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Atual">Atual</SelectItem>
            <SelectItem value="Retro">Retro</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-3">
        <Select value={jersey.tipo} onValueChange={(value) => onPatch({ tipo: value as Jersey["tipo"] })}>
          <SelectTrigger className="w-28">
            <SelectValue>{(value: string) => value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Away">Away</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-3">
        <Select
          value={jersey.categoria}
          onValueChange={(value) => onPatch({ categoria: value as Jersey["categoria"] })}
        >
          <SelectTrigger className="w-32">
            <SelectValue>{(value: string) => value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clube">Clube</SelectItem>
            <SelectItem value="Seleção">Seleção</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-3">
        <Select
          value={jersey.disponibilidade}
          onValueChange={(value) =>
            onPatch({ disponibilidade: value as Jersey["disponibilidade"] })
          }
        >
          <SelectTrigger className="w-44">
            <SelectValue>{(value: string) => value}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Confirmado">Confirmado</SelectItem>
            <SelectItem value="Sujeita a Confirmação">Sujeita a Confirmação</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-3">
        <Checkbox
          checked={jersey.promocao}
          onCheckedChange={(checked) =>
            onPatch({
              promocao: checked === true,
              novoPreco: checked === true ? jersey.novoPreco : null,
            })
          }
        />
      </td>
      <td className="p-3">
        <Input
          key={`preco-${jersey.id}-${jersey.preco}`}
          type="number"
          step="0.01"
          defaultValue={jersey.preco}
          onBlur={(e) => {
            const value = Number(e.target.value);
            if (Number.isFinite(value) && value !== jersey.preco) onPatch({ preco: value });
          }}
          className="w-24"
        />
      </td>
      <td className="p-3">
        <Input
          key={`novo-preco-${jersey.id}-${jersey.novoPreco}`}
          type="number"
          step="0.01"
          disabled={!jersey.promocao}
          defaultValue={jersey.novoPreco ?? ""}
          onBlur={(e) => {
            const value = e.target.value === "" ? null : Number(e.target.value);
            if (value !== jersey.novoPreco) onPatch({ novoPreco: value });
          }}
          className="w-24"
        />
      </td>
      <td className="p-3">
        <Button variant="ghost" size="icon" onClick={onDelete} aria-label="Delete jersey">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </td>
    </tr>
  );
}
