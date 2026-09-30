import { buildAccommodationSummary } from './accommodation';
import { businessSchemaType, omitEmpty, pageUrl, textOrUndefined } from './utils';

import type {
  AccommodationInput,
  JsonLdContext,
  JsonLdNode,
  PageInput,
  SiteConfigInput,
} from './types';

/** Lo que necesita el schema de un listado: la página, sus alojamientos y el site. */
export type AccommodationListingInput = {
  page: PageInput;
  accommodations: AccommodationInput[];
  siteConfig: SiteConfigInput;
};

/**
 * Schema de una página de listado de alojamientos (capa 2): el negocio con
 * `containsPlace` resumiendo cada alojamiento de la página.
 *
 * Spec: specs/seo-geo/schemas/accommodation-listing.md
 *
 * @param input - Página, alojamientos que muestra y site-config
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin título o sin ningún alojamiento enlazable —
 *   entonces la página cae en WebPage
 */
export function buildAccommodationListingSchema(
  { page, accommodations, siteConfig }: AccommodationListingInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(page.title);
  const containsPlace = accommodations.flatMap(
    (accommodation) => buildAccommodationSummary(accommodation, ctx) ?? [],
  );
  if (!name || containsPlace.length === 0) return null;

  return omitEmpty({
    '@type': businessSchemaType(siteConfig),
    name,
    url: pageUrl(ctx, textOrUndefined(page.slug)),
    description: textOrUndefined(page.seo?.metaDescription),
    containsPlace,
  });
}
