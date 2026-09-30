import { BUSINESS_TYPES } from '@hwe-platform/core-ui';

import type { Field } from 'payload';

/** Identidad del site. `siteName` no se localiza: es el nombre propio del cliente. */
export const generalGroup: Field = {
  name: 'general',
  type: 'group',
  label: 'General',
  fields: [
    { name: 'siteName', type: 'text', required: true },
    { name: 'siteDescription', type: 'textarea', required: true, localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'logoInverted',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Versión para fondos oscuros.' },
    },
    { name: 'stars', type: 'number', admin: { description: 'Clasificación. Opcional.' } },
    { name: 'openingDates', type: 'text', required: true, localized: true },
    {
      name: 'businessType',
      type: 'select',
      required: true,
      defaultValue: 'campground',
      options: [...BUSINESS_TYPES],
      admin: { description: 'Tipo de negocio. Decide el tipo del JSON-LD del negocio.' },
    },
  ],
};

/** Datos de contacto. Nada se localiza: son datos, no texto editorial. */
export const contactGroup: Field = {
  name: 'contact',
  type: 'group',
  label: 'Contacto',
  fields: [
    { name: 'address', type: 'text', required: true },
    { name: 'postalCode', type: 'text', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'country', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
  ],
};

/** Coordenadas y accesos, que alimentan el bloque `map`. */
export const locationGroup: Field = {
  name: 'location',
  type: 'group',
  label: 'Ubicación',
  fields: [
    { name: 'latitude', type: 'number', required: true },
    { name: 'longitude', type: 'number', required: true },
    {
      name: 'transport',
      type: 'array',
      labels: { singular: 'Acceso', plural: 'Accesos' },
      fields: [
        { name: 'icon', type: 'select', required: true, options: ['car', 'train', 'plane'] },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
  ],
};

/**
 * Idiomas del site. Debe mantenerse en sincronía con `localization.locales`
 * del payload.config — este grupo es lo que lee el middleware de Next.js para
 * decidir prefijos y dominios (ver hwe-tools/docs/arquitectura/paginas-routing.md).
 */
export const languagesGroup: Field = {
  name: 'languages',
  type: 'group',
  label: 'Idiomas',
  fields: [
    {
      name: 'available',
      type: 'text',
      hasMany: true,
      required: true,
      admin: { description: 'Códigos de idioma: fr, en, es.' },
    },
    { name: 'default', type: 'text', required: true, defaultValue: 'fr' },
    {
      name: 'prefixDefault',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: { description: 'Si el idioma principal lleva prefijo en la URL.' },
    },
    {
      name: 'strategy',
      type: 'select',
      required: true,
      defaultValue: 'prefix',
      options: ['prefix', 'domain'],
      admin: { description: 'El Hito 1 solo implementa "prefix".' },
    },
    {
      name: 'domainMap',
      type: 'array',
      admin: { condition: (_data, siblingData) => siblingData?.strategy === 'domain' },
      fields: [
        { name: 'locale', type: 'text', required: true },
        { name: 'domain', type: 'text', required: true },
      ],
    },
  ],
};

/** Perfiles sociales. Todos opcionales: cada cliente usa los suyos. */
export const socialGroup: Field = {
  name: 'social',
  type: 'group',
  label: 'Redes sociales',
  fields: [
    { name: 'instagram', type: 'text' },
    { name: 'facebook', type: 'text' },
    { name: 'youtube', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'tiktok', type: 'text' },
    { name: 'instagramHandle', type: 'text', admin: { description: 'Ej: @mi_camping' } },
  ],
};

/** Enlaces legales, que pinta el footer. */
export const legalGroup: Field = {
  name: 'legal',
  type: 'group',
  label: 'Legal',
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
};

/** IDs de analítica. Se inyectan en el layout, no se localizan. */
export const trackingGroup: Field = {
  name: 'tracking',
  type: 'group',
  label: 'Analítica',
  fields: [
    { name: 'gtmId', type: 'text' },
    { name: 'gaId', type: 'text' },
    { name: 'metaPixelId', type: 'text' },
  ],
};

/** Snippets de terceros que se insertan tal cual en el HTML. */
export const customCodeField: Field = {
  name: 'customCode',
  type: 'array',
  labels: { singular: 'Snippet', plural: 'Código de terceros' },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'code', type: 'textarea', required: true },
    {
      name: 'position',
      type: 'select',
      required: true,
      defaultValue: 'bodyEnd',
      options: ['head', 'bodyStart', 'bodyEnd'],
    },
    {
      name: 'requiresConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Si solo debe cargarse tras aceptar cookies.' },
    },
  ],
};

/**
 * Motor de reservas. Los campos de cada motor se muestran solo cuando
 * `engine` lo selecciona (`admin.condition`) — Witbooking y Resalys quedan
 * sin campos propios hasta que llegue su spec.
 *
 * Un campo `required` con `condition` que lo oculta no impide guardar:
 * Payload solo valida los campos visibles. Si el admin cambia de motor, los
 * datos del motor anterior quedan en la base hasta el siguiente guardado
 * — comportamiento estándar de Payload, no un bug.
 */
export const bookingEngineGroup: Field = {
  name: 'booking',
  type: 'group',
  label: 'Motor de reservas',
  fields: [
    {
      name: 'engine',
      type: 'select',
      required: true,
      defaultValue: 'none',
      options: [
        { label: 'THR (eSeasonResa)', value: 'thr' },
        { label: 'Mastercamping', value: 'mastercamping' },
        { label: 'Witbooking', value: 'witbooking' },
        { label: 'Resalys', value: 'resalys' },
        { label: 'Sin motor', value: 'none' },
      ],
    },

    // ── THR fields ──────────────────────────────────
    {
      name: 'codeCamping',
      type: 'text',
      required: true,
      admin: {
        description: 'Código del camping en THR. Ej: MICAMPING.',
        condition: (_data, siblingData) => siblingData?.engine === 'thr',
      },
    },
    {
      name: 'siteId',
      type: 'text',
      admin: {
        description: 'ID del site en THR. Opcional — solo si el camping tiene varios sites.',
        condition: (_data, siblingData) => siblingData?.engine === 'thr',
      },
    },
    {
      name: 'features',
      type: 'group',
      admin: {
        description: 'Widgets THR adicionales.',
        condition: (_data, siblingData) => siblingData?.engine === 'thr',
      },
      fields: [
        {
          name: 'favorites',
          type: 'checkbox',
          defaultValue: false,
          label: 'Favoritos',
          admin: { description: 'Activar bloque de favoritos.' },
        },
        {
          name: 'simpleblock',
          type: 'checkbox',
          defaultValue: false,
          label: 'SimpleBlock',
          admin: { description: 'Activar bloque de disponibilidad rápida.' },
        },
      ],
    },

    // ── Mastercamping fields ────────────────────────
    {
      name: 'idProperty',
      type: 'number',
      required: true,
      admin: {
        description: 'ID numérico de la propiedad en Mastercamping. Ej: 3.',
        condition: (_data, siblingData) => siblingData?.engine === 'mastercamping',
      },
    },
    {
      name: 'bookingUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'URL del sistema de reservas. Ej: https://booking.example.com',
        condition: (_data, siblingData) => siblingData?.engine === 'mastercamping',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'horizontal',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      admin: {
        description: 'Disposición del formulario de búsqueda.',
        condition: (_data, siblingData) => siblingData?.engine === 'mastercamping',
      },
    },

    // ── Witbooking / Resalys ────────────────────────
    // Sin campos específicos todavía. Se añadirán con su spec.
  ],
};
