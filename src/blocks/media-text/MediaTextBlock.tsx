import { MediaTextBlock as Base } from '@hwe-platform/core-ui';

import { iconRegistry } from '../../icons';
import { ROTULOS_MEDIA_TEXT } from '../../rotulos';

import type { BlockComponentProps, MediaTextProps } from '@hwe-platform/core-ui';

/**
 * El bloque de plataforma con lo propio del site enchufado: sus iconos, para el
 * `icon` de las tarjetas del medio `cards`, y sus rótulos visibles (core-ui no
 * trae ninguno: regla 12). Los slots que le toquen (`aside`, `sobreLaImagen`)
 * pasan tal cual.
 */
export function MediaTextBlock(props: BlockComponentProps) {
  const { labels, ...resto } = props as MediaTextProps;
  return (
    <Base {...resto} labels={{ ...ROTULOS_MEDIA_TEXT, ...labels }} iconRegistry={iconRegistry} />
  );
}
