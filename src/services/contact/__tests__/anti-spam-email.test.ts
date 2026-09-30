import { describe, expect, it } from 'vitest';

import { demasiadoRapido, esBot, hashIp, ipDe } from '../anti-spam';
import { destinoDe } from '../dependencias-payload';
import { construirEmail, escapeHtml } from '../email';

describe('esBot', () => {
  it('un honeypot vacío o en blanco es una persona', () => {
    expect(esBot(undefined)).toBe(false);
    expect(esBot('')).toBe(false);
    expect(esBot('   ')).toBe(false);
  });

  it('un honeypot relleno es un bot', () => {
    expect(esBot('https://spam.example')).toBe(true);
  });
});

describe('demasiadoRapido', () => {
  it('menos de 3 segundos es un bot; 3 o más, una persona', () => {
    expect(demasiadoRapido(10_000, 12_999)).toBe(true);
    expect(demasiadoRapido(10_000, 13_000)).toBe(false);
  });

  it('un instante de carga en el futuro también es un bot', () => {
    expect(demasiadoRapido(20_000, 10_000)).toBe(true);
  });
});

describe('hashIp', () => {
  it('es estable para la misma IP y sal, y no contiene la IP', () => {
    const hash = hashIp('203.0.113.7', 'secreto');

    expect(hash).toBe(hashIp('203.0.113.7', 'secreto'));
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hash).not.toContain('203.0.113.7');
  });

  it('cambia con la sal: sin el secreto no se puede revertir', () => {
    expect(hashIp('203.0.113.7', 'a')).not.toBe(hashIp('203.0.113.7', 'b'));
  });
});

describe('ipDe', () => {
  it('toma la primera IP de x-forwarded-for (la del visitante)', () => {
    const headers = new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' });
    expect(ipDe(headers)).toBe('203.0.113.7');
  });

  it('cae a x-real-ip y, sin nada, a unknown', () => {
    expect(ipDe(new Headers({ 'x-real-ip': '198.51.100.2' }))).toBe('198.51.100.2');
    expect(ipDe(new Headers())).toBe('unknown');
  });
});

describe('escapeHtml', () => {
  it('neutraliza el marcado que escribe el visitante', () => {
    expect(escapeHtml(`<img src=x onerror="alert('1')">&`)).toBe(
      '&lt;img src=x onerror=&quot;alert(&#39;1&#39;)&quot;&gt;&amp;',
    );
  });
});

describe('construirEmail', () => {
  const datos = {
    name: 'Marie <b>Dupont</b>',
    email: 'marie@example.fr',
    subject: 'Réservation',
    message: 'Bonjour,\n<script>alert(1)</script>',
  };

  it('va al establecimiento, con el visitante como replyTo', () => {
    const email = construirEmail(datos, 'contact@example.com', 'Camping Example');

    expect(email.to).toBe('contact@example.com');
    expect(email.replyTo).toBe('marie@example.fr');
    expect(email.subject).toBe('[Camping Example] Réservation — Marie <b>Dupont</b>');
  });

  it('el HTML lleva todo escapado; el texto plano, tal cual', () => {
    const email = construirEmail(datos, 'a@b.fr', 'Site');

    expect(email.html).not.toContain('<script>');
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.html).toContain('Marie &lt;b&gt;Dupont&lt;/b&gt;');
    expect(email.text).toContain('Téléphone : —');
    expect(email.text).toContain('Bonjour,\n<script>alert(1)</script>');
  });
});

describe('destinoDe', () => {
  it('usa el destinatario del formulario si lo hay', () => {
    expect(
      destinoDe({
        general: { siteName: 'Camping Example' },
        contact: { email: 'contact@example.org' },
        contactForm: { recipient: 'reservas@example.org' },
      }),
    ).toEqual({ recipient: 'reservas@example.org', siteName: 'Camping Example' });
  });

  it('sin él cae al email de contacto del site', () => {
    expect(
      destinoDe({ contact: { email: 'contact@example.org' }, contactForm: { recipient: null } }),
    ).toEqual({ recipient: 'contact@example.org', siteName: 'Site' });
  });

  it('sin site-config no hay a quién avisar', () => {
    expect(destinoDe(null)).toEqual({ recipient: undefined, siteName: 'Site' });
  });
});
