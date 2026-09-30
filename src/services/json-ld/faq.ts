import { textOrUndefined, toPlainText } from './utils';

import type { FaqItemInput, JsonLdNode } from './types';

/** Tipo de bloque del page builder que lleva preguntas frecuentes. */
const FAQ_BLOCK_TYPE = 'faq';

/** Bloque del page builder, con lo mínimo para reconocer un FAQ y leer sus preguntas. */
type BlockLike = { blockType?: unknown; items?: unknown };

/** Preguntas de un bloque, si es un FAQ con `items`. */
function itemsOf(block: BlockLike): FaqItemInput[] {
  if (block.blockType !== FAQ_BLOCK_TYPE || !Array.isArray(block.items)) return [];
  return block.items as FaqItemInput[];
}

/**
 * Schema FAQPage desde los bloques FAQ de la página (capa 2).
 *
 * Sale del bloque y no de una colección porque Google exige que el schema
 * coincida con lo visible. Si hay varios bloques FAQ se combinan en uno solo:
 * una página tiene como mucho un FAQPage.
 *
 * Hoy el bloque FAQ aún no tiene campos (solo `blockType`), así que no genera
 * nada hasta que su historia añada `items` con pregunta y respuesta.
 *
 * Spec: specs/seo-geo/schemas/faq.md
 *
 * @param blocks - Bloques de la página (de cualquier tipo)
 * @returns El nodo, o `null` si no hay ninguna pregunta con respuesta
 */
export function buildFAQSchema(blocks: BlockLike[]): JsonLdNode | null {
  const mainEntity = blocks.flatMap(itemsOf).flatMap((item) => {
    const name = textOrUndefined(item.question);
    const text = toPlainText(item.answer);
    if (!name || !text) return [];
    return [{ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }];
  });

  if (mainEntity.length === 0) return null;
  return { '@type': 'FAQPage', mainEntity };
}
