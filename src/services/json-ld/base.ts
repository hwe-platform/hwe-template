import {
  buildAddress,
  buildSameAs,
  imageUrl,
  nodeId,
  omitEmpty,
  pageUrl,
  textOrUndefined,
} from './utils';

import type { JsonLdContext, JsonLdNode, SiteConfigInput } from './types';

/**
 * Schema WebSite: el site en sí. Va en todas las páginas (capa 1).
 *
 * Spec: specs/seo-geo/schemas/base-website.md
 *
 * @param siteConfig - Global site-config
 * @param ctx - Contexto de la petición (URL base, idioma)
 * @returns El nodo WebSite, o `null` si no hay nombre del site (obligatorio)
 */
export function buildWebSiteSchema(
  siteConfig: SiteConfigInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(siteConfig.general?.siteName);
  if (!name) return null;

  return omitEmpty({
    '@type': 'WebSite',
    '@id': nodeId(ctx, 'website'),
    name,
    url: pageUrl(ctx),
    inLanguage: ctx.locale,
    description: textOrUndefined(siteConfig.general?.siteDescription),
  });
}

/**
 * Schema Organization: quién está detrás del site, con sus datos de contacto
 * (NAP). Va en todas las páginas (capa 1).
 *
 * Spec: specs/seo-geo/schemas/base-website.md
 *
 * @param siteConfig - Global site-config
 * @param ctx - Contexto de la petición (URL base)
 * @returns El nodo Organization, o `null` si no hay nombre del site (obligatorio)
 */
export function buildOrganizationSchema(
  siteConfig: SiteConfigInput,
  ctx: JsonLdContext,
): JsonLdNode | null {
  const name = textOrUndefined(siteConfig.general?.siteName);
  if (!name) return null;

  return omitEmpty({
    '@type': 'Organization',
    '@id': nodeId(ctx, 'organization'),
    name,
    url: ctx.siteUrl,
    logo: imageUrl(ctx, siteConfig.general?.logo),
    telephone: textOrUndefined(siteConfig.contact?.phone),
    email: textOrUndefined(siteConfig.contact?.email),
    address: buildAddress(siteConfig.contact),
    sameAs: buildSameAs(siteConfig.social),
  });
}
