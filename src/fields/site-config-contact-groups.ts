import { MAP_PROVIDERS } from '@hwe-platform/core-ui';

import type { Field } from 'payload';

/*
 * Grupos de site-config que alimentan la ubicación y el contacto: el mapa
 * (HU-018) y el formulario de contacto (HU-021). Viven aparte de
 * `site-config-groups.ts` porque juntos pasaban del límite de líneas de
 * `codigo.md`.
 */

/**
 * Mapa del bloque `map` (HU-018): proveedor y consentimiento. Las coordenadas
 * no están aquí: son las de `location`, compartidas con el JSON-LD.
 */
export const mapsGroup: Field = {
  name: 'maps',
  type: 'group',
  label: 'Mapa',
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      defaultValue: 'osm',
      options: [
        { label: 'OpenStreetMap (sin tracking)', value: MAP_PROVIDERS[0] },
        { label: 'Google Maps', value: MAP_PROVIDERS[1] },
      ],
      admin: { description: 'Mapa interactivo que se carga tras aceptar las cookies.' },
    },
    {
      name: 'googleMapsApiKey',
      type: 'text',
      admin: {
        description:
          'Clave de la Embed API. Opcional. Es pública (va en el iframe): restríngela por dominio en Google Cloud.',
        condition: (_data, siblingData) => siblingData?.provider === 'google',
      },
    },
    {
      name: 'staticImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Captura del mapa que se ve sin consentimiento. Sin ella, un panel neutro con el enlace a Google Maps.',
      },
    },
    {
      name: 'forceConsent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Provisional hasta integrar el gestor de cookies: muestra siempre el mapa interactivo. Déjalo desactivado en producción.',
      },
    },
  ],
};

/**
 * Formulario de la página de contacto (HU-021). Los datos de contacto que se
 * muestran no están aquí: son los de `contact`, compartidos con el pie y el
 * JSON-LD.
 */
export const contactFormGroup: Field = {
  name: 'contactForm',
  type: 'group',
  label: 'Formulario de contacto',
  fields: [
    {
      name: 'subjects',
      type: 'array',
      labels: { singular: 'Asunto', plural: 'Asuntos' },
      admin: {
        description: 'Opciones del desplegable «Sujet». Sin ninguna, el formulario no se muestra.',
      },
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    {
      name: 'privacyPolicyUrl',
      type: 'text',
      required: true,
      defaultValue: '/rgpd',
      admin: {
        description: 'Página de la política de privacidad, enlazada desde la casilla RGPD.',
      },
    },
    {
      name: 'recipient',
      type: 'email',
      admin: { description: 'Quién recibe los mensajes. Vacío: el email de Contacto.' },
    },
  ],
};
