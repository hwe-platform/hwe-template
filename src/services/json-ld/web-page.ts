import { nodeId, omitEmpty, textOrUndefined } from './utils';

import type { JsonLdContext, JsonLdNode } from './types';

/** Lo mínimo de cualquier contenido para describirlo como página web. */
export type WebPageInput = {
  name?: string | null;
  description?: string | null;
  /** URL absoluta de la página, ya calculada por el orquestador. */
  url: string;
};

/**
 * Schema WebPage: el fallback de capa 3 para cualquier página sin schema
 * específico. Ninguna página sale sin JSON-LD.
 *
 * Spec: specs/seo-geo/schemas/web-page.md
 *
 * @param page - Nombre, descripción y URL del contenido
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin nombre (señal de que algo va mal en Payload)
 */
export function buildWebPageSchema(page: WebPageInput, ctx: JsonLdContext): JsonLdNode | null {
  const name = textOrUndefined(page.name);
  if (!name) return null;

  return omitEmpty({
    '@type': 'WebPage',
    name,
    description: textOrUndefined(page.description),
    url: page.url,
    inLanguage: ctx.locale,
    isPartOf: { '@id': nodeId(ctx, 'website') },
  });
}
