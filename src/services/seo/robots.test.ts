import { describe, expect, it } from 'vitest';

import { robotsDe } from './robots';

describe('robotsDe', () => {
  it('pide noindex cuando el editor marcó noIndex', () => {
    expect(robotsDe({ noIndex: true })).toEqual({ index: false });
  });

  it('no pide nada si noIndex está desmarcado', () => {
    expect(robotsDe({ noIndex: false })).toBeUndefined();
  });

  it('no pide nada si la página no tiene seo, o no lo dice', () => {
    expect(robotsDe(undefined)).toBeUndefined();
    expect(robotsDe(null)).toBeUndefined();
    expect(robotsDe({})).toBeUndefined();
    expect(robotsDe({ noIndex: null })).toBeUndefined();
  });

  it('no desactiva el seguimiento de enlaces', () => {
    expect(robotsDe({ noIndex: true })).not.toHaveProperty('follow');
  });
});
