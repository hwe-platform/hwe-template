import { describe, it, expect } from 'vitest';

import {
  absoluteUrl,
  nodeId,
  numberOrUndefined,
  omitEmpty,
  pageUrl,
  textOrUndefined,
} from '../utils';
import { ctx, ctxEn } from './fixtures';

describe('omitEmpty', () => {
  it('quita undefined, null, cadenas vacías y arrays vacíos', () => {
    expect(omitEmpty({ a: 1, b: undefined, c: null, d: '', e: [], f: 'x' })).toEqual({
      a: 1,
      f: 'x',
    });
  });

  it('conserva false y 0, que son datos y no ausencia de dato', () => {
    expect(omitEmpty({ petsAllowed: false, rooms: 0 })).toEqual({ petsAllowed: false, rooms: 0 });
  });

  it('limpia en profundidad y quita los objetos que se quedan vacíos', () => {
    expect(omitEmpty({ a: { b: null }, c: [{ d: undefined }, { e: 1 }] })).toEqual({
      c: [{ e: 1 }],
    });
  });

  it('devuelve tal cual los valores que no son objetos', () => {
    expect(omitEmpty('texto')).toBe('texto');
  });
});

describe('textOrUndefined / numberOrUndefined', () => {
  it('recorta el texto y descarta el vacío', () => {
    expect(textOrUndefined('  Exempleville  ')).toBe('Exempleville');
    expect(textOrUndefined('   ')).toBeUndefined();
    expect(textOrUndefined(42)).toBeUndefined();
  });

  it('solo acepta números finitos', () => {
    expect(numberOrUndefined(3)).toBe(3);
    expect(numberOrUndefined(Number.NaN)).toBeUndefined();
    expect(numberOrUndefined('3')).toBeUndefined();
  });
});

describe('URLs', () => {
  it('absoluteUrl completa las rutas relativas y respeta las absolutas', () => {
    expect(absoluteUrl(ctx, '/api/media/file/x.jpg')).toBe(
      'https://example.com/api/media/file/x.jpg',
    );
    expect(absoluteUrl(ctx, 'x.jpg')).toBe('https://example.com/x.jpg');
    expect(absoluteUrl(ctx, 'https://cdn.example.com/x.jpg')).toBe('https://cdn.example.com/x.jpg');
  });

  it('pageUrl da la home sin barra final y las páginas con su ruta', () => {
    expect(pageUrl(ctx)).toBe('https://example.com');
    expect(pageUrl(ctx, '/')).toBe('https://example.com');
    expect(pageUrl(ctx, 'le-camping')).toBe('https://example.com/le-camping');
  });

  it('pageUrl añade el prefijo del idioma cuando no es el principal', () => {
    expect(pageUrl(ctxEn)).toBe('https://example.com/en');
    expect(pageUrl(ctxEn, '/the-campsite')).toBe('https://example.com/en/the-campsite');
  });

  it('nodeId no lleva prefijo de idioma', () => {
    expect(nodeId(ctxEn, 'website')).toBe('https://example.com/#website');
  });
});
