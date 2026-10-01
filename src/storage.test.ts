import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { storagePlugins } from './storage';

const TOKEN = 'vercel_blob_rw_abc123_secreto';

describe('storagePlugins', () => {
  it('sin token no añade plugins: media va a disco', () => {
    expect(storagePlugins({})).toEqual([]);
    expect(storagePlugins({ BLOB_READ_WRITE_TOKEN: '' })).toEqual([]);
    expect(storagePlugins({ BLOB_READ_WRITE_TOKEN: '  \n' })).toEqual([]);
  });

  it('con token añade el plugin de Vercel Blob', () => {
    expect(storagePlugins({ BLOB_READ_WRITE_TOKEN: TOKEN })).toHaveLength(1);
  });

  it('un token pegado con espacios o salto de línea sigue siendo válido', async () => {
    const [plugin] = storagePlugins({ BLOB_READ_WRITE_TOKEN: `${TOKEN}\n` });

    await expect((async () => plugin?.({ collections: [] } as never))()).resolves.toBeDefined();
  });

  it('el plugin saca media del disco y la sube a Blob', async () => {
    const [plugin] = storagePlugins({ BLOB_READ_WRITE_TOKEN: TOKEN });
    const config = await plugin?.({
      collections: [{ slug: 'media', upload: true, fields: [] }],
    } as never);
    const media = config?.collections?.find((c) => c.slug === 'media');

    expect(media?.upload).toMatchObject({ disableLocalStorage: true });
  });

  // Sin la subida directa, el vídeo del hero (~20 MB) pasaría por una función de
  // Vercel y se cortaría en 4,5 MB. El plugin registra este endpoint solo con
  // `clientUploads` activo.
  it('activa la subida directa desde el navegador', async () => {
    const [plugin] = storagePlugins({ BLOB_READ_WRITE_TOKEN: TOKEN });
    const config = await plugin?.({
      collections: [{ slug: 'media', upload: true, fields: [] }],
    } as never);

    expect(config?.endpoints?.map((e) => e.path)).toContain('/vercel-blob-client-upload-route');
  });

  it('un token con formato inválido rompe al arrancar, no al subir el primer fichero', async () => {
    const [plugin] = storagePlugins({ BLOB_READ_WRITE_TOKEN: 'basura' });

    await expect(async () => plugin?.({ collections: [] } as never)).rejects.toThrow(
      /Invalid token/,
    );
  });
});

describe('importMap del panel', () => {
  // `pnpm generate:importmap` sin token borra esta entrada, porque sin token el
  // plugin no está en el config. Sin ella, en producción las subidas pesadas
  // (el vídeo del hero) vuelven a pasar por el servidor y se cortan en 4,5 MB.
  it('incluye el manejador de subida directa a Blob', () => {
    const mapa = readFileSync(join(__dirname, 'app', '(payload)', 'admin', 'importMap.js'), 'utf8');

    expect(
      mapa,
      'Regenera con: BLOB_READ_WRITE_TOKEN=vercel_blob_rw_local_dummy pnpm generate:importmap',
    ).toContain('@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler');
  });
});
