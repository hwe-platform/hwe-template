import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { PageTemplate } from './PageTemplate';
import { pintarPlantilla } from './__tests__/plantillas';

// La plantilla lee Payload por la Local API; aquí no hay base de datos.
vi.mock('payload', () => ({ getPayload: vi.fn(async () => ({ find: vi.fn() })) }));
vi.mock('../payload.config', () => ({ default: {} }));

const pagina = {
  title: 'Le Camping',
  slug: 'le-camping',
  type: 'static',
  hero: { variant: 'minimal', title: 'Le Camping' },
  blocks: [],
};

describe('PageTemplate', () => {
  it('pinta el hero de la página y sus bloques', async () => {
    await pintarPlantilla(PageTemplate, pagina);

    expect(screen.getByRole('heading', { level: 1, name: 'Le Camping' })).toBeTruthy();
  });

  it('una página de contacto añade su plantilla de tipo', async () => {
    await pintarPlantilla(PageTemplate, {
      title: 'Contact',
      slug: 'contact',
      type: 'contact',
      hero: { variant: 'none' },
    });

    // Sin hero, la plantilla de contacto pone su propio `<h1>`.
    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeTruthy();
  });

  it('sin grupo hero ni site-config tampoco se rompe', async () => {
    await pintarPlantilla(
      PageTemplate,
      { title: 'Contact', slug: 'contact', type: 'contact' },
      null,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = await pintarPlantilla(PageTemplate, pagina);

    expect((await axe(container)).violations).toHaveLength(0);
  });
});

describe('PageTemplate — h1 de respaldo', () => {
  it('sin hero.title, el h1 del hero es el título de la página', async () => {
    await pintarPlantilla(PageTemplate, {
      ...pagina,
      hero: { variant: 'minimal', title: '' },
    });

    expect(screen.getByRole('heading', { level: 1, name: 'Le Camping' })).toBeTruthy();
  });

  it('sin hero, la página tiene igualmente un h1 (oculto) con su título', async () => {
    await pintarPlantilla(PageTemplate, { ...pagina, hero: { variant: 'none' } });

    const h1 = screen.getByRole('heading', { level: 1, name: 'Le Camping' });
    expect(h1.className).toBe('sr-only');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

describe('PageTemplate — hero que no valida', () => {
  it('un hero con variante pero datos rotos no deja la página sin h1', async () => {
    // `image` exige su medio: sin él HeroBlock no pinta nada, y la página
    // tiene que poner su propio h1.
    await pintarPlantilla(PageTemplate, { ...pagina, hero: { variant: 'image', titleMode: 3 } });

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Le Camping' }).className).toBe('sr-only');
  });
});
