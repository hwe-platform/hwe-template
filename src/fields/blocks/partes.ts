import { HEADING_ALIGNS, HEADING_LEVELS, SECTION_BACKGROUNDS } from '@hwe-platform/core-ui';

import { iconField } from '../icons';

import type { Field } from 'payload';

/**
 * Piezas que comparten varios bloques del catálogo.
 *
 * Salen del fichero que tenía las definiciones porque las usa casi cualquier
 * bloque, y porque ese fichero se pasó del límite de líneas de `codigo.md` en
 * cuanto el catálogo creció. Cada bloque vive ahora en su propio módulo.
 */

/** Cabecera opcional que comparten los bloques con título y subtítulo. */
export const headingFields: Field[] = [
  { name: 'title', type: 'text', localized: true },
  { name: 'subtitle', type: 'text', localized: true },
];

/**
 * Iconos que un enlace puede llevar a la derecha del texto.
 *
 * Lista corta a propósito, como la de la barra de servicio: un `select` con
 * el set entero invita a elegir mal. Debe coincidir con el set de la primitiva
 * `Icon`; el test de paridad no lo comprueba porque el schema lo declara como
 * texto libre, así que el componente ignora lo que no conoce.
 */
const ICONOS_DE_ENLACE = ['arrowRight', 'chevronRight', 'calendar', 'phone', 'mail'];

/** Enlace con texto, destino y estilo, igual que `blockLinkSchema` en core-ui. */
export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  { name: 'url', type: 'text', required: true },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'primary',
    options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline'],
  },
  {
    name: 'icon',
    type: 'select',
    options: ICONOS_DE_ENLACE,
    admin: { description: 'Icono a la derecha del texto. Opcional.' },
  },
];

/**
 * Color del titular de sección, compartido por los bloques que llevan cabecera.
 *
 * El diseño de referencia usa los dos: el color de texto en tres secciones y
 * el de marca en «Pourquoi choisir». Por eso es un campo y no una constante.
 */
export const headingToneField: Field = {
  name: 'headingTone',
  type: 'select',
  defaultValue: 'default',
  options: ['default', 'brand'],
  admin: { description: 'Titular en color de texto, o en color de marca para destacar.' },
};

/**
 * Fondo de la sección. Las opciones son las de `SECTION_BACKGROUNDS` de
 * core-ui, que es también el enum del schema: así no pueden divergir.
 * `accent` es una banda de acento y `secondary` una banda oscura.
 *
 * @param defaultValue - `default` en las secciones; el CTA nace sin fondo.
 */
export function backgroundField(
  defaultValue: (typeof SECTION_BACKGROUNDS)[number] = 'default',
): Field {
  return {
    name: 'background',
    type: 'select',
    defaultValue,
    options: [...SECTION_BACKGROUNDS],
    admin: {
      description:
        'Fondo de la sección. Las secciones suelen alternar. accent: banda de acento; secondary: banda oscura.',
    },
  };
}

/**
 * Alineación de la cabecera y de los botones de la sección (HU-038). Las opciones son las de
 * `HEADING_ALIGNS` de core-ui, que es también el enum del schema. Va como campo del bloque y no
 * como token porque lo decide cada sección: un site puede centrar una sola.
 */
export function headingAlignField(): Field {
  return {
    name: 'headingAlign',
    type: 'select',
    defaultValue: 'left',
    options: [...HEADING_ALIGNS],
    admin: {
      description: 'Alineación del título, el texto de entrada y los botones de la sección.',
    },
  };
}

/**
 * Nivel del titular del bloque. **Oculto en el admin** (`admin.hidden`): lo fija
 * el pipeline según la posición del bloque, porque una jerarquía de
 * encabezados rota no se ve en el panel. Sin valor, el bloque usa `h2`.
 * Ver `headingLevelSchema` en core-ui.
 */
export const headingLevelField: Field = {
  name: 'headingLevel',
  type: 'select',
  options: [...HEADING_LEVELS],
  admin: { hidden: true },
};

export { iconField };
