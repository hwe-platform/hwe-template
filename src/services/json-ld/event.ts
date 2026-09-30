import {
  buildAddress,
  imageUrl,
  nodeId,
  omitEmpty,
  pageUrl,
  textOrUndefined,
  toPlainText,
} from './utils';

import type { EntityInput, JsonLdContext, JsonLdNode, SiteConfigInput } from './types';

/** Evento y site-config: el lugar del evento es el propio camping. */
export type EventInput = { entity: EntityInput; siteConfig: SiteConfigInput };

/** Fecha ISO 8601 válida, o `undefined`. */
function validDate(value: string | null | undefined): Date | undefined {
  const texto = textOrUndefined(value);
  if (!texto) return undefined;
  const fecha = new Date(texto);
  return Number.isNaN(fecha.getTime()) ? undefined : fecha;
}

/** Lugar del evento: el camping, si el site tiene nombre. */
function locationOf(siteConfig: SiteConfigInput): JsonLdNode | undefined {
  const name = textOrUndefined(siteConfig.general?.siteName);
  return name ? { '@type': 'Place', name, address: buildAddress(siteConfig.contact) } : undefined;
}

/** URL de la ficha del evento, solo si tiene ficha propia. */
function eventUrlOf(entity: EntityInput, ctx: JsonLdContext): string | undefined {
  const slug = textOrUndefined(entity.slug);
  return entity.hasOwnPage === true && slug ? pageUrl(ctx, slug) : undefined;
}

/**
 * Schema Event de la ficha de una entidad de tipo `event` (capa 2).
 *
 * **Stub**: existe y está testeado, pero no se conecta al orquestador hasta
 * que exista el template de entidad — y el modelo de datos aún no tiene fecha
 * de evento, que es obligatoria para Google.
 *
 * Spec: specs/seo-geo/schemas/event.md
 *
 * @param input - Entidad y site-config
 * @param ctx - Contexto de la petición
 * @param now - Momento actual, para decidir `eventStatus` (inyectable en tests)
 * @returns El nodo, o `null` sin nombre o sin fecha de inicio válida
 */
export function buildEventSchema(
  { entity, siteConfig }: EventInput,
  ctx: JsonLdContext,
  now: Date = new Date(),
): JsonLdNode | null {
  const name = textOrUndefined(entity.name);
  const start = validDate(entity.startDate);
  if (!name || !start) return null;

  return omitEmpty({
    '@type': 'Event',
    name,
    description: textOrUndefined(entity.shortDescription) ?? toPlainText(entity.description),
    url: eventUrlOf(entity, ctx),
    image: imageUrl(ctx, entity.image),
    startDate: textOrUndefined(entity.startDate),
    endDate: validDate(entity.endDate) ? textOrUndefined(entity.endDate) : undefined,
    location: locationOf(siteConfig),
    organizer: { '@id': nodeId(ctx, 'organization') },
    eventStatus: start > now ? 'https://schema.org/EventScheduled' : undefined,
  });
}
