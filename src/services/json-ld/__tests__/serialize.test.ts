import { describe, it, expect } from 'vitest';

import { serializeJsonLd } from '../serialize';

describe('serializeJsonLd', () => {
  it('escapa < para que un texto del editor no pueda cerrar el <script>', () => {
    const salida = serializeJsonLd({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'WebPage', name: '</script><img src=x onerror=alert(1)>' }],
    });

    expect(salida).not.toContain('</script>');
    expect(salida).not.toContain('<');
  });

  it('sigue siendo JSON válido con el mismo texto', () => {
    const graph = {
      '@context': 'https://schema.org' as const,
      '@graph': [{ '@type': 'WebPage', name: 'a < b' }],
    };
    expect(JSON.parse(serializeJsonLd(graph))).toEqual(graph);
  });
});
