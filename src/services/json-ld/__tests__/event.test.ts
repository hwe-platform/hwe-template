import { describe, it, expect } from 'vitest';

import { buildEventSchema } from '../event';
import { ctx, lexical, media, siteConfig } from './fixtures';

const soiree = {
  name: 'Soirée Moules-Frites',
  slug: 'soiree-moules-frites',
  type: 'event',
  shortDescription: 'Grande soirée moules-frites sur la terrasse du restaurant.',
  image: media('soiree-moules.jpg'),
  hasOwnPage: true,
  startDate: '2026-07-15T19:30:00+02:00',
  endDate: '2026-07-15T23:00:00+02:00',
};

const antes = new Date('2026-06-01T00:00:00Z');
const despues = new Date('2026-08-01T00:00:00Z');

describe('buildEventSchema', () => {
  it('genera el Event futuro con lugar, organizador y estado', () => {
    expect(buildEventSchema({ entity: soiree, siteConfig }, ctx, antes)).toMatchObject({
      '@type': 'Event',
      name: 'Soirée Moules-Frites',
      description: 'Grande soirée moules-frites sur la terrasse du restaurant.',
      url: 'https://example.com/soiree-moules-frites',
      image: 'https://example.com/api/media/file/soiree-moules.jpg',
      startDate: '2026-07-15T19:30:00+02:00',
      endDate: '2026-07-15T23:00:00+02:00',
      location: { '@type': 'Place', name: 'Camping Example' },
      organizer: { '@id': 'https://example.com/#organization' },
      eventStatus: 'https://schema.org/EventScheduled',
    });
  });

  it('un evento pasado no lleva eventStatus', () => {
    expect(buildEventSchema({ entity: soiree, siteConfig }, ctx, despues)).not.toHaveProperty(
      'eventStatus',
    );
  });

  it('sin ficha propia no lleva URL; sin fin válido no lleva endDate', () => {
    const entity = { ...soiree, hasOwnPage: false, endDate: 'pronto' };
    const schema = buildEventSchema({ entity, siteConfig }, ctx, antes);
    expect(schema).not.toHaveProperty('url');
    expect(schema).not.toHaveProperty('endDate');
  });

  it('usa la descripción larga y omite el lugar sin nombre del site', () => {
    const entity = {
      ...soiree,
      shortDescription: null,
      description: lexical('Animation musicale.'),
    };
    const schema = buildEventSchema({ entity, siteConfig: {} }, ctx, antes);
    expect(schema?.description).toBe('Animation musicale.');
    expect(schema).not.toHaveProperty('location');
  });

  it('no se genera sin fecha de inicio válida ni sin nombre', () => {
    expect(
      buildEventSchema({ entity: { ...soiree, startDate: null }, siteConfig }, ctx),
    ).toBeNull();
    expect(buildEventSchema({ entity: { ...soiree, startDate: 'x' }, siteConfig }, ctx)).toBeNull();
    expect(buildEventSchema({ entity: { ...soiree, name: '' }, siteConfig }, ctx)).toBeNull();
  });

  it('usa la fecha actual por defecto', () => {
    const futuro = { ...soiree, startDate: '2999-01-01T00:00:00Z' };
    expect(buildEventSchema({ entity: futuro, siteConfig }, ctx)?.eventStatus).toBe(
      'https://schema.org/EventScheduled',
    );
  });
});
