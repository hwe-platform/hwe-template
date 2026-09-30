import { describe, it, expect } from 'vitest';
import { heroSchema } from '@hwe-platform/core-ui';

import {
  heroDeFicha,
  imagenesDeGaleria,
  precioDesde,
  tarjetaDeComparacion,
  tarjetasDeComparacion,
} from './ficha';
import { alojamiento, imagen } from '../__tests__/fixtures';

/** `Intl` separa el importe y la moneda con un espacio fino; se normaliza para comparar. */
const plano = (texto: string | undefined) => texto?.replace(/\s/g, ' ');

describe('precioDesde', () => {
  it('reproduce el «À partir de 490 €/sem.» del export', () => {
    expect(plano(precioDesde({ from: 490, currency: 'EUR', priceNote: '/sem.' }, 'fr'))).toBe(
      'À partir de 490 €/sem.',
    );
  });

  it('separa con espacio una nota que es una palabra', () => {
    expect(plano(precioDesde({ from: 55, currency: 'EUR', priceNote: 'par nuit' }, 'fr'))).toBe(
      'À partir de 55 € par nuit',
    );
  });

  it('sin nota deja solo el importe, y sin importe no hay precio', () => {
    expect(plano(precioDesde({ from: 490, currency: 'EUR' }, 'fr'))).toBe('À partir de 490 €');
    expect(precioDesde({ currency: 'EUR' }, 'fr')).toBeUndefined();
  });
});

describe('heroDeFicha', () => {
  it('compone tipo · ciudad, el nombre y la ficha resumida', () => {
    const hero = heroDeFicha(alojamiento(), 'Exempleville', 'fr');

    expect(hero.eyebrow).toBe('Location mobil-home · Exempleville');
    expect(hero.title).toBe('Mobile Home Confort 3 chambres');
    expect(plano(hero.subtitle)).toBe('38 m² · 6 personnes · À partir de 490 €/sem.');
    expect(hero.showBreadcrumbs).toBe(true);
  });

  it('valida contra el schema del hero', () => {
    expect(heroSchema.safeParse(heroDeFicha(alojamiento(), 'Exempleville', 'fr')).success).toBe(
      true,
    );
  });

  it('sin ciudad ni precio no deja separadores colgando', () => {
    const hero = heroDeFicha(alojamiento({ pricing: {} }), undefined, 'fr');

    expect(hero.eyebrow).toBe('Location mobil-home');
    expect(hero.subtitle).toBe('38 m² · 6 personnes');
  });
});

describe('imagenesDeGaleria', () => {
  it('da la forma del bloque gallery, con el alt de cada foto', () => {
    const acc = alojamiento({
      media: { mainImage: imagen('a'), gallery: [imagen('b', 'Terrasse')] },
    });

    expect(imagenesDeGaleria(acc)).toEqual([
      { image: expect.objectContaining({ id: 'b' }), alt: 'Terrasse' },
    ]);
  });

  it('una foto sin alt cae al nombre del alojamiento', () => {
    const acc = alojamiento({ media: { mainImage: imagen('a'), gallery: [imagen('b', '')] } });

    expect(imagenesDeGaleria(acc)[0]?.alt).toBe('Mobile Home Confort 3 chambres');
  });

  it('sin galería no hay imágenes', () => {
    expect(imagenesDeGaleria(alojamiento())).toEqual([]);
  });
});

describe('tarjetaDeComparacion', () => {
  const cottage = {
    name: 'Cottage Premium 3 chambres',
    slug: 'cottage-premium',
    subtype: 'Premium',
    specs: { surface: 45, bedrooms: 3 },
  };

  it('reproduce la tarjeta de «Comparer»', () => {
    expect(tarjetaDeComparacion({ ...cottage, media: { mainImage: imagen('c') } })).toMatchObject({
      title: 'Cottage Premium 3 chambres',
      subtitle: '45 m² · 3 chambres',
      tag: 'Premium',
      url: '/cottage-premium',
      readMoreLabel: 'Voir la fiche',
    });
  });

  it('acepta la foto de primer nivel de una referencia hecha a mano', () => {
    expect(tarjetaDeComparacion({ ...cottage, mainImage: imagen('c') })?.image).toMatchObject({
      id: 'c',
    });
  });

  it('sin foto no hay tarjeta, y sin ficha técnica no hay subtítulo', () => {
    expect(tarjetaDeComparacion(cottage)).toBeNull();
    expect(
      tarjetaDeComparacion({ name: 'X', slug: 'x', mainImage: imagen('c') })?.subtitle,
    ).toBeUndefined();
  });
});

describe('tarjetasDeComparacion', () => {
  it('pinta las pobladas y descarta ids sueltos y alojamientos sin foto', () => {
    const acc = alojamiento({
      comparison: [
        7,
        { id: 8, name: 'Sin foto', slug: 'sin-foto' },
        { id: 9, name: 'Cottage', slug: 'cottage', media: { mainImage: imagen('c') } },
      ],
    });

    expect(tarjetasDeComparacion(acc).map((t) => t.title)).toEqual(['Cottage']);
  });

  it('descarta el propio alojamiento si el editor lo eligió', () => {
    // El fixture es el alojamiento 1: el panel deja elegirlo en su propia comparación.
    const acc = alojamiento({
      comparison: [
        { id: 1, name: 'Yo mismo', slug: 'yo', media: { mainImage: imagen('a') } },
        { id: 9, name: 'Cottage', slug: 'cottage', media: { mainImage: imagen('c') } },
      ],
    });

    expect(tarjetasDeComparacion(acc).map((t) => t.title)).toEqual(['Cottage']);
  });

  it('sin comparación elegida no hay tarjetas', () => {
    expect(tarjetasDeComparacion(alojamiento())).toEqual([]);
  });
});
