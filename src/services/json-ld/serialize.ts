import type { JsonLdGraph } from './types';

/**
 * Serializa el JSON-LD para meterlo en un `<script type="application/ld+json">`.
 *
 * Escapa `<` como `<`: el JSON-LD lleva texto que escribe el editor, y un
 * `</script>` dentro de una descripción cerraría el script y dejaría inyectar
 * HTML en la página (XSS). El escape es JSON válido, así que los crawlers leen
 * el mismo texto.
 *
 * @param graph - Documento JSON-LD de la página
 * @returns Cadena segura para `dangerouslySetInnerHTML`
 */
export function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}
