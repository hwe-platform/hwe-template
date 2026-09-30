'use client';

import { useCallback, useState } from 'react';
import { FieldDescription, FieldError, FieldLabel, useField } from '@payloadcms/ui';

import { parsearDecimal } from './parsear-decimal';

import type { ChangeEvent } from 'react';
import type { NumberFieldClient, NumberFieldClientComponent, NumberFieldValidation } from 'payload';

/** La validación que acepta `useField`. */
type ValidarCampo = NonNullable<NonNullable<Parameters<typeof useField>[0]>['validate']>;

/** Las opciones que espera la validación de un campo `number`. */
type OpcionesDeValidacion = Parameters<NumberFieldValidation>[1];

/** El texto con el que se pinta un valor guardado. */
const textoDe = (valor: number | null | undefined) =>
  typeof valor === 'number' ? String(valor) : '';

/**
 * Misma validación que el campo `number` de Payload: la suya, con los límites
 * del campo, para que `required` avise antes de guardar.
 *
 * Las opciones que da `useField` son las genéricas de cualquier campo y la
 * validación de `number` pide las suyas; en Payload no chocan porque su
 * componente es JS. Son el mismo objeto en ejecución: de ahí la conversión.
 */
function useValidacionNumero(
  field: Pick<NumberFieldClient, 'min' | 'max' | 'required'>,
  validate: NumberFieldValidation | undefined,
): ValidarCampo {
  const { min, max, required } = field;
  return useCallback<ValidarCampo>(
    (valor, opciones) =>
      typeof validate === 'function'
        ? validate(
            valor as number | null,
            {
              ...opciones,
              max,
              min,
              required,
            } as OpcionesDeValidacion,
          )
        : true,
    [validate, min, max, required],
  );
}

/**
 * El texto del input, aparte del valor: «43,» todavía no es el número que el
 * editor quiere, y reescribirlo con `43` le borraría la coma mientras escribe.
 */
function useTextoDecimal(value: number | null | undefined, setValue: (valor: unknown) => void) {
  const [texto, setTexto] = useState(() => textoDe(value));
  const [valorPintado, setValorPintado] = useState(value);

  // Si el valor cambia desde fuera (cargar el documento, deshacer), se pinta
  // ese; si es el que ya representa el texto, se respeta lo escrito. Se ajusta
  // en el render y no en un efecto, que pintaría primero el texto viejo.
  if (value !== valorPintado) {
    setValorPintado(value);
    if (parsearDecimal(texto) !== (value ?? null)) setTexto(textoDe(value));
  }

  const alCambiar = useCallback(
    (evento: ChangeEvent<HTMLInputElement>) => {
      setTexto(evento.target.value);
      setValue(parsearDecimal(evento.target.value));
    },
    [setValue],
  );

  return { texto, alCambiar };
}

/**
 * Campo `number` del panel que acepta coma o punto decimal.
 *
 * Sustituye al input `number` de Payload solo en la interfaz: el campo sigue
 * siendo `number` en el esquema, se guarda como número y se valida igual. El
 * input es de texto con `inputMode="decimal"`, para que el navegador no
 * descarte la coma y el móvil saque el teclado numérico.
 *
 * Arreglo local del template mientras se trata en origen (deuda técnica): se
 * usa con `admin.components.Field` en los campos con decimales.
 */
export const DecimalField: NumberFieldClientComponent = ({
  field,
  path: pathDeProps,
  readOnly,
  validate,
}) => {
  const { label, localized, required, admin } = field;
  const { disabled, path, setValue, showError, value } = useField<number | null>({
    potentiallyStalePath: pathDeProps,
    validate: useValidacionNumero(field, validate),
  });
  const { texto, alCambiar } = useTextoDecimal(value, setValue);

  const clases = ['field-type', 'number', admin?.className, showError && 'error'];
  if (readOnly || disabled) clases.push('read-only');

  return (
    <div className={clases.filter(Boolean).join(' ')}>
      <FieldLabel label={label} localized={localized} path={path} required={required} />
      <div className="field-type__wrap">
        <FieldError path={path} showError={showError} />
        <input
          disabled={readOnly || disabled}
          id={`field-${path.replace(/\./g, '__')}`}
          inputMode="decimal"
          name={path}
          onChange={alCambiar}
          type="text"
          value={texto}
        />
      </div>
      <FieldDescription description={admin?.description} path={path} />
    </div>
  );
};
