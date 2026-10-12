import { backgroundField, headingFields, headingLevelField, linkFields } from './partes';

import type { Block } from 'payload';

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Llamada a la acción', plural: 'Llamadas a la acción' },
  fields: [
    ...headingFields,
    { name: 'links', type: 'array', required: true, fields: linkFields },
    // Sin fondo por defecto: los CTA que ya existían no tenían.
    backgroundField('none'),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Foto de fondo. Con ella la banda lleva un velo oscuro y el texto en blanco, y el fondo de arriba no se aplica.',
      },
    },
    headingLevelField,
  ],
};
