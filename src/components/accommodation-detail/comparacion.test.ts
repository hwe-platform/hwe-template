import { describe, it, expect, vi } from 'vitest';

import { MAX_COMPARADOS, resolverComparacion } from './comparacion';
import { alojamiento, imagen } from '../__tests__/fixtures';

import type { Payload } from 'payload';

/** Un `payload` de mentira: solo `find`, que es lo único que usa el resolver. */
function payloadCon(find: ReturnType<typeof vi.fn>) {
  return { find } as unknown as Payload;
}

const cottage = {
  id: 9,
  name: 'Cottage Premium 3 chambres',
  slug: 'cottage-premium',
  media: { mainImage: imagen('cottage') },
  specs: { capacity: 6, bedrooms: 3, surface: 45, hasAC: true, petFriendly: false },
};

describe('resolverComparacion', () => {
  it('con comparación elegida no consulta nada', async () => {
    const find = vi.fn();
    const acc = alojamiento({ comparison: [cottage] });

    const tarjetas = await resolverComparacion(payloadCon(find), acc, 'fr');

    expect(tarjetas.map((t) => t.title)).toEqual(['Cottage Premium 3 chambres']);
    expect(find).not.toHaveBeenCalled();
  });

  it('sin elegida propone otros de la misma categoría, sin el propio', async () => {
    // Tal como responde la Local API: lo vacío llega como `null`.
    const find = vi.fn().mockResolvedValue({ docs: [{ ...cottage, subtype: null }] });

    const tarjetas = await resolverComparacion(payloadCon(find), alojamiento(), 'fr');

    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'accommodations',
        where: { and: [{ category: { equals: 2 } }, { id: { not_equals: 1 } }] },
        limit: MAX_COMPARADOS,
        locale: 'fr',
      }),
    );
    // El `null` de Payload se normaliza: la etiqueta vacía no llega a la tarjeta.
    expect(tarjetas[0]).toMatchObject({ title: 'Cottage Premium 3 chambres', tag: undefined });
  });

  it('la categoría poblada también vale para filtrar', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [] });

    await resolverComparacion(
      payloadCon(find),
      alojamiento({ category: { id: 5, name: 'Locations', slug: 'locations' } }),
      'fr',
    );

    expect(find.mock.calls[0]?.[0].where.and[0]).toEqual({ category: { equals: 5 } });
  });

  it('si la consulta falla, la ficha se queda sin comparación', async () => {
    const find = vi.fn().mockRejectedValue(new Error('sin base de datos'));

    expect(await resolverComparacion(payloadCon(find), alojamiento(), 'fr')).toEqual([]);
  });
});
