import { describe, expect, it } from 'vitest';

import { parsearDecimal } from './parsear-decimal';

describe('parsearDecimal', () => {
  it('acepta la coma decimal', () => {
    expect(parsearDecimal('43,6417')).toBe(43.6417);
    expect(parsearDecimal('-1,4297')).toBe(-1.4297);
  });

  it('acepta el punto decimal', () => {
    expect(parsearDecimal('43.6417')).toBe(43.6417);
    expect(parsearDecimal('-1.4297')).toBe(-1.4297);
  });

  it('acepta enteros, signo y espacios alrededor', () => {
    expect(parsearDecimal('12')).toBe(12);
    expect(parsearDecimal('+3')).toBe(3);
    expect(parsearDecimal('  0,5  ')).toBe(0.5);
    expect(parsearDecimal(',5')).toBe(0.5);
  });

  it('tolera el separador al final mientras se escribe', () => {
    expect(parsearDecimal('43,')).toBe(43);
  });

  it('devuelve null si no es un número completo', () => {
    expect(parsearDecimal('')).toBeNull();
    expect(parsearDecimal('-')).toBeNull();
    expect(parsearDecimal('abc')).toBeNull();
    expect(parsearDecimal('43,64,17')).toBeNull();
    expect(parsearDecimal('1.234,5')).toBeNull();
    expect(parsearDecimal('12abc')).toBeNull();
  });
});
