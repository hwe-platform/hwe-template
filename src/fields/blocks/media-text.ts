import {
  DOMINIOS_INCRUSTABLES,
  MEDIA_TEXT_LAYOUTS,
  MEDIA_TEXT_MEDIA,
  MEDIA_TEXT_MEDIA_SECONDARY,
  esUrlIncrustable,
} from '@hwe-platform/core-ui';
import { backgroundField, headingFields, headingLevelField, iconField, linkFields } from './partes';

import type { Block } from 'payload';

/**
 * Imagen + texto: el bloque que más secciones cubre del catálogo.
 *
 * Sus campos salen de comparar las siete apariciones del Figma, no de
 * imaginarlas. Lo que allí varía es el tipo de medio, el reparto de columnas,
 * la orientación y la alineación — y cada una va como su propio campo.
 */
export const MediaText: Block = {
  slug: 'media-text',
  labels: { singular: 'Imagen + texto', plural: 'Imagen + texto' },
  fields: [
    ...headingFields,
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'media',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [...MEDIA_TEXT_MEDIA],
      admin: {
        description: 'Qué se pinta en la columna del medio. cards: tarjetas con foto y enlace.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, hermanos) => hermanos?.media === 'image' },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { condition: (_, hermanos) => hermanos?.media === 'carousel' },
    },
    {
      name: 'embedUrl',
      type: 'text',
      // Misma regla que el schema Zod, para que el fallo salga en el panel al
      // guardar y no en silencio al pintar.
      validate: (valor: unknown) =>
        typeof valor !== 'string' ||
        valor === '' ||
        esUrlIncrustable(valor) ||
        `Solo se puede incrustar https de: ${DOMINIOS_INCRUSTABLES.join(', ')}`,
      admin: {
        condition: (_, hermanos) => hermanos?.media === 'embed',
        description: `URL del contenido incrustado — por ejemplo, un mapa. Dominios admitidos: ${DOMINIOS_INCRUSTABLES.join(', ')}.`,
      },
    },
    {
      name: 'mediaCards',
      type: 'array',
      labels: { singular: 'Tarjeta', plural: 'Tarjetas' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        iconField({ description: 'Icono en un círculo sobre el titular.' }),
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'url', type: 'text' },
      ],
      admin: {
        condition: (_, hermanos) =>
          hermanos?.media === 'cards' || hermanos?.mediaTypeSecondary === 'cards',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'media-left',
      options: [...MEDIA_TEXT_LAYOUTS],
      admin: {
        description:
          'Reparto: medio a la izquierda o a la derecha del texto, tres columnas con un segundo medio (media-split), o apilados.',
      },
    },
    {
      name: 'mediaTypeSecondary',
      type: 'select',
      options: [...MEDIA_TEXT_MEDIA_SECONDARY],
      admin: {
        condition: (_, hermanos) => hermanos?.layout === 'media-split',
        description: 'Qué pinta la tercera columna: una imagen o tarjetas.',
      },
    },
    {
      name: 'mediaSecondary',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, hermanos) =>
          hermanos?.layout === 'media-split' && hermanos?.mediaTypeSecondary === 'image',
      },
    },
    {
      name: 'split',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 11,
      admin: {
        // Solo cuenta en los repartos de dos columnas.
        condition: (_, hermanos) =>
          !hermanos?.layout ||
          hermanos.layout === 'media-left' ||
          hermanos.layout === 'media-right',
        description:
          'Columnas que ocupa el medio sobre doce. 6 es mitad y mitad; el diseño de referencia usa 5, 6 y 7.',
      },
    },
    {
      name: 'eyebrowRule',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Línea corta de acento a la izquierda del antetítulo.' },
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: ['start', 'center'],
      admin: { description: 'Alineación vertical de las dos columnas.' },
    },
    {
      name: 'ratio',
      type: 'select',
      defaultValue: 'landscape',
      options: ['portrait', 'landscape', 'square'],
      admin: { description: 'Proporción del marco del medio.' },
    },
    { name: 'ctas', type: 'array', fields: linkFields },
    {
      name: 'titleAccent',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Segunda línea del titular, en color de acento. Vacío deja el titular en una línea.',
      },
    },
    backgroundField(),
    headingLevelField,
    {
      name: 'slotId',
      type: 'text',
      admin: {
        description:
          'Identificador para que el site inserte contenido propio en esta instancia (slot-registry.tsx). Déjalo vacío si no hay ninguno.',
      },
    },
  ],
};
