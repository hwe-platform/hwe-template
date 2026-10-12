import { BUSINESS_TYPES } from '@hwe-platform/core-ui';

import { DEFAULT_LOCALE, LOCALES, isSiteLocale } from '../i18n';
import { ADMIN_DECIMAL } from '../admin/decimal-field';

import type { Field } from 'payload';

/** Identidad del site. `siteName` no se localiza: es el nombre propio del cliente. */
export const generalGroup: Field = {
  name: 'general',
  type: 'group',
  label: 'General',
  fields: [
    { name: 'siteName', type: 'text', required: true },
    // Opcionales (DEC-012): lo que falte no se pinta.
    { name: 'siteDescription', type: 'textarea', localized: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Sin logo, se muestra el nombre del site como texto.' },
    },
    {
      name: 'logoInverted',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Versión para fondos oscuros. Opcional.' },
    },
    { name: 'stars', type: 'number', admin: { description: 'Clasificación. Opcional.' } },
    { name: 'openingDates', type: 'text', localized: true },
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
    { name: 'postalCode', type: 'text' },
    { name: 'city', type: 'text', required: true },
    { name: 'country', type: 'text' },
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
    // Opcionales (DEC-012): sin coordenadas, el mapa no se pinta.
    { name: 'latitude', type: 'number', admin: ADMIN_DECIMAL },
    { name: 'longitude', type: 'number', admin: ADMIN_DECIMAL },
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
 * Cada idioma activo tiene que ser uno de la plataforma (`LOCALES`). Sin esto, un
 * código mal escrito (`FR`, `pt-BR`) se guardaba y el site lo ignoraba en silencio.
 */
export function validarIdiomasActivos(
  activos: readonly string[] | null | undefined,
): true | string {
  const invalidos = (activos ?? []).filter((codigo) => !isSiteLocale(codigo));
  if (invalidos.length === 0) return true;
  return `No son idiomas de la plataforma: ${invalidos.join(', ')}. Valen: ${LOCALES.join(', ')}.`;
}

/**
 * El idioma principal tiene que estar entre los activos (V24): es el fallback de
 * Payload y el idioma sin prefijo, y un site no puede quedarse sin él.
 *
 * Sin la lista de activos no se puede comprobar y no se bloquea el guardado.
 */
export function validarPrincipalActivo(
  principal: string | null | undefined,
  activos: readonly string[] | null | undefined,
): true | string {
  if (!activos) return true;
  if (!isSiteLocale(principal)) {
    return 'El idioma principal tiene que ser uno de la plataforma: ca, es, fr, en, de, nl, it, pt.';
  }
  if (!activos.includes(principal)) {
    return `El idioma principal (${principal}) tiene que estar entre los idiomas activos.`;
  }
  return true;
}

/**
 * Idiomas del site: los que sirve (`available`) y el principal (`default`). No son
 * `localization.locales` del payload.config, que es lo que la BD puede guardar:
 * un idioma desactivado aquí sigue existiendo allí (ver
 * hwe-tools/docs/arquitectura/paginas-routing.md y specs/payload/localizacion.md).
 *
 * Un site nuevo nace con solo el idioma principal activo (`DEFAULT_LOCALE`): con
 * ocho idiomas en la plataforma, activarlos todos por defecto crearía siete
 * idiomas vacíos. El editor activa los que traduzca.
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
      defaultValue: [DEFAULT_LOCALE],
      validate: (value: string | string[] | null | undefined) =>
        validarIdiomasActivos(Array.isArray(value) ? value : value ? [value] : []),
      admin: {
        description:
          'Idiomas que sirve el site. Códigos de la plataforma: ca, es, fr, en, de, nl, it, pt. Un idioma que no esté aquí da 404 y no sale en el sitemap.',
      },
    },
    {
      name: 'default',
      type: 'text',
      required: true,
      defaultValue: DEFAULT_LOCALE,
      admin: { description: 'Idioma principal. Tiene que estar entre los activos.' },
      validate: (value: string | null | undefined, { siblingData }: { siblingData?: unknown }) =>
        validarPrincipalActivo(
          value,
          (siblingData as { available?: string[] | null } | undefined)?.available,
        ),
    },
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
