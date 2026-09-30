import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { AccommodationBookingCta } from './AccommodationBookingCta';

const EXTERNA = 'https://reservas.example';

describe('AccommodationBookingCta', () => {
  it('un alojamiento no reservable no pinta nada', () => {
    const { container } = render(
      <AccommodationBookingCta bookable={false} conWidget={false} bookingUrl={EXTERNA} />,
    );

    expect(container.innerHTML).toBe('');
  });

  it('sin destino ni widget no hay nada que enseñar', () => {
    const { container } = render(
      <AccommodationBookingCta bookable conWidget={false} bookingUrl={null} />,
    );

    expect(container.innerHTML).toBe('');
  });

  it('con motor externo, el botón abre su página con rel y el precio va encima', () => {
    render(
      <AccommodationBookingCta
        bookable
        conWidget={false}
        bookingUrl={EXTERNA}
        precio="À partir de 490 €/sem."
      />,
    );
    const boton = screen.getByRole('link', { name: /Réserver/ });

    expect(boton.getAttribute('href')).toBe(EXTERNA);
    expect(boton.getAttribute('rel')).toBe('noopener noreferrer');
    expect(screen.getByText('À partir de 490 €/sem.')).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = render(
      <AccommodationBookingCta
        bookable
        conWidget
        bookingUrl="#booking"
        precio="À partir de 490 €"
      />,
    );

    expect((await axe(container)).violations).toHaveLength(0);
  });
});

describe('AccommodationBookingCta — widget de la ficha', () => {
  it('con widget, el ancla baja a él y no lleva rel', () => {
    const { container } = render(
      <AccommodationBookingCta bookable conWidget bookingUrl="#booking" />,
    );
    const boton = screen.getByRole('link', { name: /Réserver/ });

    expect(boton.getAttribute('href')).toBe('#booking');
    expect(boton.getAttribute('rel')).toBeNull();
    expect(container.querySelector('#booking')?.className).toContain('scroll-mt-28');
  });

  it('un ancla sin widget en la página no se pinta, porque no llevaría a ningún sitio', () => {
    const { container } = render(
      <AccommodationBookingCta bookable conWidget={false} bookingUrl="#booking" />,
    );

    expect(container.innerHTML).toBe('');
  });

  it('con widget y sin destino, la sección sale sin botón', () => {
    const { container } = render(<AccommodationBookingCta bookable conWidget bookingUrl={null} />);

    expect(screen.queryByRole('link', { name: /Réserver/ })).toBeNull();
    expect(container.querySelector('#booking')).toBeTruthy();
  });
});
