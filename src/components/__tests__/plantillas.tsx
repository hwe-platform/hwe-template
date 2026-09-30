import { render } from '@testing-library/react';

import type { ReactElement } from 'react';
import type { Breadcrumb } from '@hwe-platform/core-ui';
import type { TemplateProps } from '../template-types';
import type { SiteConfig } from '../../payload-types';

/** Lo que las plantillas leen de `site-config`. */
export const SITE_CONFIG = {
  general: { siteName: 'Camping Example' },
  contact: { city: 'Exempleville' },
  booking: {
    engine: 'mastercamping',
    idProperty: 3,
    bookingUrl: 'https://booking.example.com',
  },
} as unknown as SiteConfig;

/** THR, tal como lo guarda Payload tras cambiar de motor: con el `bookingUrl` de antes. */
export const SITE_CONFIG_THR = {
  ...SITE_CONFIG,
  booking: {
    engine: 'thr',
    codeCamping: 'apv85',
    siteId: null,
    features: { favorites: true, simpleblock: true },
    idProperty: 3,
    bookingUrl: 'https://booking.example.com',
  },
} as unknown as SiteConfig;

export const MIGAS: Breadcrumb[] = [
  { label: 'Accueil', url: '/' },
  { label: 'Mobile Home Confort 3 chambres' },
];

/**
 * Pinta una plantilla asíncrona: es una función que devuelve el árbol, así
 * que se espera y se monta lo que devuelve.
 */
export async function pintarPlantilla(
  Plantilla: (props: TemplateProps) => Promise<ReactElement | null>,
  doc: object,
  siteConfig: SiteConfig | null = SITE_CONFIG,
) {
  const arbol = await Plantilla({
    doc: doc as Record<string, unknown>,
    locale: 'fr',
    siteConfig,
    breadcrumbs: MIGAS,
  });
  return render(<>{arbol}</>);
}
