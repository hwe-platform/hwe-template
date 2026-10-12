import { getPayload } from 'payload';
import { sitemapPaths } from '@hwe-platform/core-ui';

import config from '../payload.config';
import { DEFAULT_LOCALE, PREFIX_DEFAULT_LOCALE } from '../i18n';
import { leerIdiomasActivos } from '../services/seo/idiomas';
import { leerIndexacion } from '../services/seo/indexacion';

import type { SitemapDoc } from '@hwe-platform/core-ui';
import type { MetadataRoute } from 'next';
import type { SiteLocale } from '../i18n';

/**
 * `sitemap.xml` condicionado al interruptor global (HU-026): con el site cerrado
 * está vacío; abierto lista las páginas indexables (`sitemapPaths`).
 *
 * Un `url` por página y por idioma activo (V24), con `alternates.languages`
 * (hreflang) entre los idiomas activos de la misma página. Los slugs están
 * traducidos por idioma, así que la consulta es por idioma y las alternativas se
 * emparejan por el id del documento. Con un solo idioma activo no hay
 * alternativas: sería ruido. Sin `NEXT_PUBLIC_SERVER_URL` tampoco hay sitemap,
 * porque exige URLs absolutas.
 */
export const dynamic = 'force-dynamic';

const COLECCIONES = ['pages', 'accommodations', 'entities', 'articles'] as const;

type Coleccion = (typeof COLECCIONES)[number];
type DocConId = SitemapDoc & { id?: string | number };

/** Una página en un idioma: dónde está y de qué documento es. */
type Entrada = { locale: SiteLocale; clave: string | null; url: string };

/** El principal primero y después los demás activos. El principal siempre entra. */
function idiomasDelSitemap(activos: readonly SiteLocale[] | null): SiteLocale[] {
  const otros = (activos ?? []).filter((locale) => locale !== DEFAULT_LOCALE);
  return [DEFAULT_LOCALE, ...otros];
}

/** La URL pública de una ruta en un idioma. */
function urlDe(siteUrl: string, locale: SiteLocale, ruta: string): string {
  const prefijo = locale !== DEFAULT_LOCALE || PREFIX_DEFAULT_LOCALE ? `/${locale}` : '';
  return `${siteUrl}${prefijo}${ruta === '/' ? '' : ruta}`;
}

/** Los documentos de una colección en un idioma, tal y como los necesita `sitemapPaths`. */
async function leerColeccion(collection: Coleccion, locale: SiteLocale): Promise<DocConId[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection,
    depth: 0,
    limit: 1000,
    pagination: false,
    locale,
  });
  return docs as unknown as DocConId[];
}

/** Las páginas de un idioma. La ruta de cada documento la decide `sitemapPaths`. */
async function entradasDeIdioma(
  siteUrl: string,
  indexing: string,
  locale: SiteLocale,
): Promise<Entrada[]> {
  const entradas: Entrada[] = [];
  for (const collection of COLECCIONES) {
    for (const doc of await leerColeccion(collection, locale)) {
      const [ruta] = sitemapPaths({ indexing, [collection]: [doc] });
      if (ruta === undefined) continue;
      const clave = doc.id === undefined ? null : `${collection}:${doc.id}`;
      entradas.push({ locale, clave, url: urlDe(siteUrl, locale, ruta) });
    }
  }
  return entradas;
}

/** Con más de un idioma activo, cada entrada lleva las alternativas de su documento. */
function conAlternativas(entradas: Entrada[], hayVariosIdiomas: boolean): MetadataRoute.Sitemap {
  const porClave = new Map<string, Entrada[]>();
  for (const entrada of entradas) {
    if (entrada.clave === null) continue;
    porClave.set(entrada.clave, [...(porClave.get(entrada.clave) ?? []), entrada]);
  }

  return entradas
    .map((entrada) => {
      const hermanas = entrada.clave === null ? [] : (porClave.get(entrada.clave) ?? []);
      if (!hayVariosIdiomas || hermanas.length < 2) return { url: entrada.url };
      const languages = Object.fromEntries(hermanas.map((h) => [h.locale, h.url]));
      return { url: entrada.url, alternates: { languages } };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');
  const indexing = await leerIndexacion();
  if (!siteUrl || indexing !== 'index') return [];

  const idiomas = idiomasDelSitemap(await leerIdiomasActivos());
  const entradas: Entrada[] = [];
  for (const locale of idiomas) {
    entradas.push(...(await entradasDeIdioma(siteUrl, indexing, locale)));
  }

  return conAlternativas(entradas, idiomas.length > 1);
}
