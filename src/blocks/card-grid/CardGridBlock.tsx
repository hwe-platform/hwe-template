import { CardGridBlock as Base } from '@hwe-platform/core-ui';

import { iconRegistry } from '../../icons';

import type { BlockComponentProps } from '@hwe-platform/core-ui';

/**
 * La rejilla de plataforma con los iconos propios del site enchufados, para el
 * `icon` de las tarjetas overlay. Mismo patrón que `icon-grid`.
 */
export function CardGridBlock({ data }: BlockComponentProps) {
  return <Base data={data} iconRegistry={iconRegistry} />;
}
