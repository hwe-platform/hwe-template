import { describe, it, expect, vi } from 'vitest';

import { buscarDocumento, buscarPorSlug } from './buscar-documento';

import type { Payload } from 'payload';

/** Slug de cada documento por idioma, como lo guarda Payload: `undefined` si no se tradujo. */
type Fila = { id: number; slug: Record<string, string | undefined>; title: string };

/**
 * Un Payload de mentira que busca como el de verdad: en la columna del idioma
 * pedido, sin respaldo; y que al leer por id sí rellena con el francés salvo
 * que se pida `fallbackLocale: false`.
 */
function payloadCon(filas: Fila[]) {
  const find = vi.fn(async ({ where, locale }) => ({
    docs: filas
      .filter((f) => f.slug[locale] === where.slug.equals)
      .map((f) => ({ id: f.id, slug: f.slug[locale], title: f.title })),
  }));
  const findByID = vi.fn(async ({ id, locale, fallbackLocale }) => {
    const fila = filas.find((f) => f.id === id)!;
    const slug = fallbackLocale === false ? fila.slug[locale] : (fila.slug[locale] ?? fila.slug.fr);
    return { id, slug, title: fila.title, leidoEn: locale };
  });
  return { payload: { find, findByID } as unknown as Payload, find, findByID };
}

const contacto: Fila = { id: 1, slug: { fr: 'contact' }, title: 'Contact' };
const camping: Fila = {
  id: 2,
  slug: { fr: 'le-camping', en: 'the-campsite' },
  title: 'Le Camping',
};

const busqueda = { collection: 'pages' as const, defaultLocale: 'fr' as const };

describe('buscarPorSlug', () => {
  it('en el idioma principal busca directo', async () => {
    const { payload, findByID } = payloadCon([contacto]);

    const doc = await buscarPorSlug(payload, { ...busqueda, slug: 'contact', locale: 'fr' });

    expect(doc).toMatchObject({ id: 1 });
    expect(findByID).not.toHaveBeenCalled();
  });

  it('un slug sin traducir cae al del idioma principal, leído en el pedido', async () => {
    const { payload } = payloadCon([contacto]);

    const doc = await buscarPorSlug(payload, { ...busqueda, slug: 'contact', locale: 'en' });

    expect(doc).toMatchObject({ id: 1, leidoEn: 'en' });
  });

  it('un slug traducido responde en su idioma', async () => {
    const { payload } = payloadCon([camping]);

    expect(
      await buscarPorSlug(payload, { ...busqueda, slug: 'the-campsite', locale: 'en' }),
    ).toMatchObject({ id: 2 });
  });

  it('con slug traducido, el del idioma principal no duplica la página', async () => {
    // `/en/le-camping` no debe servir lo mismo que `/en/the-campsite`.
    const { payload } = payloadCon([camping]);

    expect(
      await buscarPorSlug(payload, { ...busqueda, slug: 'le-camping', locale: 'en' }),
    ).toBeNull();
  });

  it('un slug que no existe en ningún idioma no responde', async () => {
    const { payload } = payloadCon([contacto]);

    expect(await buscarPorSlug(payload, { ...busqueda, slug: 'nada', locale: 'en' })).toBeNull();
    expect(await buscarPorSlug(payload, { ...busqueda, slug: 'nada', locale: 'fr' })).toBeNull();
  });
});

describe('buscarDocumento', () => {
  it('devuelve el primero que responde, con su colección', async () => {
    const { payload } = payloadCon([contacto]);

    const resuelto = await buscarDocumento(payload, ['pages', 'accommodations'], {
      slug: 'contact',
      locale: 'en',
      defaultLocale: 'fr',
    });

    expect(resuelto).toMatchObject({ collection: 'pages', doc: { id: 1 } });
  });

  it('si ninguna colección responde, null', async () => {
    const { payload } = payloadCon([]);

    expect(
      await buscarDocumento(payload, ['pages'], { slug: 'x', locale: 'fr', defaultLocale: 'fr' }),
    ).toBeNull();
  });
});
