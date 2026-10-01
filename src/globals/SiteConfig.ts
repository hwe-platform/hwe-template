import { INDEXING_MODES, siteConfigUpdateSchema } from '@hwe-platform/core-ui';

import { publicRead, authenticatedOnly } from '../access';
import {
  bookingEngineGroup,
  contactGroup,
  customCodeField,
  generalGroup,
  languagesGroup,
  legalGroup,
  locationGroup,
  socialGroup,
  trackingGroup,
} from '../fields/site-config-groups';
import { contactFormGroup, mapsGroup } from '../fields/site-config-contact-groups';
import { revalidateGlobal } from '../hooks/revalidate';
import { validateGlobalWrite } from '../hooks/validate';

import type { GlobalConfig } from 'payload';

/**
 * Configuración general del site: lo que no cambia de una página a otra.
 *
 * Es la fuente única de las redes sociales, los métodos de pago y los enlaces
 * legales — el footer los lee de aquí en vez de duplicarlos.
 */
export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Configuración del site',
  access: { read: publicRead, update: authenticatedOnly },
  admin: { group: 'Configuración' },
  hooks: {
    beforeChange: [validateGlobalWrite(siteConfigUpdateSchema, 'site-config')],
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'indexing',
      type: 'select',
      label: 'Indexación en buscadores',
      required: true,
      defaultValue: 'noindex',
      // Los valores salen del enum de core-ui: si divergen, falla el test de paridad.
      options: [
        { label: 'Cerrado — noindex (ningún buscador indexa el site)', value: INDEXING_MODES[0] },
        {
          label: 'Abierto — index (cada página decide con su «noIndex»)',
          value: INDEXING_MODES[1],
        },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Todo site nace cerrado. Mientras esté en «Cerrado», todas las páginas salen con noindex, robots.txt lo bloquea todo y el sitemap queda vacío, diga lo que diga cada página. Cámbialo a «Abierto» solo cuando el cliente decida publicar.',
      },
    },
    generalGroup,
    contactGroup,
    locationGroup,
    mapsGroup,
    contactFormGroup,
    languagesGroup,
    socialGroup,
    {
      name: 'payments',
      type: 'text',
      hasMany: true,
      admin: { description: 'Métodos de pago aceptados. Ej: CB, Visa, Mastercard.' },
    },
    legalGroup,
    trackingGroup,
    customCodeField,
    bookingEngineGroup,
  ],
};
