import { afterEach, vi } from 'vitest';

import type { ReactNode } from 'react';

// Solo los tests de componentes montan DOM (ver `environmentMatchGlobs` en
// vitest.config.ts); en el resto no hay nada que limpiar ni que sustituir.
if (typeof document !== 'undefined') {
  const { cleanup } = await import('@testing-library/react');
  // Sin `test.globals`, testing-library no registra su limpieza automática.
  afterEach(cleanup);
}

// Mismo criterio que core-ui: fuera de una app Next real no hay loader de
// imágenes, así que `next/image` y `next/link` pasan a sus equivalentes HTML.
vi.mock('next/image', () => ({
  default: ({ alt, fill: _fill, ...props }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element -- es el sustituto de next/image en tests
    <img alt={alt as string} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>
      {children as ReactNode}
    </a>
  ),
}));
