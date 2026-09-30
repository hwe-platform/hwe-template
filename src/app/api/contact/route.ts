import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

import config from '../../../payload.config';
import { dependenciasPayload } from '../../../services/contact/dependencias-payload';
import { procesarContacto } from '../../../services/contact/procesar-contacto';

/**
 * `POST /api/contact` — envío del formulario de contacto (HU-021).
 *
 * El formulario nunca manda el correo desde el navegador: llega aquí, se
 * valida con el mismo schema que en el cliente, pasa el anti-spam, se guarda
 * en `contact-submissions` y se avisa por email. La lógica vive en
 * `services/contact/`, con tests; aquí solo se conecta con Payload y HTTP.
 *
 * Un fallo inesperado (base de datos caída) es un 500 sin detalles: el
 * visitante ve el mensaje genérico y el detalle queda en el log.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const cuerpo: unknown = await request.json().catch(() => null);

  try {
    const payload = await getPayload({ config });
    const { status, body } = await procesarContacto(
      cuerpo,
      await dependenciasPayload(payload, request.headers),
    );
    return NextResponse.json(body, { status });
  } catch (error) {
    // eslint-disable-next-line no-console -- sin Payload no hay logger al que ir
    console.error('[contact] error inesperado', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
