import type { Metadata } from 'next';

/** Lo que `generateMetadata` lee del grupo `seo` para decidir la directiva `robots`. */
export type SeoRobots = { noIndex?: boolean | null };

/**
 * Directiva `robots` de una página: `noindex` si el editor marcó `seo.noIndex`, y
 * nada en cualquier otro caso (los buscadores indexan por defecto).
 *
 * El campo existía en el modelo y en el panel, pero `generateMetadata` no lo
 * leía: marcarlo no tenía ningún efecto. Solo se pide `noindex`; los enlaces de
 * la página siguen siendo seguibles, que es lo que se quiere de una página sin
 * contenido que enlaza al resto del site.
 *
 * @param seo - El grupo `seo` de la página, si lo tiene
 */
export function robotsDe(seo: SeoRobots | null | undefined): Metadata['robots'] {
  return seo?.noIndex ? { index: false } : undefined;
}
