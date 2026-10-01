import { beforeEach, describe, expect, it, vi } from 'vitest';

const findGlobal = vi.fn();

vi.mock('payload', () => ({ getPayload: async () => ({ findGlobal }) }));
vi.mock('../../payload.config', () => ({ default: {} }));

import { leerIndexacion } from './indexacion';

describe('leerIndexacion', () => {
  beforeEach(() => {
    findGlobal.mockReset();
  });

  it('devuelve el valor del interruptor', async () => {
    findGlobal.mockResolvedValue({ indexing: 'index' });
    expect(await leerIndexacion()).toBe('index');

    findGlobal.mockResolvedValue({ indexing: 'noindex' });
    expect(await leerIndexacion()).toBe('noindex');
  });

  it('lee el global site-config', async () => {
    findGlobal.mockResolvedValue({ indexing: 'noindex' });
    await leerIndexacion();
    expect(findGlobal).toHaveBeenCalledWith(expect.objectContaining({ slug: 'site-config' }));
  });

  it('falla cerrado: si el global no se puede leer, undefined', async () => {
    findGlobal.mockRejectedValue(new Error('base de datos caída'));
    expect(await leerIndexacion()).toBeUndefined();
  });

  it('falla cerrado: un valor ausente o que no es texto, undefined', async () => {
    for (const valor of [undefined, null, 1, true, {}]) {
      findGlobal.mockResolvedValue({ indexing: valor });
      expect(await leerIndexacion()).toBeUndefined();
    }
  });
});
