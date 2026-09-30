import type { RoutableCollection } from '@hwe-platform/core-ui';
import type { Payload } from 'payload';
import type { SiteLocale } from '../../i18n';

/** Documento que ha respondido a una URL, con la colección de la que salió. */
export type DocumentoResuelto = {
  collection: RoutableCollection;
  doc: Record<string, unknown>;
};

/** Lo que necesita la búsqueda de un slug en una colección. */
export type BusquedaDeSlug = {
  collection: RoutableCollection;
  slug: string;
  locale: SiteLocale;
  /** El idioma principal del site, del que se hereda un slug sin traducir. */
  defaultLocale: SiteLocale;
};

/** Una colección y un idioma: dónde se busca. */
type Donde = { collection: RoutableCollection; locale: SiteLocale };

/** El primer documento con ese slug en ese idioma, o `null`. */
async function porSlug(
  payload: Payload,
  { collection, locale }: Donde,
  slug: string,
): Promise<Record<string, unknown> | null> {
  const encontrados = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    locale,
    limit: 1,
  });
  return (encontrados.docs[0] as unknown as Record<string, unknown> | undefined) ?? null;
}

/**
 * El slug que el documento tiene **en ese idioma**, sin respaldo: `undefined`
 * si el editor no lo tradujo.
 */
async function slugPropio(
  payload: Payload,
  { collection, locale }: Donde,
  id: string | number,
): Promise<string | undefined> {
  const doc = (await payload.findByID({
    collection,
    id,
    locale,
    fallbackLocale: false,
    depth: 0,
  })) as unknown as { slug?: unknown };
  return typeof doc.slug === 'string' && doc.slug !== '' ? doc.slug : undefined;
}

/**
 * El documento de una colección que responde a un slug en un idioma.
 *
 * `slug` es un campo localizado, y Payload busca en la columna del idioma
 * pedido: el `fallback` de la localización rellena lo que **devuelve**, no
 * dónde **busca**. Así que una página cuyo slug solo existe en francés daba
 * 404 en `/en/…` aunque su contenido cayera al francés sin problema (HU-022).
 *
 * Si no aparece en el idioma pedido, se busca en el principal, y solo se usa
 * si el documento **no tiene slug propio** en el idioma pedido. Si lo tiene,
 * su URL en ese idioma es la otra, y aceptar también la del idioma principal
 * duplicaría la página para los buscadores.
 *
 * El documento se devuelve leído en el idioma pedido, con el respaldo normal
 * de Payload para lo que no esté traducido.
 *
 * @returns El documento, o `null` si el slug no responde en esa colección
 */
export async function buscarPorSlug(
  payload: Payload,
  { collection, slug, locale, defaultLocale }: BusquedaDeSlug,
): Promise<Record<string, unknown> | null> {
  const directo = await porSlug(payload, { collection, locale }, slug);
  if (directo || locale === defaultLocale) return directo;

  const original = await porSlug(payload, { collection, locale: defaultLocale }, slug);
  if (!original) return null;

  const id = original.id as string | number;
  if (await slugPropio(payload, { collection, locale }, id)) return null;

  return (await payload.findByID({ collection, id, locale })) as unknown as Record<string, unknown>;
}

/**
 * Recorre las colecciones en orden y devuelve el primer documento que responde.
 *
 * La búsqueda es secuencial a propósito: para el volumen de un site HWE
 * (20-50 páginas) sobra, y la Local API va directa a la base de datos sin
 * pasar por HTTP (hwe-tools/docs/arquitectura/paginas-routing.md).
 */
export async function buscarDocumento(
  payload: Payload,
  collections: readonly RoutableCollection[],
  busqueda: Omit<BusquedaDeSlug, 'collection'>,
): Promise<DocumentoResuelto | null> {
  for (const collection of collections) {
    const doc = await buscarPorSlug(payload, { ...busqueda, collection });
    if (doc) return { collection, doc };
  }
  return null;
}
