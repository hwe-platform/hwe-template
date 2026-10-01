import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { find, leerIndexacion } = vi.hoisted(() => ({ find: vi.fn(), leerIndexacion: vi.fn() }));

vi.mock('payload', () => ({ getPayload: async () => ({ find }) }));
vi.mock('../payload.config', () => ({ default: {} }));
vi.mock('../services/seo/indexacion', () => ({ leerIndexacion }));

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
