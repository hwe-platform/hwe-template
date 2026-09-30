/**
 * Constantes del formulario de contacto (specs/informacion/contacto.md).
 *
 * Constantes y no campos de `site-config`: ningún cliente las ha pedido
 * distintas, y un campo que nadie usa es configuración muerta.
 */

/** Días que se conservan los mensajes. El borrado automático llega en Hito 2. */
export const RETENTION_DAYS = 90;

/** Por debajo de esto entre la carga y el envío, lo ha rellenado un bot. */
export const MIN_FILL_MS = 3000;

/** Envíos permitidos por visitante (hash de IP) en la ventana. */
export const RATE_LIMIT_MAX = 5;

/** Ventana del rate limit. */
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
