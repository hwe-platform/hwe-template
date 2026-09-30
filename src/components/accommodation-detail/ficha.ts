import { mediaAlt } from '@hwe-platform/core-ui';

import type { AccommodationData, CardGridItem, HeroData, MediaRef } from '@hwe-platform/core-ui';

/**
 * Rótulos de interfaz de la ficha. No salen de Payload: van en el idioma del
 * cliente, y cada site los ajusta a su diseño. Los de partida están en francés,
 * el idioma principal del template; `MH:NNN` y `App:NNN` señalan la línea del
 * diseño de referencia de la que salieron, y lo marcado `INVENTADO` completa
 * casos que ese diseño no pinta (un tipo que no es mobil-home, más de un
 * alojamiento comparado).
 */
export const ROTULOS = {
  /** Supertítulo del hero, por tipo. */
  tipos: {
    emplacement: 'Emplacement', // INVENTADO: el export solo tiene «Nos Emplacements» (App:671)
    mobilhome: 'Location mobil-home', // MH:142
    cottage: 'Location cottage', // INVENTADO
    chalet: 'Location chalet', // INVENTADO
    tente: 'Location tente', // INVENTADO
  } satisfies Record<AccommodationData['type'], string>,
  desde: 'À partir de', // MH:151
  personas: 'personnes', // MH:151
  dormitorios: 'chambres', // MH:466
  composicion: 'Composition des chambres', // MH:292
  equipamiento: 'Équipements & services', // MH:322
  plano: 'Plan de la location', // MH:226, el botón que abre el plano
  comparar: 'Comparer', // MH:445
  otraLocation: 'Notre autre location', // MH:448, con un solo alojamiento comparado
  otrasLocations: 'Nos autres locations', // INVENTADO: plural de MH:448
  verFicha: 'Voir la fiche', // MH:471
  // MH:425, sin la coletilla de tipo y ciudad, que es de un solo alojamiento
  tarifas: 'Tarifs et réservation',
  reservar: 'Réserver', // App:155
} as const;

/** Lo que pinta la tarjeta de un alojamiento comparado. */
export type AlojamientoComparado = {
  name: string;
  slug: string;
  subtype?: string;
  mainImage?: MediaRef;
  media?: { mainImage?: MediaRef };
  specs?: { surface: number; bedrooms: number };
};

/**
 * El precio «desde» del alojamiento, con su nota, o `undefined` si no tiene.
 *
 * La nota se pega sin espacio cuando empieza por barra —«490 €/sem.», como el
 * export— y con espacio si es una palabra —«490 € par nuit»—, que son las dos
 * formas que admite el campo.
 *
 * @param pricing - `accommodation.pricing`
 * @param locale - Idioma activo, para el formato del número y la moneda
 * @returns «À partir de 490 €/sem.», o `undefined` sin precio
 *
 * @example
 * precioDesde({ from: 490, currency: 'EUR', priceNote: '/sem.' }, 'fr')
 * // 'À partir de 490 €/sem.'
 */
export function precioDesde(
  pricing: AccommodationData['pricing'],
  locale: string,
): string | undefined {
  if (pricing.from === undefined) return undefined;

  const importe = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(pricing.from);
  const nota = pricing.priceNote ?? '';
  const separador = nota === '' || nota.startsWith('/') ? '' : ' ';

  return `${ROTULOS.desde} ${importe}${separador}${nota}`;
}

/**
 * Los datos del hero de la ficha, compuestos desde el alojamiento.
 *
 * Un alojamiento no tiene grupo `hero` como `pages`: el hero sale de sus
 * propios campos, con la forma de `MobileHomePage.tsx:100-154` —imagen
 * principal de fondo, «tipo · ciudad» encima y ficha resumida debajo—.
 *
 * @param accommodation - El alojamiento ya validado
 * @param ciudad - `siteConfig.contact.city`, o `undefined` si no está
 * @param locale - Idioma activo
 * @returns Datos que valida `heroSchema`
 */
export function heroDeFicha(
  accommodation: AccommodationData,
  ciudad: string | undefined,
  locale: string,
): HeroData {
  const { specs, pricing } = accommodation;
  const subtitulo = [
    `${specs.surface} m²`,
    `${specs.capacity} ${ROTULOS.personas}`,
    precioDesde(pricing, locale),
  ].filter(Boolean);

  return {
    variant: 'image',
    media: accommodation.media.mainImage,
    eyebrow: [ROTULOS.tipos[accommodation.type], ciudad].filter(Boolean).join(' · '),
    title: accommodation.name,
    subtitle: subtitulo.join(' · '),
    titleMode: 'text',
    align: 'left',
    showBreadcrumbs: true,
  };
}

/**
 * Las imágenes de la galería, con la forma que pide el bloque `gallery`.
 *
 * El bloque exige `alt` en cada imagen y la mediateca lo exige al subir, pero
 * una imagen antigua puede no tenerlo: cae al nombre del alojamiento antes
 * que perder la galería entera en la validación.
 *
 * @returns Imágenes para `galleryBlockSchema`, vacío si no hay galería
 */
export function imagenesDeGaleria(accommodation: AccommodationData) {
  return (accommodation.media.gallery ?? []).map((imagen) => ({
    image: imagen,
    alt: mediaAlt(imagen) || accommodation.name,
  }));
}

/** Si una entrada de `comparison` llegó poblada. Un id suelto no se puede pintar. */
function estaPoblado(
  entrada: NonNullable<AccommodationData['comparison']>[number],
): entrada is Extract<typeof entrada, { slug: string }> {
  return typeof entrada === 'object' && entrada !== null;
}

/**
 * La tarjeta de un alojamiento comparado, con la forma de `cardItemSchema`.
 *
 * Sin imagen principal no hay tarjeta: la card apilada la exige, y la del
 * export es sobre todo una foto. La foto está en `media.mainImage` cuando
 * Payload puebla la relación con el documento entero.
 *
 * @returns La tarjeta, o `null` si el alojamiento no trae imagen
 */
export function tarjetaDeComparacion(alojamiento: AlojamientoComparado): CardGridItem | null {
  const imagen = alojamiento.media?.mainImage ?? alojamiento.mainImage;
  if (!imagen) return null;

  const { specs } = alojamiento;

  return {
    image: imagen,
    title: alojamiento.name,
    subtitle: specs ? `${specs.surface} m² · ${specs.bedrooms} ${ROTULOS.dormitorios}` : undefined,
    tag: alojamiento.subtype,
    url: `/${alojamiento.slug}`,
    readMoreLabel: ROTULOS.verFicha,
    variant: 'link',
  };
}

/**
 * Las tarjetas de los alojamientos comparados que el editor eligió.
 *
 * Las entradas sin poblar se descartan: son ids sueltos, y la consulta ya
 * pide profundidad suficiente para que lleguen como documento. El propio
 * alojamiento también: el campo del panel deja elegirlo, y compararse con uno
 * mismo no dice nada.
 */
export function tarjetasDeComparacion(accommodation: AccommodationData): CardGridItem[] {
  return (accommodation.comparison ?? [])
    .filter(estaPoblado)
    .filter((comparado) => comparado.id !== accommodation.id)
    .map(tarjetaDeComparacion)
    .filter((tarjeta): tarjeta is CardGridItem => tarjeta !== null);
}
