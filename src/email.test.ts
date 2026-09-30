import { describe, expect, it, vi } from 'vitest';

import { emailAdapter } from './email';

// El adaptador real verifica el SMTP por red al crearse: aquí solo importa
// con qué se le llama.
const { nodemailerAdapter } = vi.hoisted(() => ({ nodemailerAdapter: vi.fn(() => 'adaptador') }));
vi.mock('@payloadcms/email-nodemailer', () => ({ nodemailerAdapter }));

describe('emailAdapter', () => {
  it('sin SMTP_HOST no configura adaptador: Payload escribe los emails en consola', () => {
    expect(emailAdapter({})).toBeUndefined();
    expect(nodemailerAdapter).not.toHaveBeenCalled();
  });

  it('con SMTP_HOST configura nodemailer con el remitente y las credenciales', () => {
    const adaptador = emailAdapter({
      SMTP_HOST: 'smtp.example.com',
      SMTP_USER: 'usuario',
      SMTP_PASS: 'clave',
      SMTP_FROM: 'no-reply@example.com',
      SMTP_FROM_NAME: 'Camping Example',
    });

    expect(adaptador).toBe('adaptador');
    expect(nodemailerAdapter).toHaveBeenCalledWith({
      defaultFromAddress: 'no-reply@example.com',
      defaultFromName: 'Camping Example',
      transportOptions: {
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: { user: 'usuario', pass: 'clave' },
      },
    });
  });

  it('el puerto 465 es SMTP sobre TLS', () => {
    emailAdapter({ SMTP_HOST: 'smtp.example.com', SMTP_PORT: '465' });

    expect(nodemailerAdapter).toHaveBeenLastCalledWith(
      expect.objectContaining({
        transportOptions: expect.objectContaining({ port: 465, secure: true, auth: undefined }),
      }),
    );
  });
});
