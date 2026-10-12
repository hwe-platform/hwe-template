import { beforeEach, describe, expect, it, vi } from 'vitest';

const findGlobal = vi.fn();

vi.mock('payload', () => ({ getPayload: async () => ({ findGlobal }) }));
vi.mock('../../payload.config', () => ({ default: {} }));

import { esIdiomaActivo, leerIdiomasActivos } from './idiomas';

describe('esIdiomaActivo', () => {
  it('un idioma de la lista de activos es activo', () => {
    expect(esIdiomaActivo('en', ['fr', 'en'])).toBe(true);
  });

  it('un idioma que no está en la lista no es activo', () => {
    expect(esIdiomaActivo('en', ['fr'])).toBe(false);
    expect(esIdiomaActivo('de', ['fr', 'en'])).toBe(false);
  });

  it('el principal siempre es activo, aunque la lista no lo traiga', () => {
    expect(esIdiomaActivo('fr', ['en'])).toBe(true);
    expect(esIdiomaActivo('fr', [])).toBe(true);
  });

  it('sin dato (site-config sin leer) no se filtra: se sirve, como hoy', () => {
    expect(esIdiomaActivo('en', null)).toBe(true);
    expect(esIdiomaActivo('en', undefined)).toBe(true);
  });
});

describe('leerIdiomasActivos', () => {
  beforeEach(() => findGlobal.mockReset());

  it('devuelve languages.available del global site-config', async () => {
    findGlobal.mockResolvedValue({ languages: { available: ['fr', 'en'] } });
    expect(await leerIdiomasActivos()).toEqual(['fr', 'en']);
    expect(findGlobal).toHaveBeenCalledWith(expect.objectContaining({ slug: 'site-config' }));
  });

  it('ignora lo que no es un idioma de la plataforma', async () => {
    findGlobal.mockResolvedValue({ languages: { available: ['fr', 'xx', 3, null] } });
    expect(await leerIdiomasActivos()).toEqual(['fr']);
  });

  it('devuelve null si el global no se puede leer o no trae la lista', async () => {
    findGlobal.mockRejectedValue(new Error('base de datos caída'));
    expect(await leerIdiomasActivos()).toBeNull();

    findGlobal.mockResolvedValue({ languages: null });
    expect(await leerIdiomasActivos()).toBeNull();
  });
});
