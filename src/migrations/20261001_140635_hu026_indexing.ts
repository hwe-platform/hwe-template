import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_config_indexing" AS ENUM('noindex', 'index');
  ALTER TABLE "site_config" ADD COLUMN "indexing" "enum_site_config_indexing" DEFAULT 'noindex' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_config" DROP COLUMN "indexing";
  DROP TYPE "public"."enum_site_config_indexing";`)
}
