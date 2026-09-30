import type { BUSINESS_TYPES } from '@hwe-platform/core-ui';

/** Tipo de negocio del cliente, tal y como lo guarda `site-config.general.businessType`. */
export type BusinessType = (typeof BUSINESS_TYPES)[number];

/** `@type` de schema.org que corresponde a cada tipo de negocio (specs/seo-geo/schemas/campground.md). */
export const BUSINESS_SCHEMA_TYPES = {
  campground: 'Campground',
  hotel: 'Hotel',
  resort: 'Resort',
  guesthouse: 'BedAndBreakfast',
} as const satisfies Record<BusinessType, string>;

/** Un nodo JSON-LD cualquiera: un `@type` más los campos que traiga. */
export type JsonLdNode = { '@type': string; '@id'?: string } & Record<string, unknown>;

/** Referencia a otro nodo del mismo `@graph`, por su `@id`. */
export type JsonLdRef = { '@id': string };

/** Documento JSON-LD completo: un solo `@graph` con todos los nodos de la página. */
export type JsonLdGraph = {
  '@context': 'https://schema.org';
  '@graph': JsonLdNode[];
};

/**
 * Lo que todo builder necesita saber de la petición y no sale de Payload.
 *
 * `siteUrl` es la URL base sin barra final (`https://example.com`) y
 * `localePrefix` el prefijo del idioma activo en las URLs (`''` para el
 * principal, `'/en'` para el inglés). Los `@id` usan solo `siteUrl`: son
 * identificadores del negocio, no páginas, y no cambian con el idioma.
 */
export type JsonLdContext = {
  siteUrl: string;
  locale: string;
  localePrefix: string;
};

/*
 * Formas de entrada. Son deliberadamente laxas —todo opcional, media y richText
 * como `unknown`— porque llegan de Payload tal cual: un campo sin rellenar
 * viene como `null` o no viene, y un builder que exigiera el tipo completo
 * reventaría en vez de omitir el campo, que es lo que piden las specs.
 */

/** Campos de `site-config` que usan los schemas. */
export type SiteConfigInput = {
  general?: {
    siteName?: string | null;
    siteDescription?: string | null;
    logo?: unknown;
    stars?: number | null;
    businessType?: BusinessType | null;
  } | null;
  contact?: {
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
  location?: { latitude?: number | null; longitude?: number | null } | null;
  languages?: { available?: string[] | null; default?: string | null } | null;
  social?: Record<string, string | null | undefined> | null;
  payments?: string[] | null;
};

/** Campos de un alojamiento que usan los schemas. */
export type AccommodationInput = {
  name?: string | null;
  slug?: string | null;
  type?: string | null;
  subtype?: string | null;
  shortDescription?: string | null;
  description?: unknown;
  featured?: boolean | null;
  specs?: {
    capacity?: number | null;
    bedrooms?: number | null;
    surface?: number | null;
    petFriendly?: boolean | null;
  } | null;
  equipment?: Array<{ label?: string | null; included?: boolean | null }> | null;
  pricing?: { from?: number | null; currency?: string | null } | null;
  media?: { mainImage?: unknown; gallery?: unknown[] | null } | null;
};

/** Campos de una página que usan los schemas. */
export type PageInput = {
  title?: string | null;
  slug?: string | null;
  type?: string | null;
  seo?: { metaDescription?: string | null } | null;
  hero?: { media?: unknown } | null;
};

/** Campos de una entidad (restaurante, evento, entorno) que usan los schemas. */
export type EntityInput = {
  name?: string | null;
  slug?: string | null;
  type?: string | null;
  shortDescription?: string | null;
  description?: unknown;
  image?: unknown;
  tag?: string | null;
  hasOwnPage?: boolean | null;
  features?: Array<{ label?: string | null }> | null;
  ctas?: Array<{ label?: string | null; url?: string | null }> | null;
  /** Fecha de inicio del evento. El modelo de datos aún no la tiene (ver event.md). */
  startDate?: string | null;
  endDate?: string | null;
};

/** Campos de un artículo que usan los schemas. */
export type ArticleInput = {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  image?: unknown;
  author?: string | null;
  category?: string | null;
};

/** Una pregunta de un bloque FAQ. La respuesta es richText de Lexical. */
export type FaqItemInput = { question?: string | null; answer?: unknown };

/** Un peldaño de las migas: nombre visible y ruta relativa (sin idioma). El último va sin ruta. */
export type BreadcrumbInput = { name: string; path?: string };
