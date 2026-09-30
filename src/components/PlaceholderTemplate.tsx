import type { TemplateProps } from './template-types';

/**
 * Plantilla provisional de las colecciones que aún no tienen ficha propia
 * (`articles`, `entities`). Confirma que la URL resuelve y de qué colección
 * salió; se sustituye cuando llegue la historia de cada una.
 *
 * Aun provisional lleva `<h1>`: `title` en artículos, `name` en entidades. Una
 * página publicada sin encabezado principal es un fallo de accesibilidad y SEO
 * (HU-022).
 */
export function PlaceholderTemplate({ doc }: TemplateProps) {
  const nombre = doc.title ?? doc.name;

  return (
    <>
      {typeof nombre === 'string' && nombre !== '' ? <h1>{nombre}</h1> : null}
      <p>{String(doc.slug)} — template pendiente.</p>
    </>
  );
}
