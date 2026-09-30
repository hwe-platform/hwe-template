import { pageUrl, textOrUndefined } from './utils';

import type { BreadcrumbInput, JsonLdContext, JsonLdNode } from './types';

/**
 * Schema BreadcrumbList: dónde está la página dentro del site. Va en todas las
 * páginas menos la home (capa 1).
 *
 * El último peldaño es la página actual y va sin `item` (URL). Las URLs llevan
 * el prefijo del idioma activo.
 *
 * Spec: specs/seo-geo/schemas/breadcrumbs.md
 *
 * @param crumbs - Peldaños en orden, desde la home; el último sin `path`
 * @param ctx - Contexto de la petición (URL base, prefijo de idioma)
 * @returns El nodo BreadcrumbList, o `null` si hay menos de dos peldaños con nombre
 */
export function buildBreadcrumbSchema(
  crumbs: BreadcrumbInput[],
  ctx: JsonLdContext,
): JsonLdNode | null {
  const conNombre = crumbs.filter((crumb) => textOrUndefined(crumb.name));
  if (conNombre.length < 2) return null;

  const ultimo = conNombre.length - 1;
  const itemListElement = conNombre.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name.trim(),
    ...(index < ultimo && crumb.path !== undefined ? { item: pageUrl(ctx, crumb.path) } : {}),
  }));

  return { '@type': 'BreadcrumbList', itemListElement };
}
