/**
 * Rótulos visibles que core-ui no trae (regla 12): los pone el site, en un único
 * módulo y en el idioma principal (`DEFAULT_LOCALE`, hoy francés). Cuando un
 * cliente cambia de idioma principal, cambia estos textos. Son los mismos que
 * core-ui tenía por defecto, así que el site se ve igual que antes de la
 * regla 12. Pasan a un sistema localizado con HU-036.
 */
export const ROTULOS_MEDIA_TEXT = {
  cardCta: 'Découvrir',
  consent: 'Acceptez les cookies pour voir ce contenu',
  openExternal: 'Ouvrir dans un nouvel onglet',
};

/**
 * Rótulo del enlace de cada tarjeta de artículo (`card-grid` con `source: 'articles'`).
 * No es contenido y no sale de Payload: es interfaz.
 */
export const ROTULOS_ARTICULOS = { leerArticulo: "Lire l'article" };
