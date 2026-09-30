import { imageUrl, omitEmpty, pageUrl, textOrUndefined, toPlainText } from './utils';

import type { EntityInput, JsonLdContext, JsonLdNode } from './types';

/**
 * Schema TouristAttraction de una entidad de tipo `environment` (capa 2).
 *
 * **Stub**: existe y está testeado, pero no se conecta al orquestador hasta
 * que exista el template de entidad. `url` solo si tiene ficha propia; `geo`
 * no se publica porque el modelo no guarda coordenadas de la atracción (las
 * del camping no valen).
 *
 * Spec: specs/seo-geo/schemas/environment.md
 *
 * @param entity - Entidad de Payload
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin nombre o sin descripción
 */
export function buildEnvironmentSchema(entity: EntityInput, ctx: JsonLdContext): JsonLdNode | null {
  const name = textOrUndefined(entity.name);
  const description = textOrUndefined(entity.shortDescription) ?? toPlainText(entity.description);
  if (!name || !description) return null;

  const slug = textOrUndefined(entity.slug);

  return omitEmpty({
    '@type': 'TouristAttraction',
    name,
    description,
    url: entity.hasOwnPage === true && slug ? pageUrl(ctx, slug) : undefined,
    image: imageUrl(ctx, entity.image),
    touristType: textOrUndefined(entity.tag),
  });
}
