import { describe, it, expect } from 'vitest';

import { buildRestaurantSchema } from '../restaurant';
import { ctx, restaurante, siteConfig } from './fixtures';

describe('buildRestaurantSchema', () => {
  it('genera el Restaurant con la ubicación del camping', () => {
    expect(buildRestaurantSchema(restaurante, siteConfig, ctx)).toEqual({
      '@type': 'Restaurant',
      name: 'Le Restaurant du Camping',
      description: 'Cuisine du terroir landais avec produits frais et locaux.',
      url: 'https://example.com/restaurant',
      image: 'https://example.com/api/media/file/restaurant-terrasse.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue Exemple',
        addressLocality: 'Exempleville',
        postalCode: '00000',
        addressCountry: 'FR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 45.1234, longitude: 1.2345 },
      telephone: '+33 1 00 00 00 00',
      servesCuisine: 'Cuisine du terroir',
      hasMenu: 'https://example.com/restaurant/carte',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Terrasse ombragée', value: true },
      ],
      containedInPlace: { '@id': 'https://example.com/#campground' },
    });
  });
});

describe('buildRestaurantSchema — campos opcionales y obligatorios', () => {
  it('cae en la descripción corta si no hay richText', () => {
    const schema = buildRestaurantSchema({ ...restaurante, description: null }, siteConfig, ctx);
    expect(schema?.description).toBe('Cuisine du terroir landais.');
  });

  it('omite la carta, la cocina y los extras sin datos', () => {
    const schema = buildRestaurantSchema(
      { ...restaurante, ctas: null, tag: '', features: null, image: null },
      {},
      ctx,
    );
    for (const campo of ['hasMenu', 'servesCuisine', 'amenityFeature', 'image', 'address', 'geo']) {
      expect(schema).not.toHaveProperty(campo);
    }
  });

  it('no se genera sin ficha propia, nombre o descripción', () => {
    expect(
      buildRestaurantSchema({ ...restaurante, hasOwnPage: false }, siteConfig, ctx),
    ).toBeNull();
    expect(buildRestaurantSchema({ ...restaurante, name: null }, siteConfig, ctx)).toBeNull();
    expect(
      buildRestaurantSchema(
        { ...restaurante, description: null, shortDescription: null },
        siteConfig,
        ctx,
      ),
    ).toBeNull();
  });
});
