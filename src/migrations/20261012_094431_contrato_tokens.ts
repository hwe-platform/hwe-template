import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_accommodations_blocks_media_text_media_cards_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_layout" AS ENUM('media-left', 'media-right', 'media-split', 'stack-media-first', 'stack-text-first');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_media_type_secondary" AS ENUM('image', 'cards');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_icon_style" AS ENUM('outline', 'filled');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_items_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_accommodations_blocks_blog_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_blog_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_accommodations_blocks_map_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_rich_text_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_cta_background" AS ENUM('default', 'muted', 'accent', 'secondary', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_cta_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_hero_cta_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_hero_cta_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_hero_slides_cta_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_hero_slides_cta_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media_cards_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_pages_blocks_media_text_layout" AS ENUM('media-left', 'media-right', 'media-split', 'stack-media-first', 'stack-text-first');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media_type_secondary" AS ENUM('image', 'cards');
  CREATE TYPE "public"."enum_pages_blocks_media_text_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_icon_style" AS ENUM('outline', 'filled');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_items_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_blog_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_blog_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_gallery_heading_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_map_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('default', 'muted', 'accent', 'secondary', 'none');
  CREATE TYPE "public"."enum_pages_blocks_cta_heading_level" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_hero_height" AS ENUM('standard', 'tall', 'viewport');
  CREATE TYPE "public"."enum_header_top_bar_booking_button_target" AS ENUM('_self', '_blank');
  ALTER TYPE "public"."enum_accommodations_blocks_media_text_media" ADD VALUE 'cards';
  ALTER TYPE "public"."enum_accommodations_blocks_media_text_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_media_text_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_icon_grid_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_icon_grid_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_card_grid_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_card_grid_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_blog_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_blog_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_gallery_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_gallery_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_map_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_accommodations_blocks_map_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_media_text_media" ADD VALUE 'cards';
  ALTER TYPE "public"."enum_pages_blocks_media_text_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_media_text_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_icon_grid_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_icon_grid_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_blog_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_blog_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_gallery_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_gallery_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_map_background" ADD VALUE 'accent' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_blocks_map_background" ADD VALUE 'secondary' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_hero_variant" ADD VALUE 'slider' BEFORE 'none';
  ALTER TYPE "public"."enum_pages_hero_title_mode" ADD VALUE 'both';
  CREATE TABLE "accommodations_blocks_media_text_media_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_accommodations_blocks_media_text_media_cards_icon",
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "accommodations_blocks_media_text_media_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_hero_cta_variant" DEFAULT 'primary',
  	"icon" "enum_pages_hero_cta_icon"
  );
  
  CREATE TABLE "pages_hero_cta_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_slides_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"variant" "enum_pages_hero_slides_cta_variant" DEFAULT 'primary',
  	"icon" "enum_pages_hero_slides_cta_icon"
  );
  
  CREATE TABLE "pages_hero_slides_cta_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_hero_slides_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_text_media_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_media_text_media_cards_icon",
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_media_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "heading_level" DROP DEFAULT;
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "heading_level" DROP DEFAULT;
  ALTER TABLE "site_config" ALTER COLUMN "general_logo_id" DROP NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "general_logo_inverted_id" DROP NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "contact_postal_code" DROP NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "contact_country" DROP NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "location_latitude" DROP NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "location_longitude" DROP NOT NULL;
  ALTER TABLE "site_config_locales" ALTER COLUMN "general_site_description" DROP NOT NULL;
  ALTER TABLE "site_config_locales" ALTER COLUMN "general_opening_dates" DROP NOT NULL;
  ALTER TABLE "header_locales" ALTER COLUMN "top_bar_booking_button_label" DROP NOT NULL;
  ALTER TABLE "footer_locales" ALTER COLUMN "copyright" DROP NOT NULL;
  ALTER TABLE "accommodations_blocks_media_text" ADD COLUMN "layout" "enum_accommodations_blocks_media_text_layout" DEFAULT 'media-left';
  ALTER TABLE "accommodations_blocks_media_text" ADD COLUMN "media_type_secondary" "enum_accommodations_blocks_media_text_media_type_secondary";
  ALTER TABLE "accommodations_blocks_media_text" ADD COLUMN "media_secondary_id" integer;
  ALTER TABLE "accommodations_blocks_media_text" ADD COLUMN "heading_level" "enum_accommodations_blocks_media_text_heading_level";
  ALTER TABLE "accommodations_blocks_icon_grid" ADD COLUMN "heading_level" "enum_accommodations_blocks_icon_grid_heading_level";
  ALTER TABLE "accommodations_blocks_icon_grid" ADD COLUMN "icon_style" "enum_accommodations_blocks_icon_grid_icon_style" DEFAULT 'outline';
  ALTER TABLE "accommodations_blocks_icon_grid" ADD COLUMN "heading_align" "enum_accommodations_blocks_icon_grid_heading_align" DEFAULT 'left';
  ALTER TABLE "accommodations_blocks_card_grid_items" ADD COLUMN "icon" "enum_accommodations_blocks_card_grid_items_icon";
  ALTER TABLE "accommodations_blocks_card_grid" ADD COLUMN "heading_level" "enum_accommodations_blocks_card_grid_heading_level";
  ALTER TABLE "accommodations_blocks_card_grid" ADD COLUMN "heading_align" "enum_accommodations_blocks_card_grid_heading_align" DEFAULT 'left';
  ALTER TABLE "accommodations_blocks_blog" ADD COLUMN "heading_level" "enum_accommodations_blocks_blog_heading_level";
  ALTER TABLE "accommodations_blocks_blog" ADD COLUMN "heading_align" "enum_accommodations_blocks_blog_heading_align" DEFAULT 'left';
  ALTER TABLE "accommodations_blocks_gallery" ADD COLUMN "heading_align" "enum_accommodations_blocks_gallery_heading_align" DEFAULT 'left';
  ALTER TABLE "accommodations_blocks_map" ADD COLUMN "heading_level" "enum_accommodations_blocks_map_heading_level";
  ALTER TABLE "accommodations_blocks_rich_text" ADD COLUMN "heading_level" "enum_accommodations_blocks_rich_text_heading_level";
  ALTER TABLE "accommodations_blocks_cta" ADD COLUMN "background" "enum_accommodations_blocks_cta_background" DEFAULT 'none';
  ALTER TABLE "accommodations_blocks_cta" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "accommodations_blocks_cta" ADD COLUMN "heading_level" "enum_accommodations_blocks_cta_heading_level";
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "layout" "enum_pages_blocks_media_text_layout" DEFAULT 'media-left';
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "media_type_secondary" "enum_pages_blocks_media_text_media_type_secondary";
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "media_secondary_id" integer;
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "heading_level" "enum_pages_blocks_media_text_heading_level";
  ALTER TABLE "pages_blocks_icon_grid" ADD COLUMN "heading_level" "enum_pages_blocks_icon_grid_heading_level";
  ALTER TABLE "pages_blocks_icon_grid" ADD COLUMN "icon_style" "enum_pages_blocks_icon_grid_icon_style" DEFAULT 'outline';
  ALTER TABLE "pages_blocks_icon_grid" ADD COLUMN "heading_align" "enum_pages_blocks_icon_grid_heading_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_card_grid_items" ADD COLUMN "icon" "enum_pages_blocks_card_grid_items_icon";
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "heading_level" "enum_pages_blocks_card_grid_heading_level";
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "heading_align" "enum_pages_blocks_card_grid_heading_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "heading_level" "enum_pages_blocks_blog_heading_level";
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "heading_align" "enum_pages_blocks_blog_heading_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "heading_align" "enum_pages_blocks_gallery_heading_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_map" ADD COLUMN "heading_level" "enum_pages_blocks_map_heading_level";
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "heading_level" "enum_pages_blocks_rich_text_heading_level";
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "background" "enum_pages_blocks_cta_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "heading_level" "enum_pages_blocks_cta_heading_level";
  ALTER TABLE "pages" ADD COLUMN "hero_height" "enum_pages_hero_height" DEFAULT 'standard';
  ALTER TABLE "pages" ADD COLUMN "hero_show_as_heading" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "top_bar_booking_button_url" varchar;
  ALTER TABLE "header" ADD COLUMN "top_bar_booking_button_target" "enum_header_top_bar_booking_button_target";
  ALTER TABLE "accommodations_blocks_media_text_media_cards" ADD CONSTRAINT "accommodations_blocks_media_text_media_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text_media_cards" ADD CONSTRAINT "accommodations_blocks_media_text_media_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text_media_cards_locales" ADD CONSTRAINT "accommodations_blocks_media_text_media_cards_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_media_text_media_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_cta" ADD CONSTRAINT "pages_hero_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_cta_locales" ADD CONSTRAINT "pages_hero_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_slides_cta" ADD CONSTRAINT "pages_hero_slides_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_slides_cta_locales" ADD CONSTRAINT "pages_hero_slides_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_slides_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_slides_locales" ADD CONSTRAINT "pages_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_media_cards" ADD CONSTRAINT "pages_blocks_media_text_media_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_media_cards" ADD CONSTRAINT "pages_blocks_media_text_media_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_media_cards_locales" ADD CONSTRAINT "pages_blocks_media_text_media_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text_media_cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accommodations_blocks_media_text_media_cards_order_idx" ON "accommodations_blocks_media_text_media_cards" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_media_text_media_cards_parent_id_idx" ON "accommodations_blocks_media_text_media_cards" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_media_text_media_cards_image_idx" ON "accommodations_blocks_media_text_media_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "accommodations_blocks_media_text_media_cards_locales_locale_" ON "accommodations_blocks_media_text_media_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_cta_order_idx" ON "pages_hero_cta" USING btree ("_order");
  CREATE INDEX "pages_hero_cta_parent_id_idx" ON "pages_hero_cta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_cta_locales_locale_parent_id_unique" ON "pages_hero_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_slides_cta_order_idx" ON "pages_hero_slides_cta" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_cta_parent_id_idx" ON "pages_hero_slides_cta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_hero_slides_cta_locales_locale_parent_id_unique" ON "pages_hero_slides_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_hero_slides_order_idx" ON "pages_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_parent_id_idx" ON "pages_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_slides_media_idx" ON "pages_hero_slides" USING btree ("media_id");
  CREATE UNIQUE INDEX "pages_hero_slides_locales_locale_parent_id_unique" ON "pages_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_text_media_cards_order_idx" ON "pages_blocks_media_text_media_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_media_cards_parent_id_idx" ON "pages_blocks_media_text_media_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_media_cards_image_idx" ON "pages_blocks_media_text_media_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_media_text_media_cards_locales_locale_parent_id" ON "pages_blocks_media_text_media_cards_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "accommodations_blocks_media_text" ADD CONSTRAINT "accommodations_blocks_media_text_media_secondary_id_media_id_fk" FOREIGN KEY ("media_secondary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_cta" ADD CONSTRAINT "accommodations_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_media_secondary_id_media_id_fk" FOREIGN KEY ("media_secondary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "accommodations_blocks_media_text_media_secondary_idx" ON "accommodations_blocks_media_text" USING btree ("media_secondary_id");
  CREATE INDEX "accommodations_blocks_cta_background_image_idx" ON "accommodations_blocks_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_media_text_media_secondary_idx" ON "pages_blocks_media_text" USING btree ("media_secondary_id");
  CREATE INDEX "pages_blocks_cta_background_image_idx" ON "pages_blocks_cta" USING btree ("background_image_id");
  -- Datos: reverse pasa a layout antes de borrar la columna.
  UPDATE "accommodations_blocks_media_text" SET "layout" = CASE WHEN "reverse" THEN 'media-right' ELSE 'media-left' END::"enum_accommodations_blocks_media_text_layout";
  UPDATE "pages_blocks_media_text" SET "layout" = CASE WHEN "reverse" THEN 'media-right' ELSE 'media-left' END::"enum_pages_blocks_media_text_layout";
  ALTER TABLE "accommodations_blocks_media_text" DROP COLUMN "reverse";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "reverse";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "accommodations_blocks_media_text" ADD COLUMN "reverse" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_media_text" ADD COLUMN "reverse" boolean DEFAULT false;
  UPDATE "accommodations_blocks_media_text" SET "reverse" = ("layout" = 'media-right');
  UPDATE "pages_blocks_media_text" SET "reverse" = ("layout" = 'media-right');
   ALTER TABLE "accommodations_blocks_media_text_media_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accommodations_blocks_media_text_media_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_slides_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_slides_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_text_media_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_text_media_cards_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accommodations_blocks_media_text_media_cards" CASCADE;
  DROP TABLE "accommodations_blocks_media_text_media_cards_locales" CASCADE;
  DROP TABLE "pages_hero_cta" CASCADE;
  DROP TABLE "pages_hero_cta_locales" CASCADE;
  DROP TABLE "pages_hero_slides_cta" CASCADE;
  DROP TABLE "pages_hero_slides_cta_locales" CASCADE;
  DROP TABLE "pages_hero_slides" CASCADE;
  DROP TABLE "pages_hero_slides_locales" CASCADE;
  DROP TABLE "pages_blocks_media_text_media_cards" CASCADE;
  DROP TABLE "pages_blocks_media_text_media_cards_locales" CASCADE;
  ALTER TABLE "accommodations_blocks_media_text" DROP CONSTRAINT "accommodations_blocks_media_text_media_secondary_id_media_id_fk";
  
  ALTER TABLE "accommodations_blocks_cta" DROP CONSTRAINT "accommodations_blocks_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_media_text" DROP CONSTRAINT "pages_blocks_media_text_media_secondary_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_cta" DROP CONSTRAINT "pages_blocks_cta_background_image_id_media_id_fk";
  
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "media" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "media" SET DEFAULT 'image'::text;
  DROP TYPE "public"."enum_accommodations_blocks_media_text_media";
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_media" AS ENUM('image', 'embed', 'carousel');
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "media" SET DEFAULT 'image'::"public"."enum_accommodations_blocks_media_text_media";
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "media" SET DATA TYPE "public"."enum_accommodations_blocks_media_text_media" USING "media"::"public"."enum_accommodations_blocks_media_text_media";
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_media_text_background";
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_media_text_background";
  ALTER TABLE "accommodations_blocks_media_text" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_media_text_background" USING "background"::"public"."enum_accommodations_blocks_media_text_background";
  ALTER TABLE "accommodations_blocks_icon_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_icon_grid" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_background";
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_icon_grid" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_icon_grid_background";
  ALTER TABLE "accommodations_blocks_icon_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_icon_grid_background" USING "background"::"public"."enum_accommodations_blocks_icon_grid_background";
  ALTER TABLE "accommodations_blocks_card_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_card_grid" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_background";
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_card_grid" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_card_grid_background";
  ALTER TABLE "accommodations_blocks_card_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_card_grid_background" USING "background"::"public"."enum_accommodations_blocks_card_grid_background";
  ALTER TABLE "accommodations_blocks_blog" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_blog" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_blog_background";
  CREATE TYPE "public"."enum_accommodations_blocks_blog_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_blog" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_blog_background";
  ALTER TABLE "accommodations_blocks_blog" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_blog_background" USING "background"::"public"."enum_accommodations_blocks_blog_background";
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_gallery_background";
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_gallery_background";
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_gallery_background" USING "background"::"public"."enum_accommodations_blocks_gallery_background";
  ALTER TABLE "accommodations_blocks_map" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "accommodations_blocks_map" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_accommodations_blocks_map_background";
  CREATE TYPE "public"."enum_accommodations_blocks_map_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "accommodations_blocks_map" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_accommodations_blocks_map_background";
  ALTER TABLE "accommodations_blocks_map" ALTER COLUMN "background" SET DATA TYPE "public"."enum_accommodations_blocks_map_background" USING "background"::"public"."enum_accommodations_blocks_map_background";
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "media" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "media" SET DEFAULT 'image'::text;
  DROP TYPE "public"."enum_pages_blocks_media_text_media";
  CREATE TYPE "public"."enum_pages_blocks_media_text_media" AS ENUM('image', 'embed', 'carousel');
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "media" SET DEFAULT 'image'::"public"."enum_pages_blocks_media_text_media";
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "media" SET DATA TYPE "public"."enum_pages_blocks_media_text_media" USING "media"::"public"."enum_pages_blocks_media_text_media";
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_media_text_background";
  CREATE TYPE "public"."enum_pages_blocks_media_text_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_media_text_background";
  ALTER TABLE "pages_blocks_media_text" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_media_text_background" USING "background"::"public"."enum_pages_blocks_media_text_background";
  ALTER TABLE "pages_blocks_icon_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_icon_grid" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_icon_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_icon_grid" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_icon_grid_background";
  ALTER TABLE "pages_blocks_icon_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_icon_grid_background" USING "background"::"public"."enum_pages_blocks_icon_grid_background";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_card_grid_background";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_card_grid_background" USING "background"::"public"."enum_pages_blocks_card_grid_background";
  ALTER TABLE "pages_blocks_blog" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_blog" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_blog_background";
  CREATE TYPE "public"."enum_pages_blocks_blog_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_blog" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_blog_background";
  ALTER TABLE "pages_blocks_blog" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_blog_background" USING "background"::"public"."enum_pages_blocks_blog_background";
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_gallery_background";
  CREATE TYPE "public"."enum_pages_blocks_gallery_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_gallery_background";
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_gallery_background" USING "background"::"public"."enum_pages_blocks_gallery_background";
  ALTER TABLE "pages_blocks_map" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_map" ALTER COLUMN "background" SET DEFAULT 'default'::text;
  DROP TYPE "public"."enum_pages_blocks_map_background";
  CREATE TYPE "public"."enum_pages_blocks_map_background" AS ENUM('default', 'muted', 'none');
  ALTER TABLE "pages_blocks_map" ALTER COLUMN "background" SET DEFAULT 'default'::"public"."enum_pages_blocks_map_background";
  ALTER TABLE "pages_blocks_map" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_map_background" USING "background"::"public"."enum_pages_blocks_map_background";
  ALTER TABLE "pages" ALTER COLUMN "hero_variant" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_variant" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_pages_hero_variant";
  CREATE TYPE "public"."enum_pages_hero_variant" AS ENUM('video', 'image', 'minimal', 'none');
  ALTER TABLE "pages" ALTER COLUMN "hero_variant" SET DEFAULT 'none'::"public"."enum_pages_hero_variant";
  ALTER TABLE "pages" ALTER COLUMN "hero_variant" SET DATA TYPE "public"."enum_pages_hero_variant" USING "hero_variant"::"public"."enum_pages_hero_variant";
  ALTER TABLE "pages" ALTER COLUMN "hero_title_mode" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_title_mode" SET DEFAULT 'text'::text;
  DROP TYPE "public"."enum_pages_hero_title_mode";
  CREATE TYPE "public"."enum_pages_hero_title_mode" AS ENUM('text', 'logo');
  ALTER TABLE "pages" ALTER COLUMN "hero_title_mode" SET DEFAULT 'text'::"public"."enum_pages_hero_title_mode";
  ALTER TABLE "pages" ALTER COLUMN "hero_title_mode" SET DATA TYPE "public"."enum_pages_hero_title_mode" USING "hero_title_mode"::"public"."enum_pages_hero_title_mode";
  DROP INDEX "accommodations_blocks_media_text_media_secondary_idx";
  DROP INDEX "accommodations_blocks_cta_background_image_idx";
  DROP INDEX "pages_blocks_media_text_media_secondary_idx";
  DROP INDEX "pages_blocks_cta_background_image_idx";
  ALTER TABLE "accommodations_blocks_gallery" ALTER COLUMN "heading_level" SET DEFAULT '2';
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "heading_level" SET DEFAULT '2';
  ALTER TABLE "site_config" ALTER COLUMN "general_logo_id" SET NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "general_logo_inverted_id" SET NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "contact_postal_code" SET NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "contact_country" SET NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "location_latitude" SET NOT NULL;
  ALTER TABLE "site_config" ALTER COLUMN "location_longitude" SET NOT NULL;
  ALTER TABLE "site_config_locales" ALTER COLUMN "general_site_description" SET NOT NULL;
  ALTER TABLE "site_config_locales" ALTER COLUMN "general_opening_dates" SET NOT NULL;
  ALTER TABLE "header_locales" ALTER COLUMN "top_bar_booking_button_label" SET NOT NULL;
  ALTER TABLE "footer_locales" ALTER COLUMN "copyright" SET NOT NULL;
  ALTER TABLE "accommodations_blocks_media_text" DROP COLUMN "layout";
  ALTER TABLE "accommodations_blocks_media_text" DROP COLUMN "media_type_secondary";
  ALTER TABLE "accommodations_blocks_media_text" DROP COLUMN "media_secondary_id";
  ALTER TABLE "accommodations_blocks_media_text" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_icon_grid" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_icon_grid" DROP COLUMN "icon_style";
  ALTER TABLE "accommodations_blocks_icon_grid" DROP COLUMN "heading_align";
  ALTER TABLE "accommodations_blocks_card_grid_items" DROP COLUMN "icon";
  ALTER TABLE "accommodations_blocks_card_grid" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_card_grid" DROP COLUMN "heading_align";
  ALTER TABLE "accommodations_blocks_blog" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_blog" DROP COLUMN "heading_align";
  ALTER TABLE "accommodations_blocks_gallery" DROP COLUMN "heading_align";
  ALTER TABLE "accommodations_blocks_map" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_rich_text" DROP COLUMN "heading_level";
  ALTER TABLE "accommodations_blocks_cta" DROP COLUMN "background";
  ALTER TABLE "accommodations_blocks_cta" DROP COLUMN "background_image_id";
  ALTER TABLE "accommodations_blocks_cta" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "media_type_secondary";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "media_secondary_id";
  ALTER TABLE "pages_blocks_media_text" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_icon_grid" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_icon_grid" DROP COLUMN "icon_style";
  ALTER TABLE "pages_blocks_icon_grid" DROP COLUMN "heading_align";
  ALTER TABLE "pages_blocks_card_grid_items" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "heading_align";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "heading_align";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "heading_align";
  ALTER TABLE "pages_blocks_map" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "heading_level";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "heading_level";
  ALTER TABLE "pages" DROP COLUMN "hero_height";
  ALTER TABLE "pages" DROP COLUMN "hero_show_as_heading";
  ALTER TABLE "header" DROP COLUMN "top_bar_booking_button_url";
  ALTER TABLE "header" DROP COLUMN "top_bar_booking_button_target";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_media_cards_icon";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_layout";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_media_type_secondary";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_icon_style";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_heading_align";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_items_icon";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_heading_align";
  DROP TYPE "public"."enum_accommodations_blocks_blog_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_blog_heading_align";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_heading_align";
  DROP TYPE "public"."enum_accommodations_blocks_map_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_rich_text_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_cta_background";
  DROP TYPE "public"."enum_accommodations_blocks_cta_heading_level";
  DROP TYPE "public"."enum_pages_hero_cta_variant";
  DROP TYPE "public"."enum_pages_hero_cta_icon";
  DROP TYPE "public"."enum_pages_hero_slides_cta_variant";
  DROP TYPE "public"."enum_pages_hero_slides_cta_icon";
  DROP TYPE "public"."enum_pages_blocks_media_text_media_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_media_text_layout";
  DROP TYPE "public"."enum_pages_blocks_media_text_media_type_secondary";
  DROP TYPE "public"."enum_pages_blocks_media_text_heading_level";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_heading_level";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_icon_style";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_heading_align";
  DROP TYPE "public"."enum_pages_blocks_card_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_heading_level";
  DROP TYPE "public"."enum_pages_blocks_card_grid_heading_align";
  DROP TYPE "public"."enum_pages_blocks_blog_heading_level";
  DROP TYPE "public"."enum_pages_blocks_blog_heading_align";
  DROP TYPE "public"."enum_pages_blocks_gallery_heading_align";
  DROP TYPE "public"."enum_pages_blocks_map_heading_level";
  DROP TYPE "public"."enum_pages_blocks_rich_text_heading_level";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_blocks_cta_heading_level";
  DROP TYPE "public"."enum_pages_hero_height";
  DROP TYPE "public"."enum_header_top_bar_booking_button_target";`)
}
