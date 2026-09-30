import { describe, expect, it, vi } from 'vitest';

import { CONTACT_ERRORS } from '@hwe-platform/core-ui';

import { procesarContacto } from '../procesar-contacto';

import type { DependenciasContacto } from '../procesar-contacto';

const AHORA = Date.parse('2026-09-28T10:00:00.000Z');

/** Un envío válido, hecho por una persona: 20 segundos rellenando. */
function envio(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Marie Dupont',
    email: 'marie@example.fr',
    subject: 'Réservation',
    message: 'Bonjour, avez-vous un mobil-home pour juillet ?',
    rgpdConsent: true,
    honeypot: '',
    startedAt: AHORA - 20_000,
    ...overrides,
  };
}

function dependencias(overrides: Partial<DependenciasContacto> = {}): DependenciasContacto {
  return {
    ahora: AHORA,
    ipHash: 'hash-ip',
    destino: { recipient: 'contact@example.com', siteName: 'Camping Example' },
    contarRecientes: vi.fn().mockResolvedValue(0),
    guardar: vi.fn().mockResolvedValue({ id: 42 }),
    marcarEnviado: vi.fn().mockResolvedValue(undefined),
    enviarEmail: vi.fn().mockResolvedValue(undefined),
    avisar: vi.fn(),
    ...overrides,
  };
}

describe('procesarContacto — validación', () => {
  it('rechaza con 400 y un error por campo lo que no pasa el schema', async () => {
    const deps = dependencias();

    const resultado = await procesarContacto(envio({ email: 'x', rgpdConsent: false }), deps);

    expect(resultado).toEqual({
      status: 400,
      body: {
        ok: false,
        errors: { email: CONTACT_ERRORS.email, rgpdConsent: CONTACT_ERRORS.rgpdConsent },
      },
    });
    expect(deps.guardar).not.toHaveBeenCalled();
  });

  it('un cuerpo que no es JSON es un 400', async () => {
    expect((await procesarContacto(null, dependencias())).status).toBe(400);
  });
});

describe('procesarContacto — anti-spam', () => {
  it('honeypot relleno: responde 200 y no guarda ni avisa', async () => {
    const deps = dependencias();

    const resultado = await procesarContacto(envio({ honeypot: 'https://spam.example' }), deps);

    expect(resultado).toEqual({ status: 200, body: { ok: true } });
    expect(deps.guardar).not.toHaveBeenCalled();
    expect(deps.enviarEmail).not.toHaveBeenCalled();
  });

  it('enviado en menos de 3 segundos: responde 200 y no guarda', async () => {
    const deps = dependencias();

    const resultado = await procesarContacto(envio({ startedAt: AHORA - 1500 }), deps);

    expect(resultado.status).toBe(200);
    expect(deps.guardar).not.toHaveBeenCalled();
  });

  it('con 5 envíos del mismo visitante en la última hora responde 429', async () => {
    const deps = dependencias({ contarRecientes: vi.fn().mockResolvedValue(5) });

    const resultado = await procesarContacto(envio(), deps);

    expect(resultado).toEqual({ status: 429, body: { ok: false } });
    expect(deps.contarRecientes).toHaveBeenCalledWith('hash-ip', new Date(AHORA - 60 * 60 * 1000));
    expect(deps.guardar).not.toHaveBeenCalled();
  });

  it('con 4 envíos todavía deja pasar el quinto', async () => {
    const deps = dependencias({ contarRecientes: vi.fn().mockResolvedValue(4) });

    expect((await procesarContacto(envio(), deps)).status).toBe(200);
    expect(deps.guardar).toHaveBeenCalled();
  });
});

describe('procesarContacto — guardado y aviso', () => {
  it('guarda el envío recortado, con el hash de IP y la fecha del consentimiento', async () => {
    const deps = dependencias();

    await procesarContacto(envio({ name: '  Marie Dupont ', phone: '' }), deps);

    expect(deps.guardar).toHaveBeenCalledWith({
      name: 'Marie Dupont',
      email: 'marie@example.fr',
      phone: '',
      subject: 'Réservation',
      message: 'Bonjour, avez-vous un mobil-home pour juillet ?',
      consentAt: '2026-09-28T10:00:00.000Z',
      ipHash: 'hash-ip',
      emailSent: false,
    });
  });

  it('avisa al establecimiento con el visitante como replyTo y marca el envío', async () => {
    const deps = dependencias();

    await procesarContacto(envio(), deps);

    expect(deps.enviarEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'contact@example.com',
        replyTo: 'marie@example.fr',
        subject: '[Camping Example] Réservation — Marie Dupont',
      }),
    );
    expect(deps.marcarEnviado).toHaveBeenCalledWith(42);
  });

  it('si el email falla, confirma igual al visitante y deja rastro', async () => {
    const deps = dependencias({ enviarEmail: vi.fn().mockRejectedValue(new Error('SMTP caído')) });

    const resultado = await procesarContacto(envio(), deps);

    expect(resultado.status).toBe(200);
    expect(deps.marcarEnviado).not.toHaveBeenCalled();
    expect(deps.avisar).toHaveBeenCalledWith(expect.stringContaining('email'), expect.any(Error));
  });

  it('sin destinatario guarda el envío y no intenta mandar email', async () => {
    const deps = dependencias({ destino: { siteName: 'Site' } });

    expect((await procesarContacto(envio(), deps)).status).toBe(200);
    expect(deps.guardar).toHaveBeenCalled();
    expect(deps.enviarEmail).not.toHaveBeenCalled();
  });

  it('si no se puede guardar, el error sube al Route Handler (500)', async () => {
    const deps = dependencias({ guardar: vi.fn().mockRejectedValue(new Error('sin base')) });

    await expect(procesarContacto(envio(), deps)).rejects.toThrow('sin base');
    expect(deps.enviarEmail).not.toHaveBeenCalled();
  });
});
