import { describe, it, expect } from 'vitest';

import { buildAccommodationListingSchema } from '../accommodation-listing';
import { ctx, emplacement, mobilhome, siteConfig } from './fixtures';

const paginaLocations = {
  title: 'Nos Locations',
  slug: 'locations',
  type: 'listing',
  seo: { metaDescription: 'Découvrez nos mobil-homes et cottages tout confort.' },
};

describe('buildAccommodationListingSchema', () => {
  it('genera el negocio con containsPlace de los alojamientos de la página', () => {
    const schema = buildAccommodationListingSchema(
      { page: paginaLocations, accommodations: [mobilhome, emplacement], siteConfig },
      ctx,
    );

    expect(schema).toMatchObject({
      '@type': 'Campground',
      name: 'Nos Locations',
      url: 'https://example.com/locations',
      description: 'Découvrez nos mobil-homes et cottages tout confort.',
    });
    expect(schema?.containsPlace).toEqual([
      expect.objectContaining({
        '@type': 'Accommodation',
        url: 'https://example.com/mobile-home-confort',
        offers: expect.objectContaining({ '@type': 'Offer' }),
      }),
      expect.not.objectContaining({ offers: expect.anything() }),
    ]);
  });

  it('usa el tipo de negocio del site', () => {
    const hotel = {
      ...siteConfig,
      general: { ...siteConfig.general, businessType: 'hotel' as const },
    };
    const schema = buildAccommodationListingSchema(
      { page: paginaLocations, accommodations: [mobilhome], siteConfig: hotel },
      ctx,
    );
    expect(schema?.['@type']).toBe('Hotel');
  });

  it('usa Campground si el site no tiene tipo de negocio', () => {
    const schema = buildAccommodationListingSchema(
      { page: paginaLocations, accommodations: [mobilhome], siteConfig: {} },
      ctx,
    );
    expect(schema?.['@type']).toBe('Campground');
  });
});

describe('buildAccommodationListingSchema — obligatorios', () => {
  it('no se genera sin alojamientos enlazables: la página cae en WebPage', () => {
    expect(
      buildAccommodationListingSchema(
        { page: paginaLocations, accommodations: [], siteConfig },
        ctx,
      ),
    ).toBeNull();
    expect(
      buildAccommodationListingSchema(
        { page: paginaLocations, accommodations: [{ ...mobilhome, slug: null }], siteConfig },
        ctx,
      ),
    ).toBeNull();
  });

  it('no se genera sin título de página', () => {
    expect(
      buildAccommodationListingSchema(
        { page: { ...paginaLocations, title: '' }, accommodations: [mobilhome], siteConfig },
        ctx,
      ),
    ).toBeNull();
  });
});
