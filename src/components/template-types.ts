import type { Breadcrumb } from '@hwe-platform/core-ui';
import type { SiteConfig } from '../payload-types';
import type { SiteLocale } from '../i18n';

/**
 * Lo que el catch-all entrega a la plantilla de cada colección.
 *
 * El JSON-LD no viaja aquí aunque la spec lo listaba: lo pinta el catch-all
 * una sola vez, antes de la plantilla, para que ninguna pueda olvidarlo.
 */
export type TemplateProps = {
  /** Documento que respondió a la URL, tal como lo devuelve la Local API. */
  doc: Record<string, unknown>;
  locale: SiteLocale;
  /** El global `site-config`, o `null` si no está configurado. */
  siteConfig: SiteConfig | null;
  /** Rastro de migas de la página, con el último nivel sin enlace. */
  breadcrumbs: Breadcrumb[];
};
