import { describe, it, expect } from 'vitest';

import { buildCampgroundSchema } from '../campground';
import { ctx, emplacement, media, mobilhome, siteConfig, siteConfigMinimo } from './fixtures';

describe('buildCampgroundSchema — datos completos', () => {
  const schema = buildCampgroundSchema(siteConfig, ctx, {
    heroMedia: media('hero-home.jpg'),
    accommodations: [mobilhome, emplacement, { ...mobilhome, slug: 'otro', featured: false }],
  });

  it('usa Campground y el @id del negocio', () => {
    expect(schema?.['@type']).toBe('Campground');
    expect(schema?.['@id']).toBe('https://example.com/#campground');
  });

  it('incluye los campos obligatorios y recomendados que existen', () => {
    expect(schema).toMatchObject({
      name: 'Camping Example',
      description: 'Camping 3 étoiles à Exempleville, au cœur de la région',
      url: 'https://example.com',
      image: ['https://example.com/api/media/file/hero-home.jpg'],
      logo: 'https://example.com/api/media/file/logo.png',
      geo: { '@type': 'GeoCoordinates', latitude: 45.1234, longitude: 1.2345 },
      telephone: '+33 1 00 00 00 00',
      email: 'contact@example.com',
      starRating: { '@type': 'Rating', ratingValue: '3' },
      paymentAccepted: 'CB, Visa, Mastercard',
    });
  });

  it('resume en containsPlace solo los alojamientos destacados', () => {
    expect(schema?.containsPlace).toEqual([
      expect.objectContaining({ '@type': 'Accommodation', name: 'Mobile Home Confort 3 chambres' }),
      expect.objectContaining({ '@type': 'CampingPitch', name: 'Emplacement Cyclo Rando' }),
    ]);
  });

  it('declara mascotas si algún alojamiento las admite', () => {
    expect(schema?.petsAllowed).toBe(true);
  });

  it('añade un contactPoint de reservas con los idiomas del site', () => {
    expect(schema?.contactPoint).toEqual({
      '@type': 'ContactPoint',
      telephone: '+33 1 00 00 00 00',
      contactType: 'reservations',
      availableLanguage: ['fr', 'en', 'es'],
    });
  });

  it('no publica horarios ni reseñas, que no son datos estructurados todavía', () => {
    expect(schema).not.toHaveProperty('openingHoursSpecification');
    expect(schema).not.toHaveProperty('aggregateRating');
  });
});

describe('buildCampgroundSchema — tipo de negocio y campos opcionales', () => {
  it.each([
    ['hotel', 'Hotel'],
    ['resort', 'Resort'],
    ['guesthouse', 'BedAndBreakfast'],
  ] as const)('businessType %s genera %s', (businessType, tipo) => {
    const config = { ...siteConfig, general: { ...siteConfig.general, businessType } };
    expect(buildCampgroundSchema(config, ctx)?.['@type']).toBe(tipo);
  });

  it('usa Campground si businessType no está definido', () => {
    const config = { ...siteConfig, general: { ...siteConfig.general, businessType: null } };
    expect(buildCampgroundSchema(config, ctx)?.['@type']).toBe('Campground');
  });

  it('no asume mascotas si ningún alojamiento lo dice', () => {
    const sinDato = { ...mobilhome, specs: { capacity: 6 } };
    expect(
      buildCampgroundSchema(siteConfig, ctx, { accommodations: [sinDato] }),
    ).not.toHaveProperty('petsAllowed');
  });

  it('dice que no admite mascotas solo si todos los que lo dicen dicen que no', () => {
    const schema = buildCampgroundSchema(siteConfig, ctx, { accommodations: [mobilhome] });
    expect(schema?.petsAllowed).toBe(false);
  });

  it('omite imagen, containsPlace, estrellas, pagos y contacto sin datos', () => {
    const config = {
      ...siteConfig,
      general: { ...siteConfig.general, stars: null },
      contact: { ...siteConfig.contact, phone: '' },
      payments: [' '],
    };
    const schema = buildCampgroundSchema(config, ctx);
    for (const campo of [
      'image',
      'containsPlace',
      'starRating',
      'paymentAccepted',
      'contactPoint',
    ]) {
      expect(schema).not.toHaveProperty(campo);
    }
  });
});

describe('buildCampgroundSchema — obligatorios', () => {
  it('no se genera sin dirección completa', () => {
    const config = { ...siteConfig, contact: { ...siteConfig.contact, city: '' } };
    expect(buildCampgroundSchema(config, ctx)).toBeNull();
  });

  it('no se genera sin descripción ni nombre', () => {
    expect(buildCampgroundSchema(siteConfigMinimo, ctx)).toBeNull();
  });
});
