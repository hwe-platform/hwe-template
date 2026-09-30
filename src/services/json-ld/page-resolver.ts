import { buildAccommodationSchema } from './accommodation';
import { buildAccommodationListingSchema } from './accommodation-listing';
import { buildOrganizationSchema, buildWebSiteSchema } from './base';
import { buildBreadcrumbSchema } from './breadcrumbs';
import { buildCampgroundSchema } from './campground';
import { buildContactPageSchema } from './contact-page';
import { buildFAQSchema } from './faq';
import { pageUrl, textOrUndefined, wrapInGraph } from './utils';
import { buildWebPageSchema } from './web-page';

import type {
  AccommodationInput,
  BreadcrumbInput,
  JsonLdContext,
  JsonLdGraph,
  JsonLdNode,
  PageInput,
  SiteConfigInput,
} from './types';
import type { RoutableCollection } from '@hwe-platform/core-ui';

/** Documento que ha respondido a la URL, tal y como lo devuelve el catch-all. */
export type ResolvedContent = {
  collection: RoutableCollection;
  doc: Record<string, unknown>;
};

/** Todo lo que el orquestador necesita de la página ya resuelta. */
export type PageJsonLdInput = {
  resolved: ResolvedContent;
  siteConfig: SiteConfigInput;
  /** Ruta sin idioma: `/` en la home, `/le-camping` en el resto. */
  path: string;
  /** Migas desde la home; no se usan en la home. */
  breadcrumbs: BreadcrumbInput[];
  /** Bloques de la página, para detectar los FAQ. */
  blocks?: unknown[];
  /** Alojamientos que muestra la página (home destacados, listados). */
  accommodations?: AccommodationInput[];
};

/** Schemas de capa 2 de una página del page builder, según su `type`. */
function pageSchemas(input: PageJsonLdInput, ctx: JsonLdContext): Array<JsonLdNode | null> {
  const page = input.resolved.doc as PageInput;
  const accommodations = input.accommodations ?? [];
  const faq = buildFAQSchema((input.blocks ?? []) as Array<{ blockType?: unknown }>);

  switch (page.type) {
    case 'home':
      return [
        buildCampgroundSchema(input.siteConfig, ctx, {
          heroMedia: page.hero?.media,
          accommodations,
        }),
        faq,
      ];
    case 'contact':
      return [buildContactPageSchema(page, ctx), faq];
    case 'listing':
      return [
        buildAccommodationListingSchema(
          { page, accommodations, siteConfig: input.siteConfig },
          ctx,
        ),
        faq,
      ];
    default:
      return [faq];
  }
}

/**
 * Schemas de capa 2 del contenido resuelto.
 *
 * Restaurant, Event, BlogPosting y TouristAttraction existen como builders
 * pero no se conectan aquí hasta que sus templates existan (HU-013,
 * "Schemas implementados vs diferidos"): entidades y artículos caen en WebPage.
 */
function specificSchemas(input: PageJsonLdInput, ctx: JsonLdContext): JsonLdNode[] {
  const { collection, doc } = input.resolved;
  let schemas: Array<JsonLdNode | null> = [];

  if (collection === 'pages') schemas = pageSchemas(input, ctx);
  if (collection === 'accommodations') {
    schemas = [buildAccommodationSchema(doc as AccommodationInput, ctx)];
  }

  return schemas.filter((schema): schema is JsonLdNode => schema !== null);
}

/** Fallback de capa 3: WebPage con lo que tenga cualquier contenido. */
function fallbackSchema(input: PageJsonLdInput, ctx: JsonLdContext): JsonLdNode | null {
  const doc = input.resolved.doc;
  const seo = doc.seo as { metaDescription?: unknown } | null | undefined;

  return buildWebPageSchema(
    {
      name: textOrUndefined(doc.title) ?? textOrUndefined(doc.name),
      description:
        textOrUndefined(seo?.metaDescription) ??
        textOrUndefined(doc.shortDescription) ??
        textOrUndefined(doc.excerpt),
      url: pageUrl(ctx, input.path),
    },
    ctx,
  );
}

/** Si el contenido resuelto es la home del site. */
function isHome(resolved: ResolvedContent): boolean {
  return resolved.collection === 'pages' && resolved.doc.type === 'home';
}

/**
 * JSON-LD completo de una página: un solo `@graph` con las tres capas.
 *
 * - Capa 1: WebSite + Organization siempre; BreadcrumbList salvo en la home.
 * - Capa 2: el schema propio del tipo de contenido, si lo tiene.
 * - Capa 3: WebPage si la capa 2 no ha generado nada. Ninguna página sale sin
 *   JSON-LD.
 *
 * Spec: specs/seo-geo/schemas/index.md
 *
 * @param input - Contenido resuelto, site-config, ruta, migas y bloques
 * @param ctx - Contexto de la petición (URL base, idioma)
 * @returns El documento JSON-LD listo para serializar
 */
export function buildPageJsonLd(input: PageJsonLdInput, ctx: JsonLdContext): JsonLdGraph {
  const base = [
    buildWebSiteSchema(input.siteConfig, ctx),
    buildOrganizationSchema(input.siteConfig, ctx),
    isHome(input.resolved) ? null : buildBreadcrumbSchema(input.breadcrumbs, ctx),
  ];

  const specific = specificSchemas(input, ctx);
  const page = specific.length > 0 ? specific : [fallbackSchema(input, ctx)];

  return wrapInGraph(...base, ...page);
}
