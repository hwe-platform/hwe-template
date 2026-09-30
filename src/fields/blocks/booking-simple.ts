import type { Block } from 'payload';

/**
 * Espejo de `bookingSimpleBlockSchema` (`packages/core-ui/src/schemas/collections/pages.schema.ts`).
 * Solo disponible con motores que ofrezcan disponibilidad rápida (hoy, THR) —
 * el bloque degrada gracefully en los demás.
 */
export const BookingSimple: Block = {
  slug: 'booking-simple',
  labels: { singular: 'Disponibilidad rápida', plural: 'Disponibilidades rápidas' },
  fields: [
    { name: 'widgetTitle', type: 'text', localized: true },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: ['manual', 'fromAccommodation'],
      admin: {
        description:
          'manual usa las categorías de abajo. fromAccommodation usa el externalId del alojamiento de la ficha — solo tiene efecto dentro de una ficha de alojamiento.',
      },
    },
    {
      name: 'categories',
      type: 'text',
      hasMany: true,
      admin: {
        condition: (_, hermanos) => hermanos?.source === 'manual',
        description:
          'IDs de categoría del motor de reservas. En THR, consultar el panel de administración de THR para obtener los IDs.',
      },
    },
    {
      name: 'showPicture',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Muestra la foto del alojamiento en el widget.' },
    },
  ],
};
