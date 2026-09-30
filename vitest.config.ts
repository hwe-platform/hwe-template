import { defineConfig } from 'vitest/config';

/**
 * Vitest en el site cubre:
 *
 * - El test de paridad entre los configs de Payload y los schemas Zod de
 *   core-ui (ver src/collections/README.md). La lógica de los hooks se testea
 *   en core-ui, donde vive como funciones puras.
 * - Los builders de JSON-LD de `src/services/json-ld/` (HU-013), que viven en
 *   la app por decisión de la historia y specs/payload/servicios.md.
 * - El envío del formulario de contacto de `src/services/contact/` (HU-021).
 * - Las plantillas de `src/components/` (HU-017), que son de este site y no
 *   de plataforma.
 *
 * Entorno `node` para todo salvo las plantillas, que montan DOM para poder
 * pasar por vitest-axe.
 */
export default defineConfig({
  test: {
    environment: 'node',
    // Hilos y no procesos (HU-022): mismo motivo que en core-ui —con `forks`,
    // los módulos viajan por un temporal que en Windows falla al reescribirse—.
    pool: 'threads',
    environmentMatchGlobs: [['src/components/**', 'jsdom']],
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.tsx'],
    // core-ui llega compilado desde `node_modules`, y Vitest no transforma las
    // dependencias externas: sin esto los `vi.mock` de `next/image` no
    // alcanzarían a las primitivas que lo importan.
    server: { deps: { inline: ['@hwe-platform/core-ui'] } },
    coverage: {
      provider: 'v8',
      include: [
        'src/services/json-ld/**/*.ts',
        'src/services/contact/**/*.ts',
        'src/components/**/*.{ts,tsx}',
        'src/services/routing/**/*.ts',
        'src/hooks/**/*.ts',
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/__tests__/**',
        '**/index.ts',
        '**/types.ts',
        '**/template-types.ts',
      ],
      thresholds: {
        // Builders: funciones puras con efecto dominó en SEO (criterio de HU-013).
        'src/services/json-ld/!(page-resolver).ts': {
          lines: 90,
          statements: 90,
          functions: 90,
          branches: 90,
        },
        // Envío del formulario de contacto: validación, anti-spam, email
        // (HU-021). `dependencias-payload.ts` queda fuera del umbral: es la
        // conexión con la Local API, y se verifica contra el servidor.
        'src/services/contact/!(dependencias-payload).ts': {
          lines: 90,
          statements: 90,
          functions: 90,
          branches: 90,
        },
        // Orquestador (criterio de HU-013).
        'src/services/json-ld/page-resolver.ts': {
          lines: 80,
          statements: 80,
          functions: 80,
          branches: 80,
        },
        // Hooks de Payload (HU-022): mínimo de testing.md para hooks.
        'src/hooks/**': { lines: 70, statements: 70, functions: 70, branches: 70 },
        // Resolución de URL a documento (HU-022): routing, mínimo de testing.md.
        'src/services/routing/**': { lines: 60, statements: 60, functions: 60, branches: 60 },
        // Plantillas: mismo mínimo que Bloques (criterio de HU-017).
        'src/components/**': {
          lines: 80,
          statements: 80,
          functions: 80,
          branches: 80,
        },
      },
    },
  },
});
