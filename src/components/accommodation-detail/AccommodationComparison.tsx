import { CardStacked, Eyebrow } from '@hwe-platform/core-ui';

import { ROTULOS } from './ficha';

import type { CardGridItem } from '@hwe-platform/core-ui';

export type AccommodationComparisonProps = {
  /** Tarjetas ya resueltas por `resolverComparacion`. */
  tarjetas: CardGridItem[];
};

/**
 * «Comparer»: otros alojamientos, con la tarjeta apilada de CardGrid
 * (`MobileHomePage.tsx:441-475`). No pinta nada si no hay con qué comparar.
 */
export function AccommodationComparison({ tarjetas }: AccommodationComparisonProps) {
  if (tarjetas.length === 0) return null;

  return (
    // Ritmo del export para esta sección (MH:441), más corto que el de
    // `lenguaje-visual.md`: es un cierre de ficha, no una sección de contenido.
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Eyebrow className="mb-2">{ROTULOS.comparar}</Eyebrow>
          <h2 className="text-foreground font-bold">
            {tarjetas.length === 1 ? ROTULOS.otraLocation : ROTULOS.otrasLocations}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tarjetas.map((tarjeta) => (
            <CardStacked key={tarjeta.url ?? tarjeta.title} item={tarjeta} />
          ))}
        </div>
      </div>
    </section>
  );
}
