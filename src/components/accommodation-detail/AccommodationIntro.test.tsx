import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { AccommodationIntro } from './AccommodationIntro';
import { alojamiento, alojamientoCompleto, imagen } from '../__tests__/fixtures';

const completo = alojamientoCompleto();

describe('AccommodationIntro', () => {
  it('pinta la descripción con su titular y los documentos como descarga', () => {
    render(<AccommodationIntro accommodation={completo} />);

    expect(
      screen.getByRole('heading', { name: 'Location mobil-home 3 chambres à Exempleville' }),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Inventaire PDF' }).getAttribute('href')).toBe(
      '/media/inventaire.jpg',
    );
  });

  it('sin galería el texto ocupa el ancho y un documento sin archivo no se pinta', () => {
    const { container } = render(
      <AccommodationIntro
        accommodation={alojamiento({ documents: [{ label: 'Sin archivo', file: 7 }] })}
      />,
    );

    expect(container.querySelector('.lg\\:col-span-12')).toBeTruthy();
    expect(screen.queryByText('Sin archivo')).toBeNull();
  });

  it('con galería el texto va en 5/12 y la galería en 7/12', () => {
    const { container } = render(
      <AccommodationIntro
        accommodation={alojamiento({
          media: { mainImage: imagen('a'), gallery: [imagen('b'), imagen('c')] },
        })}
      />,
    );

    expect(container.querySelector('.lg\\:col-span-5')).toBeTruthy();
    expect(container.querySelector('.lg\\:col-span-7')).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = render(<AccommodationIntro accommodation={completo} />);

    expect((await axe(container)).violations).toHaveLength(0);
  });
});
