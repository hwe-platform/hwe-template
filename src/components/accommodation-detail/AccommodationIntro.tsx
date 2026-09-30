import { Button, GalleryBlock, Icon, RichText, mediaUrl } from '@hwe-platform/core-ui';

import { imagenesDeGaleria } from './ficha';

import type { AccommodationData } from '@hwe-platform/core-ui';

/** Trazo del export (`strokeWidth={1.5}`). */
const TRAZO = 1.5;

/**
 * Los documentos descargables, como botones de contorno con icono.
 *
 * Un documento cuyo archivo no llegó poblado no tiene URL, y un botón sin
 * destino es peor que no tenerlo: se omite.
 */
function Documentos({ documents }: { documents: AccommodationData['documents'] }) {
  const conEnlace = (documents ?? []).flatMap((doc) => {
    const href = mediaUrl(doc.file);
    return href ? [{ label: doc.label, href }] : [];
  });

  if (conEnlace.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 pt-4">
      {conEnlace.map((doc) => (
        <Button key={doc.label} href={doc.href} variant="outline">
          <Icon name="download" size="sm" strokeWidth={TRAZO} />
          {doc.label}
        </Button>
      ))}
    </div>
  );
}

export type AccommodationIntroProps = {
  accommodation: AccommodationData;
};

/**
 * El módulo de entrada de la ficha: texto y documentos a la izquierda (5/12),
 * galería con miniaturas a la derecha (7/12). En móvil la galería va primero,
 * como en `MobileHomePage.tsx:197-282`.
 *
 * El titular de la sección es el `<h2>` que abra la descripción: el editor lo
 * escribe en el texto enriquecido, que es donde decide el SEO de la ficha.
 */
export function AccommodationIntro({ accommodation }: AccommodationIntroProps) {
  const imagenes = imagenesDeGaleria(accommodation);
  const conGaleria = imagenes.length > 0;

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <div
        className={`order-2 space-y-10 lg:order-1 ${conGaleria ? 'lg:col-span-5' : 'lg:col-span-12'}`}
      >
        <RichText
          content={accommodation.description}
          className="text-muted-foreground [&_h2]:text-primary [&_strong]:text-primary text-base leading-relaxed [&_h2]:leading-snug"
        />
        <Documentos documents={accommodation.documents} />
      </div>

      {conGaleria ? (
        <div className="order-1 lg:order-2 lg:col-span-7">
          <GalleryBlock
            embedded
            data={{ blockType: 'gallery', variant: 'slider-thumbs', images: imagenes }}
          />
        </div>
      ) : null}
    </div>
  );
}
