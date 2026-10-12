import { beforeEach, describe, expect, it, vi } from 'vitest';

const { headers, find, findGlobal, leerIdiomasActivos } = vi.hoisted(() => ({
  headers: vi.fn(),
  find: vi.fn(),
  findGlobal: vi.fn(),
  leerIdiomasActivos: vi.fn(),
}));

class NotFoundError extends Error {}

vi.mock('next/headers', () => ({ headers }));
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new NotFoundError('NEXT_NOT_FOUND');
  },
}));
vi.mock('payload', () => ({ getPayload: async () => ({ find, findGlobal }) }));
vi.mock('../../../payload.config', () => ({ default: {} }));
vi.mock('../../../services/seo/indexacion', () => ({ leerIndexacion: async () => 'index' }));
vi.mock('../../../services/seo/idiomas', async (original) => ({
  ...(await original<Record<string, unknown>>()),
  leerIdiomasActivos,
}));

import CatchAllPage from './page';

/** El middleware pone el idioma en una cabecera: así lo recibe la página. */
function peticionEn(idioma: string) {
  headers.mockResolvedValue(new Headers({ 'x-hwe-locale': idioma }));
}

describe('catch-all: idiomas activos (V24)', () => {
  beforeEach(() => {
    find.mockReset();
    findGlobal.mockReset();
    leerIdiomasActivos.mockReset();
    find.mockResolvedValue({ docs: [{ slug: 'accueil', type: 'home', title: 'Accueil' }] });
    findGlobal.mockResolvedValue({ general: { siteName: 'Camping Example' } });
  });

  it('con available = [fr], una petición en en da 404', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr']);
    peticionEn('en');

    await expect(CatchAllPage({ params: Promise.resolve({}) })).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('con available = [fr, en], una petición en en no da 404', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr', 'en']);
    peticionEn('en');

    await expect(CatchAllPage({ params: Promise.resolve({}) })).resolves.toBeTruthy();
  });

  it('el principal nunca da 404 por idioma', async () => {
    leerIdiomasActivos.mockResolvedValue(['en']);
    peticionEn('fr');

    await expect(CatchAllPage({ params: Promise.resolve({}) })).resolves.toBeTruthy();
  });

  it('sin poder leer los idiomas activos no se filtra: se sirve, como hoy', async () => {
    leerIdiomasActivos.mockResolvedValue(null);
    peticionEn('en');

    await expect(CatchAllPage({ params: Promise.resolve({}) })).resolves.toBeTruthy();
  });

  it('un idioma inactivo no consulta el contenido', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr']);
    peticionEn('de');

    await expect(CatchAllPage({ params: Promise.resolve({}) })).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(find).not.toHaveBeenCalled();
  });
});
