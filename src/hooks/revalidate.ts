import { revalidationTags } from '@hwe-platform/core-ui';

import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

/**
 * Perfil de caché con el que se invalidan los tags de contenido.
 *
 * Next 16 cambió la firma de `revalidateTag` y ahora exige un perfil además
 * del tag. `'max'` es el de mayor duración: el contenido editorial solo
 * caduca cuando el editor lo guarda, que es justo lo que dispara este hook —
 * no queremos que expire solo por tiempo.
 */
const CONTENT_CACHE_PROFILE = 'max';

/**
 * Si el proceso es un servidor de Next.js, que es el único que tiene caché.
 *
 * Next pone `NEXT_RUNTIME` (`nodejs` o `edge`) en su propio proceso. Fuera de
 * él —`payload run`, un script, una migración— no hay caché que invalidar: la
 * del servidor vive en otro proceso, y `revalidateTag` lanza
 * «static generation store missing», que tumbaba el guardado entero (HU-022).
 *
 * @returns `true` dentro de un servidor de Next.js
 */
export function hayCacheDeNext(): boolean {
  return Boolean(process.env.NEXT_RUNTIME);
}

/**
 * Invalida los tags de caché indicados.
 *
 * `next/cache` se importa aquí dentro y no arriba a propósito: importarlo a
 * nivel de módulo mata el proceso en cuanto algo carga el config fuera de una
 * app Next.js —`payload run`, un script de seed, una migration—, y el config
 * arrastra este archivo a través de las colecciones. Por el mismo motivo,
 * fuera de Next ni se importa ni se llama.
 */
async function invalidar(tags: string[]): Promise<void> {
  if (!hayCacheDeNext()) return;

  const { revalidateTag } = await import('next/cache');
  for (const tag of tags) {
    revalidateTag(tag, CONTENT_CACHE_PROFILE);
  }
}

/**
 * Invalida la caché ISR de un documento cuando el editor lo guarda.
 *
 * El cálculo de qué tags tocar vive en core-ui (`revalidationTags`, función
 * pura y testeada); aquí solo se hace la llamada a Next.js.
 */
export const revalidateDocument: CollectionAfterChangeHook = async ({ doc, collection }) => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : undefined;
  await invalidar(revalidationTags({ collection: collection.slug, slug }));
  return doc;
};

/** Misma invalidación para un global, que no tiene slug propio. */
export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global }) => {
  await invalidar(revalidationTags({ collection: global.slug }));
  return doc;
};
