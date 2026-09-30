import { consultaDeBlog, articuloATarjeta, datosDeMapa } from '@hwe-platform/core-ui';

import type { ArticuloResuelto, BlockInstance, BlogData } from '@hwe-platform/core-ui';
import type { Payload } from 'payload';

/**
 * Rótulo del enlace de cada tarjeta de artículo.
 *
 * No es contenido y no sale de Payload: es interfaz, y va en el idioma del
 * cliente. Escrito a mano acabaría en el idioma de la conversación, que es
 * lo que ya pasó con el pie.
 */
const ROTULOS = { leerArticulo: "Lire l'article" };

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

async function resolverBlog(
  payload: Payload,
  bloque: BlockInstance,
  locale: string,
): Promise<BlockInstance> {
  const datos = bloque as unknown as BlogData;
  const { sort, limit, where } = consultaDeBlog(datos);

  try {
    const { docs } = await payload.find({
      collection: 'articles',
      sort,
      limit,
      where,
      locale: locale as 'fr',
      depth: 1,
    });

    const items = (docs as unknown as ArticuloResuelto[]).map((articulo) =>
      articuloATarjeta(articulo, {
        locale,
        readMoreLabel: ROTULOS.leerArticulo,
        showExcerpt: datos.showExcerpt,
      }),
    );

    return { ...bloque, items };
  } catch {
    return { ...bloque, items: [] };
  }
}
