import { mediaUrl } from '@hwe-platform/core-ui';

import { BUSINESS_SCHEMA_TYPES } from './types';

import type { MediaRef } from '@hwe-platform/core-ui';
import type { JsonLdContext, JsonLdGraph, JsonLdNode, SiteConfigInput } from './types';

/** Tipo del nodo PostalAddress. */
export type PostalAddress = {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
};

/** Tipo del nodo GeoCoordinates. */
export type GeoCoordinates = { '@type': 'GeoCoordinates'; latitude: number; longitude: number };

/** Valor vacío a efectos de JSON-LD: no se publica nunca (principio "solo datos reales"). */
function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Quita de un objeto, en profundidad, los campos `undefined`, `null`, cadenas
 * vacías, arrays vacíos y objetos que se quedan vacíos.
 *
 * `false` y `0` se conservan: son datos (un alojamiento que no admite
 * mascotas), no ausencia de dato.
 *
 * @param obj - Objeto a limpiar
 * @returns Copia del objeto sin campos vacíos
 */
export function omitEmpty<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => omitEmpty(item)).filter((item) => !isEmpty(item)) as T;
  }
  if (obj === null || typeof obj !== 'object') return obj;

  const limpio: Record<string, unknown> = {};
  for (const [clave, valor] of Object.entries(obj)) {
    const valorLimpio = omitEmpty(valor);
    if (!isEmpty(valorLimpio)) limpio[clave] = valorLimpio;
  }
  return limpio as T;
}

/** Texto no vacío tras recortar, o `undefined`. */
export function textOrUndefined(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}

