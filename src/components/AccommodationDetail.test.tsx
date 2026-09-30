import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { useAccommodation } from '@hwe-platform/core-ui';

import { AccommodationDetail } from './AccommodationDetail';
import { imagen } from './__tests__/fixtures';
import { SITE_CONFIG_THR, pintarPlantilla } from './__tests__/plantillas';

// La plantilla lee Payload por la Local API; aquí no hay base de datos.
const find = vi.fn();
vi.mock('payload', () => ({ getPayload: vi.fn(async () => ({ find })) }));
vi.mock('../payload.config', () => ({ default: {} }));

/** Un bloque del editor que enseña qué alojamiento ve desde el contexto. Ocupa el sitio de `rich-text`. */
function SondaDeContexto() {
  return <p>contexto: {useAccommodation()?.booking.externalId ?? 'ninguno'}</p>;
}
vi.mock('../block-registry', () => ({ blockRegistry: { 'rich-text': SondaDeContexto } }));

/** El documento crudo, con los `null` que devuelve la Local API. */
const docAlojamiento = {
  id: 1,
  name: 'Mobile Home Confort 3 chambres',
  slug: 'mobile-home-confort-3-chambres',
  type: 'mobilhome',
  subtype: null,
  shortDescription: 'Location idéale pour les familles.',
  description: { root: { children: [] } },
  specs: { capacity: 6, bedrooms: 3, surface: 38, hasAC: false, petFriendly: false },
  pricing: { from: 490, currency: 'EUR', priceNote: '/sem.' },
  media: { mainImage: imagen('pict_10_1'), gallery: null, floorPlan: null },
  category: 2,
  booking: { bookable: true, externalId: '42' },
  blocks: [{ id: 'bloque-1', blockType: 'rich-text', content: { root: { children: [] } } }],
};

beforeEach(() => {
  find.mockReset().mockResolvedValue({ docs: [] });
});

describe('AccommodationDetail', () => {
  it('compone hero, ficha técnica y reserva desde el documento', async () => {
    await pintarPlantilla(AccommodationDetail, docAlojamiento);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Mobile Home Confort 3 chambres' }),
    ).toBeTruthy();
    expect(screen.getByText('Location mobil-home · Exempleville')).toBeTruthy();
    expect(screen.getByText('6 personnes')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Réserver/ })).toBeTruthy();
  });

  it('los bloques del editor leen el alojamiento del contexto', async () => {
    await pintarPlantilla(AccommodationDetail, docAlojamiento);

    expect(screen.getByText('contexto: 42')).toBeTruthy();
  });

  it('los bloques llegan al renderer con su id, sin avisos de key', async () => {
    // El schema del alojamiento descarta el `id` de cada bloque: la plantilla
    // tiene que pasar los crudos para que el renderer tenga con qué hacer key.
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    await pintarPlantilla(AccommodationDetail, docAlojamiento);

    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('sin reserva no hay llamada a reservar', async () => {
    await pintarPlantilla(AccommodationDetail, {
      ...docAlojamiento,
      booking: { bookable: false, externalId: null },
    });

    expect(screen.queryByRole('link', { name: /Réserver/ })).toBeNull();
  });

  it('un documento que no pasa el schema no pinta nada, y en desarrollo avisa', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { container } = await pintarPlantilla(AccommodationDetail, { id: 1, slug: 'roto' });

    expect(container.innerHTML).toBe('');
    expect(warn).toHaveBeenCalledWith('AccommodationDetail: datos inválidos', expect.anything());
    vi.unstubAllEnvs();
    warn.mockRestore();
  });

  it('sin site-config ni bloques la ficha se pinta igual, sin ciudad ni reserva', async () => {
    const { blocks: _blocks, ...sinBloques } = docAlojamiento;

    await pintarPlantilla(AccommodationDetail, sinBloques, null);

    expect(screen.getByText('Location mobil-home')).toBeTruthy();
    expect(screen.queryByRole('link', { name: /Réserver/ })).toBeNull();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = await pintarPlantilla(AccommodationDetail, docAlojamiento);

    expect((await axe(container)).violations).toHaveLength(0);
  });
});

describe('AccommodationDetail — URL de reserva', () => {
  it('la llamada a reservar enlaza a la URL del motor configurado', async () => {
    await pintarPlantilla(AccommodationDetail, docAlojamiento);

    expect(screen.getByRole('link', { name: /Réserver/ }).getAttribute('href')).toBe(
      'https://booking.example.com',
    );
  });

  it('con THR baja al widget de la ficha, no al bookingUrl que Payload conserva de otro motor', async () => {
    await pintarPlantilla(AccommodationDetail, docAlojamiento, SITE_CONFIG_THR);

    expect(screen.getByRole('link', { name: /Réserver/ }).getAttribute('href')).toBe('#booking');
  });

  it('la llamada a reservar va antes de los bloques del editor', async () => {
    const { container } = await pintarPlantilla(
      AccommodationDetail,
      docAlojamiento,
      SITE_CONFIG_THR,
    );
    const reservar = screen.getByRole('link', { name: /Réserver/ });
    const bloque = screen.getByText('contexto: 42');

    // DOCUMENT_POSITION_FOLLOWING: el bloque viene después del botón.
    expect(
      reservar.compareDocumentPosition(bloque) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(container.querySelectorAll('h2').length).toBeGreaterThan(0);
  });
});

describe('AccommodationDetail — widget de reserva', () => {
  it('un alojamiento reservable con externalId lleva el widget, sin bloque del editor', async () => {
    const { blocks: _blocks, ...sinBloques } = docAlojamiento;

    const { container } = await pintarPlantilla(AccommodationDetail, sinBloques, SITE_CONFIG_THR);

    expect(container.querySelector('#booking')).toBeTruthy();
    expect(screen.getByRole('link', { name: /Réserver/ }).getAttribute('href')).toBe('#booking');
  });

  it('sin externalId no hay widget, y con THR tampoco botón que bajaría a la nada', async () => {
    const { container } = await pintarPlantilla(
      AccommodationDetail,
      { ...docAlojamiento, booking: { bookable: true, externalId: null } },
      SITE_CONFIG_THR,
    );

    expect(container.querySelector('#booking')).toBeNull();
    expect(screen.queryByRole('link', { name: /Réserver/ })).toBeNull();
  });
});
