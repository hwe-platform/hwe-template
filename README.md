# hwe-template

Punto de partida de cada site de cliente HWE: Next.js 16 + Payload 3 sobre
Postgres, con los bloques, primitivas y schemas de
[`@hwe-platform/core-ui`](https://github.com/hwe-platform/hwe-core) consumidos
como paquete npm desde GitHub Packages.

No trae contenido: la base de datos arranca vacía y el tema es neutro. Cada site
pone su marca, sus iconos y su contenido encima.

## Requisitos

- Node.js >= 20 y pnpm 9 (`corepack enable` lo activa con la versión de
  `packageManager`)
- Postgres 15+, local, en Docker o gestionado
- Un token de GitHub con permiso `read:packages` y acceso a la organización
  `hwe-platform`: GitHub Packages pide autenticación incluso para instalar

## Crear un site nuevo

1. Crea el repo del cliente desde este template («Use this template» en GitHub)
   y clónalo.

2. Pon el token para que pnpm pueda descargar `@hwe-platform/core-ui`
   (`.npmrc` lo lee de la variable, nunca se escribe en el repo) e instala:

   ```bash
   export NODE_AUTH_TOKEN=ghp_...        # PowerShell: $env:NODE_AUTH_TOKEN = 'ghp_...'
   pnpm install                          # cmd: set NODE_AUTH_TOKEN=ghp_...
   ```

   Para no repetirlo en cada terminal, guárdalo como variable de usuario de
   Windows con `setx NODE_AUTH_TOKEN ghp_...`: lo heredan las terminales que abras
   después. Si `pnpm` no se reconoce, `corepack pnpm install`.

   Cómo crear el token, y qué hacer si la instalación falla:
   [core-ui en los sites](https://github.com/hwe-platform/hwe-tools/blob/main/docs/guias/core-ui-en-los-sites.md)
   en hwe-tools.

   El template trae su `pnpm-lock.yaml`, que fija las versiones exactas: se
   comitea con cada cambio de dependencias.

3. Copia `.env.example` a `.env` y rellena las obligatorias:

   ```bash
   cp .env.example .env
   ```

   | Variable                 | Qué es                                                                        |
   | ------------------------ | ----------------------------------------------------------------------------- |
   | `DATABASE_URI`           | Conexión a Postgres. Una base de datos propia por site                        |
   | `PAYLOAD_SECRET`         | Secreto para firmar los JWT de Payload. Uno distinto por entorno              |
   | `NEXT_PUBLIC_SERVER_URL` | URL pública sin barra final (`http://localhost:3000` en local)                |
   | `BLOB_READ_WRITE_TOKEN`  | Opcional. Storage de media en producción; el adapter llega con el deploy      |
   | `SMTP_*`                 | Opcionales. Sin `SMTP_HOST`, los emails del formulario se escriben en consola |

   Para generar `PAYLOAD_SECRET`:
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. Crea la base de datos vacía y aplica las migraciones:

   ```bash
   createdb mi-site
   # o con Docker:
   # docker run --name mi-site-postgres -e POSTGRES_PASSWORD=postgres \
   #   -e POSTGRES_DB=mi-site -p 5432:5432 -d postgres:16

   pnpm migrate
   ```

5. Arranca y crea el primer usuario del panel:

   ```bash
   pnpm dev
   ```

   Abre `http://localhost:3000/admin`: Payload pide crear el primer usuario
   mientras no haya ninguno. El frontend responde desde el primer momento, pero
   hasta que haya páginas y globals configurados solo devuelve 404 sin cabecera
   ni pie.

## Comandos

| Comando                   | Qué hace                                                            |
| ------------------------- | ------------------------------------------------------------------- |
| `pnpm dev`                | Next.js en modo desarrollo                                          |
| `pnpm build`              | Build de producción                                                 |
| `pnpm lint`               | ESLint                                                              |
| `pnpm format:check`       | Comprueba el formato con Prettier (`pnpm format` lo aplica)         |
| `pnpm typecheck`          | TypeScript sin emitir                                               |
| `pnpm test`               | Vitest (`pnpm test:coverage` con los umbrales de cobertura)         |
| `pnpm migrate`            | Aplica las migraciones pendientes                                   |
| `pnpm migrate:create <n>` | Genera una migración a partir de los cambios de colecciones/globals |
| `pnpm generate:types`     | Regenera `src/payload-types.ts`                                     |
| `pnpm generate:importmap` | Regenera `src/app/(payload)/admin/importMap.js`                     |

Antes de entregar un cambio:
`pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm build`.

## Personalizar el site

Lo que es de cada cliente vive en unos pocos puntos; el resto sale de core-ui.

| Qué                    | Dónde                                          | Nota                                                                               |
| ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| Colores, radios, botón | `src/styles/theme.css`                         | Cambia los valores, no los nombres: son el contrato con core-ui                    |
| Fuentes                | `src/app/(frontend)/layout.tsx`                | Se cargan con `next/font` y se enlazan en `--heading-font` / `--body-font`         |
| Iconos propios         | `src/icons/index.tsx`                          | Cada icono es un valor de enum en Postgres: después, `pnpm migrate:create`         |
| Adornos por instancia  | `src/slot-registry.tsx`                        | Se enganchan por el `slotId` que el editor pone en el bloque                       |
| Sustituir un bloque    | `src/block-registry.ts`                        | Misma clave que el de plataforma y gana                                            |
| Estilo de los widgets  | `src/styles/booking/*.css`                     | Overrides de THR y Mastercamping, por tokens                                       |
| Idiomas                | `src/payload.config.ts`, `i18n.ts`             | Mantén las dos listas a la par; los locales son enum de Postgres: `migrate:create` |
| Rótulos de la ficha    | `src/components/accommodation-detail/ficha.ts` | Textos de interfaz en el idioma del site                                           |

Todo cambio en colecciones, globals, iconos o idiomas cambia el esquema: genera
la migración con `pnpm migrate:create <nombre>` y comitéala junto al cambio.

## Actualizar `@hwe-platform/core-ui`

`package.json` declara el rango (`^0.x`) y `pnpm-lock.yaml` fija la versión
exacta que usa el site. Un cambio de core-ui solo llega aquí si en hwe-core se
subió su `version`: la CI se salta sin avisar las versiones ya publicadas (ver
la guía enlazada arriba). Para subirla:

```bash
pnpm update @hwe-platform/core-ui --latest
pnpm generate:types && pnpm build
```

Si la versión nueva cambia schemas, revisa también los configs de Payload
(`src/collections`, `src/globals`, `src/fields`): los tests de paridad
(`parity.test.ts`) avisan cuando divergen.

Para probar un cambio de core-ui que todavía no está publicado, enlaza tu copia
local de hwe-core (y deshazlo antes de comitear):

```bash
pnpm link ../hwe-core/packages/core-ui   # tras compilarla: pnpm --filter @hwe-platform/core-ui build
pnpm unlink @hwe-platform/core-ui && pnpm install
```

## Estructura

```
src/
  payload.config.ts      # Payload: colecciones, globals, idiomas, Postgres
  collections/           # colecciones, derivadas de los schemas Zod de core-ui
  globals/               # site-config, header, footer, banner
  fields/                # campos compartidos y bloques del editor
  hooks/                 # slug, validación y revalidación
  migrations/            # migraciones de Postgres (una inicial)
  services/              # JSON-LD, formulario de contacto, routing
  components/            # plantillas de página y ficha de alojamiento
  blocks/                # overrides de bloques de este site
  block-registry.ts      # registry de bloques: el de core-ui + overrides
  slot-registry.tsx      # contenido propio por instancia de bloque
  icons/                 # iconos propios del cliente
  styles/                # tema, Tailwind y overrides de widgets de reserva
  middleware.ts          # idioma por prefijo de URL
  app/
    (frontend)/          # sitio público: layout y catch-all [[...slug]]
    (payload)/           # panel y API de Payload
    api/contact/         # envío del formulario de contacto
```
