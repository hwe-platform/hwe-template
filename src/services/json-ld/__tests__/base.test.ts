import { describe, it, expect } from 'vitest';

import { buildOrganizationSchema, buildWebSiteSchema } from '../base';
import { ctx, ctxEn, siteConfig, siteConfigMinimo } from './fixtures';

describe('buildWebSiteSchema', () => {
  it('genera el WebSite con los datos completos', () => {
    expect(buildWebSiteSchema(siteConfig, ctx)).toEqual({
      '@type': 'WebSite',
      '@id': 'https://example.com/#website',
      name: 'Camping Example',
      url: 'https://example.com',
      inLanguage: 'fr',
      description: 'Camping 3 étoiles à Exempleville, au cœur de la région',
    });
  });

  it('usa el idioma y la URL del idioma activo', () => {
    const schema = buildWebSiteSchema(siteConfig, ctxEn);
    expect(schema?.inLanguage).toBe('en');
    expect(schema?.url).toBe('https://example.com/en');
  });

  it('omite la descripción si no existe', () => {
    expect(buildWebSiteSchema(siteConfigMinimo, ctx)).not.toHaveProperty('description');
  });

  it('no se genera sin nombre del site', () => {
    expect(buildWebSiteSchema({ general: { siteName: '' } }, ctx)).toBeNull();
    expect(buildWebSiteSchema({}, ctx)).toBeNull();
  });
});

describe('buildOrganizationSchema', () => {
  it('genera la Organization con NAP, logo y redes', () => {
    expect(buildOrganizationSchema(siteConfig, ctx)).toEqual({
      '@type': 'Organization',
      '@id': 'https://example.com/#organization',
      name: 'Camping Example',
      url: 'https://example.com',
      logo: 'https://example.com/api/media/file/logo.png',
      telephone: '+33 1 00 00 00 00',
      email: 'contact@example.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue Exemple',
        addressLocality: 'Exempleville',
        postalCode: '00000',
        addressCountry: 'FR',
      },
      sameAs: ['https://facebook.com/examplecamping', 'https://instagram.com/example_camping'],
    });
  });

  it('omite todo lo que no existe: logo, teléfono, email, dirección y redes', () => {
    expect(buildOrganizationSchema(siteConfigMinimo, ctx)).toEqual({
      '@type': 'Organization',
      '@id': 'https://example.com/#organization',
      name: 'Camping Example',
      url: 'https://example.com',
    });
  });

  it('no se genera sin nombre del site', () => {
    expect(buildOrganizationSchema({ general: null }, ctx)).toBeNull();
  });
});
