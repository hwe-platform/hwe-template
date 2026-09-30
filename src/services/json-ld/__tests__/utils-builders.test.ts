import { describe, it, expect } from 'vitest';

import {
  buildAddress,
  buildGeo,
  buildImageArray,
  buildSameAs,
  imageUrl,
  toPlainText,
  wrapInGraph,
} from '../utils';
import { ctx, lexical, media, siteConfig } from './fixtures';

describe('buildAddress', () => {
  it('construye la dirección postal completa', () => {
    expect(buildAddress(siteConfig.contact)).toEqual({
      '@type': 'PostalAddress',
      streetAddress: 'Rue Exemple',
      addressLocality: 'Exempleville',
      postalCode: '00000',
      addressCountry: 'FR',
    });
  });

  it('no genera dirección si falta algún dato', () => {
    expect(buildAddress({ ...siteConfig.contact, postalCode: '' })).toBeUndefined();
    expect(buildAddress(null)).toBeUndefined();
  });
});

describe('buildGeo', () => {
  it('construye las coordenadas con latitud y longitud', () => {
    expect(buildGeo(siteConfig.location)).toEqual({
      '@type': 'GeoCoordinates',
      latitude: 45.1234,
      longitude: 1.2345,
    });
  });

  it('no genera coordenadas si falta alguna', () => {
    expect(buildGeo({ latitude: 43.6, longitude: null })).toBeUndefined();
    expect(buildGeo(undefined)).toBeUndefined();
  });
});

describe('imágenes', () => {
  it('imageUrl da la URL absoluta de una media poblada', () => {
    expect(imageUrl(ctx, media('logo.png'))).toBe('https://example.com/api/media/file/logo.png');
  });

  it('imageUrl descarta los vídeos: el hero de la home puede ser un .mp4', () => {
    const video = { ...media('hero-camping.mp4'), mimeType: 'video/mp4' };
    expect(imageUrl(ctx, video)).toBeUndefined();
    expect(imageUrl(ctx, { ...media('logo.png'), mimeType: 'image/png' })).toBe(
      'https://example.com/api/media/file/logo.png',
    );
  });

  it('imageUrl no da nada con un id sin poblar o sin url', () => {
    expect(imageUrl(ctx, 12)).toBeUndefined();
    expect(imageUrl(ctx, { id: 1, url: null })).toBeUndefined();
  });

  it('buildImageArray descarta las referencias sin poblar', () => {
    expect(buildImageArray(ctx, [media('a.jpg'), 7, media('b.jpg')])).toEqual([
      'https://example.com/api/media/file/a.jpg',
      'https://example.com/api/media/file/b.jpg',
    ]);
    expect(buildImageArray(ctx, null)).toEqual([]);
  });
});

describe('buildSameAs', () => {
  it('solo publica perfiles con URL, no el @usuario', () => {
    expect(buildSameAs(siteConfig.social)).toEqual([
      'https://facebook.com/examplecamping',
      'https://instagram.com/example_camping',
    ]);
  });

  it('descarta lo que no es una URL http(s) y funciona sin redes', () => {
    expect(buildSameAs({ facebook: 'examplecamping' })).toEqual([]);
    expect(buildSameAs(null)).toEqual([]);
  });
});

describe('toPlainText', () => {
  it('convierte Lexical en texto plano separando párrafos', () => {
    expect(toPlainText(lexical('Oui, les animaux', 'sont acceptés.'))).toBe(
      'Oui, les animaux sont acceptés.',
    );
  });

  it('acepta un string y descarta lo que no es richText', () => {
    expect(toPlainText('  Texte  ')).toBe('Texte');
    expect(toPlainText(null)).toBeUndefined();
    expect(toPlainText({ otra: 'cosa' })).toBeUndefined();
    expect(toPlainText(lexical(''))).toBeUndefined();
  });

  it('lee el texto de nodos anidados sin tipo de bloque', () => {
    const contenido = {
      root: { children: [{ type: 'link', children: [{ text: 'Plage' }] }] },
    };
    expect(toPlainText(contenido)).toBe('Plage');
  });
});

describe('wrapInGraph', () => {
  it('envuelve los nodos en un @graph y descarta los null', () => {
    expect(wrapInGraph({ '@type': 'WebSite' }, null, undefined)).toEqual({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'WebSite' }],
    });
  });
});
