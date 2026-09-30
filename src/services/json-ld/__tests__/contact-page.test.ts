import { describe, it, expect } from 'vitest';

import { buildContactPageSchema } from '../contact-page';
import { ctx, paginaContacto } from './fixtures';

describe('buildContactPageSchema', () => {
  it('genera el ContactPage apuntando a la Organization, sin repetir el NAP', () => {
    expect(buildContactPageSchema(paginaContacto, ctx)).toEqual({
      '@type': 'ContactPage',
      name: 'Contact',
      url: 'https://example.com/contact',
      description: 'Contactez le Camping Example à Exempleville.',
      inLanguage: 'fr',
      isPartOf: { '@id': 'https://example.com/#website' },
      mainEntity: { '@id': 'https://example.com/#organization' },
    });
  });

  it('omite la descripción si no hay metaDescription', () => {
    const schema = buildContactPageSchema({ ...paginaContacto, seo: null }, ctx);
    expect(schema).not.toHaveProperty('description');
  });

  it('no se genera sin título', () => {
    expect(buildContactPageSchema({ ...paginaContacto, title: null }, ctx)).toBeNull();
  });
});
