import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { find, leerIndexacion, leerIdiomasActivos } = vi.hoisted(() => ({
  find: vi.fn(),
  leerIndexacion: vi.fn(),
  leerIdiomasActivos: vi.fn(),
}));

vi.mock('payload', () => ({ getPayload: async () => ({ find }) }));
vi.mock('../payload.config', () => ({ default: {} }));
vi.mock('../services/seo/indexacion', () => ({ leerIndexacion }));
vi.mock('../services/seo/idiomas', () => ({ leerIdiomasActivos }));

import sitemap from './sitemap';

const DOCS: Record<string, unknown[]> = {
  pages: [
    { slug: 'accueil', type: 'home' },
    { slug: 'le-camping', type: 'static' },
    { slug: 'faq', type: 'static', seo: { noIndex: true } },
  ],
  accommodations: [{ slug: 'mobil-home' }],
  entities: [],
  articles: [{ slug: 'nouvelle-saison' }],
};

describe('sitemap', () => {
  beforeEach(() => {
    find.mockReset();
    find.mockImplementation(async ({ collection }: { collection: string }) => ({
      docs: DOCS[collection] ?? [],
    }));
    leerIndexacion.mockResolvedValue('index');
    leerIdiomasActivos.mockResolvedValue(['fr']);
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://demo.test/');
  });
  afterEach(() => vi.unstubAllEnvs());

  it('abierto: URLs absolutas, la home sin barra y los artículos bajo /blog/', async () => {
    expect((await sitemap()).map((e) => e.url)).toEqual([
      'https://demo.test',
      'https://demo.test/blog/nouvelle-saison',
      'https://demo.test/le-camping',
      'https://demo.test/mobil-home',
    ]);
  });

  it('cerrado: vacío, y ni siquiera lee el contenido', async () => {
    leerIndexacion.mockResolvedValue('noindex');
    expect(await sitemap()).toEqual([]);
    expect(find).not.toHaveBeenCalled();
  });

  it('falla cerrado: sin poder leer el interruptor, vacío', async () => {
    leerIndexacion.mockResolvedValue(undefined);
    expect(await sitemap()).toEqual([]);
  });

  it('sin la URL pública del site no hay sitemap, porque exige URLs absolutas', async () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', '');
    expect(await sitemap()).toEqual([]);
  });
});

/** Los slugs están traducidos por idioma: la consulta es por idioma. */
const POR_IDIOMA: Record<string, Record<string, unknown[]>> = {
  fr: {
    pages: [
      { id: 1, slug: 'accueil', type: 'home' },
      { id: 2, slug: 'le-camping', type: 'static' },
    ],
  },
  en: {
    pages: [
      { id: 1, slug: 'home', type: 'home' },
      { id: 2, slug: 'the-campsite', type: 'static' },
    ],
  },
  de: { pages: [{ id: 2, slug: 'der-campingplatz', type: 'static' }] },
};

function prepararPorIdioma() {
  find.mockReset();
  find.mockImplementation(
    async ({ collection, locale }: { collection: string; locale: string }) => ({
      docs: POR_IDIOMA[locale]?.[collection] ?? [],
    }),
  );
  leerIndexacion.mockResolvedValue('index');
  vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://demo.test');
}

describe('sitemap con idiomas activos (V24): un solo idioma', () => {
  beforeEach(prepararPorIdioma);
  afterEach(() => vi.unstubAllEnvs());

  it('con un solo idioma activo solo salen sus URLs y sin alternativas', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr']);
    const entradas = await sitemap();

    expect(entradas.map((e) => e.url)).toEqual([
      'https://demo.test',
      'https://demo.test/le-camping',
    ]);
    expect(entradas.every((e) => e.alternates === undefined)).toBe(true);
    expect(find.mock.calls.every(([args]) => args.locale === 'fr')).toBe(true);
  });

  it('sin poder leer los idiomas activos, solo el principal', async () => {
    leerIdiomasActivos.mockResolvedValue(null);
    const urls = (await sitemap()).map((e) => e.url);

    expect(urls).toEqual(['https://demo.test', 'https://demo.test/le-camping']);
  });
});

describe('sitemap con idiomas activos (V24): varios idiomas', () => {
  beforeEach(prepararPorIdioma);
  afterEach(() => vi.unstubAllEnvs());

  it('con dos activos salen las dos y cada una con las alternativas', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr', 'en']);
    const entradas = await sitemap();

    expect(entradas.map((e) => e.url)).toEqual([
      'https://demo.test',
      'https://demo.test/en',
      'https://demo.test/en/the-campsite',
      'https://demo.test/le-camping',
    ]);
    const camping = entradas.find((e) => e.url === 'https://demo.test/le-camping');
    expect(camping?.alternates?.languages).toEqual({
      fr: 'https://demo.test/le-camping',
      en: 'https://demo.test/en/the-campsite',
    });
  });

  it('un idioma inactivo no aparece ni se consulta', async () => {
    leerIdiomasActivos.mockResolvedValue(['fr', 'en']);
    const entradas = await sitemap();

    expect(entradas.some((e) => e.url.includes('der-campingplatz'))).toBe(false);
    expect(find.mock.calls.some(([args]) => args.locale === 'de')).toBe(false);
  });

  it('el principal siempre entra, aunque la lista de activos no lo traiga', async () => {
    leerIdiomasActivos.mockResolvedValue(['en']);
    const urls = (await sitemap()).map((e) => e.url);

    expect(urls).toContain('https://demo.test/le-camping');
    expect(urls).toContain('https://demo.test/en/the-campsite');
  });
});
