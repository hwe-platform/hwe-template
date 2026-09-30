import type { Block } from 'payload';

/**
 * Espejo de `bookingSearchBlockSchema` (`packages/core-ui/src/schemas/collections/pages.schema.ts`).
 * La config del motor (credenciales, engine) no vive aquí — viene del global
 * `site-config` via `BookingProvider`.
 */
export const BookingSearch: Block = {
  slug: 'booking-search',
  labels: { singular: 'Buscador de reservas', plural: 'Buscadores de reservas' },
  fields: [
    { name: 'widgetTitle', type: 'text', localized: true },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: ['manual', 'fromAccommodation'],
      admin: {
        description:
          'manual usa el tipo de alojamiento de abajo. fromAccommodation lo deriva del alojamiento de la ficha — solo tiene efecto dentro de una ficha de alojamiento.',
      },
    },
    {
      name: 'accommodationType',
      type: 'select',
      defaultValue: 'all',
      options: ['all', 'emplacement', 'locatif'],
      admin: {
        condition: (_, hermanos) => hermanos?.source === 'manual',
        description: 'Tipo de alojamiento a buscar. Solo aplica con source manual.',
      },
    },
    {
      name: 'debug',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Activa el modo debug del widget del motor de reservas.' },
    },
  ],
};
