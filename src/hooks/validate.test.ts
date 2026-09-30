import { describe, it, expect } from 'vitest';
import { APIError } from 'payload';
import {
  categoryInputSchema,
  categoryUpdateSchema,
  siteConfigUpdateSchema,
} from '@hwe-platform/core-ui';

import { validateGlobalWrite, validateWrite } from './validate';

import type { CollectionBeforeChangeHook, GlobalBeforeChangeHook } from 'payload';
import type { WriteSchema } from '@hwe-platform/core-ui';

type ArgsColeccion = Parameters<CollectionBeforeChangeHook>[0];
type ArgsGlobal = Parameters<GlobalBeforeChangeHook>[0];

const hook = validateWrite({
  create: categoryInputSchema,
  update: categoryUpdateSchema,
  label: 'categories',
});

describe('validateWrite', () => {
  it('devuelve los datos sin tocar si pasan el schema', () => {
    // Con el `null` del admin, que se normaliza antes de validar.
    const data = { name: 'Nos Locations', slug: 'nos-locations', description: null };

    expect(hook({ data, operation: 'create' } as unknown as ArgsColeccion)).toBe(data);
  });

  it('en update valida contra la forma parcial', () => {
    const data = { order: 2 };

    expect(hook({ data, operation: 'update' } as unknown as ArgsColeccion)).toBe(data);
  });

  it('un dato inválido sale como APIError 400, que el admin enseña al editor', () => {
    let error: unknown;
    try {
      hook({ data: { name: 3 }, operation: 'create' } as unknown as ArgsColeccion);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(APIError);
    expect((error as APIError).status).toBe(400);
  });

  it('un error que no es de validación sube tal cual', () => {
    const roto = {
      safeParse: () => {
        throw new Error('fallo interno');
      },
    } as unknown as WriteSchema;
    const hookRoto = validateWrite({ create: roto, update: roto, label: 'categories' });

    expect(() => hookRoto({ data: {}, operation: 'create' } as unknown as ArgsColeccion)).toThrow(
      'fallo interno',
    );
  });
});

describe('validateGlobalWrite', () => {
  it('valida el global y devuelve sus datos', () => {
    const hookGlobal = validateGlobalWrite(siteConfigUpdateSchema, 'site-config');
    // `.partial()` solo alcanza al primer nivel: si llega `general`, llega
    // entero, y aquí le faltan `siteDescription`, `logo`… Por eso falla.
    const data = { general: { siteName: 'Camping Example' } };

    expect(() => hookGlobal({ data } as unknown as ArgsGlobal)).toThrow(APIError);
    expect(hookGlobal({ data: {} } as unknown as ArgsGlobal)).toEqual({});
  });
});
