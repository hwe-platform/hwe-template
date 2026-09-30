import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { AccommodationDetails } from './AccommodationDetails';
import { alojamiento, alojamientoCompleto, imagen } from '../__tests__/fixtures';

const completo = alojamientoCompleto();

describe('AccommodationDetails', () => {
  it('pinta dormitorios, equipamiento, destacados y plano', () => {
    render(<AccommodationDetails accommodation={completo} />);

    expect(screen.getByRole('heading', { name: 'Composition des chambres' })).toBeTruthy();
    expect(screen.getByText('Chambre 1 : lit double 140×190 cm')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Équipements & services' })).toBeTruthy();
    expect(screen.getByText(/Non inclus/)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Terrasse couverte' })).toBeTruthy();
    expect(screen.getByAltText('Plan du mobil-home')).toBeTruthy();
  });

  it('las secciones sin datos no se pintan', () => {
    const { container } = render(<AccommodationDetails accommodation={alojamiento()} />);

    expect(container.innerHTML).toBe('');
  });

  it('un plano sin alt usa el rótulo y el nombre', () => {
    render(
      <AccommodationDetails
        accommodation={alojamiento({
          media: { mainImage: imagen('principal'), floorPlan: imagen('plan', '') },
        })}
      />,
    );

    expect(
      screen.getByAltText('Plan de la location — Mobile Home Confort 3 chambres'),
    ).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = render(<AccommodationDetails accommodation={completo} />);

    expect((await axe(container)).violations).toHaveLength(0);
  });
});
