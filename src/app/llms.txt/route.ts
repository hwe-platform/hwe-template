import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import { isSiteIndexable } from '@hwe-platform/core-ui';

import config from '../../payload.config';
import { DEFAULT_LOCALE, LOCALES, PREFIX_DEFAULT_LOCALE, isSiteLocale } from '../../i18n';
import { LLMS_TXT_TAG } from '../../hooks/revalidate';

import type { Accommodation, Page, SiteConfig } from '../../payload-types';
import type { SiteLocale } from '../../i18n';

/**
 * `llms.txt` (HU-031): el site descrito en Markdown ligero para que los LLM
 * sepan qué hay y lo recomienden. Se genera desde Payload — site-config, páginas
 * y alojamientos —, así que no se mantiene a mano.
 *
 * Va en el idioma principal. Las URLs siguen el enrutado real (planas, sin barra
 * final, como el sitemap) y son absolutas si hay `NEXT_PUBLIC_SERVER_URL`.
 *
 * La lectura de Payload se cachea con el tag `llms-txt`, que invalidan los
 * `afterChange` de `pages`, `accommodations` y `site-config`. Hace falta
 * `unstable_cache` porque la Local API no es un `fetch` y Next no la etiqueta solo.
 */
export const dynamic = 'force-dynamic';

type Textos = {
  pages: string;
  accommodations: string;
  booking: string;
  bookingNote: string;
  engine: string;
  languages: string;
  main: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  persons: string;
  unpublished: string;
};

/** Los rótulos del fichero, en cada idioma que admite el site. */
const TEXTOS: Record<SiteLocale, Textos> = {
  fr: {
    pages: 'Pages',
    accommodations: 'Hébergements',
    booking: 'Réservation',
    bookingNote: "Réservation en ligne disponible sur chaque page d'hébergement.",
    engine: 'Moteur',
    languages: 'Langues',
    main: 'principal',
    contact: 'Contact',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    persons: 'pers.',
    unpublished: "Ce site n'est pas encore publié.",
  },
  en: {
    pages: 'Pages',
    accommodations: 'Accommodations',
    booking: 'Booking',
    bookingNote: 'Online booking available on each accommodation page.',
    engine: 'Engine',
    languages: 'Languages',
    main: 'main',
    contact: 'Contact',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    persons: 'guests',
    unpublished: 'This site is not published yet.',
  },
  es: {
    pages: 'Páginas',
    accommodations: 'Alojamientos',
    booking: 'Reserva',
    bookingNote: 'Reserva en línea disponible en la página de cada alojamiento.',
    engine: 'Motor',
    languages: 'Idiomas',
    main: 'principal',
    contact: 'Contacto',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Email',
    persons: 'pers.',
    unpublished: 'Este sitio aún no está publicado.',
  },
};

/** Cómo se nombra cada motor de reservas; `none` no tiene sección. */
const MOTORES: Record<string, string> = {
  thr: 'THR',
  mastercamping: 'Mastercamping',
  witbooking: 'Witbooking',
  resalys: 'Resalys',
};

type Contenido = {
  siteConfig: Partial<SiteConfig>;
  pages: readonly Page[];
  accommodations: readonly Accommodation[];
};

async function leerContenido(): Promise<Contenido> {
  const payload = await getPayload({ config });
  const lectura = { depth: 0, limit: 1000, pagination: false, locale: DEFAULT_LOCALE } as const;

  const [siteConfig, pages, accommodations] = await Promise.all([
    payload.findGlobal({ slug: 'site-config', depth: 0, locale: DEFAULT_LOCALE }),
    payload.find({ collection: 'pages', ...lectura }),
    payload.find({ collection: 'accommodations', ...lectura, sort: 'order' }),
  ]);

  return { siteConfig, pages: pages.docs, accommodations: accommodations.docs };
}

/** El nombre de un idioma escrito en el idioma principal: «Français», no «fr». */
function nombreDeIdioma(locale: SiteLocale): string {
  const nombre = new Intl.DisplayNames(DEFAULT_LOCALE, { type: 'language' }).of(locale) ?? locale;
  return nombre.charAt(0).toLocaleUpperCase(DEFAULT_LOCALE) + nombre.slice(1);
}

/** Los idiomas del site con el principal primero. Sin dato en site-config, los del código. */
function idiomasDelSite(siteConfig: Partial<SiteConfig>): SiteLocale[] {
  const declarados = (siteConfig.languages?.available ?? []).filter(isSiteLocale);
  const idiomas = declarados.length > 0 ? declarados : [...LOCALES];
  return [DEFAULT_LOCALE, ...idiomas.filter((locale) => locale !== DEFAULT_LOCALE)];
}

/** Lo que necesita cada sección: los rótulos y cómo se escribe una URL. */
type Contexto = {
  textos: Textos;
  urlDe: (ruta: string) => string;
  urlDeIdioma: (locale: SiteLocale) => string;
};

/** Un bloque de Markdown: su título y sus líneas, o nada si no hay líneas. */
function seccion(titulo: string, lineas: readonly string[]): string | null {
  return lineas.length > 0 ? [`## ${titulo}`, ...lineas].join('\n') : null;
}

