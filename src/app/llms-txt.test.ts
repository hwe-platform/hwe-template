import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { find, findGlobal, unstableCache } = vi.hoisted(() => ({
  find: vi.fn(),
  findGlobal: vi.fn(),
  unstableCache: vi.fn(),
}));

vi.mock('payload', () => ({ getPayload: async () => ({ find, findGlobal }) }));
vi.mock('../payload.config', () => ({ default: {} }));
// Fuera de Next no hay caché de datos: se ejecuta la función tal cual.
vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown, keys: unknown, options: unknown) => {
    unstableCache(keys, options);
    return fn;
  },
}));

import { GET } from './llms.txt/route';

const SITE_CONFIG = {
  indexing: 'index',
  general: {
    siteName: 'Camping Demo',
    siteDescription: 'Camping 4 étoiles en bord de Loire.\nMobil-homes et emplacements.',
  },
  contact: {
    address: 'Chemin de la Loire',
    postalCode: '49000',
    city: 'Angers',
    country: 'France',
    phone: '+33 2 00 00 00 00',
    email: 'info@demo.test',
  },
  languages: { available: ['fr', 'en'] },
  booking: { engine: 'thr' },
};

const DOCS: Record<string, unknown[]> = {
  pages: [
    { title: 'Services', slug: 'services', type: 'static' },
    { title: 'Accueil', slug: 'accueil', type: 'home' },
    { title: 'FAQ', slug: 'faq', type: 'faq', seo: { noIndex: true } },
    { title: 'Le Camping', slug: 'le-camping', type: 'static' },
  ],
  accommodations: [
    { name: 'Mobil-home Premium', slug: 'mobil-home-premium', specs: { capacity: 6, surface: 32 } },
    { name: 'Emplacement Cyclo', slug: 'emplacement-cyclo' },
  ],
};

const COMPLETO = [
  '# Camping Demo',
  '> Camping 4 étoiles en bord de Loire.',
  '> Mobil-homes et emplacements.',
  '',
  '## Pages',
  '- Accueil: https://demo.test',
  '- Le Camping: https://demo.test/le-camping',
  '- Services: https://demo.test/services',
  '',
  '## Hébergements',
  '- Mobil-home Premium (6 pers., 32m²): https://demo.test/mobil-home-premium',
  '- Emplacement Cyclo: https://demo.test/emplacement-cyclo',
  '',
  '## Réservation',
  "Réservation en ligne disponible sur chaque page d'hébergement.",
  'Moteur: THR',
  '',
  '## Langues',
  '- Français (principal): https://demo.test',
  '- Anglais: https://demo.test/en',
  '',
  '## Contact',
  'Adresse: Chemin de la Loire, 49000 Angers, France',
  'Téléphone: +33 2 00 00 00 00',
  'Email: info@demo.test',
  '',
].join('\n');

async function llmsTxt(): Promise<string> {
  return (await GET()).text();
}

function preparar() {
  find.mockReset();
  find.mockImplementation(async ({ collection }: { collection: string }) => ({
    docs: DOCS[collection] ?? [],
  }));
  findGlobal.mockReset();
  findGlobal.mockResolvedValue(SITE_CONFIG);
  vi.stubEnv('NEXT_PUBLIC_SERVER_URL', 'https://demo.test/');
}

describe('llms.txt', () => {
  beforeEach(preparar);
  afterEach(() => vi.unstubAllEnvs());

  it('responde texto plano y fuera de los buscadores', async () => {
    const respuesta = await GET();
    expect(respuesta.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(respuesta.headers.get('X-Robots-Tag')).toBe('noindex');
  });

  it('describe el site completo, en el idioma principal y con URLs absolutas', async () => {
    expect(await llmsTxt()).toBe(COMPLETO);
  });

  it('lee por la Local API y en el idioma principal', async () => {
    await llmsTxt();
    expect(findGlobal).toHaveBeenCalledWith(
      expect.objectContaining({ slug: 'site-config', locale: 'fr' }),
    );
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: 'pages', locale: 'fr' }),
    );
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: 'accommodations', sort: 'order' }),
    );
  });

  it('una página con noindex no se anuncia', async () => {
    expect(await llmsTxt()).not.toContain('FAQ');
  });
});

describe('llms.txt: lo que falta', () => {
  beforeEach(preparar);
  afterEach(() => vi.unstubAllEnvs());

  it('sin motor de reservas no hay sección de reserva', async () => {
    findGlobal.mockResolvedValue({ ...SITE_CONFIG, booking: { engine: 'none' } });
    expect(await llmsTxt()).not.toContain('## Réservation');
  });

  it('con un solo idioma no hay sección de idiomas', async () => {
    findGlobal.mockResolvedValue({ ...SITE_CONFIG, languages: { available: ['fr'] } });
    expect(await llmsTxt()).not.toContain('## Langues');
  });

  it('sin datos no inventa: omite lo que falta, también los idiomas que el site no declara', async () => {
    findGlobal.mockResolvedValue({ indexing: 'index' });
    find.mockImplementation(async () => ({ docs: [] }));
    // Sin `languages.available` solo cuenta el principal, y con uno solo no hay sección.
    expect(await llmsTxt()).toBe('\n');
  });

  it('site cerrado: solo el nombre y que no está publicado, sea cual sea el contenido', async () => {
    findGlobal.mockResolvedValue({ ...SITE_CONFIG, indexing: 'noindex' });
    expect(await llmsTxt()).toBe("# Camping Demo\n> Ce site n'est pas encore publié.\n");
  });

  it('falla cerrado: sin poder leer el interruptor, tampoco se anuncia nada', async () => {
    findGlobal.mockResolvedValue({ general: SITE_CONFIG.general });
    expect(await llmsTxt()).toBe("# Camping Demo\n> Ce site n'est pas encore publié.\n");
    findGlobal.mockResolvedValue({});
    expect(await llmsTxt()).toBe("> Ce site n'est pas encore publié.\n");
  });

  it('sin la URL pública del site, las rutas quedan relativas', async () => {
    vi.stubEnv('NEXT_PUBLIC_SERVER_URL', '');
    const texto = await llmsTxt();
    expect(texto).toContain('- Accueil: /\n');
    expect(texto).toContain('- Le Camping: /le-camping\n');
  });

  it('cachea con el tag que invalidan los hooks', () => {
    expect(unstableCache).toHaveBeenCalledWith(['llms-txt'], { tags: ['llms-txt'] });
  });
});
