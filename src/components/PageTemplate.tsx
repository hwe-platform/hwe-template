import { getPayload } from 'payload';
import {
  BlockRenderer,
  ContactTemplate,
  heroSchema,
  mediaUrl,
  normalizePayloadData,
} from '@hwe-platform/core-ui';

import config from '../payload.config';
import { blockRegistry } from '../block-registry';
import { slotRegistry } from '../slot-registry';
import { resolverBloques } from '../blocks/resolve';
import { HeroBlock } from '../blocks/hero';

import type { BlockInstance, MediaRef } from '@hwe-platform/core-ui';
import type { SiteConfig } from '../payload-types';
import type { TemplateProps } from './template-types';

/**
 * Si la página lleva hero, que es quien pone el `<h1>`. `none` —o sin grupo
 * hero— significa que no: la plantilla de contacto pone entonces el suyo.
 *
 * Valida con el mismo schema que el hero y no mira solo `variant`: un hero con
 * variante pero con datos que no pasan no se pinta, y dar por hecho que sí
 * dejaba la página sin `<h1>` (HU-022).
 */
function tieneHero(doc: Record<string, unknown>): boolean {
  const resultado = heroSchema.safeParse(normalizePayloadData(doc.hero));
  return resultado.success && resultado.data.variant !== 'none';
}

/**
 * Secciones fijas que añade el `type` de la página, entre el hero y los bloques.
 *
 * Hoy solo `contact` (HU-021): formulario, datos NAP y mapa, todo desde
 * `site-config`. El resto de tipos son solo bloques.
 */
function PlantillaDeTipo({
  doc,
  siteConfig,
}: {
  doc: Record<string, unknown>;
  siteConfig: SiteConfig | null;
}) {
  if (doc.type !== 'contact') return null;

  return (
    <ContactTemplate
      title={String(doc.title ?? '')}
      hasHero={tieneHero(doc)}
      siteConfig={siteConfig}
    />
  );
}

/** Bloques del documento, si trae page builder. */
function blocksOf(doc: Record<string, unknown>): BlockInstance[] {
  return Array.isArray(doc.blocks) ? (doc.blocks as BlockInstance[]) : [];
}

/**
 * Nombre del site para el hero con logo.
 *
 * Sin coerción: `HeroTitle` distingue «no hay nombre» de «nombre vacío» para
 * poder caer en el título del hero, y un `String(… ?? '')` siempre da cadena,
 * con lo que ese respaldo no se alcanzaba nunca.
 */
function siteNameOf(siteConfig: SiteConfig | null): string | undefined {
  const nombre = siteConfig?.general?.siteName;
  return typeof nombre === 'string' && nombre !== '' ? nombre : undefined;
}

/** Título de la página, para el `<h1>` de respaldo. */
function tituloDe(doc: Record<string, unknown>): string | undefined {
  return typeof doc.title === 'string' && doc.title !== '' ? doc.title : undefined;
}

/**
 * `<h1>` oculto para una página sin hero, que es quien lo pone.
 *
 * Sin él, una página con `hero: none` —o sin grupo hero— se queda sin
 * encabezado principal (HU-022). Contacto no lo necesita: su plantilla pone el
 * suyo cuando no hay hero.
 */
function TituloSinHero({ doc }: { doc: Record<string, unknown> }) {
  const titulo = tituloDe(doc);
  if (tieneHero(doc) || doc.type === 'contact' || !titulo) return null;

  return <h1 className="sr-only">{titulo}</h1>;
}

/**
 * Plantilla de `pages`: hero, secciones fijas del tipo y bloques.
 *
 * El hero se pinta aquí, una sola vez y antes de los bloques: **no es un
 * bloque** sino un grupo de campos de `pages`, así que no pasa por el registry.
 */
export async function PageTemplate({ doc, locale, siteConfig, breadcrumbs }: TemplateProps) {
  const payload = await getPayload({ config });

  // El <main> lo pone SiteLayout: la página solo aporta su contenido.
  return (
    <>
      <HeroBlock
        data={doc.hero}
        breadcrumbs={breadcrumbs}
        // Los tipos que genera Payload declaran opcional lo que el schema Zod
        // exige —`filename` puede ser null para Payload—, así que la frontera
        // entre ambos lleva un cast, igual que en `layout.tsx`.
        logoUrl={mediaUrl(siteConfig?.general?.logoInverted as MediaRef)}
        siteName={siteNameOf(siteConfig)}
        documentTitle={tituloDe(doc)}
      />
      <TituloSinHero doc={doc} />
      <PlantillaDeTipo doc={doc} siteConfig={siteConfig} />
      <BlockRenderer
        blocks={await resolverBloques(payload, blocksOf(doc), { locale, siteConfig })}
        customRegistry={blockRegistry}
        slotRegistry={slotRegistry}
      />
    </>
  );
}
