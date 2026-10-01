import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import type { Plugin } from 'payload';

/**
 * Plugins de almacenamiento de `media` (DEC-010): Vercel Blob en producción,
 * disco local (`./media`) en desarrollo.
 *
 * **Solo si hay `BLOB_READ_WRITE_TOKEN`.** Sin él devuelve una lista vacía y
 * Payload guarda los ficheros en disco, que es lo que se quiere en local: sin
 * credenciales ni cuenta de Vercel. En el proyecto de Vercel, el token lo
 * añade la propia integración del Blob store.
 *
 * `clientUploads` sube desde el navegador directamente a Blob. Con subida por
 * el servidor, Vercel corta en 4,5 MB, y el vídeo del hero del demo pesa casi
 * 20 MB. Aplica a las subidas desde el panel; la API `POST /api/media` sigue
 * pasando por el servidor y con el mismo límite.
 *
 * El `importMap` del panel tiene que incluir el manejador de ese cliente
 * aunque en local no haya token: se genera con
 * `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_local_dummy pnpm generate:importmap`
 * (ver README); sin token, ese comando borra la entrada.
 *
 * @param env - Variables de entorno; `process.env` por defecto
 */
export function storagePlugins(env: Record<string, string | undefined> = process.env): Plugin[] {
  // `trim` por los saltos de línea y espacios que se cuelan al pegar en Vercel.
  const token = env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return [];

  return [vercelBlobStorage({ collections: { media: true }, token, clientUploads: true })];
}
