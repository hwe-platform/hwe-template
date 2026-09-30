import { describe, it, expect } from 'vitest';

import { buildBreadcrumbSchema } from '../breadcrumbs';
import { ctx, ctxEn } from './fixtures';

describe('buildBreadcrumbSchema', () => {
  it('genera las migas con posiciones y URLs absolutas; la última sin URL', () => {
    const schema = buildBreadcrumbSchema(
      [
        { name: 'Accueil', path: '/' },
        { name: 'Locations', path: '/locations' },
        { name: 'Mobile Home Confort 3 chambres' },
      ],
      ctx,
    );

    expect(schema).toEqual({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: 'https://example.com/locations',
        },
        { '@type': 'ListItem', position: 3, name: 'Mobile Home Confort 3 chambres' },
      ],
    });
  });
});

describe('buildBreadcrumbSchema — URLs y casos límite', () => {
  it('el último peldaño va sin URL aunque traiga ruta', () => {
    const schema = buildBreadcrumbSchema(
      [
        { name: 'Accueil', path: '/' },
        { name: 'Le camping', path: '/le-camping' },
      ],
      ctx,
    );
    const items = schema?.itemListElement as Array<Record<string, unknown>>;
    expect(items[1]).not.toHaveProperty('item');
  });

  it('las URLs llevan el prefijo del idioma activo', () => {
    const schema = buildBreadcrumbSchema(
      [{ name: 'Home', path: '/' }, { name: 'The campsite', path: '/the-campsite' }, { name: 'X' }],
      ctxEn,
    );
    const items = schema?.itemListElement as Array<Record<string, unknown>>;
    expect(items[0]?.item).toBe('https://example.com/en');
    expect(items[1]?.item).toBe('https://example.com/en/the-campsite');
  });

  it('no se genera con menos de dos peldaños con nombre', () => {
    expect(buildBreadcrumbSchema([{ name: 'Accueil', path: '/' }], ctx)).toBeNull();
    expect(buildBreadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: '  ' }], ctx)).toBeNull();
  });
});
