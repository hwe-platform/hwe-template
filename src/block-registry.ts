import { blockRegistry as platformRegistry } from '@hwe-platform/core-ui';

import { CardGridBlock } from './blocks/card-grid';
import { IconGridBlock } from './blocks/icon-grid';
import { MediaTextBlock } from './blocks/media-text';

import type { BlockRegistry } from '@hwe-platform/core-ui';

/**
 * Registry de bloques del site.
 *
 * Extiende el de plataforma con los overrides propios de este site. Los de
 * partida son `icon-grid`, `card-grid` y `media-text`, y no porque su diseño sea
 * distinto: son los bloques de plataforma con los iconos propios del cliente
 * enchufados (`icons/`), y `media-text` con los rótulos del site (`rotulos.ts`).
 * El resto salen de `@hwe-platform/core-ui` tal cual, que es el caso mayoritario.
 *
 * Para sustituir un bloque, se añade aquí con la misma clave y gana sobre el de
 * plataforma:
 *
 * ```ts
 * import { MediaTextBlock } from './blocks/media-text';
 * export const blockRegistry: BlockRegistry = { ...platformRegistry, 'media-text': MediaTextBlock };
 * ```
 *
 * El hero **no va aquí**: no es un bloque del array `blocks` sino un grupo de
 * campos de `pages`, y lo pinta la plantilla de página directamente.
 */
export const blockRegistry: BlockRegistry = {
  ...platformRegistry,
  'icon-grid': IconGridBlock,
  // Los dos, por lo mismo que icon-grid: el `icon` de sus tarjetas puede ser
  // uno de los iconos propios del site.
  'card-grid': CardGridBlock,
  'media-text': MediaTextBlock,
};
