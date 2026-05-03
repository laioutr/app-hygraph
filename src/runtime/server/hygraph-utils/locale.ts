import { Locale } from '../generated/graphql';

const getMatchingLocales = (locale: string): string[] => {
  const validLocales = Object.values(Locale) as string[];
  return locale
    .replace('_', '-')
    .split('-')
    .map((val) => val.toLowerCase())
    .filter((val) => validLocales.includes(val));
};

/**
 * Build the Hygraph `locales` argument from the request's clientEnv locale.
 *
 * The first entry is the requested locale; `Locale.En` is appended as fallback
 * (since `en` is the system locale in Hygraph) so that documents which are not
 * yet translated still resolve with their default-locale fields instead of
 * returning null fields. If the requested locale is already `en`, no fallback
 * is added.
 */
export const resolveHygraphLocales = (clientLocale: string): Locale[] => {
  const matchingLocales = getMatchingLocales(clientLocale);
  if (matchingLocales.length === 0) {
    return [Locale.En];
  }
  return [...matchingLocales, Locale.En] as Locale[];
};
