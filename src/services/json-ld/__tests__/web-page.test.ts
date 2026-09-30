import { describe, it, expect } from 'vitest';

import { buildWebPageSchema } from '../web-page';
import { ctx } from './fixtures';

describe('buildWebPageSchema', () => {
  it('genera el WebPage con referencia al WebSite', () => {
    expect(
      buildWebPageSchema(
        {
          name: 'Mentions légales',
          description: 'Mentions légales du site Camping Example.',
          url: 'https://example.com/mentions-legales',
        },
        ctx,
      ),
    ).toEqual({
      '@type': 'WebPage',
      name: 'Mentions légales',
      description: 'Mentions légales du site Camping Example.',
      url: 'https://example.com/mentions-legales',
      inLanguage: 'fr',
      isPartOf: { '@id': 'https://example.com/#website' },
    });
  });

  it('omite la descripción si no existe', () => {
    const schema = buildWebPageSchema(
      { name: 'Plan du camping', description: null, url: 'https://example.com/plan' },
      ctx,
    );
    expect(schema).not.toHaveProperty('description');
  });

  it('no se genera sin nombre', () => {
    expect(buildWebPageSchema({ name: '', url: 'https://example.com/x' }, ctx)).toBeNull();
  });
});
