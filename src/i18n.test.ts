import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { splitLocale } from '@hwe-platform/core-ui';

import { DEFAULT_LOCALE, LOCALES, isSiteLocale, localeConfig } from './i18n';

describe('LOCALES', () => {
  it('tiene los 8 idiomas de la plataforma, en el orden de localizacion.md', () => {
    expect([...LOCALES]).toEqual(['ca', 'es', 'fr', 'en', 'de', 'nl', 'it', 'pt']);
  });

  it('el idioma principal es uno de ellos', () => {
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it('el principal de partida es fr, aunque ca vaya primero en la lista', () => {
    expect(DEFAULT_LOCALE).toBe('fr');
    expect(LOCALES[0]).toBe('ca');
  });
});

describe('paridad con payload.config.ts', () => {
  // El importador de contenido valida `--locale` leyendo el config como texto (V13):
  // esta lectura es la misma, así que si la lista deja de ser literal, falla aquí.
  it('localization.locales lleva los mismos códigos que LOCALES, en el mismo orden', () => {
    const fuente = readFileSync(new URL('./payload.config.ts', import.meta.url), 'utf8');
    const bloque = /localization\s*:\s*\{[\s\S]*?locales\s*:\s*\[([\s\S]*?)\]/.exec(fuente);
    const codigos = [...(bloque?.[1] ?? '').matchAll(/code\s*:\s*['"]([^'"]+)['"]/g)].map(
      (m) => m[1],
    );

    expect(codigos).toEqual([...LOCALES]);
  });
});

describe('isSiteLocale', () => {
  it.each([...['ca', 'es', 'fr', 'en', 'de', 'nl', 'it', 'pt']])('acepta %s', (codigo) => {
    expect(isSiteLocale(codigo)).toBe(true);
  });

  it('rechaza un código que no es de la plataforma, vacío o nulo', () => {
    expect(isSiteLocale('xx')).toBe(false);
    expect(isSiteLocale('')).toBe(false);
    expect(isSiteLocale(null)).toBe(false);
    expect(isSiteLocale(undefined)).toBe(false);
  });
});

describe('localeConfig', () => {
  it('declara el principal explícito: no depende de quién va primero en LOCALES', () => {
    expect(localeConfig.defaultLocale).toBe(DEFAULT_LOCALE);
  });

  it('una URL sin prefijo se resuelve como el idioma principal, no como ca', () => {
    expect(splitLocale('/le-camping', localeConfig)).toMatchObject({
      locale: 'fr',
      pathname: '/le-camping',
      hadPrefix: false,
    });
  });

  it('reconoce el prefijo de cualquiera de los 8 idiomas', () => {
    for (const codigo of LOCALES) {
      expect(splitLocale(`/${codigo}/pagina`, localeConfig)).toMatchObject({
        locale: codigo,
        pathname: '/pagina',
        hadPrefix: true,
      });
    }
  });
});
