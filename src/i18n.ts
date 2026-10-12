import type { LocaleConfig } from '@hwe-platform/core-ui';
import type { Config } from './payload-types';

/**
 * Idioma válido para una consulta a Payload.
 *
 * Sale de los tipos que genera Payload, así que si alguien añade un idioma en
 * `LOCALES` y no regenera los tipos (`pnpm generate:types`), el compilador lo caza.
 */
export type SiteLocale = Config['locale'];

/**
 * Los 8 idiomas que soporta la plataforma, en el orden de
 * `specs/payload/localizacion.md`. Es lo que Postgres acepta como locale (un
 * enum) y los prefijos de URL que el middleware reconoce: **no** los idiomas
 * activos de un site, que son `site-config.languages.available`.
 *
 * `payload.config.ts` construye `localization.locales` a partir de esta lista,
 * así que es la única fuente. Añadir un idioma exige migración.
 *
 * Duplicado a propósito y no leído de `site-config`: el middleware corre en el
 * edge y no puede abrir una conexión a Payload.
 */
export const LOCALES = [
  'ca',
  'es',
  'fr',
  'en',
  'de',
  'nl',
  'it',
  'pt',
] as const satisfies readonly SiteLocale[];

/** Cómo se llama cada idioma en el selector del panel de Payload. */
export const LOCALE_LABELS: Record<(typeof LOCALES)[number], string> = {
  ca: 'Català',
  es: 'Español',
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  nl: 'Nederlands',
  it: 'Italiano',
  pt: 'Português',
};

/**
 * Idioma principal. Es el fallback de Payload cuando falta una traducción y el
 * idioma sin prefijo en la URL. Va explícito y no como `LOCALES[0]`: el orden de
 * la lista es el de la plataforma, no el del principal de cada cliente. Cada
 * cliente lo cambia al crear su site (Vidrà usa `ca`).
 */
export const DEFAULT_LOCALE: SiteLocale = 'fr';

/**
 * Comprueba que un valor suelto es un idioma del site.
 *
 * Hace falta porque el idioma llega en una cabecera HTTP, que es texto libre:
 * nada impide que alguien pida `/xx/loquesea` o manipule la cabecera.
 */
export function isSiteLocale(value: string | null | undefined): value is SiteLocale {
  return LOCALES.some((locale) => locale === value);
}

/**
 * Si el idioma principal lleva prefijo en la URL.
 *
 * `false` significa que `/le-camping` es francés y `/en/the-campsite` inglés.
 * Cada cliente lo decide según su estrategia SEO (DEC-009); aquí se refleja lo
 * que tenga `site-config.languages.prefixDefault`.
 */
export const PREFIX_DEFAULT_LOCALE = false;

/** Configuración que consumen los helpers de ruta de core-ui. */
export const localeConfig: LocaleConfig = {
  locales: LOCALES,
  // Sin esto core-ui tomaría `ca` (el primero de la lista) como principal.
  defaultLocale: DEFAULT_LOCALE,
  prefixDefault: PREFIX_DEFAULT_LOCALE,
};

/**
 * Cabecera con la que el middleware pasa el idioma a los Server Components.
 *
 * Se usa una cabecera y no un parámetro de ruta para que el prefijo de idioma
 * no ensucie el `slug` que recibe el catch-all: la página ve siempre la URL sin
 * idioma, y el idioma por separado.
 */
export const LOCALE_HEADER = 'x-hwe-locale';
