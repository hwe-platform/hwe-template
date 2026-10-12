import { describe, it, expect } from 'vitest';

import { contactGroup, generalGroup, locationGroup } from '../fields/site-config-groups';
import { Footer } from './Footer';

import type { Field } from 'payload';

/**
 * DEC-012: solo es obligatorio lo que el componente necesita para pintarse.
 *
 * El test de paridad compara nombres y opciones, no `required` (DEC-004 no lo
 * modela), así que esta lista la fija aquí: son los campos que core-ui declara
 * opcionales en sus schemas y que site-demo tenía como obligatorios.
 */
const GRUPOS: Record<string, Field> = {
  general: generalGroup,
  contact: contactGroup,
  location: locationGroup,
};

function campo(campos: Field[], nombre: string): Field | undefined {
  return campos.find((c) => 'name' in c && c.name === nombre);
}

function hijosDe(grupo: Field): Field[] {
  return 'fields' in grupo ? grupo.fields : [];
}

function esObligatorio(c: Field | undefined): boolean {
  return Boolean(c && 'required' in c && c.required);
}

describe('DEC-012: campos opcionales de site-config y footer', () => {
  it.each([
    ['general', 'siteDescription'],
    ['general', 'logo'],
    ['general', 'logoInverted'],
    ['general', 'openingDates'],
    ['contact', 'postalCode'],
    ['contact', 'country'],
    ['location', 'latitude'],
    ['location', 'longitude'],
  ])('site-config.%s.%s no es obligatorio', (grupo, nombre) => {
    const c = campo(hijosDe(GRUPOS[grupo] as Field), nombre);
    expect(c).toBeDefined();
    expect(esObligatorio(c)).toBe(false);
  });

  it('el copyright del footer no es obligatorio', () => {
    const c = campo(Footer.fields, 'copyright');
    expect(c).toBeDefined();
    expect(esObligatorio(c)).toBe(false);
  });

  it('siguen obligatorios los que el componente necesita: siteName y city', () => {
    expect(esObligatorio(campo(hijosDe(generalGroup), 'siteName'))).toBe(true);
    expect(esObligatorio(campo(hijosDe(contactGroup), 'city'))).toBe(true);
  });
});
