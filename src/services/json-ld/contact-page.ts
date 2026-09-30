import { nodeId, omitEmpty, pageUrl, textOrUndefined } from './utils';

import type { JsonLdContext, JsonLdNode, PageInput } from './types';

/**
 * Schema ContactPage de la página de contacto (capa 2).
 *
 * No repite el NAP: apunta con `mainEntity` a la Organization de la capa 1,
 * que ya lleva dirección, teléfono y email, para que no puedan divergir.
 *
 * Spec: specs/seo-geo/schemas/contact-page.md
 *
 * @param page - Página de tipo `contact`
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin título
 */
export function buildContactPageSchema(page: PageInput, ctx: JsonLdContext): JsonLdNode | null {
  const name = textOrUndefined(page.title);
  if (!name) return null;

  return omitEmpty({
    '@type': 'ContactPage',
    name,
    url: pageUrl(ctx, textOrUndefined(page.slug)),
    description: textOrUndefined(page.seo?.metaDescription),
    inLanguage: ctx.locale,
    isPartOf: { '@id': nodeId(ctx, 'website') },
    mainEntity: { '@id': nodeId(ctx, 'organization') },
  });
}
