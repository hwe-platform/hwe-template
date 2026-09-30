import { contactFormSchema, erroresPorCampo } from '@hwe-platform/core-ui';

import { demasiadoRapido, esBot } from './anti-spam';
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from './constants';
import { construirEmail } from './email';

import type { ContactFormErrors, ContactSubmissionInput } from '@hwe-platform/core-ui';
import type { EmailDeContacto } from './email';

/** Lo que el orquestador necesita del mundo. En producción, Payload; en test, dobles. */
export type DependenciasContacto = {
  /** Instante de la petición (ms desde epoch). */
  ahora: number;
  /** Hash con sal de la IP del visitante. */
  ipHash: string;
  /** A quién avisar y con qué nombre de site. Sin destinatario no se manda email. */
  destino: { recipient?: string; siteName: string };
  /** Envíos del mismo `ipHash` desde el instante dado. */
  contarRecientes: (ipHash: string, desde: Date) => Promise<number>;
  guardar: (envio: ContactSubmissionInput) => Promise<{ id: string | number }>;
  marcarEnviado: (id: string | number) => Promise<void>;
  enviarEmail: (email: EmailDeContacto) => Promise<void>;
  /** Para dejar rastro de un email que no salió sin tumbar la respuesta. */
  avisar: (mensaje: string, error: unknown) => void;
};

/** Respuesta HTTP que el Route Handler devuelve tal cual. */
export type ResultadoContacto = {
  status: 200 | 400 | 429 | 500;
  body: { ok: true } | { ok: false; errors?: ContactFormErrors };
};

const OK: ResultadoContacto = { status: 200, body: { ok: true } };

async function avisarPorEmail(
  envio: ContactSubmissionInput,
  id: string | number,
  deps: DependenciasContacto,
) {
  const { recipient, siteName } = deps.destino;
  if (!recipient) return;

  try {
    await deps.enviarEmail(construirEmail(envio, recipient, siteName));
    await deps.marcarEnviado(id);
  } catch (error) {
    // El mensaje ya está guardado: al visitante se le confirma igual y el
    // equipo lo ve en el admin con `emailSent` a falso.
    deps.avisar('[contact] el email no salió; el mensaje está guardado', error);
  }
}

/**
 * Procesa un envío del formulario de contacto (specs/informacion/contacto.md,
 * "Envío"): valida, filtra bots, limita por visitante, guarda y avisa.
 *
 * - **Honeypot relleno o envío demasiado rápido → 200 sin hacer nada.** Al bot
 *   no se le dice que se le ha detectado.
 * - **Más de {@link RATE_LIMIT_MAX} envíos en la ventana → 429.**
 * - **Email caído → 200.** El mensaje ya está en `contact-submissions`.
 *
 * Validar con Zod ya recorta los espacios; el escape de HTML se hace al
 * construir el email, que es donde el texto se interpreta como marcado.
 *
 * @param cuerpo - JSON de la petición, sin validar
 * @param deps - Acceso a la base de datos, al correo y al reloj
 */
export async function procesarContacto(
  cuerpo: unknown,
  deps: DependenciasContacto,
): Promise<ResultadoContacto> {
  const validacion = contactFormSchema.safeParse(cuerpo);
  if (!validacion.success) {
    return { status: 400, body: { ok: false, errors: erroresPorCampo(validacion.error.issues) } };
  }

  const { honeypot, startedAt, rgpdConsent: _consentimiento, ...datos } = validacion.data;
  if (esBot(honeypot) || demasiadoRapido(startedAt, deps.ahora)) return OK;

  const desde = new Date(deps.ahora - RATE_LIMIT_WINDOW_MS);
  if ((await deps.contarRecientes(deps.ipHash, desde)) >= RATE_LIMIT_MAX) {
    return { status: 429, body: { ok: false } };
  }

  const envio: ContactSubmissionInput = {
    ...datos,
    consentAt: new Date(deps.ahora).toISOString(),
    ipHash: deps.ipHash,
    emailSent: false,
  };
  const { id } = await deps.guardar(envio);
  await avisarPorEmail(envio, id, deps);

  return OK;
}
