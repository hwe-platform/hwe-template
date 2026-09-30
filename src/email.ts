import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

/**
 * Adaptador de email de Payload: SMTP con `@payloadcms/email-nodemailer`
 * (HU-021, specs/informacion/contacto.md — no nodemailer directo).
 *
 * **Solo si hay `SMTP_HOST`.** Sin él devuelve `undefined` y Payload escribe
 * los emails en la consola, que es lo que se quiere en local: se ve el aviso
 * del formulario de contacto sin montar un servidor de correo ni mandar nada
 * a nadie. En producción, las variables `SMTP_*` del entorno.
 *
 * @param env - Variables de entorno; `process.env` por defecto
 */
export function emailAdapter(
  env: Record<string, string | undefined> = process.env,
): ReturnType<typeof nodemailerAdapter> | undefined {
  if (!env.SMTP_HOST) return undefined;

  const port = Number(env.SMTP_PORT ?? 587);
  return nodemailerAdapter({
    defaultFromAddress: env.SMTP_FROM ?? 'no-reply@localhost',
    defaultFromName: env.SMTP_FROM_NAME ?? 'Site',
    transportOptions: {
      host: env.SMTP_HOST,
      port,
      // 465 es SMTP sobre TLS; 587 y 25 negocian STARTTLS.
      secure: port === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS ?? '' } : undefined,
    },
  });
}
