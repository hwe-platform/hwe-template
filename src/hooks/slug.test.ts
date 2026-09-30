import { describe, it, expect } from 'vitest';

import { slugFrom } from './slug';

import type { CollectionBeforeChangeHook } from 'payload';

type Args = Parameters<CollectionBeforeChangeHook>[0];

const hook = slugFrom('title');
const ejecutar = (data: Record<string, unknown>) => hook({ data } as unknown as Args);

describe('slugFrom', () => {
  it('sin slug lo genera desde el campo de título', () => {
    expect(ejecutar({ title: 'Le Camping' })).toMatchObject({ slug: 'le-camping' });
  });

  it('normaliza el slug que escribió el editor', () => {
    expect(ejecutar({ title: 'X', slug: 'Activités & Services' })).toMatchObject({
      slug: 'activites-services',
    });
  });

  it('sin título ni slug deja los datos como estaban', () => {
    expect(ejecutar({ otro: 1 })).toEqual({ otro: 1 });
  });
});
