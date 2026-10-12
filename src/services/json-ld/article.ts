import { imageUrl, nodeId, omitEmpty, pageUrl, textOrUndefined } from './utils';

import type { ArticleInput, JsonLdContext, JsonLdNode } from './types';

/**
 * Los artículos responden bajo `/blog/<slug>` (`ARTICLES_PREFIX` en core-ui,
 * `resolveRoute`). Se repite aquí en lugar de importarlo para no depender de que
 * el `dist` de core-ui esté recompilado; el test fija la URL.
 */
const PREFIJO_ARTICULOS = 'blog';

/**
 * Schema BlogPosting de la ficha de un artículo (capa 2).
 *
 * **Stub**: existe y está testeado, pero no se conecta al orquestador hasta
 * que exista el template de artículo. `dateModified` solo si difiere de la
 * fecha de publicación; `author` solo si existe (no se inventa "Admin").
 *
 * Spec: specs/seo-geo/schemas/article.md
 *
 * @param article - Artículo de Payload
 * @param ctx - Contexto de la petición
 * @returns El nodo, o `null` sin título, extracto, slug o fecha de publicación
 *   — entonces la página cae en WebPage
 */
export function buildArticleSchema(article: ArticleInput, ctx: JsonLdContext): JsonLdNode | null {
  const headline = textOrUndefined(article.title);
  const description = textOrUndefined(article.excerpt);
  const slug = textOrUndefined(article.slug);
  const datePublished = textOrUndefined(article.publishedAt);
  if (!headline || !description || !slug || !datePublished) return null;

  const updatedAt = textOrUndefined(article.updatedAt);
  const author = textOrUndefined(article.author);

  return omitEmpty({
    '@type': 'BlogPosting',
    headline,
    description,
    url: pageUrl(ctx, `${PREFIJO_ARTICULOS}/${slug}`),
    datePublished,
    dateModified: updatedAt && updatedAt !== datePublished ? updatedAt : undefined,
    image: imageUrl(ctx, article.image),
    author: author ? { '@type': 'Person', name: author } : undefined,
    publisher: { '@id': nodeId(ctx, 'organization') },
    articleSection: textOrUndefined(article.category),
    inLanguage: ctx.locale,
    isPartOf: { '@id': nodeId(ctx, 'website') },
  });
}
