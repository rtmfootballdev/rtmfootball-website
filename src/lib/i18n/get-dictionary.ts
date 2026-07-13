import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export const getLocale = cache(async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return (LOCALES as string[]).includes(value ?? "") ? (value as Locale) : DEFAULT_LOCALE;
});

export const getDictionary = cache(async (): Promise<{ locale: Locale; dict: Dictionary }> => {
  const locale = await getLocale();
  return { locale, dict: dictionaries[locale] };
});
