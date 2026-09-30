import type { IconRegistry } from '@hwe-platform/core-ui';

/**
 * Iconos propios del cliente, por nombre.
 *
 * Vacío en el template: cada site lo rellena con los SVG de su diseño que no
 * existen en `lucide-react`. No pueden vivir en `core-ui` —son de un cliente y
 * de nadie más— ni viajar por Payload, que solo guarda texto. Lo que viaja es
 * el nombre, y este registro es lo que lo convierte en un componente — el
 * mismo patrón que los slots.
 *
 * Para añadir uno, se crea el componente en esta carpeta y se registra aquí:
 *
 * ```tsx
 * import { MiIconoIcon } from './MiIcono';
 * export const iconRegistry: IconRegistry = { miIcono: MiIconoIcon };
 * ```
 *
 * Las claves son las que ve el editor en el `select` de icono (`fields/icons.ts`
 * las lee de aquí). Cada `select` de icono es un enum de Postgres, así que
 * añadir o quitar uno exige `pnpm migrate:create`.
 */
export const iconRegistry: IconRegistry = {};

/** Los nombres del registro, para que el campo de Payload los ofrezca. */
export const NOMBRES_DE_ICONO_PROPIOS = Object.keys(iconRegistry);
