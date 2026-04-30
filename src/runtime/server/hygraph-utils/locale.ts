import { Locale } from '../generated/graphql';

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
  const requested = clientLocale as Locale;

  if (requested === Locale.En) {
    return [Locale.En];
  }

  return [requested, Locale.En];
};
