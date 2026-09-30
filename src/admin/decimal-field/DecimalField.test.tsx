// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DecimalField } from './DecimalField';

import type { ComponentProps } from 'react';

// El formulario de Payload no existe fuera del panel: `useField` se sustituye
// por un valor controlado desde el test y un `setValue` espía.
const campo = { value: null as number | null, setValue: vi.fn(), showError: false };

vi.mock('@payloadcms/ui', () => ({
  useField: () => ({ ...campo, disabled: false, path: 'location.latitude' }),
  FieldLabel: ({ label }: { label: string }) => (
    <label htmlFor="field-location__latitude">{label}</label>
  ),
  FieldError: () => null,
  FieldDescription: () => null,
}));

type Props = ComponentProps<typeof DecimalField>;

const props = {
  field: { name: 'latitude', type: 'number', label: 'Latitude', required: true },
  path: 'location.latitude',
} as unknown as Props;

describe('DecimalField', () => {
  beforeEach(() => {
    campo.value = null;
    campo.setValue.mockReset();
  });

  it('guarda como número lo escrito con coma decimal', () => {
    render(<DecimalField {...props} />);
    fireEvent.change(screen.getByLabelText('Latitude'), { target: { value: '43,6417' } });

    expect(campo.setValue).toHaveBeenLastCalledWith(43.6417);
  });

  it('guarda como número lo escrito con punto decimal', () => {
    render(<DecimalField {...props} />);
    fireEvent.change(screen.getByLabelText('Latitude'), { target: { value: '-1.4297' } });

    expect(campo.setValue).toHaveBeenLastCalledWith(-1.4297);
  });

  it('respeta la coma mientras se escribe y vacía el valor si no es un número', () => {
    render(<DecimalField {...props} />);
    const input = screen.getByLabelText('Latitude');

    fireEvent.change(input, { target: { value: '43,' } });
    expect(input).toHaveProperty('value', '43,');

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(campo.setValue).toHaveBeenLastCalledWith(null);
  });

  it('pinta el valor guardado y usa el teclado numérico', () => {
    campo.value = 43.6417;
    render(<DecimalField {...props} />);
    const input = screen.getByLabelText('Latitude');

    expect(input).toHaveProperty('value', '43.6417');
    expect(input.getAttribute('inputmode')).toBe('decimal');
  });
});
