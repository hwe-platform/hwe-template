import { describe, it, expect } from 'vitest';

import { buildPageJsonLd } from '../page-resolver';
import { ctx, home, lexical, mobilhome, paginaContacto, siteConfig } from './fixtures';

import type { PageJsonLdInput } from '../page-resolver';

const migas = [
  { name: 'Accueil', path: '/' },
  { name: 'Le camping', path: '/le-camping' },
];

function entrada(overrides: Partial<PageJsonLdInput>): PageJsonLdInput {
  return {
    resolved: {
      collection: 'pages',
      doc: { title: 'Le camping', slug: 'le-camping', type: 'static' },
    },
    siteConfig,
    path: '/le-camping',
    breadcrumbs: migas,
    ...overrides,
  };
}

function tipos(input: PageJsonLdInput): string[] {
  return buildPageJsonLd(input, ctx)['@graph'].map((nodo) => nodo['@type']);
}

describe('buildPageJsonLd — capas', () => {
  it('envuelve todo en un solo @graph con @context', () => {
    expect(buildPageJsonLd(entrada({}), ctx)['@context']).toBe('https://schema.org');
  });

  it('una página estática lleva capa 1 + WebPage de fallback', () => {
    expect(tipos(entrada({}))).toEqual(['WebSite', 'Organization', 'BreadcrumbList', 'WebPage']);
  });

  it('la home no lleva migas y genera el negocio', () => {
    const input = entrada({
      resolved: { collection: 'pages', doc: home as Record<string, unknown> },
      path: '/',
      breadcrumbs: [{ name: 'Accueil' }],
    });
    expect(tipos(input)).toEqual(['WebSite', 'Organization', 'Campground']);
  });

  it('la home cae en WebPage si el negocio no tiene los obligatorios', () => {
    const input = entrada({
      resolved: { collection: 'pages', doc: home as Record<string, unknown> },
      siteConfig: { ...siteConfig, contact: null },
      path: '/',
    });
    expect(tipos(input)).toEqual(['WebSite', 'Organization', 'WebPage']);
  });
});

describe('buildPageJsonLd — capa 2 por tipo de contenido', () => {
  it('la página de contacto genera ContactPage', () => {
    const input = entrada({
      resolved: { collection: 'pages', doc: paginaContacto as Record<string, unknown> },
      path: '/contact',
    });
    expect(tipos(input)).toContain('ContactPage');
    expect(tipos(input)).not.toContain('WebPage');
  });

  it('un listado con alojamientos genera el negocio con containsPlace', () => {
    const input = entrada({
      resolved: {
        collection: 'pages',
        doc: { title: 'Nos Locations', slug: 'locations', type: 'listing' },
      },
      accommodations: [mobilhome],
    });
    expect(tipos(input).at(-1)).toBe('Campground');
  });

  it('un listado sin alojamientos cae en WebPage', () => {
    const input = entrada({
      resolved: {
        collection: 'pages',
        doc: { title: 'Nos Locations', slug: 'locations', type: 'listing' },
      },
    });
    expect(tipos(input).at(-1)).toBe('WebPage');
  });

  it('una página con bloque FAQ con preguntas genera FAQPage', () => {
    const input = entrada({
      blocks: [{ blockType: 'faq', items: [{ question: 'Animaux ?', answer: lexical('Oui.') }] }],
    });
    expect(tipos(input)).toEqual(['WebSite', 'Organization', 'BreadcrumbList', 'FAQPage']);
  });
});

describe('buildPageJsonLd — capa 2 de las fichas', () => {
  it('la ficha de un alojamiento genera Accommodation', () => {
    const input = entrada({
      resolved: { collection: 'accommodations', doc: mobilhome as Record<string, unknown> },
      path: '/mobile-home-confort',
    });
    expect(tipos(input).at(-1)).toBe('Accommodation');
  });

  it('entidades y artículos caen en WebPage hasta que existan sus templates', () => {
    const entidad = entrada({
      resolved: { collection: 'entities', doc: { name: 'Piscine', shortDescription: 'Chauffée.' } },
    });
    const articulo = entrada({
      resolved: { collection: 'articles', doc: { title: 'Saison 2026', excerpt: 'Nouveautés.' } },
    });

    const webPageEntidad = buildPageJsonLd(entidad, ctx)['@graph'].at(-1);
    expect(webPageEntidad).toMatchObject({
      '@type': 'WebPage',
      name: 'Piscine',
      description: 'Chauffée.',
    });
    expect(buildPageJsonLd(articulo, ctx)['@graph'].at(-1)).toMatchObject({
      '@type': 'WebPage',
      description: 'Nouveautés.',
    });
  });
});

describe('buildPageJsonLd — datos incompletos', () => {
  it('sin nombre del site no hay capa 1, pero la página sigue teniendo su schema', () => {
    expect(tipos(entrada({ siteConfig: {} }))).toEqual(['BreadcrumbList', 'WebPage']);
  });

  it('el WebPage de fallback usa la metaDescription y la URL de la ruta', () => {
    const input = entrada({
      resolved: {
        collection: 'pages',
        doc: {
          title: 'Le camping',
          type: 'static',
          seo: { metaDescription: 'Au cœur de la région.' },
        },
      },
    });
    expect(buildPageJsonLd(input, ctx)['@graph'].at(-1)).toMatchObject({
      description: 'Au cœur de la région.',
      url: 'https://example.com/le-camping',
    });
  });
});
