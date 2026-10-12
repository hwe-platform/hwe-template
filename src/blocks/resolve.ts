import {
  consultaDeBlog,
  consultaDeCardGrid,
  articuloATarjeta,
  datosDeMapa,
} from '@hwe-platform/core-ui';

import { ROTULOS_ARTICULOS } from '../rotulos';

import type {
  ArticuloResuelto,
  BlockInstance,
  BlogData,
  CardGridData,
  CardGridItem,
  ConsultaDeBlog,
} from '@hwe-platform/core-ui';
import type { Payload } from 'payload';

/** Lo que la página ya tiene leído y los bloques de referencia necesitan. */
export type ContextoDeBloques = {
  locale: string;
  /** El global `site-config` que la página ya leyó. Alimenta el bloque `map`. */
  siteConfig: unknown;
};

/**
 * Rellena los bloques de referencia antes de renderizar.
 *
 * Un bloque de referencia no lleva su contenido, lleva la consulta: el editor
 * dice qué quiere y aquí se le busca. Esta es **la capa fina**: lo que puede
 * equivocarse —qué filtro lleva cada fuente, cómo se mapea un artículo a una
 * tarjeta, qué parte de `site-config` pinta el mapa— vive en `core-ui` con
 * tests, y aquí solo queda ejecutar la consulta contra la base de datos.
 *
 * Si la consulta falla, el bloque se queda sin artículos y el componente no
 * pinta la sección. Una página no se cae porque un listado no responda.
 */
export async function resolverBloques(
  payload: Payload,
  bloques: BlockInstance[],
  contexto: ContextoDeBloques,
): Promise<BlockInstance[]> {
  return Promise.all(bloques.map((bloque) => resolverBloque(payload, bloque, contexto)));
}

async function resolverBloque(
  payload: Payload,
  bloque: BlockInstance,
  contexto: ContextoDeBloques,
): Promise<BlockInstance> {
  if (bloque.blockType === 'blog') return resolverBlog(payload, bloque, contexto.locale);
  // Un card-grid de artículos es un blog con otra anatomía de tarjeta (V39, HU-038).
  if (bloque.blockType === 'card-grid') return resolverCardGrid(payload, bloque, contexto.locale);
  // El mapa no consulta nada: sus datos son los de `site-config`, que la
  // página ya leyó para el hero y el JSON-LD.
  if (bloque.blockType === 'map') return { ...bloque, ...datosDeMapa(contexto.siteConfig) };
  // El embed de media-text carga terceros: su consentimiento sale del mismo
  // interruptor que el mapa hasta que haya gestor de cookies (HU-022).
  if (bloque.blockType === 'media-text') {
    return { ...bloque, consentGranted: datosDeMapa(contexto.siteConfig).maps.forceConsent };
  }

  return bloque;
}

/**
 * Los artículos que pide una consulta, ya como tarjetas. Si la consulta falla, ninguno:
 * una página no se cae porque un listado no responda.
 */
async function tarjetasDeArticulos(
  payload: Payload,
  consulta: ConsultaDeBlog,
  opciones: { locale: string; showExcerpt?: boolean },
): Promise<CardGridItem[]> {
  const { locale, showExcerpt } = opciones;
  const { sort, limit, where } = consulta;
  try {
    const { docs } = await payload.find({
      collection: 'articles',
      sort,
      limit,
      where,
      locale: locale as 'fr',
      depth: 1,
    });

    return (docs as unknown as ArticuloResuelto[]).map((articulo) =>
      articuloATarjeta(articulo, {
        locale,
        readMoreLabel: ROTULOS_ARTICULOS.leerArticulo,
        showExcerpt,
      }),
    );
  } catch {
    return [];
  }
}

async function resolverBlog(
  payload: Payload,
  bloque: BlockInstance,
  locale: string,
): Promise<BlockInstance> {
  const datos = bloque as unknown as BlogData;
  const items = await tarjetasDeArticulos(payload, consultaDeBlog(datos), {
    locale,
    showExcerpt: datos.showExcerpt,
  });
  return { ...bloque, items };
}

/**
 * `card-grid` con `source: 'articles'`: sus tarjetas son los artículos que pide `sourceConfig`.
 * Con otra fuente no se toca: `manual` ya trae las suyas, y `accommodations` y `entities`
 * esperan al rediseño de alojamientos.
 */
async function resolverCardGrid(
  payload: Payload,
  bloque: BlockInstance,
  locale: string,
): Promise<BlockInstance> {
  const consulta = consultaDeCardGrid(bloque as unknown as CardGridData);
  if (!consulta) return bloque;

  return { ...bloque, items: await tarjetasDeArticulos(payload, consulta, { locale }) };
}
