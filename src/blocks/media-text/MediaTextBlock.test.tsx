// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MediaTextBlock } from './MediaTextBlock';

import type { BlockComponentProps } from '@hwe-platform/core-ui';

const MAPA = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891';

const base = { blockType: 'media-text', id: 'a', title: 'Le camping', ctas: [] };

/**
 * core-ui no trae rótulos visibles (regla 12): los pone el site, en el idioma
 * principal (`rotulos.ts`).
 */
describe('MediaTextBlock del template — rótulos del site', () => {
  it('las tarjetas con enlace llevan el rótulo del site', () => {
    const props = {
      data: {
        ...base,
        media: 'cards',
        mediaCards: [{ title: 'Mobil-homes', url: '/mobil-homes' }],
      },
    } as unknown as BlockComponentProps;
    render(<MediaTextBlock {...props} />);

    expect(screen.getByRole('link', { name: /Découvrir/ }).getAttribute('href')).toBe(
      '/mobil-homes',
    );
  });

  it('el embed sin consentimiento lleva el aviso y el enlace del site', () => {
    const props = {
      data: { ...base, media: 'embed', embedUrl: MAPA },
    } as unknown as BlockComponentProps;
    render(<MediaTextBlock {...props} />);

    expect(screen.getByText('Acceptez les cookies pour voir ce contenu')).toBeTruthy();
    const enlace = screen.getByRole('link', { name: 'Ouvrir dans un nouvel onglet' });
    expect(enlace.getAttribute('href')).toBe(MAPA);
  });
});
