import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import { resolveRoute } from '@hwe-platform/core-ui';

import config from '../../../payload.config';
import { AccommodationDetail } from '../../../components/AccommodationDetail';
import { PageTemplate } from '../../../components/PageTemplate';
import { PlaceholderTemplate } from '../../../components/PlaceholderTemplate';
import { DEFAULT_LOCALE, LOCALE_HEADER, PREFIX_DEFAULT_LOCALE, isSiteLocale } from '../../../i18n';
import { buildPageJsonLd, serializeJsonLd } from '../../../services/json-ld';
import { buscarDocumento } from '../../../services/routing/buscar-documento';

import type { ComponentType } from 'react';
import type { Breadcrumb, RoutableCollection } from '@hwe-platform/core-ui';
import type { TemplateProps } from '../../../components/template-types';
import type { SiteConfig } from '../../../payload-types';
import type { SiteLocale } from '../../../i18n';
import type { JsonLdContext, JsonLdGraph, SiteConfigInput } from '../../../services/json-ld';
import type { Metadata } from 'next';

/**
 * Rótulos de interfaz de la página. No salen de Payload; van en el idioma del
 * cliente, que en el diseño de referencia pone «Accueil» como primer nivel de
 * las migas, no el nombre del site.
 */
const ROTULOS = { inicio: 'Accueil' };

/**
 * Colección → plantilla.
 *
 * Por mapa y no por `if`: cada colección tiene su anatomía, y añadir una ficha
 * nueva es añadir una entrada aquí. `articles` y `entities` siguen en la
 * provisional hasta que llegue su historia.
 */
const TEMPLATES: Record<RoutableCollection, ComponentType<TemplateProps>> = {
  pages: PageTemplate,
  accommodations: AccommodationDetail,
  articles: PlaceholderTemplate,
  entities: PlaceholderTemplate,
};

type Args = {
  params: Promise<{ slug?: string[] }>;
};

/** Documento que ha respondido a la URL, con la colección de la que salió. */
type Resolved = {
  collection: RoutableCollection;
  doc: Record<string, unknown>;
};

/** Idioma activo, puesto por el middleware a partir del prefijo de la URL. */
async function currentLocale(): Promise<SiteLocale> {
  const headerList = await headers();
  const fromHeader = headerList.get(LOCALE_HEADER);
  return isSiteLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
}

/**
 * Busca el documento que responde a una URL: la home por su `type`, y el resto
 * por slug en las colecciones que fija `resolveRoute` (ver `buscarDocumento`).
 */
async function findDocument(
  params: { slug?: string[] },
  locale: SiteLocale,
): Promise<Resolved | null> {
  const payload = await getPayload({ config });
  const route = resolveRoute(params);

  if (route.kind === 'home') {
    const home = await payload.find({
      collection: 'pages',
      where: { type: { equals: 'home' } },
      locale,
      limit: 1,
    });
    const doc = home.docs[0];
    return doc ? { collection: 'pages', doc: doc as unknown as Record<string, unknown> } : null;
  }

  // Un slug sin traducir cae al del idioma principal (HU-022): ver `buscarPorSlug`.
  return buscarDocumento(payload, route.collections, {
    slug: route.slug,
    locale,
    defaultLocale: DEFAULT_LOCALE,
  });
}

/**
 * Niveles máximos del rastro. Es un tope de seguridad por si alguien encadena
 * una página consigo misma desde el panel, no un límite de diseño.
 */
const MAX_NIVELES_MIGAS = 6;

/**
 * Rastro de migas de una página, subiendo por su cadena de padres.
 *
 * Se construye aquí y no en el bloque porque depende del modelo de datos —de
 * `pages.parent`—, mientras que el hero solo sabe pintar una lista.
 *
 * El último nivel es la página actual y va sin enlace, que es lo que marca
 * dónde estás.
 */
function breadcrumbsOf(doc: Record<string, unknown>, inicio: string): Breadcrumb[] {
  const migas: Breadcrumb[] = [];
  let actual: Record<string, unknown> | undefined = doc;

  for (let i = 0; i < MAX_NIVELES_MIGAS && actual !== undefined; i++) {
    // `title` en páginas y artículos, `name` en alojamientos y entidades.
    const nombre: unknown = actual.title ?? actual.name;
    const titulo = typeof nombre === 'string' ? nombre : undefined;
    if (titulo) migas.unshift({ label: titulo, url: `/${String(actual.slug ?? '')}` });

    const padre: unknown = actual.parent;
    actual =
      padre !== null && typeof padre === 'object' ? (padre as Record<string, unknown>) : undefined;
  }

  migas.unshift({ label: inicio, url: '/' });

  // El último nivel es la página actual: va sin enlace.
  const ultimo = migas[migas.length - 1];
  if (ultimo) delete ultimo.url;

  return migas;
}

