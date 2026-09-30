import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { AccommodationComparison } from './AccommodationComparison';
import { imagen } from '../__tests__/fixtures';

describe('AccommodationComparison', () => {
  const tarjeta = {
    image: imagen('cottage'),
    title: 'Cottage Premium 3 chambres',
    subtitle: '45 m² · 3 chambres',
    url: '/cottage-premium',
    readMoreLabel: 'Voir la fiche',
    variant: 'link' as const,
  };

  it('con una tarjeta el titular va en singular', () => {
    render(<AccommodationComparison tarjetas={[tarjeta]} />);

    expect(screen.getByRole('heading', { name: 'Notre autre location' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Voir la fiche/ }).getAttribute('href')).toBe(
      '/cottage-premium',
    );
  });

  it('con varias, en plural; sin ninguna, nada', () => {
    const { container, rerender } = render(
      <AccommodationComparison tarjetas={[tarjeta, { ...tarjeta, url: '/otro' }]} />,
    );
    expect(screen.getByRole('heading', { name: 'Nos autres locations' })).toBeTruthy();

    rerender(<AccommodationComparison tarjetas={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = render(<AccommodationComparison tarjetas={[tarjeta]} />);

    expect((await axe(container)).violations).toHaveLength(0);
  });
});
