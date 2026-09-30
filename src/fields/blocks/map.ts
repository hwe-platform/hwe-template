import { headingFields, headingToneField, linkFields } from './partes';

import type { Block } from 'payload';

/**
 * Mapa de ubicación con accesos (HU-018).
 *
 * Bloque de referencia, como `blog`: aquí solo hay presentación. Coordenadas,
 * dirección, accesos y proveedor se editan una vez en «Configuración del site»
 * y el site los inyecta antes de renderizar.
 *
 * `LocationMap` y no `Map`: el nombre corto taparía el `Map` global.
 */
export const LocationMap: Block = {
  slug: 'map',
  labels: { singular: 'Mapa', plural: 'Mapas' },
  fields: [
    ...headingFields,
    headingToneField,
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      options: ['default', 'muted', 'none'],
      admin: { description: 'Fondo de la sección. Las secciones suelen alternar.' },
    },
    {
      name: 'showAddress',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Nombre y dirección junto al mapa. Se editan en Configuración del site → Contacto.',
      },
    },
    {
      name: 'showTransport',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'Accesos (coche, tren, avión). Se editan en Configuración del site → Ubicación.',
      },
    },
    {
      name: 'ctas',
      type: 'array',
      fields: linkFields,
      admin: { description: 'Botones tras el de itinerario. Ej: «Plan du camping».' },
    },
  ],
};
