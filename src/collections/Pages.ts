import { pageInputSchema, pageUpdateSchema } from '@hwe-platform/core-ui';

import { publicContentAccess } from '../access';
import { blocksField } from '../fields/blocks';
import { linkFields } from '../fields/blocks/partes';
import { personalizationField } from '../fields/personalization';
import { seoGroup, slugField } from '../fields/seo';
import { revalidateDocument } from '../hooks/revalidate';
import { slugFrom } from '../hooks/slug';
import { validateWrite } from '../hooks/validate';

import type { CollectionConfig } from 'payload';

/**
 * Páginas con page builder. El editor monta la secuencia de bloques en el
 * orden que quiera y la URL sale del slug, sin estructura forzada por código
 * (DEC-009, ver hwe-tools/docs/arquitectura/paginas-routing.md).
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: publicContentAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'type', 'parent'],
    group: 'Contenido',
  },
  hooks: {
    beforeChange: [
      slugFrom('title'),
      validateWrite({
        create: pageInputSchema,
        update: pageUpdateSchema,
        label: 'pages',
      }),
    ],
    afterChange: [revalidateDocument],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('el título'),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'static',
      options: ['home', 'landing', 'static', 'listing', 'contact', 'faq'],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: { description: 'Página de la que cuelga esta, para los breadcrumbs.' },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'variant',
          type: 'select',
          required: true,
          defaultValue: 'none',
          options: ['video', 'image', 'minimal', 'slider', 'none'],
        },
        { name: 'media', type: 'upload', relationTo: 'media' },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: { description: 'Línea corta sobre el titular. En el diseño, la localización.' },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: { description: 'Sustituye al título de la página en el hero.' },
        },
        { name: 'subtitle', type: 'text', localized: true },
        {
          name: 'titleMode',
          type: 'select',
          defaultValue: 'text',
          options: ['text', 'logo', 'both'],
          admin: {
            description:
              'Con "logo" el logo del site hace de titular (el h1 se pinta igual, oculto). Con "both", el logo encima y el titular visible debajo, que es el h1.',
          },
        },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'left',
          options: ['left', 'center'],
        },
        { name: 'showBreadcrumbs', type: 'checkbox', defaultValue: false },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'standard',
          options: ['standard', 'tall', 'viewport'],
          admin: {
            description:
              'Altura del hero de imagen: la estándar del theme, una más alta, o pantalla completa (para la home).',
            condition: (_, siblingData) =>
              siblingData?.variant === 'image' || siblingData?.variant === 'slider',
          },
        },
        {
          name: 'showAsHeading',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description:
              'Desmárcalo si el titular del hero es un eslogan y no el tema de la página: se pinta igual pero no es el h1, y el primer bloque con titular pasa a serlo.',
          },
        },
        {
          name: 'cta',
          type: 'array',
          labels: { singular: 'Botón', plural: 'Botones' },
          fields: linkFields,
          admin: { description: 'Botones bajo el subtítulo.' },
        },
        {
          name: 'mediaSlides',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.variant === 'slider',
            description:
              'Slider con el texto fijo: solo rotan estas imágenes. Si rellenas "Diapositivas", mandan esas.',
          },
        },
        {
          name: 'slides',
          type: 'array',
          labels: { singular: 'Diapositiva', plural: 'Diapositivas' },
          admin: {
            condition: (_, siblingData) => siblingData?.variant === 'slider',
            description: 'Slider en el que cada diapositiva trae su propio texto y botones.',
          },
          fields: [
            { name: 'media', type: 'upload', relationTo: 'media', required: true },
            { name: 'eyebrow', type: 'text', localized: true },
            { name: 'title', type: 'text', localized: true },
            { name: 'subtitle', type: 'text', localized: true },
            { name: 'cta', type: 'array', fields: linkFields },
          ],
        },
      ],
    },
    blocksField,
    seoGroup([
      { name: 'noIndex', type: 'checkbox', defaultValue: false },
      { name: 'canonicalUrl', type: 'text' },
    ]),
    personalizationField,
  ],
};
