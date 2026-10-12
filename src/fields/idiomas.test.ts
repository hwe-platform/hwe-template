import { describe, expect, it } from 'vitest';

import {
  languagesGroup,
  validarIdiomasActivos,
  validarPrincipalActivo,
} from './site-config-groups';

describe('languages del site-config', () => {
  it('un site nuevo nace con solo el idioma principal activo', () => {
    const grupo = languagesGroup as { fields: { name: string; defaultValue?: unknown }[] };
    const available = grupo.fields.find((campo) => campo.name === 'available');
    expect(available?.defaultValue).toEqual(['fr']);
  });

  it('la descripción de available lista los 8 códigos', () => {
    const grupo = languagesGroup as {
      fields: { name: string; admin?: { description?: string } }[];
    };
    const descripcion = grupo.fields.find((campo) => campo.name === 'available')?.admin
      ?.description;
    for (const codigo of ['ca', 'es', 'fr', 'en', 'de', 'nl', 'it', 'pt']) {
      expect(descripcion).toContain(codigo);
    }
  });
});

describe('validarIdiomasActivos', () => {
  it('acepta códigos de la plataforma, en cualquier número y orden', () => {
    expect(validarIdiomasActivos(['fr'])).toBe(true);
    expect(validarIdiomasActivos(['pt', 'ca', 'fr'])).toBe(true);
  });

  it('rechaza un código que no es de la plataforma y dice cuál', () => {
    const resultado = validarIdiomasActivos(['fr', 'xx']);
    expect(resultado).toEqual(expect.stringContaining('xx'));
  });

  it('rechaza las variantes que parecen válidas: FR, pt-BR', () => {
    expect(validarIdiomasActivos(['FR'])).toEqual(expect.any(String));
    expect(validarIdiomasActivos(['pt-BR'])).toEqual(expect.any(String));
  });

  it('sin lista no hay nada que comprobar', () => {
    expect(validarIdiomasActivos(undefined)).toBe(true);
    expect(validarIdiomasActivos(null)).toBe(true);
  });
});

describe('validarPrincipalActivo', () => {
  it('acepta un principal que está entre los activos', () => {
    expect(validarPrincipalActivo('fr', ['fr', 'en'])).toBe(true);
  });

  it('rechaza un principal que no está entre los activos', () => {
    expect(validarPrincipalActivo('ca', ['fr', 'en'])).toEqual(expect.any(String));
  });

  it('rechaza un principal que no es un idioma de la plataforma', () => {
    expect(validarPrincipalActivo('xx', ['xx'])).toEqual(expect.any(String));
  });

  it('sin la lista de activos no puede comprobar nada y no bloquea el guardado', () => {
    expect(validarPrincipalActivo('fr', undefined)).toBe(true);
  });
});