/** Número finito, o `undefined`. */
export function numberOrUndefined(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

/**
 * URL absoluta a partir de una ruta o URL de media.
 *
 * Las URLs de media de Payload llegan relativas (`/api/media/file/x.jpg`);
 * schema.org las quiere absolutas.
 *
 * @param ctx - Contexto con la URL base del site
 * @param pathOrUrl - Ruta relativa o URL ya absoluta
 */
export function absoluteUrl(ctx: JsonLdContext, pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const ruta = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${ctx.siteUrl}${ruta}`;
}

/**
 * URL absoluta de una página del site en el idioma activo.
 *
 * @param ctx - Contexto con la URL base y el prefijo de idioma
 * @param path - Ruta sin idioma (`/le-camping`). Sin ruta o `/` es la home.
 */
export function pageUrl(ctx: JsonLdContext, path?: string): string {
  const ruta = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const completa = `${ctx.localePrefix}${ruta}`;
  return completa === '' ? ctx.siteUrl : `${ctx.siteUrl}${completa}`;
}

/**
 * `@type` de schema.org del negocio según `site-config.general.businessType`.
 * Sin tipo definido es un camping, que es el default del campo en Payload.
 *
 * @param siteConfig - Global site-config
 */
export function businessSchemaType(siteConfig: SiteConfigInput): string {
  return BUSINESS_SCHEMA_TYPES[siteConfig.general?.businessType ?? 'campground'];
}

/** `@id` interno de un nodo del negocio (`https://…/#website`). */
export function nodeId(ctx: JsonLdContext, fragment: string): string {
  return `${ctx.siteUrl}/#${fragment}`;
}

/**
 * Dirección postal del negocio, solo si está completa.
 *
 * Una dirección a medias no se publica: Google la trata como error y es peor
 * que no tenerla.
 *
 * @param contact - Grupo `contact` de site-config
 * @returns PostalAddress o `undefined` si falta algún dato
 */
export function buildAddress(contact: SiteConfigInput['contact']): PostalAddress | undefined {
  const streetAddress = textOrUndefined(contact?.address);
  const addressLocality = textOrUndefined(contact?.city);
  const postalCode = textOrUndefined(contact?.postalCode);
  const addressCountry = textOrUndefined(contact?.country);

  if (!streetAddress || !addressLocality || !postalCode || !addressCountry) return undefined;
  return { '@type': 'PostalAddress', streetAddress, addressLocality, postalCode, addressCountry };
}

/**
 * Coordenadas del negocio, solo si hay latitud y longitud.
 *
 * @param location - Grupo `location` de site-config
 * @returns GeoCoordinates o `undefined`
 */
export function buildGeo(location: SiteConfigInput['location']): GeoCoordinates | undefined {
  const latitude = numberOrUndefined(location?.latitude);
  const longitude = numberOrUndefined(location?.longitude);
  if (latitude === undefined || longitude === undefined) return undefined;
  return { '@type': 'GeoCoordinates', latitude, longitude };
}

/** Si una media de Payload es un vídeo, un PDF… y no una imagen. Sin `mimeType` se da por imagen. */
function isNonImage(media: unknown): boolean {
  const mimeType = (media as { mimeType?: unknown } | null)?.mimeType;
  return typeof mimeType === 'string' && !mimeType.startsWith('image/');
}

/**
 * URL absoluta de una imagen de Payload, si la referencia está poblada y es
 * una imagen.
 *
 * El hero de la home puede ser un vídeo; `image` de schema.org solo admite
 * imágenes, así que un `.mp4` no se publica.
 *
 * @param ctx - Contexto con la URL base
 * @param media - Referencia de media tal y como llega de Payload
 */
export function imageUrl(ctx: JsonLdContext, media: unknown): string | undefined {
  if (isNonImage(media)) return undefined;
  const url = mediaUrl(media as MediaRef);
  return url ? absoluteUrl(ctx, url) : undefined;
}

/**
 * URLs absolutas de una lista de imágenes de Payload. Descarta las que no
 * estén pobladas.
 *
 * @param ctx - Contexto con la URL base
 * @param media - Referencias de media
 */
export function buildImageArray(ctx: JsonLdContext, media: unknown[] | null | undefined): string[] {
  return (media ?? []).flatMap((ref) => imageUrl(ctx, ref) ?? []);
}

/** Redes sociales que son un perfil con URL. `instagramHandle` es un @usuario, no una URL. */
const SOCIAL_PROFILES = ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok'] as const;

/**
 * URLs de redes sociales del negocio para `sameAs`.
 *
 * @param social - Grupo `social` de site-config
 * @returns Solo las que existen y son URLs http(s)
 */
export function buildSameAs(social: SiteConfigInput['social']): string[] {
  return SOCIAL_PROFILES.flatMap((red) => {
    const url = textOrUndefined(social?.[red]);
    return url && /^https?:\/\//i.test(url) ? [url] : [];
  });
}

/** Nodo de un richText de Lexical, con lo mínimo que hace falta para leer su texto. */
type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] };

/** Nodos de bloque de Lexical: su texto se separa del siguiente por un espacio. */
const BLOCK_NODES = new Set(['paragraph', 'heading', 'listitem', 'quote']);

function textOfNode(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text;
  const hijos = (node.children ?? []).map(textOfNode).join('');
  return BLOCK_NODES.has(node.type ?? '') ? `${hijos} ` : hijos;
}

/**
 * Convierte un richText de Lexical en texto plano, sin marcado.
 *
 * El `text` de JSON-LD acepta texto plano; HTML dentro es frágil y Google lo
 * puede rechazar. Acepta también un string (campos que ya son texto).
 *
 * @param content - JSON de Lexical (`{ root: { children } }`) o string
 * @returns Texto con espacios normalizados, o `undefined` si no hay texto
 */
export function toPlainText(content: unknown): string | undefined {
  if (typeof content === 'string') return textOrUndefined(content);
  if (content === null || typeof content !== 'object') return undefined;

  const root = (content as { root?: LexicalNode }).root;
  if (!root) return undefined;

  return textOrUndefined(textOfNode(root).replace(/\s+/g, ' '));
}

/**
 * Envuelve los nodos de una página en un solo `@graph` con su `@context`.
 * Descarta los builders que no han generado nada (`null`).
 *
 * @param nodes - Nodos JSON-LD, o `null` si su schema no se generó
 */
export function wrapInGraph(...nodes: Array<JsonLdNode | null | undefined>): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter((node): node is JsonLdNode => Boolean(node)),
  };
}
