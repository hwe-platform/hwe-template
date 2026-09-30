import { describe, it, expect } from 'vitest';

import { buildArticleSchema } from '../article';
import { ctx, media } from './fixtures';

const articulo = {
  title: 'Nouvelle saison 2026 : toutes les nouveautés du camping',
  slug: 'nouvelle-saison-2026',
  excerpt: 'Découvrez les nouveautés pour la saison 2026.',
  publishedAt: '2026-03-15T10:00:00+01:00',
  updatedAt: '2026-03-20T14:30:00+01:00',
  image: media('saison-2026.jpg'),
  author: "L'équipe Example",
  category: 'Camping',
};

describe('buildArticleSchema', () => {
  it('genera el BlogPosting completo', () => {
    expect(buildArticleSchema(articulo, ctx)).toEqual({
      '@type': 'BlogPosting',
      headline: 'Nouvelle saison 2026 : toutes les nouveautés du camping',
      description: 'Découvrez les nouveautés pour la saison 2026.',
      url: 'https://example.com/nouvelle-saison-2026',
      datePublished: '2026-03-15T10:00:00+01:00',
      dateModified: '2026-03-20T14:30:00+01:00',
      image: 'https://example.com/api/media/file/saison-2026.jpg',
      author: { '@type': 'Person', name: "L'équipe Example" },
      publisher: { '@id': 'https://example.com/#organization' },
      articleSection: 'Camping',
      inLanguage: 'fr',
      isPartOf: { '@id': 'https://example.com/#website' },
    });
  });

  it('omite dateModified si coincide con la publicación, y autor e imagen sin dato', () => {
    const schema = buildArticleSchema(
      { ...articulo, updatedAt: articulo.publishedAt, author: null, image: null, category: '' },
      ctx,
    );
    for (const campo of ['dateModified', 'author', 'image', 'articleSection']) {
      expect(schema).not.toHaveProperty(campo);
    }
  });

  it('no se genera sin fecha de publicación, título, extracto o slug', () => {
    expect(buildArticleSchema({ ...articulo, publishedAt: null }, ctx)).toBeNull();
    expect(buildArticleSchema({ ...articulo, title: '' }, ctx)).toBeNull();
    expect(buildArticleSchema({ ...articulo, excerpt: null }, ctx)).toBeNull();
    expect(buildArticleSchema({ ...articulo, slug: null }, ctx)).toBeNull();
  });
});