/** Bloques del documento, si es una página con page builder. */
function blocksOf(resolved: Resolved) {
  const blocks = resolved.doc.blocks;
  return Array.isArray(blocks) ? blocks : [];
}

/**
 * Contexto del JSON-LD para la petición.
 *
 * schema.org quiere URLs absolutas, y la URL pública del site solo la sabe el
 * entorno (`NEXT_PUBLIC_SERVER_URL`). Sin ella no se publica JSON-LD: mejor
 * nada que URLs relativas que Google descarta.
 */
function jsonLdContext(locale: SiteLocale): JsonLdContext | null {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');
  if (!siteUrl) return null;

  const sinPrefijo = locale === DEFAULT_LOCALE && !PREFIX_DEFAULT_LOCALE;
  return { siteUrl, locale, localePrefix: sinPrefijo ? '' : `/${locale}` };
}

/** Lo que el JSON-LD de la página necesita del catch-all. */
type JsonLdArgs = {
  resolved: Resolved;
  siteConfig: SiteConfig | null;
  locale: SiteLocale;
  slug: string[] | undefined;
  /** Las mismas migas que pinta el hero, para que el rastro visible y el de Google coincidan. */
  breadcrumbs: Breadcrumb[];
};

/** JSON-LD de la página (HU-013), o `null` si no hay URL base del site. */
function pageJsonLd({
  resolved,
  siteConfig,
  locale,
  slug,
  breadcrumbs,
}: JsonLdArgs): JsonLdGraph | null {
  const ctx = jsonLdContext(locale);
  if (!ctx) return null;

  return buildPageJsonLd(
    {
      resolved,
      siteConfig: (siteConfig ?? {}) as SiteConfigInput,
      path: slug?.length ? `/${slug.join('/')}` : '/',
      breadcrumbs: breadcrumbs.map(({ label, url }) => ({ name: label, path: url })),
      blocks: blocksOf(resolved),
    },
    ctx,
  );
}

/** Un solo `<script>` con todo el `@graph` de la página (decisión #1 de HU-013). */
function JsonLdScript({ graph }: { graph: JsonLdGraph | null }) {
  if (!graph) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const resolved = await findDocument(await params, await currentLocale());
  if (!resolved) return {};

  const seo = resolved.doc.seo as { metaTitle?: string; metaDescription?: string } | undefined;
  const title = seo?.metaTitle ?? (resolved.doc.title as string) ?? (resolved.doc.name as string);

  return { title, description: seo?.metaDescription };
}

/**
 * Catch-all que resuelve cualquier URL contra Payload (DEC-009).
 *
 * Va con doble corchete porque `[...slug]` no captura la raíz, y dentro del
 * route group `(frontend)` para no chocar con `(payload)`.
 *
 * Es solo el orquestador: resuelve el documento, lee `site-config`, pinta el
 * JSON-LD y entrega el resto a la plantilla de su colección.
 */
export default async function CatchAllPage({ params }: Args) {
  const locale = await currentLocale();
  const route = await params;
  const resolved = await findDocument(route, locale);
  if (!resolved) notFound();

  const payload = await getPayload({ config });

  // `layout.tsx` envuelve las mismas lecturas para degradar en vez de tumbar
  // la página; esta ruta hacía lo contrario y un global sin configurar la
  // devolvía como 500.
  const siteConfig = await payload
    .findGlobal({ slug: 'site-config', depth: 1, locale })
    .catch(() => null);

  const breadcrumbs = breadcrumbsOf(resolved.doc, ROTULOS.inicio);
  const jsonLd = pageJsonLd({ resolved, siteConfig, locale, slug: route.slug, breadcrumbs });
  const Template = TEMPLATES[resolved.collection];

  // El <main> lo pone SiteLayout: la página solo aporta su contenido.
  return (
    <>
      <JsonLdScript graph={jsonLd} />
      <Template
        doc={resolved.doc}
        locale={locale}
        siteConfig={siteConfig}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}

/**
 * Cada petición consulta Payload.
 *
 * El ISR que describe hwe-tools/docs/arquitectura/paginas-routing.md no se puede montar
 * todavía: esta página lee por la Local API de Payload, que es acceso directo
 * a la base de datos y no un `fetch`, así que Next no puede etiquetar el
 * resultado por su cuenta. Sin etiquetas, lo que cachea no lo suelta nunca —
 * ni siquiera un 404 de una página que después se crea.
 *
 * Hacerlo bien exige `'use cache'` + `cacheTag()` de Next 16, que requiere
 * activar una bandera experimental que afectaría también al admin de Payload.
 * Es una decisión con alcance propio, y renderizar en cada petición es
 * correcto —solo más lento—, así que queda para cuando el rendimiento importe
 * de verdad (HU-012, el deploy). La infraestructura de invalidación ya está
 * lista desde HU-005: `revalidationTags()` calcula los tags y los hooks
 * `afterChange` los disparan.
 */
export const dynamic = 'force-dynamic';
