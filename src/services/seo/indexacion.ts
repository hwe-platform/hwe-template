import { cache } from 'react';
import { getPayload } from 'payload';

import config from '../../payload.config';

/**
 * El interruptor global de indexación, `site-config.indexing` (HU-026).
 *
 * Es la única lectura que hacen el layout, la página, `robots.txt` y el sitemap,
 * para que los cuatro decidan con el mismo dato. **Falla cerrado:** si el global
 * no se puede leer —base de datos caída, site sin configurar— devuelve
 * `undefined`, y `isSiteIndexable` lo trata como `noindex`.
 *
 * Con `cache` de React, el layout y la página comparten una sola lectura por petición.
 */
export const leerIndexacion = cache(async (): Promise<string | undefined> => {
  try {
    const payload = await getPayload({ config });
    const siteConfig = await payload.findGlobal({ slug: 'site-config', depth: 0 });
    return typeof siteConfig.indexing === 'string' ? siteConfig.indexing : undefined;
  } catch {
    return undefined;
  }
});