function cabecera({ general }: Partial<SiteConfig>): string | null {
  const descripcion = (general?.siteDescription?.split(/\r?\n/) ?? [])
    .filter(Boolean)
    .map((linea) => `> ${linea}`);
  const lineas = [general?.siteName ? `# ${general.siteName}` : '', ...descripcion].filter(Boolean);
  return lineas.length > 0 ? lineas.join('\n') : null;
}

/**
 * La home primero; el resto por título. Una página con noindex no se anuncia:
 * sería contradecir su propio `<meta robots>`.
 */
function paginas(pages: readonly Page[], { textos, urlDe }: Contexto): string | null {
  const lineas = pages
    .filter((page) => !page.seo?.noIndex && (page.type === 'home' || page.slug))
    .sort((a, b) =>
      a.type === 'home' ? -1 : b.type === 'home' ? 1 : a.title.localeCompare(b.title),
    )
    .map((page) => `- ${page.title}: ${urlDe(page.type === 'home' ? '/' : `/${page.slug}`)}`);
  return seccion(textos.pages, lineas);
}

function alojamientos(
  accommodations: readonly Accommodation[],
  { textos, urlDe }: Contexto,
): string | null {
  const lineas = accommodations
    .filter((accommodation) => accommodation.slug)
    .map((accommodation) => {
      const { capacity, surface } = accommodation.specs ?? {};
      const datos = [capacity && `${capacity} ${textos.persons}`, surface && `${surface}m²`]
        .filter(Boolean)
        .join(', ');
      return `- ${accommodation.name}${datos ? ` (${datos})` : ''}: ${urlDe(`/${accommodation.slug}`)}`;
    });
  return seccion(textos.accommodations, lineas);
}

/** Solo si el site tiene motor de reservas. */
function reserva({ booking }: Partial<SiteConfig>, { textos }: Contexto): string | null {
  const motor = MOTORES[booking?.engine ?? ''];
  return motor ? seccion(textos.booking, [textos.bookingNote, `${textos.engine}: ${motor}`]) : null;
}

/** Solo si hay más de un idioma. */
function idiomas(siteConfig: Partial<SiteConfig>, contexto: Contexto): string | null {
  const locales = idiomasDelSite(siteConfig);
  if (locales.length < 2) return null;

  return seccion(
    contexto.textos.languages,
    locales.map((locale) => {
      const marca = locale === DEFAULT_LOCALE ? ` (${contexto.textos.main})` : '';
      return `- ${nombreDeIdioma(locale)}${marca}: ${contexto.urlDeIdioma(locale)}`;
    }),
  );
}

function contacto({ contact }: Partial<SiteConfig>, { textos }: Contexto): string | null {
  const ciudad = [contact?.postalCode, contact?.city].filter(Boolean).join(' ');
  const direccion = [contact?.address, ciudad, contact?.country].filter(Boolean).join(', ');
  return seccion(
    textos.contact,
    [
      direccion && `${textos.address}: ${direccion}`,
      contact?.phone && `${textos.phone}: ${contact.phone}`,
      contact?.email && `${textos.email}: ${contact.email}`,
    ].filter((linea): linea is string => Boolean(linea)),
  );
}

/**
 * Site cerrado (HU-026): solo el nombre y que no está publicado. Si el contenido no es para los
 * buscadores, tampoco para los LLM. Al abrir el site, el `afterChange` de
 * `site-config` invalida el tag y el fichero se llena solo.
 *
 * Lo que falta en Payload se omite, nunca se inventa.
 */
function construir({ siteConfig, pages, accommodations }: Contenido): string {
  if (!isSiteIndexable(siteConfig.indexing)) {
    const nombre = siteConfig.general?.siteName;
    return [nombre && `# ${nombre}`, `> ${TEXTOS[DEFAULT_LOCALE].unpublished}`]
      .filter(Boolean)
      .join('\n')
      .concat('\n');
  }

  const base = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '') ?? '';
  const urlDeIdioma = (locale: SiteLocale) =>
    `${base}${locale !== DEFAULT_LOCALE || PREFIX_DEFAULT_LOCALE ? `/${locale}` : ''}` || '/';
  const raiz = urlDeIdioma(DEFAULT_LOCALE);
  const contexto: Contexto = {
    textos: TEXTOS[DEFAULT_LOCALE],
    urlDe: (ruta) => (ruta === '/' ? raiz : `${raiz === '/' ? '' : raiz}${ruta}`),
    urlDeIdioma,
  };

  const secciones = [
    cabecera(siteConfig),
    paginas(pages, contexto),
    alojamientos(accommodations, contexto),
    reserva(siteConfig, contexto),
    idiomas(siteConfig, contexto),
    contacto(siteConfig, contexto),
  ].filter((bloque): bloque is string => bloque !== null);

  return `${secciones.join('\n\n')}\n`;
}

const generar = unstable_cache(async () => construir(await leerContenido()), ['llms-txt'], {
  tags: [LLMS_TXT_TAG],
});

export async function GET(): Promise<Response> {
  return new Response(await generar(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Es para los LLM, no para el SEO clásico: público, pero fuera de los buscadores.
      'X-Robots-Tag': 'noindex',
    },
  });
}
