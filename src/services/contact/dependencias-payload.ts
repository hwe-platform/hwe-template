import { hashIp, ipDe } from './anti-spam';

import type { Payload } from 'payload';
import type { DependenciasContacto } from './procesar-contacto';

type SiteConfigParaContacto = {
  general?: { siteName?: string | null } | null;
  contact?: { email?: string | null } | null;
  contactForm?: { recipient?: string | null } | null;
};

/**
 * A quién llega el aviso: `contactForm.recipient` y, sin él, el email de
 * contacto del site.
 */
export function destinoDe(siteConfig: SiteConfigParaContacto | null) {
  return {
    recipient: siteConfig?.contactForm?.recipient || siteConfig?.contact?.email || undefined,
    siteName: siteConfig?.general?.siteName || 'Site',
  };
}

/**
 * Las dependencias reales de {@link procesarContacto}: la Local API de Payload,
 * su adaptador de email y el reloj.
 *
 * `overrideAccess` porque la colección no admite escrituras desde fuera
 * (`create: () => false`): la única puerta es este servidor.
 *
 * @param payload - Instancia de Payload
 * @param headers - Cabeceras de la petición, para la IP
 */
export async function dependenciasPayload(
  payload: Payload,
  headers: Headers,
): Promise<DependenciasContacto> {
  const siteConfig = (await payload
    .findGlobal({ slug: 'site-config', depth: 0 })
    .catch(() => null)) as SiteConfigParaContacto | null;

  return {
    ahora: Date.now(),
    ipHash: hashIp(ipDe(headers), process.env.PAYLOAD_SECRET ?? ''),
    destino: destinoDe(siteConfig),
    contarRecientes: async (ipHash, desde) => {
      const { totalDocs } = await payload.count({
        collection: 'contact-submissions',
        where: { ipHash: { equals: ipHash }, createdAt: { greater_than: desde.toISOString() } },
        overrideAccess: true,
      });
      return totalDocs;
    },
    guardar: (envio) =>
      payload.create({ collection: 'contact-submissions', data: envio, overrideAccess: true }),
    marcarEnviado: async (id) => {
      // Sin SMTP, Payload solo escribe el email en consola y no falla: marcarlo
      // como enviado mentiría al equipo en el admin.
      if (!process.env.SMTP_HOST) return;
      await payload.update({
        collection: 'contact-submissions',
        id,
        data: { emailSent: true },
        overrideAccess: true,
      });
    },
    enviarEmail: async (email) => {
      await payload.sendEmail(email);
    },
    avisar: (mensaje, error) => payload.logger.error({ err: error }, mensaje),
  };
}
