"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/lib/i18n/locale-provider";
import { tipoLabel, eraLabel } from "@/lib/i18n/labels";

export function CategoryFilters({
  basePath,
  showEraFilter = false,
}: {
  basePath: string;
  showEraFilter?: boolean;
}) {
  const { locale, dict } = useLocale();
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
    all: dict.filters.allTypes,
    Home: tipoLabel("Home", locale),
    Away: tipoLabel("Away", locale),
  };
  const eraLabels: Record<string, string> = {
    all: dict.filters.allEras,
    Atual: eraLabel("Atual", locale),
    Retro: eraLabel("Retro", locale),
  };
  const sortLabels: Record<string, string> = {
    featured: dict.filters.featured,
    "price-asc": dict.filters.priceLowHigh,
    "price-desc": dict.filters.priceHighLow,
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={searchParams.get("tipo") ?? "all"}
        onValueChange={(value) => updateParam("tipo", value)}
      >
        <SelectTrigger className="w-36">
          <SelectValue>{(value: string) => tipoLabels[value] ?? dict.filters.allTypes}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{dict.filters.allTypes}</SelectItem>
          <SelectItem value="Home">{tipoLabels.Home}</SelectItem>
          <SelectItem value="Away">{tipoLabels.Away}</SelectItem>
        </SelectContent>
      </Select>

      {showEraFilter && (
        <Select
          value={searchParams.get("era") ?? "all"}
          onValueChange={(value) => updateParam("era", value)}
        >
          <SelectTrigger className="w-36">
            <SelectValue>{(value: string) => eraLabels[value] ?? dict.filters.allEras}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.filters.allEras}</SelectItem>
            <SelectItem value="Atual">{eraLabels.Atual}</SelectItem>
            <SelectItem value="Retro">{eraLabels.Retro}</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Select
        value={searchParams.get("sort") ?? "featured"}
        onValueChange={(value) => updateParam("sort", value)}
      >
        <SelectTrigger className="w-44">
          <SelectValue>{(value: string) => sortLabels[value] ?? dict.filters.featured}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">{dict.filters.featured}</SelectItem>
          <SelectItem value="price-asc">{dict.filters.priceLowHigh}</SelectItem>
          <SelectItem value="price-desc">{dict.filters.priceHighLow}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
