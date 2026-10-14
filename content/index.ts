import { content, type Dictionary } from "./es";

export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = { es: content };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** El diccionario en español, tal cual lo consumen los componentes. */
export { content };
export type { Dictionary };
