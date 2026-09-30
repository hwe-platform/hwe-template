import { normalizePayloadData } from '@hwe-platform/core-ui';

import { tarjetaDeComparacion, tarjetasDeComparacion } from './ficha';

import type { AccommodationData, CardGridItem } from '@hwe-platform/core-ui';
import type { Payload } from 'payload';
import type { AlojamientoComparado } from './ficha';
import type { SiteLocale } from '../../i18n';

/**
 * Cuántos alojamientos propone la ficha cuando el editor no eligió ninguno.
 * Tres llenan la fila de escritorio de la rejilla de comparación.
 */
export const MAX_COMPARADOS = 3;

/** Id de la categoría, esté poblada o no: el schema garantiza una de las dos. */
function idDeCategoria(categoria: AccommodationData['category']): string | number {
  return typeof categoria === 'object' ? categoria.id : categoria;
}

/**
 * Las tarjetas de «Comparer»: las que eligió el editor, o si no eligió
 * ninguna, otros alojamientos de la misma categoría.
 *
 * El respaldo es lo que promete el campo en el panel («Si lo dejas vacío, el
 * site propone otros de la misma categoría»). Si la consulta falla, la ficha
 * se queda sin comparación: no se cae por una sección secundaria.
 *
 * @param payload - Cliente de la Local API
 * @param accommodation - El alojamiento de la ficha, ya validado
 * @param locale - Idioma activo
 * @returns Tarjetas para `CardStacked`, vacío si no hay nada que comparar
 */
export async function resolverComparacion(
  payload: Payload,
  accommodation: AccommodationData,
  locale: SiteLocale,
): Promise<CardGridItem[]> {
  const elegidas = tarjetasDeComparacion(accommodation);
  if (elegidas.length > 0) return elegidas;

  const categoria = idDeCategoria(accommodation.category);

  try {
    const resultado = await payload.find({
      collection: 'accommodations',
      where: {
        and: [{ category: { equals: categoria } }, { id: { not_equals: accommodation.id } }],
      },
      sort: 'order',
      limit: MAX_COMPARADOS,
      depth: 1,
      locale,
    });

    return resultado.docs
      .map((doc) => tarjetaDeComparacion(normalizePayloadData(doc) as AlojamientoComparado))
      .filter((tarjeta): tarjeta is CardGridItem => tarjeta !== null);
  } catch {
    return [];
  }
}
