import { createHash } from 'node:crypto';

import { MIN_FILL_MS } from './constants';

/**
 * Si el campo trampa llegó relleno. Una persona no lo ve; un bot, sí.
 *
 * @param honeypot - Valor del campo oculto `website`
 */
export function esBot(honeypot: string | undefined): boolean {
  return Boolean(honeypot?.trim());
}

/**
 * Si el formulario se envió más rápido de lo que tarda una persona.
 *
 * Un `startedAt` en el futuro también cuenta como bot: no lo manda un
 * navegador honrado.
 *
 * @param startedAt - Cuándo se cargó el formulario (ms desde epoch)
 * @param ahora - Instante de la petición (ms desde epoch)
 */
export function demasiadoRapido(startedAt: number, ahora: number): boolean {
  const transcurrido = ahora - startedAt;
  return transcurrido < 0 || transcurrido < MIN_FILL_MS;
}

/**
 * Hash con sal de la IP del visitante.
 *
 * Basta para contar sus envíos recientes sin guardar la IP, que es un dato
 * personal. La sal es el secreto de Payload: sin él, un hash de IPv4 se
 * revierte probando los 4 000 millones de direcciones.
 *
 * @param ip - IP del visitante (o `'unknown'` si el proxy no la manda)
 * @param sal - Secreto del servidor
 */
export function hashIp(ip: string, sal: string): string {
  return createHash('sha256').update(`${sal}:${ip}`).digest('hex');
}

/**
 * IP del visitante tras el proxy (Vercel, Nginx): la primera de
 * `x-forwarded-for`, o `x-real-ip`.
 *
 * @param headers - Cabeceras de la petición
 */
export function ipDe(headers: Headers): string {
  const reenviada = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return reenviada || headers.get('x-real-ip')?.trim() || 'unknown';
}
