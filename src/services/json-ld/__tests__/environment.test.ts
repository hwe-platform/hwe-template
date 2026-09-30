import { describe, it, expect } from 'vitest';

import { buildEnvironmentSchema } from '../environment';
import { ctx, lexical, media } from './fixtures';

const exempleville = {
  name: 'Exempleville — Village & Port',
  slug: 'exempleville',
  type: 'environment',
  shortDescription: 'Port de pêche et de plaisance au cœur de la région.',
  image: media('exempleville-port.jpg'),
  tag: 'Village & port',
  hasOwnPage: true,
};

describe('buildEnvironmentSchema', () => {
  it('genera la TouristAttraction con ficha propia', () => {
    expect(buildEnvironmentSchema(exempleville, ctx)).toEqual({
      '@type': 'TouristAttraction',
      name: 'Exempleville — Village & Port',
      description: 'Port de pêche et de plaisance au cœur de la région.',
      url: 'https://example.com/exempleville',
      image: 'https://example.com/api/media/file/exempleville-port.jpg',
      touristType: 'Village & port',
    });
  });

  it('sin ficha propia no lleva URL; usa la descripción larga si no hay corta', () => {
    const schema = buildEnvironmentSchema(
      { ...exempleville, hasOwnPage: false, shortDescription: '', description: lexical('Surf.') },
      ctx,
    );
    expect(schema).not.toHaveProperty('url');
    expect(schema?.description).toBe('Surf.');
  });

  it('no publica coordenadas: las del camping no son las de la atracción', () => {
    expect(buildEnvironmentSchema(exempleville, ctx)).not.toHaveProperty('geo');
  });

  it('no se genera sin nombre o sin descripción', () => {
    expect(buildEnvironmentSchema({ ...exempleville, name: null }, ctx)).toBeNull();
    expect(buildEnvironmentSchema({ ...exempleville, shortDescription: null }, ctx)).toBeNull();
  });
});
