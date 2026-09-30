import { BOOKING_ANCHOR_ID, BookingSimpleBlock, Button, Icon } from '@hwe-platform/core-ui';

import { ROTULOS } from './ficha';

export type AccommodationBookingCtaProps = {
  /** `accommodation.booking.bookable`. */
  bookable: boolean;
  /**
   * Si la ficha pinta el widget de disponibilidad: el alojamiento es
   * reservable y tiene `booking.externalId`, que es la categoría que pide.
   */
  conWidget: boolean;
  /**
   * A dónde lleva «Réserver», de `resolveBookingUrl`: la página del motor
   * (Mastercamping) o el ancla al widget de la ficha (THR).
   */
  bookingUrl?: string | null;
  /** Precio «desde» ya formateado, si lo hay. */
  precio?: string;
};

/** Un ancla lleva a la propia página: no es un enlace externo. */
const esAncla = (destino: string) => destino.startsWith('#');

/**
 * El destino del botón, o `undefined` si no debe pintarse. Un ancla sin
 * widget en la página no lleva a ningún sitio, y un botón de reservar que no
 * lleva a ningún sitio es peor que no tenerlo.
 */
function destinoDe(bookingUrl: string | null | undefined, conWidget: boolean) {
  if (!bookingUrl) return undefined;
  return esAncla(bookingUrl) && !conWidget ? undefined : bookingUrl;
}

/** El simpleblock del alojamiento, bajo el ancla a la que baja «Réserver». */
function Widget() {
  return (
    // `scroll-mt-28` (112px): la navegación queda fija arriba al hacer scroll
    // —barra de 48px en móvil y 40px en escritorio, más 64px de menú—, y sin
    // margen el ancla dejaría el widget debajo. Cubre el caso más alto.
    <div
      id={BOOKING_ANCHOR_ID}
      className="mx-auto mt-10 max-w-[1440px] scroll-mt-28 px-4 sm:px-6 lg:px-8"
    >
      <BookingSimpleBlock data={{ blockType: 'booking-simple', source: 'fromAccommodation' }} />
    </div>
  );
}

/**
 * «Tarifs et réservation»: precio, botón de reservar y, debajo, el widget de
 * disponibilidad del alojamiento, como en el export (MH:421-432).
 *
 * El widget lo pinta la plantilla y no el editor: si el alojamiento es
 * reservable y tiene `externalId`, toda ficha lo lleva, sin depender de que
 * alguien añada un bloque en `blocks[]`. Lee el alojamiento del contexto
 * (`source: 'fromAccommodation'`) y degrada solo con motores que no ofrecen
 * disponibilidad rápida.
 *
 * Con THR el botón baja a ese widget; con Mastercamping abre su página de
 * reserva. Sin nada que enseñar —ni destino ni widget— no se pinta.
 */
export function AccommodationBookingCta({
  bookable,
  conWidget,
  bookingUrl,
  precio,
}: AccommodationBookingCtaProps) {
  const destino = destinoDe(bookingUrl, conWidget);
  if (!bookable || (!destino && !conWidget)) return null;

  return (
    <section className="bg-card py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-primary">{ROTULOS.tarifas}</h2>
        {precio ? <p className="text-muted-foreground text-base">{precio}</p> : null}
        {destino ? (
          <Button
            href={destino}
            variant="secondary"
            rel={esAncla(destino) ? undefined : 'noopener noreferrer'}
          >
            {ROTULOS.reservar}
            <Icon name="arrowRight" size="sm" />
          </Button>
        ) : null}
      </div>
      {conWidget ? <Widget /> : null}
    </section>
  );
}
