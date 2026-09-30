import { getPayload } from 'payload';
import {
  AccommodationProvider,
  BlockRenderer,
  SpecBar,
  accommodationSchema,
  normalizePayloadData,
  resolveBookingUrl,
} from '@hwe-platform/core-ui';

import config from '../payload.config';
import { blockRegistry } from '../block-registry';
import { slotRegistry } from '../slot-registry';
import { resolverBloques } from '../blocks/resolve';
import { HeroBlock } from '../blocks/hero';
import { AccommodationIntro } from './accommodation-detail/AccommodationIntro';
import { AccommodationDetails } from './accommodation-detail/AccommodationDetails';
import { AccommodationComparison } from './accommodation-detail/AccommodationComparison';
import { AccommodationBookingCta } from './accommodation-detail/AccommodationBookingCta';
import { resolverComparacion } from './accommodation-detail/comparacion';
import { heroDeFicha, precioDesde } from './accommodation-detail/ficha';

import type { BlockInstance } from '@hwe-platform/core-ui';
import type { TemplateProps } from './template-types';

/** Bloques del documento tal como llegan de Payload, con su `id`. */
function bloquesDe(doc: Record<string, unknown>): BlockInstance[] {
  return Array.isArray(doc.blocks) ? (doc.blocks as BlockInstance[]) : [];
}

/**
 * Ficha de un alojamiento (HU-017).
 *
 * Compone las secciones fijas —hero, ficha técnica, intro con galería,
 * dormitorios, equipamiento, destacados y plano— con los `blocks[]` del
 * editor, precedidos de la reserva —precio, botón y widget de disponibilidad—,
 * y cierra con la comparación. Las piezas son las de
 * `specs/alojamientos/ficha-detalle.md`; la reserva va antes de los bloques y
 * no al final, como en el export (MH:421-432).
 *
 * El widget de reserva lo pinta la plantilla, no el editor: todo alojamiento
 * reservable con `externalId` lo lleva. Todo va dentro de
 * `AccommodationProvider` para que ese widget, y cualquier bloque de booking
 * de `blocks[]`, resuelvan `source: 'fromAccommodation'` con este alojamiento.
 *
 * Si el documento no pasa el schema no se pinta nada: el dato lo valida
 * Payload al guardar, así que llegar aquí inválido es un fallo de migración,
 * no algo que el visitante deba ver a medias.
 */
export async function AccommodationDetail({ doc, locale, siteConfig, breadcrumbs }: TemplateProps) {
  const resultado = accommodationSchema.safeParse(normalizePayloadData(doc));

  if (!resultado.success) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console -- aviso de desarrollo, fuera del bundle de producción
      console.warn('AccommodationDetail: datos inválidos', resultado.error.issues);
    }
    return null;
  }

  const accommodation = resultado.data;
  const payload = await getPayload({ config });
  const [tarjetas, bloques] = await Promise.all([
    resolverComparacion(payload, accommodation, locale),
    // Los bloques crudos y no los validados: el schema de cada bloque no
    // declara `id`, así que Zod lo descarta, y el `BlockRenderer` lo usa de
    // `key`. Cada bloque se valida igual al pintarse.
    resolverBloques(payload, bloquesDe(doc), { locale, siteConfig }),
  ]);

  return (
    <AccommodationProvider accommodation={accommodation}>
      <HeroBlock
        data={heroDeFicha(accommodation, siteConfig?.contact?.city ?? undefined, locale)}
        breadcrumbs={breadcrumbs}
      />
      <SpecBar specs={accommodation.specs} />

      {/* Ritmo del export para esta página (`MobileHomePage.tsx:192`), algo más
          apretado que el de las secciones de la home: aquí va todo en una. */}
      <section className="bg-card py-12 md:py-16 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-4 sm:px-6 md:gap-20 lg:px-8">
          <AccommodationIntro accommodation={accommodation} />
          <AccommodationDetails accommodation={accommodation} />
        </div>
      </section>

      {/* Reserva: precio, botón y el widget del alojamiento, encima de los bloques. */}
      <AccommodationBookingCta
        bookable={accommodation.booking.bookable}
        conWidget={accommodation.booking.bookable && Boolean(accommodation.booking.externalId)}
        bookingUrl={resolveBookingUrl(siteConfig?.booking)}
        precio={precioDesde(accommodation.pricing, locale)}
      />
      <BlockRenderer blocks={bloques} customRegistry={blockRegistry} slotRegistry={slotRegistry} />

      <AccommodationComparison tarjetas={tarjetas} />
    </AccommodationProvider>
  );
}
