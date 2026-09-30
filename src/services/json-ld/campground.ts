import { buildAccommodationSummary } from './accommodation';
import {
  buildAddress,
  buildGeo,
  buildImageArray,
  buildSameAs,
  businessSchemaType,
  imageUrl,
  nodeId,
  numberOrUndefined,
  omitEmpty,
  pageUrl,
  textOrUndefined,
} from './utils';

import type { AccommodationInput, JsonLdContext, JsonLdNode, SiteConfigInput } from './types';

/** Datos de la home que completan el schema del negocio, además de site-config. */
export type CampgroundExtras = {
  /** Media del hero de la home: es la imagen del negocio. */
  heroMedia?: unknown;
  /** Alojamientos disponibles; se resumen en `containsPlace` los destacados. */
  accommodations?: AccommodationInput[];
};

/**
 * `petsAllowed` del negocio, calculado de sus alojamientos. Sin datos no se
 * responde: `true` si alguno admite mascotas, `false` solo si todos los que
 * lo dicen dicen que no, y `undefined` si ninguno lo dice.
 */
function petsAllowedOf(accommodations: AccommodationInput[]): boolean | undefined {
  const valores = accommodations
    .map((accommodation) => accommodation.specs?.petFriendly)
    .filter((valor): valor is boolean => typeof valor === 'boolean');
  if (valores.length === 0) return undefined;
  return valores.some(Boolean);
}

/** Canal de contacto para reservas, solo si hay teléfono. */
function contactPointOf(siteConfig: SiteConfigInput): JsonLdNode | undefined {
  const telephone = textOrUndefined(siteConfig.contact?.phone);
  if (!telephone) return undefined;
  return {
    '@type': 'ContactPoint',
    telephone,
    contactType: 'reservations',
    availableLanguage: siteConfig.languages?.available ?? [],
  };
}

/** Clasificación en estrellas, solo si existe. */
function starRatingOf(stars: number | null | undefined): JsonLdNode | undefined {
  const valor = numberOrUndefined(stars);
  return valor === undefined ? undefined : { '@type': 'Rating', ratingValue: String(valor) };
}

/** Formas de pago aceptadas; schema.org las quiere como un solo texto. */
function paymentAcceptedOf(payments: string[] | null | undefined): string | undefined {
  const lista = (payments ?? []).map((pago) => pago.trim()).filter(Boolean);
  return lista.length > 0 ? lista.join(', ') : undefined;
}

/** Datos de contacto y presencia del negocio que salen solo de site-config. */
function contactFieldsOf(siteConfig: SiteConfigInput, ctx: JsonLdContext) {
  const { general, contact } = siteConfig;

  return {
    logo: imageUrl(ctx, general?.logo),
    geo: buildGeo(siteConfig.location),
    telephone: textOrUndefined(contact?.phone),
    email: textOrUndefined(contact?.email),
    starRating: starRatingOf(general?.stars),
    sameAs: buildSameAs(siteConfig.social),
    contactPoint: contactPointOf(siteConfig),
    paymentAccepted: paymentAcceptedOf(siteConfig.payments),
  };
}

/** Lo que el negocio aporta desde sus alojamientos: mascotas y destacados. */
function accommodationFieldsOf(accommodations: AccommodationInput[], ctx: JsonLdContext) {
  const destacados = accommodations.filter((accommodation) => accommodation.featured === true);
  return {
    petsAllowed: petsAllowedOf(accommodations),
    containsPlace: destacados.flatMap((acc) => buildAccommodationSummary(acc, ctx) ?? []),
  };
}

/**
 * Schema del negocio en la home (capa 2): Campground, Hotel, Resort o
 * BedAndBreakfast según `site-config.general.businessType`.
 *
 * No incluye `openingHoursSpecification` —`openingDates` es texto libre, no
 * fechas— ni `aggregateRating` —no hay sistema de reseñas (decisión #7 de
 * HU-013)—, ni `amenityFeature`, que sale de entidades aún sin consultar.
 *
 * Spec: specs/seo-geo/schemas/campground.md
 *
 * @param siteConfig - Global site-config
 * @param ctx - Contexto de la petición
 * @param extras - Media del hero y alojamientos, si los hay
 * @returns El nodo, o `null` si falta nombre, descripción o dirección completa
 */
export function buildCampgroundSchema(
  siteConfig: SiteConfigInput,
  ctx: JsonLdContext,
  extras: CampgroundExtras = {},
): JsonLdNode | null {
  const name = textOrUndefined(siteConfig.general?.siteName);
  const description = textOrUndefined(siteConfig.general?.siteDescription);
  const address = buildAddress(siteConfig.contact);
  if (!name || !description || !address) return null;

  return omitEmpty({
    '@type': businessSchemaType(siteConfig),
    '@id': nodeId(ctx, 'campground'),
    name,
    description,
    url: pageUrl(ctx),
    image: buildImageArray(ctx, [extras.heroMedia]),
    address,
    ...contactFieldsOf(siteConfig, ctx),
    ...accommodationFieldsOf(extras.accommodations ?? [], ctx),
  });
}
