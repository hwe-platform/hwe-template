import type { Block } from 'payload';

/**
 * Espejo de `bookingFavoritesBlockSchema` (`packages/core-ui/src/schemas/collections/pages.schema.ts`).
 * Solo disponible con motores que ofrezcan favoritos (hoy, THR) — el bloque
 * degrada gracefully en los demás.
 */
export const BookingFavorites: Block = {
  slug: 'booking-favorites',
  labels: { singular: 'Favoritos de reservas', plural: 'Favoritos de reservas' },
  fields: [
    { name: 'widgetTitle', type: 'text', localized: true },
    {
      name: 'quantity',
      type: 'number',
      defaultValue: 6,
      min: 1,
      admin: { description: 'Cuántos alojamientos carga el widget en total.' },
    },
    {
      name: 'quantityToShow',
      type: 'number',
      defaultValue: 3,
      min: 1,
      admin: { description: 'Cuántos se ven a la vez.' },
    },
  ],
};
