import {
  absoluteUrl,
  buildAddress,
  buildGeo,
  imageUrl,
  nodeId,
  omitEmpty,
  pageUrl,
  textOrUndefined,
  toPlainText,
} from './utils';

import type { EntityInput, JsonLdContext, JsonLdNode, SiteConfigInput } from './types';

/** Palabras que delatan que un CTA lleva a la carta del restaurante. */
const MENU_KEYWORDS = /carte|menu/i;

/** URL absoluta de la carta, si algún CTA apunta a ella. */
function menuUrlOf(entity: EntityInput, ctx: JsonLdContext): string | undefined {
  const cta = (entity.ctas ?? []).find(
    (item) => MENU_KEYWORDS.test(item.label ?? '') && textOrUndefined(item.url),
  );
  return cta?.url ? absoluteUrl(ctx, cta.url) : undefined;
}

/** Características del restaurante, como LocationFeatureSpecification. */
function amenitiesOf(entity: EntityInput): JsonLdNode[] {
  return (entity.features ?? []).flatMap((feature) => {
    const name = textOrUndefined(feature.label);
    return name ? [{ '@type': 'LocationFeatureSpecification', name, value: true }] : [];
  });
}

/**
 * Schema Restaurant de la ficha de una entidad de tipo `restaurant` (capa 2).
 *
 * **Stub**: existe y está testeado, pero no se conecta al orquestador hasta
 * que exista el template de entidad. No publica horarios: `schedule.periods`
 * guarda las horas como texto libre, y la spec pide omitirlas antes que forzar
 * el formato.
 *
 * Spec: specs/seo-geo/schemas/restaurant.md
 *
 * @param entity - Entidad de Payload
 * @param siteConfig - Global site-config (dirección y teléfono del camping)
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin ficha propia, nombre, descripción o slug
 */
export function buildRestaurantSchema(
  entity: EntityInput,
  siteConfig: SiteConfigInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(entity.name);
  const description = toPlainText(entity.description) ?? textOrUndefined(entity.shortDescription);
  const slug = textOrUndefined(entity.slug);
  if (entity.hasOwnPage !== true || !name || !description || !slug) return null;

  return omitEmpty({
    '@type': 'Restaurant',
    name,
    description,
    url: pageUrl(ctx, slug),
    image: imageUrl(ctx, entity.image),
    address: buildAddress(siteConfig.contact),
    geo: buildGeo(siteConfig.location),
    telephone: textOrUndefined(siteConfig.contact?.phone),
    servesCuisine: textOrUndefined(entity.tag),
    hasMenu: menuUrlOf(entity, ctx),
    amenityFeature: amenitiesOf(entity),
    containedInPlace: { '@id': nodeId(ctx, 'campground') },
  });
}
