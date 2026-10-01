import { getPayload } from 'payload';
import { sitemapPaths } from '@hwe-platform/core-ui';

import config from '../payload.config';
import { DEFAULT_LOCALE, PREFIX_DEFAULT_LOCALE } from '../i18n';
import { leerIndexacion } from '../services/seo/indexacion';

import type { SitemapDoc, SitemapSource } from '@hwe-platform/core-ui';
import type { MetadataRoute } from 'next';

/**
 * `sitemap.xml` condicionado al interruptor global (HU-026): con el site cerrado
 * está vacío; abierto lista las páginas indexables (`sitemapPaths`).
 *
 * Solo el idioma principal: las alternativas por idioma (`hreflang`) llegan con el
 * sitemap completo, Hito 2. Sin `NEXT_PUBLIC_SERVER_URL` tampoco hay sitemap, porque
 * exige URLs absolutas.
 */
export const dynamic = 'force-dynamic';

const COLECCIONES = ['pages', 'accommodations', 'entities', 'articles'] as const;

/** Los documentos de cada colección, tal y como los necesita `sitemapPaths`. */
async function leerDocumentos(): Promise<SitemapSource> {
  const payload = await getPayload({ config });
  const fuente: SitemapSource = {};
  for (const collection of COLECCIONES) {
    const { docs } = await payload.find({
      collection,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale: DEFAULT_LOCALE,
    });
    fuente[collection] = docs as unknown as SitemapDoc[];
  }
  return fuente;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');
  const indexing = await leerIndexacion();
  if (!siteUrl || indexing !== 'index') return [];

  const prefijo = PREFIX_DEFAULT_LOCALE ? `/${DEFAULT_LOCALE}` : '';
  const rutas = sitemapPaths({ indexing, ...(await leerDocumentos()) });

  return rutas.map((ruta) => ({ url: `${siteUrl}${prefijo}${ruta === '/' ? '' : ruta}` }));
}
