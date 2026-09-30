import { describe, expect, it, vi } from 'vitest';

import { resolverBloques } from './resolve';

import type { BlockInstance } from '@hwe-platform/core-ui';
import type { Payload } from 'payload';

/** `site-config` como lo devuelve Payload, con los `null` de lo que falta. */
const siteConfig = {
  general: { siteName: 'Camping Example' },
  contact: {
    address: 'Rue Exemple',
    postalCode: '00000',
    city: 'Exempleville',
    country: 'France',
  },
  location: {
    latitude: 45.1234,
    longitude: 1.2345,
    transport: [{ icon: 'train', label: 'Gare de Exempleville à 3 km' }],
  },
  maps: { provider: 'osm', googleMapsApiKey: null, staticImage: null, forceConsent: false },
};

/** Un bloque como los que llegan de Payload, con su `id`. */
function bloque(datos: Record<string, unknown>): BlockInstance {
  return { id: 'b1', ...datos } as unknown as BlockInstance;
}

function payloadFalso(find = vi.fn()) {
  return { find } as unknown as Payload;
}

describe('resolverBloques — map', () => {
  it('inyecta el establecimiento y la config del mapa desde site-config', async () => {
    const [mapa] = await resolverBloques(
      payloadFalso(),
      [bloque({ blockType: 'map', title: 'Accès & Localisation' })],
      { locale: 'fr', siteConfig },
    );

    expect(mapa).toMatchObject({
      blockType: 'map',
      title: 'Accès & Localisation',
      place: {
        name: 'Camping Example',
        latitude: 45.1234,
        longitude: 1.2345,
        city: 'Exempleville',
        transport: [{ icon: 'train', label: 'Gare de Exempleville à 3 km' }],
      },
      maps: { provider: 'osm', forceConsent: false },
    });
  });

  it('no consulta la base de datos: los datos ya vienen en site-config', async () => {
    const find = vi.fn();

    await resolverBloques(payloadFalso(find), [bloque({ blockType: 'map' })], {
      locale: 'fr',
      siteConfig,
    });

    expect(find).not.toHaveBeenCalled();
  });

  it('sin site-config el bloque queda sin establecimiento y no se pintará', async () => {
    const [mapa] = await resolverBloques(payloadFalso(), [bloque({ blockType: 'map' })], {
      locale: 'fr',
      siteConfig: null,
    });

    expect(mapa).not.toHaveProperty('place');
  });
});

describe('resolverBloques — resto', () => {
  it('deja intactos los bloques que no son de referencia', async () => {
    const cta = bloque({ blockType: 'cta', title: 'Réservez' });

    const [resuelto] = await resolverBloques(payloadFalso(), [cta], { locale: 'fr', siteConfig });

    expect(resuelto).toBe(cta);
  });

  it('el blog sigue consultando sus artículos en el idioma de la página', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [] });

    const [blog] = await resolverBloques(
      payloadFalso(find),
      [bloque({ blockType: 'blog', source: 'latest', limit: 3 })],
      { locale: 'en', siteConfig },
    );

    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ collection: 'articles', locale: 'en' }),
    );
    expect(blog).toMatchObject({ items: [] });
  });

  it('si la consulta del blog falla, el bloque se queda sin artículos', async () => {
    const find = vi.fn().mockRejectedValue(new Error('sin base de datos'));

    const [blog] = await resolverBloques(
      payloadFalso(find),
      [bloque({ blockType: 'blog', source: 'latest', limit: 3 })],
      { locale: 'fr', siteConfig },
    );

    expect(blog).toMatchObject({ items: [] });
  });
});

describe('resolverBloques — media-text', () => {
  it('el consentimiento del embed sale del interruptor de site-config', async () => {
    const embed = bloque({ blockType: 'media-text', media: 'embed' });

    const [sin] = await resolverBloques(payloadFalso(), [embed], { locale: 'fr', siteConfig });
    const [con] = await resolverBloques(payloadFalso(), [embed], {
      locale: 'fr',
      siteConfig: { ...siteConfig, maps: { ...siteConfig.maps, forceConsent: true } },
    });

    expect(sin).toMatchObject({ consentGranted: false });
    expect(con).toMatchObject({ consentGranted: true });
  });

  it('sin site-config no hay consentimiento: el embed queda bloqueado', async () => {
    const [bloqueado] = await resolverBloques(
      payloadFalso(),
      [bloque({ blockType: 'media-text', media: 'embed' })],
      { locale: 'fr', siteConfig: null },
    );

    expect(bloqueado).toMatchObject({ consentGranted: false });
  });
});
