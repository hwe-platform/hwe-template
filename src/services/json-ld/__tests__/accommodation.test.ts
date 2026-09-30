import { describe, it, expect } from 'vitest';

import {
  accommodationSchemaType,
  buildAccommodationSchema,
  buildAccommodationSummary,
  buildOffer,
} from '../accommodation';
import { ctx, ctxEn, emplacement, lexical, mobilhome } from './fixtures';

describe('buildAccommodationSchema — mobil-home', () => {
  it('genera el Accommodation completo', () => {
    expect(buildAccommodationSchema(mobilhome, ctx)).toEqual({
      '@type': 'Accommodation',
      name: 'Mobile Home Confort 3 chambres',
      description: 'Mobil-home tout confort avec 3 chambres, terrasse couverte et vue forêt.',
      url: 'https://example.com/mobile-home-confort',
      image: [
        'https://example.com/api/media/file/mh-confort-1.jpg',
        'https://example.com/api/media/file/mh-confort-2.jpg',
      ],
      occupancy: { '@type': 'QuantitativeValue', value: 6 },
      numberOfRooms: 3,
      floorSize: { '@type': 'QuantitativeValue', value: 35, unitCode: 'MTK' },
      petsAllowed: false,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Cuisine équipée', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Climatisation', value: true },
      ],
      offers: {
        '@type': 'Offer',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: 65, priceCurrency: 'EUR' },
      },
      containedInPlace: { '@id': 'https://example.com/#campground' },
      accommodationCategory: 'Confort',
    });
  });

  it('usa el texto plano de la descripción larga si no hay corta', () => {
    const sinCorta = { ...mobilhome, shortDescription: '', description: lexical('Vue forêt.') };
    expect(buildAccommodationSchema(sinCorta, ctx)?.description).toBe('Vue forêt.');
  });

  it('la URL lleva el prefijo del idioma activo', () => {
    expect(buildAccommodationSchema(mobilhome, ctxEn)?.url).toBe(
      'https://example.com/en/mobile-home-confort',
    );
  });
});

describe('buildAccommodationSchema — emplacement', () => {
  const schema = buildAccommodationSchema(emplacement, ctx);

  it('genera CampingPitch', () => {
    expect(schema?.['@type']).toBe('CampingPitch');
  });

  it('no publica habitaciones, ocupación sin dato ni oferta sin precio', () => {
    expect(schema).not.toHaveProperty('numberOfRooms');
    expect(schema).not.toHaveProperty('occupancy');
    expect(schema).not.toHaveProperty('offers');
    expect(schema).not.toHaveProperty('image');
  });

  it('no asume mascotas si el campo no está definido', () => {
    const sinDato = { ...emplacement, specs: { surface: 80 } };
    expect(buildAccommodationSchema(sinDato, ctx)).not.toHaveProperty('petsAllowed');
  });

  it('no publica superficie si no hay dato', () => {
    const sinSuperficie = { ...emplacement, specs: { surface: null } };
    expect(buildAccommodationSchema(sinSuperficie, ctx)).not.toHaveProperty('floorSize');
  });
});

describe('buildAccommodationSchema — obligatorios', () => {
  it.each([
    ['nombre', { ...mobilhome, name: '' }],
    ['descripción', { ...mobilhome, shortDescription: null, description: null }],
    ['slug', { ...mobilhome, slug: null }],
  ])('no se genera sin %s', (_campo, accommodation) => {
    expect(buildAccommodationSchema(accommodation, ctx)).toBeNull();
  });
});

describe('helpers de alojamiento', () => {
  it('accommodationSchemaType distingue parcelas del resto', () => {
    expect(accommodationSchemaType('emplacement')).toBe('CampingPitch');
    expect(accommodationSchemaType('chalet')).toBe('Accommodation');
    expect(accommodationSchemaType(undefined)).toBe('Accommodation');
  });

  it('buildOffer usa EUR si no hay moneda y no inventa precio', () => {
    expect(buildOffer({ from: 40, currency: null })).toMatchObject({
      priceSpecification: { price: 40, priceCurrency: 'EUR' },
    });
    expect(buildOffer({ from: null })).toBeUndefined();
    expect(buildOffer(undefined)).toBeUndefined();
  });

  it('buildAccommodationSummary no resume alojamientos sin nombre o sin slug', () => {
    expect(buildAccommodationSummary({ ...mobilhome, slug: '' }, ctx)).toBeNull();
    expect(buildAccommodationSummary({ ...mobilhome, name: null }, ctx)).toBeNull();
  });

  it('buildAccommodationSummary usa la imagen principal', () => {
    expect(buildAccommodationSummary(mobilhome, ctx)?.image).toBe(
      'https://example.com/api/media/file/mh-confort-main.jpg',
    );
  });
});
