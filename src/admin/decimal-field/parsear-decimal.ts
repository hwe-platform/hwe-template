const NUMERO_DECIMAL = /^[-+]?(\d+(\.\d*)?|\.\d+)$/;

/**
 * Convierte lo que escribe el editor en un número, con coma o con punto
 * decimal: `43,6417` y `43.6417` dan lo mismo.
 *
 * El input `number` de Payload lee el valor con `parseFloat` y, con la coma
 * de los editores en castellano o francés, el navegador le entrega una cadena
 * vacía: el campo parece relleno y da «This field is required».
 *
 * Devuelve `null` si el texto no es un número completo, igual que el campo
 * de Payload con un valor vacío.
 *
 * @param texto - Lo que hay escrito en el input
 */
export function parsearDecimal(texto: string): number | null {
  const normalizado = texto.trim().replace(',', '.');
  return NUMERO_DECIMAL.test(normalizado) ? Number(normalizado) : null;
}
