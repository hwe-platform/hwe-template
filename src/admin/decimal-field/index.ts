import type { NumberField } from 'payload';

/**
 * `admin` para un campo `number` con decimales: lo pinta con {@link DecimalField},
 * que acepta coma o punto. La ruta es relativa a `src/` (`admin.importMap.baseDir`
 * en payload.config.ts); tras añadirla a un campo nuevo, `pnpm generate:importmap`.
 */
export const ADMIN_DECIMAL: NumberField['admin'] = {
  components: { Field: '/admin/decimal-field/DecimalField#DecimalField' },
};
