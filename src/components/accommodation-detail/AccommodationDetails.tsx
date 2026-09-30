import { Icon, IconGridBlock, Image, mediaAlt, mediaUrl } from '@hwe-platform/core-ui';

import { ROTULOS } from './ficha';
import { iconRegistry } from '../../icons';

import type { AccommodationData } from '@hwe-platform/core-ui';

/** Trazo del export (`strokeWidth={1.5}`). */
const TRAZO = 1.5;

/** Tope de destacados por fila. Más de seis no caben con su marco circular. */
const MAX_COLUMNAS_DESTACADOS = 6;

/**
 * Rótulo de subsección, como «Équipements & services» del export
 * (`MobileHomePage.tsx:321`): pequeño, versalitas, en gris. Es un `<h2>` porque
 * abre su bloque de la ficha; allí era un `<h4>` que saltaba niveles.
 */
const ROTULO_SUBSECCION = 'text-muted-foreground mb-6 text-xs font-bold uppercase tracking-[1.2px]';

type ConAlojamiento = { accommodation: AccommodationData };

/** Composición de dormitorios, `MobileHomePage.tsx:288-306`. */
function Dormitorios({ accommodation }: ConAlojamiento) {
  const dormitorios = accommodation.bedroomDetails ?? [];
  if (dormitorios.length === 0) return null;

  return (
    <div className="bg-background border-border rounded-2xl border p-6 md:p-8">
      <h2 className="text-primary mb-6 text-lg font-bold tracking-[1.2px]">
        {ROTULOS.composicion}
      </h2>
      <ul className="space-y-2">
        {dormitorios.map((dormitorio) => (
          <li
            key={dormitorio.description}
            className="bg-card border-border flex items-center gap-3 rounded-2xl border px-4 py-3"
          >
            <Icon name="doorOpen" size="sm" strokeWidth={TRAZO} className="text-secondary" />
            <span className="text-muted-foreground text-sm">{dormitorio.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Equipamiento incluido y excluido, con la variante `equipment` de IconGrid. */
function Equipamiento({ accommodation }: ConAlojamiento) {
  const items = accommodation.equipment ?? [];
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className={ROTULO_SUBSECCION}>{ROTULOS.equipamiento}</h2>
      <IconGridBlock
        embedded
        iconRegistry={iconRegistry}
        data={{ blockType: 'icon-grid', variant: 'equipment', items }}
      />
    </div>
  );
}

/**
 * Destacados del alojamiento, con la variante `bare` de IconGrid.
 *
 * Sin titular propio: el export no pinta esta sección, y sus items ya son
 * `<h3>` que cuelgan del `<h2>` anterior.
 */
function Destacados({ accommodation }: ConAlojamiento) {
  const items = accommodation.features ?? [];
  if (items.length === 0) return null;

  return (
    <IconGridBlock
      embedded
      iconRegistry={iconRegistry}
      data={{
        blockType: 'icon-grid',
        variant: 'bare',
        columns: Math.min(items.length, MAX_COLUMNAS_DESTACADOS),
        items,
      }}
    />
  );
}

/** Plano del alojamiento, bajo el rótulo del botón que lo abría en el export. */
function Plano({ accommodation }: ConAlojamiento) {
  const plano = accommodation.media.floorPlan;
  const src = mediaUrl(plano);
  if (!src) return null;

  return (
    <div>
      <h2 className={ROTULO_SUBSECCION}>{ROTULOS.plano}</h2>
      <div className="bg-background border-border relative aspect-[4/3] overflow-hidden rounded-2xl border lg:max-w-3xl">
        <Image
          src={src}
          alt={mediaAlt(plano) || `${ROTULOS.plano} — ${accommodation.name}`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

/**
 * Las secciones opcionales de la ficha, en el orden de la spec: dormitorios,
 * equipamiento, destacados y plano. Cada una desaparece si no tiene datos.
 */
export function AccommodationDetails({ accommodation }: ConAlojamiento) {
  return (
    <>
      <Dormitorios accommodation={accommodation} />
      <Equipamiento accommodation={accommodation} />
      <Destacados accommodation={accommodation} />
      <Plano accommodation={accommodation} />
    </>
  );
}
