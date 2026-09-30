import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { PlaceholderTemplate } from './PlaceholderTemplate';

function pintar() {
  return render(
    <PlaceholderTemplate
      doc={{ slug: 'restaurant' }}
      locale="fr"
      siteConfig={null}
      breadcrumbs={[]}
    />,
  );
}

describe('PlaceholderTemplate', () => {
  it('confirma que la URL resolvió', () => {
    pintar();

    expect(screen.getByText('restaurant — template pendiente.')).toBeTruthy();
  });

  it('lleva h1 con el title o el name del documento', () => {
    render(
      <PlaceholderTemplate
        doc={{ slug: 'x', name: 'Restaurant' }}
        locale="fr"
        siteConfig={null}
        breadcrumbs={[]}
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Restaurant' })).toBeTruthy();
  });

  it('no tiene violaciones de accesibilidad', async () => {
    const { container } = pintar();

    expect((await axe(container)).violations).toHaveLength(0);
  });
});
