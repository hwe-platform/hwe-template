import type { SlotRegistry } from '@hwe-platform/core-ui';

/**
 * Qué se pinta en los huecos de cada instancia de bloque.
 *
 * Los slots son **código de este site**, no datos: no pueden viajar por
 * Payload. Lo que viaja es el `slotId` que el editor pone en el bloque, y aquí
 * se canjea por el contenido.
 *
 * Es la costura que permite que un adorno aparezca en **una** sección y no en
 * todas las del mismo tipo. Sin ella, la única forma de meter un adorno sería
 * envolver el bloque en el registry, y entonces saldría en todas sus
 * instancias.
 *
 * Vacío en el template. Un site lo rellena así, con el `slotId` que el editor
 * escriba en el bloque:
 *
 * ```tsx
 * export const slotRegistry: SlotRegistry = {
 *   'intro-home': { sobreLaImagen: <MiAdorno /> },
 * };
 * ```
 *
 * El bloque de plataforma sigue sin saber qué hay aquí: solo que tiene un
 * hueco.
 */
export const slotRegistry: SlotRegistry = {};
