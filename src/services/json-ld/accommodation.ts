import {
  buildImageArray,
  imageUrl,
  nodeId,
  numberOrUndefined,
  omitEmpty,
  pageUrl,
  textOrUndefined,
  toPlainText,
} from './utils';

import type { AccommodationInput, JsonLdContext, JsonLdNode } from './types';

/** Tipo de alojamiento que es una parcela: se publica como CampingPitch, el resto como Accommodation. */
const PITCH_TYPE = 'emplacement';

/** Código UN/CEFACT de metro cuadrado, el que schema.org espera en `floorSize`. */
const SQUARE_METRE = 'MTK';

/**
 * `@type` de schema.org de un alojamiento según su `type` en Payload.
 *
 * @param type - `accommodations.type`
 */
export function accommodationSchemaType(type: string | null | undefined): string {
  return type === PITCH_TYPE ? 'CampingPitch' : 'Accommodation';
}

/**
 * Oferta de precio de un alojamiento, solo si tiene precio `from` numérico.
 * No se inventa precio ni unidad: la unidad no está en el modelo de datos.
 *
 * @param pricing - `accommodations.pricing`
 */
export function buildOffer(pricing: AccommodationInput['pricing']): JsonLdNode | undefined {
  const price = numberOrUndefined(pricing?.from);
  if (price === undefined) return undefined;

  return {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price,
      priceCurrency: textOrUndefined(pricing?.currency) ?? 'EUR',
    },
  };
}

/** Descripción de un alojamiento: la corta si existe, si no el texto plano de la larga. */
function descriptionOf(accommodation: AccommodationInput): string | undefined {
  return textOrUndefined(accommodation.shortDescription) ?? toPlainText(accommodation.description);
}

/**
 * Resumen de un alojamiento para `containsPlace` (home y listados).
 *
 * @param accommodation - Alojamiento de Payload
 * @param ctx - Contexto de la petición
 * @returns El resumen, o `null` sin nombre o sin slug (sin URL no se puede enlazar)
 */
export function buildAccommodationSummary(
  accommodation: AccommodationInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(accommodation.name);
  const slug = textOrUndefined(accommodation.slug);
  if (!name || !slug) return null;

  return omitEmpty({
    '@type': accommodationSchemaType(accommodation.type),
    name,
    url: pageUrl(ctx, slug),
    description: descriptionOf(accommodation),
    image: imageUrl(ctx, accommodation.media?.mainImage),
    offers: buildOffer(accommodation.pricing),
  });
}

/** Equipamiento incluido, como LocationFeatureSpecification. */
function amenitiesOf(accommodation: AccommodationInput): JsonLdNode[] {
  return (accommodation.equipment ?? []).flatMap((item) => {
    const name = textOrUndefined(item.label);
    return item.included === true && name
      ? [{ '@type': 'LocationFeatureSpecification', name, value: true }]
      : [];
  });
}

/** Superficie en m², como QuantitativeValue. */
function floorSizeOf(surface: number | null | undefined): JsonLdNode | undefined {
  const value = numberOrUndefined(surface);
  return value === undefined
    ? undefined
    : { '@type': 'QuantitativeValue', value, unitCode: SQUARE_METRE };
}

/** Capacidad de personas, como QuantitativeValue. */
function occupancyOf(capacity: number | null | undefined): JsonLdNode | undefined {
  const value = numberOrUndefined(capacity);
  return value === undefined ? undefined : { '@type': 'QuantitativeValue', value };
}

/** Campos que salen de `specs`: capacidad, habitaciones, superficie y mascotas. */
function specsFieldsOf(accommodation: AccommodationInput) {
  const specs = accommodation.specs;
  const esParcela = accommodation.type === PITCH_TYPE;

  return {
    occupancy: occupancyOf(specs?.capacity),
    numberOfRooms: esParcela ? undefined : numberOrUndefined(specs?.bedrooms),
    floorSize: floorSizeOf(specs?.surface),
    petsAllowed: typeof specs?.petFriendly === 'boolean' ? specs.petFriendly : undefined,
  };
}

/**
 * Schema Accommodation / CampingPitch de la ficha de un alojamiento (capa 2).
 *
 * `numberOfRooms` no se publica en parcelas; `petsAllowed` solo si el campo
 * está definido (no se asume `false`).
 *
 * Spec: specs/seo-geo/schemas/accommodation.md
 *
 * @param accommodation - Alojamiento de Payload
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` si falta nombre, descripción o slug (obligatorios)
 */
export function buildAccommodationSchema(
  accommodation: AccommodationInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(accommodation.name);
  const description = descriptionOf(accommodation);
  const slug = textOrUndefined(accommodation.slug);
  if (!name || !description || !slug) return null;

  return omitEmpty({
    '@type': accommodationSchemaType(accommodation.type),
    name,
    description,
    url: pageUrl(ctx, slug),
    image: buildImageArray(ctx, accommodation.media?.gallery),
    ...specsFieldsOf(accommodation),
    amenityFeature: amenitiesOf(accommodation),
    offers: buildOffer(accommodation.pricing),
    containedInPlace: { '@id': nodeId(ctx, 'campground') },
    accommodationCategory: textOrUndefined(accommodation.subtype),
  });
}
