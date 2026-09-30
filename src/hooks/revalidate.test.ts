import { describe, it, expect, vi, afterEach } from 'vitest';

import { hayCacheDeNext, revalidateDocument, revalidateGlobal } from './revalidate';

import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

const revalidateTag = vi.fn();
vi.mock('next/cache', () => ({ revalidateTag }));

type ArgsDocumento = Parameters<CollectionAfterChangeHook>[0];
type ArgsGlobal = Parameters<GlobalAfterChangeHook>[0];

const argsDocumento = {
  doc: { slug: 'contact' },
  collection: { slug: 'pages' },
} as unknown as ArgsDocumento;

afterEach(() => {
  vi.unstubAllEnvs();
  revalidateTag.mockClear();
});

describe('revalidateDocument', () => {
  it('dentro de Next invalida los tags del documento', async () => {
    vi.stubEnv('NEXT_RUNTIME', 'nodejs');

    const doc = await revalidateDocument(argsDocumento);

    expect(doc).toEqual({ slug: 'contact' });
    expect(revalidateTag).toHaveBeenCalled();
    expect(revalidateTag.mock.calls.every(([, perfil]) => perfil === 'max')).toBe(true);
  });

  it('fuera de Next (payload run, seeds, migraciones) no toca la caché ni falla', async () => {
    // Sin esto, `revalidateTag` lanza «static generation store missing» y el
    // guardado entero se deshace.
    vi.stubEnv('NEXT_RUNTIME', '');
    revalidateTag.mockImplementation(() => {
      throw new Error('Invariant: static generation store missing in revalidateTag');
    });

    await expect(revalidateDocument(argsDocumento)).resolves.toEqual({ slug: 'contact' });
    expect(revalidateTag).not.toHaveBeenCalled();
    revalidateTag.mockReset();
  });
});

describe('revalidateGlobal', () => {
  it('invalida el global dentro de Next y no hace nada fuera', async () => {
    const args = { doc: { a: 1 }, global: { slug: 'site-config' } } as unknown as ArgsGlobal;

    vi.stubEnv('NEXT_RUNTIME', 'nodejs');
    await revalidateGlobal(args);
    expect(revalidateTag).toHaveBeenCalled();

    revalidateTag.mockClear();
    vi.stubEnv('NEXT_RUNTIME', '');
    await expect(revalidateGlobal(args)).resolves.toEqual({ a: 1 });
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});

describe('hayCacheDeNext', () => {
  it('lee el runtime que Next pone en su proceso', () => {
    vi.stubEnv('NEXT_RUNTIME', 'edge');
    expect(hayCacheDeNext()).toBe(true);

    vi.stubEnv('NEXT_RUNTIME', '');
    expect(hayCacheDeNext()).toBe(false);
  });
});
