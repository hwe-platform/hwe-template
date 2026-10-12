import { cache } from 'react';
import { getPayload } from 'payload';

import config from '../../payload.config';
import { DEFAULT_LOCALE, isSiteLocale } from '../../i18n';

import type { SiteLocale } from '../../i18n';

/**
 * Los idiomas que el site sirve: `site-config.languages.available` (V24).
 *
 * Es distinto de `LOCALES` (`i18n.ts`): esos son los prefijos que el middleware
 * reconoce y los locales que la BD puede guardar. Lo activo lo decide el editor,
 * y como el middleware corre en el edge y no lee Payload, lo aplican la página
 * (404), el layout y el sitemap.
 *
 * Devuelve `null` si no se puede leer —base de datos caída, site sin configurar—:
 * en ese caso no se filtra y se sirve, como antes de V24. Con `cache` de React,
 * layout, página y sitemap comparten una sola lectura por petición.
 */
export const leerIdiomasActivos = cache(async (): Promise<SiteLocale[] | null> => {
  try {
    const payload = await getPayload({ config });
    const siteConfig = await payload.findGlobal({ slug: 'site-config', depth: 0 });
    const available = siteConfig.languages?.available;
    if (!Array.isArray(available)) return null;
    return available.filter((codigo): codigo is SiteLocale => isSiteLocale(codigo));
  } catch {
    return null;
  }
});

/**
 * Si un idioma se sirve.
 *
 * El principal siempre es activo: es el fallback de Payload y el idioma sin
 * prefijo, y un site no puede quedarse sin él. Sin dato (`null`), no se filtra.
 */
export function esIdiomaActivo(
  locale: SiteLocale,
  activos: readonly SiteLocale[] | null | undefined,
): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  if (!activos) return true;
  return activos.includes(locale);
}
