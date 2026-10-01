import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Categories } from './collections/Categories';
import { Articles } from './collections/Articles';
import { Accommodations } from './collections/Accommodations';
import { Entities } from './collections/Entities';
import { Pages } from './collections/Pages';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { emailAdapter } from './email';
import { storagePlugins } from './storage';
import { SiteConfig } from './globals/SiteConfig';
import { Header } from './globals/Header';
import { Footer } from './globals/Footer';
import { Banner } from './globals/Banner';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Config base de Payload del site. Las colecciones de contenido y los
 * globals se derivan de los schemas Zod de @hwe-platform/core-ui (DEC-004).
 *
 * TODO (Hito 5): antes de extraer estas colecciones a core-ui hay que revisar
 * qué campos son base obligatorio y cuáles extensión por tipo de web (camping,
 * hotel, etc.). Ver src/collections/README.md.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      // Payload lo regeneraría solo en desarrollo, y sin `BLOB_READ_WRITE_TOKEN` (lo
      // normal en local) el adapter de Blob no está en el config: cada cambio en un
      // fichero de la configuración borraría del `importMap` el manejador de subida
      // directa, y al comitearlo los ficheros pesados volverían a cortarse en 4,5 MB
      // en producción. Se regenera a mano: ver el README.
      autoGenerate: false,
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Accommodations,
    Entities,
    Pages,
    Articles,
    ContactSubmissions,
  ],
  globals: [SiteConfig, Header, Footer, Banner],
  // SMTP solo con `SMTP_HOST`; sin él, Payload escribe los emails en consola.
  email: emailAdapter(),
  // Vercel Blob solo con `BLOB_READ_WRITE_TOKEN`; sin él, `media` va a disco (DEC-010).
  plugins: storagePlugins(),
  // Localización por campo, no por documento: un alojamiento es UN documento
  // con los campos de texto traducidos (specs/payload/localizacion.md).
  // Tres idiomas de partida; cada cliente configura los suyos, los mantiene a
  // la par con `LOCALES` en i18n.ts y con site-config.languages.available, y
  // genera la migration correspondiente (los locales son un enum de Postgres).
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'fr',
    // Un visitante inglés ve el texto en francés antes que un hueco vacío.
    fallback: true,
  },
  editor: lexicalEditor(),
  // Payload necesita sharp para generar los tamaños de imagen de `media`.
  // Sin él arranca igual, pero el upload no produce thumbnail/card/hero/og.
  sharp,
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Adapter genérico de Postgres (driver `pg`): sirve igual para Postgres
  // local, Docker o gestionado. Se descartó @payloadcms/db-vercel-postgres
  // porque arrastra el SDK de @vercel/postgres, que obliga a llamar la
  // variable de conexión POSTGRES_URL y falla en bucle silencioso sin ella.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),
});
