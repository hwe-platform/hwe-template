import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import { BookingProvider, SiteLayout, robotsDirective } from '@hwe-platform/core-ui';
import type React from 'react';

import config from '../../payload.config';
import { DEFAULT_LOCALE, LOCALE_HEADER, isSiteLocale } from '../../i18n';
import { leerIndexacion } from '../../services/seo/indexacion';

import '../../styles/globals.css';

import type { SiteGlobals } from '@hwe-platform/core-ui';
import type { Metadata } from 'next';
import type { SiteLocale } from '../../i18n';

// Fuente neutra de partida para titulares y texto (ver styles/theme.css). Cada
// site carga aquí las suyas y apunta a ellas --heading-font y --body-font.
const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

type Args = {
  readonly children: React.ReactNode;
};

/** Idioma activo, puesto por el middleware desde el prefijo de la URL. */
async function currentLocale(): Promise<SiteLocale> {
  const headerList = await headers();
  const fromHeader = headerList.get(LOCALE_HEADER);
  return isSiteLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
}

/**
 * Lee los globals que alimentan el marco del site.
 *
 * Devuelve `null` si no se pueden leer —base de datos no disponible, o site
 * recién creado sin configurar— para que la página siga renderizándose sin
 * cabecera ni pie en vez de romper entera.
 */
async function loadGlobals(locale: SiteLocale): Promise<SiteGlobals | null> {
  try {
    const payload = await getPayload({ config });

    const [siteConfig, header, footer, banner] = await Promise.all([
      payload.findGlobal({ slug: 'site-config', locale }),
      payload.findGlobal({ slug: 'header', locale }),
      payload.findGlobal({ slug: 'footer', locale }),
      payload.findGlobal({ slug: 'banner', locale }),
    ]);

    // Un global sin rellenar llega como objeto casi vacío. Sin nombre de site
    // ni navegación no hay marco que pintar.
    if (!siteConfig?.general?.siteName || !header?.navigation) return null;

    return {
      siteConfig,
      header,
      footer,
      banner,
    } as unknown as SiteGlobals;
  } catch {
    return null;
  }
}

/**
 * Directiva `robots` de todo el frontend (HU-026). Con el site cerrado, ninguna
 * página —tampoco el 404— sale sin `noindex, nofollow`. La página puede añadir
 * `noindex` por su cuenta cuando el site está abierto.
 */
export async function generateMetadata(): Promise<Metadata> {
  return { robots: robotsDirective({ indexing: await leerIndexacion() }) };
}

export default async function RootLayout({ children }: Args) {
  const locale = await currentLocale();
  const globals = await loadGlobals(locale);

  return (
    <html className={inter.variable} lang={locale}>
      <body>
        <BookingProvider booking={globals?.siteConfig.booking} locale={locale}>
          {globals ? (
            <SiteLayout globals={globals} locale={locale}>
              {children}
            </SiteLayout>
          ) : (
            // Sin globals configurados no hay marco, pero el contenido se ve.
            <main>{children}</main>
          )}
        </BookingProvider>
      </body>
    </html>
  );
}
