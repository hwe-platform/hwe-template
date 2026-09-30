import type { ContactFormData } from '@hwe-platform/core-ui';

/** Lo que `payload.sendEmail` necesita para avisar al establecimiento. */
export type EmailDeContacto = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

const ENTIDADES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa un texto para meterlo en HTML.
 *
 * El mensaje lo escribe un desconocido y acaba en el cliente de correo del
 * establecimiento: sin escapar, un `<a href>` o un `<img>` en el mensaje se
 * pintaría como tal.
 */
export function escapeHtml(texto: string): string {
  // La expresión solo casa las cinco claves de la tabla: siempre hay entidad.
  return texto.replace(/[&<>"']/g, (caracter) => ENTIDADES[caracter] as string);
}

/** Lo que el email cuenta del envío. */
type DatosDelMensaje = Pick<ContactFormData, 'name' | 'email' | 'phone' | 'subject' | 'message'>;

function lineas(datos: DatosDelMensaje): [string, string][] {
  return [
    ['Nom', datos.name],
    ['E-mail', datos.email],
    ['Téléphone', datos.phone ?? '—'],
    ['Sujet', datos.subject],
  ];
}

/**
 * Email que avisa al establecimiento de un mensaje nuevo.
 *
 * `replyTo` es el visitante: contestar desde el cliente de correo le llega a
 * él, no al remitente técnico del servidor. En francés, el idioma del equipo
 * que lo lee.
 *
 * @param datos - El envío, ya validado
 * @param destinatario - `contactForm.recipient` o, sin él, `contact.email`
 * @param siteName - Nombre del site, para el asunto
 */
export function construirEmail(
  datos: DatosDelMensaje,
  destinatario: string,
  siteName: string,
): EmailDeContacto {
  const cabecera = lineas(datos);
  const text = [...cabecera.map(([k, v]) => `${k} : ${v}`), '', datos.message].join('\n');
  const html = [
    '<table>',
    ...cabecera.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`),
    '</table>',
    `<p style="white-space:pre-wrap">${escapeHtml(datos.message)}</p>`,
  ].join('');

  return {
    to: destinatario,
    replyTo: datos.email,
    subject: `[${siteName}] ${datos.subject} — ${datos.name}`,
    text,
    html,
  };
}
