import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { LOCALES } from './i18n';
import { middleware } from './middleware';

/** Lo que el middleware deja en la respuesta: la ruta reescrita y el idioma. */
function pasar(ruta: string) {
  const respuesta = middleware(new NextRequest(`https://demo.test${ruta}`));
  return {
    reescritura: respuesta.headers.get('x-middleware-rewrite'),
    idioma: respuesta.headers.get('x-middleware-request-x-hwe-locale'),
    redireccion: respuesta.headers.get('location'),
  };
}

describe('middleware', () => {
  it.each([...LOCALES])('/%s/pagina se reescribe a /pagina con el idioma %s', (codigo) => {
    const { reescritura, idioma } = pasar(`/${codigo}/pagina`);
    expect(reescritura).toBe('https://demo.test/pagina');
    expect(idioma).toBe(codigo);
  });

  it('/xx/loquesea no se trata como un idioma', () => {
    const { reescritura, idioma } = pasar('/xx/loquesea');
    expect(reescritura).toBe('https://demo.test/xx/loquesea');
    expect(idioma).toBe('fr');
  });

  it('el principal sin prefijo no se redirige y llega como fr', () => {
    const { reescritura, idioma, redireccion } = pasar('/le-camping');
    expect(redireccion).toBeNull();
    expect(reescritura).toBe('https://demo.test/le-camping');
    expect(idioma).toBe('fr');
  });

  it('la raíz de un idioma se reescribe a la raíz', () => {
    const { reescritura, idioma } = pasar('/en');
    expect(reescritura).toBe('https://demo.test/');
    expect(idioma).toBe('en');
  });
});
