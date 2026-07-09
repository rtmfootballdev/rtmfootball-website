"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategoryFilters({
  basePath,
  showEraFilter = false,
}: {
  basePath: string;
  showEraFilter?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  }

  const tipoLabels: Record<string, string> = {
    all: "All types",
    Home: "Home",
    Away: "Away",
  };
  const eraLabels: Record<string, string> = {
    all: "All eras",
    Atual: "Modern",
    Retro: "Retro",
  };
  const sortLabels: Record<string, string> = {
    featured: "Featured",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={searchParams.get("tipo") ?? "all"}
        onValueChange={(value) => updateParam("tipo", value)}
      >
        <SelectTrigger className="w-36">
          <SelectValue>{(value: string) => tipoLabels[value] ?? "All types"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="Home">Home</SelectItem>
          <SelectItem value="Away">Away</SelectItem>
        </SelectContent>
      </Select>

      {showEraFilter && (
        <Select
          value={searchParams.get("era") ?? "all"}
          onValueChange={(value) => updateParam("era", value)}
        >
          <SelectTrigger className="w-36">
            <SelectValue>{(value: string) => eraLabels[value] ?? "All eras"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All eras</SelectItem>
            <SelectItem value="Atual">Modern</SelectItem>
            <SelectItem value="Retro">Retro</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Select
        value={searchParams.get("sort") ?? "featured"}
        onValueChange={(value) => updateParam("sort", value)}
      >
        <SelectTrigger className="w-44">
          <SelectValue>{(value: string) => sortLabels[value] ?? "Featured"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
