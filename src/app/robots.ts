import { robotsTxt } from '@hwe-platform/core-ui';

import { leerIndexacion } from '../services/seo/indexacion';

import type { MetadataRoute } from 'next';

/**
 * `robots.txt` según el interruptor global de indexación (HU-026): cerrado
 * bloquea todo; abierto permite el rastreo y anuncia el sitemap.
 *
 * Dinámico a propósito: el interruptor se cambia desde el panel y el fichero
 * tiene que reflejarlo sin volver a desplegar.
 */
export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  return robotsTxt({
    indexing: await leerIndexacion(),
    siteUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  });
}
