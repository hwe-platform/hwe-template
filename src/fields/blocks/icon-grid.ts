import { headingFields, headingToneField, iconField, linkFields } from './partes';

import type { Block } from 'payload';

export const IconGrid: Block = {
  slug: 'icon-grid',
  labels: { singular: 'Grid de iconos', plural: 'Grids de iconos' },
  fields: [
    ...headingFields,
    headingToneField,
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description:
          'Cuántos caben en una fila en pantalla grande. El diseño de referencia usa 3, 5 y 6. El tamaño de los iconos y la rampa responsive se derivan de este número.',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'bare',
      options: ['bare', 'card', 'equipment'],
      admin: {
        description:
          'Iconos sueltos sobre el fondo, cada uno en su tarjeta, o lista de equipamiento (filas compactas en dos columnas, con incluido / excluido; ignora las columnas).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description:
          'Párrafo de entrada entre el titular y la rejilla. Distinto del antetítulo, que va encima y es una línea corta.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      options: ['default', 'muted', 'none'],
      admin: { description: 'Fondo de la sección. Las secciones suelen alternar.' },
    },
    { name: 'ctas', type: 'array', fields: linkFields },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        iconField(),
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', localized: true },
        {
          name: 'included',
          type: 'checkbox',
          label: 'Incluido',
          // Marcado de partida, igual que el equipamiento de `accommodations`:
          // desmarcar es el gesto explícito de «no lo tiene».
          defaultValue: true,
          admin: {
            description: 'Desmárcalo para pintarlo como no incluido (atenuado y con una X).',
            // Solo tiene sentido en la lista de equipamiento; en el resto de
            // variantes el bloque no lo lee.
            condition: (_, __, { blockData }) => blockData?.variant === 'equipment',
          },
        },
      ],
    },
  ],
};
