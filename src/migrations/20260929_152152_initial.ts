import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'en', 'es');
  CREATE TYPE "public"."enum_accommodations_equipment_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_accommodations_features_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_media" AS ENUM('image', 'embed', 'carousel');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_align" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_ratio" AS ENUM('portrait', 'landscape', 'square');
  CREATE TYPE "public"."enum_accommodations_blocks_media_text_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_items_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_variant" AS ENUM('bare', 'card', 'equipment');
  CREATE TYPE "public"."enum_accommodations_blocks_icon_grid_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_items_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_card" AS ENUM('overlay', 'stacked');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_card_size" AS ENUM('default', 'compact');
  CREATE TYPE "public"."enum_accommodations_blocks_card_grid_source" AS ENUM('manual', 'accommodations', 'entities', 'articles');
  CREATE TYPE "public"."enum_accommodations_blocks_blog_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_accommodations_blocks_blog_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_blog_source" AS ENUM('latest', 'featured', 'byCategory');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_variant" AS ENUM('slider', 'slider-thumbs', 'grid', 'masonry', 'collage');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_aspect_ratio" AS ENUM('16/9', '4/3', '3/2', '1/1', 'auto');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_effect" AS ENUM('slide', 'fade');
  CREATE TYPE "public"."enum_accommodations_blocks_gallery_heading_level" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_accommodations_blocks_map_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_map_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_map_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_accommodations_blocks_map_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_accommodations_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_accommodations_blocks_cta_links_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_accommodations_blocks_booking_search_source" AS ENUM('manual', 'fromAccommodation');
  CREATE TYPE "public"."enum_accommodations_blocks_booking_search_accommodation_type" AS ENUM('all', 'emplacement', 'locatif');
  CREATE TYPE "public"."enum_accommodations_blocks_booking_simple_source" AS ENUM('manual', 'fromAccommodation');
  CREATE TYPE "public"."enum_accommodations_type" AS ENUM('emplacement', 'mobilhome', 'cottage', 'chalet', 'tente');
  CREATE TYPE "public"."enum_entities_schedule_periods_icon" AS ENUM('utensils', 'wine', 'clock');
  CREATE TYPE "public"."enum_entities_features_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_entities_ctas_variant" AS ENUM('primary', 'outline');
  CREATE TYPE "public"."enum_entities_type" AS ENUM('service', 'activity', 'restaurant', 'environment', 'event', 'custom');
  CREATE TYPE "public"."enum_entities_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_pages_blocks_media_text_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_media_text_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_media_text_media" AS ENUM('image', 'embed', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_media_text_align" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_pages_blocks_media_text_ratio" AS ENUM('portrait', 'landscape', 'square');
  CREATE TYPE "public"."enum_pages_blocks_media_text_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_items_icon" AS ENUM('utensils', 'bed', 'waves', 'mapPin', 'wifi', 'car', 'users', 'calendar', 'phone', 'mail', 'check', 'x', 'chevronRight', 'chevronLeft', 'chevronDown', 'arrowRight', 'star', 'heart', 'menu', 'search', 'pawPrint', 'help', 'video', 'user', 'train', 'plane', 'treePine', 'leaf', 'flame', 'bike', 'shoppingBag', 'refreshCcw', 'clock', 'accessibility', 'maximize2', 'wind', 'doorOpen', 'coffee', 'bath', 'tv', 'dog', 'fileText', 'download');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_variant" AS ENUM('bare', 'card', 'equipment');
  CREATE TYPE "public"."enum_pages_blocks_icon_grid_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_items_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card" AS ENUM('overlay', 'stacked');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card_size" AS ENUM('default', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_source" AS ENUM('manual', 'accommodations', 'entities', 'articles');
  CREATE TYPE "public"."enum_pages_blocks_blog_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_blog_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_blog_source" AS ENUM('latest', 'featured', 'byCategory');
  CREATE TYPE "public"."enum_pages_blocks_gallery_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_gallery_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_gallery_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_gallery_variant" AS ENUM('slider', 'slider-thumbs', 'grid', 'masonry', 'collage');
  CREATE TYPE "public"."enum_pages_blocks_gallery_aspect_ratio" AS ENUM('16/9', '4/3', '3/2', '1/1', 'auto');
  CREATE TYPE "public"."enum_pages_blocks_gallery_effect" AS ENUM('slide', 'fade');
  CREATE TYPE "public"."enum_pages_blocks_gallery_heading_level" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_map_ctas_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_map_ctas_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_map_heading_tone" AS ENUM('default', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_map_background" AS ENUM('default', 'muted', 'none');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline', 'ghost', 'link', 'link-underline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_icon" AS ENUM('arrowRight', 'chevronRight', 'calendar', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_booking_search_source" AS ENUM('manual', 'fromAccommodation');
  CREATE TYPE "public"."enum_pages_blocks_booking_search_accommodation_type" AS ENUM('all', 'emplacement', 'locatif');
  CREATE TYPE "public"."enum_pages_blocks_booking_simple_source" AS ENUM('manual', 'fromAccommodation');
  CREATE TYPE "public"."enum_pages_type" AS ENUM('home', 'landing', 'static', 'listing', 'contact', 'faq');
  CREATE TYPE "public"."enum_pages_hero_variant" AS ENUM('video', 'image', 'minimal', 'none');
  CREATE TYPE "public"."enum_pages_hero_title_mode" AS ENUM('text', 'logo');
  CREATE TYPE "public"."enum_pages_hero_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_site_config_location_transport_icon" AS ENUM('car', 'train', 'plane');
  CREATE TYPE "public"."enum_site_config_custom_code_position" AS ENUM('head', 'bodyStart', 'bodyEnd');
  CREATE TYPE "public"."enum_site_config_general_business_type" AS ENUM('campground', 'hotel', 'resort', 'guesthouse');
  CREATE TYPE "public"."enum_site_config_maps_provider" AS ENUM('osm', 'google');
  CREATE TYPE "public"."enum_site_config_languages_strategy" AS ENUM('prefix', 'domain');
  CREATE TYPE "public"."enum_site_config_booking_engine" AS ENUM('thr', 'mastercamping', 'witbooking', 'resalys', 'none');
  CREATE TYPE "public"."enum_site_config_booking_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_header_top_bar_links_icon" AS ENUM('help', 'phone', 'mail', 'video', 'user', 'custom');
  CREATE TYPE "public"."enum_footer_columns_type" AS ENUM('links', 'text', 'schedule', 'newsletter');
  CREATE TYPE "public"."enum_footer_columns_newsletter_provider" AS ENUM('mailchimp', 'sendinblue', 'custom');
  CREATE TYPE "public"."enum_banner_type" AS ENUM('info', 'warning', 'promo');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "accommodations_bedroom_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accommodations_bedroom_details_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_equipment" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_accommodations_equipment_icon",
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "accommodations_equipment_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "accommodations_documents_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_accommodations_features_icon"
  );
  
  CREATE TABLE "accommodations_features_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_personalization" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"segment" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_media_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_media_text_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_media_text_ctas_icon"
  );
  
  CREATE TABLE "accommodations_blocks_media_text_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_accommodations_blocks_media_text_media" DEFAULT 'image' NOT NULL,
  	"image_id" integer,
  	"embed_url" varchar,
  	"split" numeric DEFAULT 6,
  	"reverse" boolean DEFAULT false,
  	"eyebrow_rule" boolean DEFAULT false,
  	"align" "enum_accommodations_blocks_media_text_align" DEFAULT 'center',
  	"ratio" "enum_accommodations_blocks_media_text_ratio" DEFAULT 'landscape',
  	"background" "enum_accommodations_blocks_media_text_background" DEFAULT 'default',
  	"slot_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_media_text_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"title_accent" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_icon_grid_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_icon_grid_ctas_icon"
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_accommodations_blocks_icon_grid_items_icon",
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid_items_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_accommodations_blocks_icon_grid_heading_tone" DEFAULT 'default',
  	"columns" numeric DEFAULT 3,
  	"variant" "enum_accommodations_blocks_icon_grid_variant" DEFAULT 'bare',
  	"background" "enum_accommodations_blocks_icon_grid_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_icon_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_card_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"date" varchar,
  	"variant" "enum_accommodations_blocks_card_grid_items_variant" DEFAULT 'link'
  );
  
  CREATE TABLE "accommodations_blocks_card_grid_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"tag" varchar,
  	"read_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_card_grid_ctas_icon"
  );
  
  CREATE TABLE "accommodations_blocks_card_grid_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_accommodations_blocks_card_grid_heading_tone" DEFAULT 'default',
  	"background" "enum_accommodations_blocks_card_grid_background" DEFAULT 'default',
  	"card" "enum_accommodations_blocks_card_grid_card" DEFAULT 'stacked' NOT NULL,
  	"card_size" "enum_accommodations_blocks_card_grid_card_size" DEFAULT 'default',
  	"columns" numeric DEFAULT 3,
  	"source" "enum_accommodations_blocks_card_grid_source" DEFAULT 'manual',
  	"source_config_category" varchar,
  	"source_config_limit" numeric,
  	"source_config_featured" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_card_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_accommodations_blocks_blog_heading_tone" DEFAULT 'default',
  	"background" "enum_accommodations_blocks_blog_background" DEFAULT 'default',
  	"source" "enum_accommodations_blocks_blog_source" DEFAULT 'latest' NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"show_excerpt" boolean DEFAULT false,
  	"show_more_link" boolean DEFAULT false,
  	"show_more_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_blog_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"category" varchar,
  	"show_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_gallery_images_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_gallery_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_gallery_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_gallery_ctas_icon"
  );
  
  CREATE TABLE "accommodations_blocks_gallery_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_accommodations_blocks_gallery_background" DEFAULT 'default',
  	"variant" "enum_accommodations_blocks_gallery_variant" DEFAULT 'slider',
  	"columns" numeric DEFAULT 3,
  	"aspect_ratio" "enum_accommodations_blocks_gallery_aspect_ratio" DEFAULT '16/9',
  	"lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_delay" numeric DEFAULT 3000,
  	"loop" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"show_arrows" boolean DEFAULT true,
  	"effect" "enum_accommodations_blocks_gallery_effect" DEFAULT 'slide',
  	"slides_per_view" numeric DEFAULT 1,
  	"heading_level" "enum_accommodations_blocks_gallery_heading_level" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_gallery_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_map_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_map_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_map_ctas_icon"
  );
  
  CREATE TABLE "accommodations_blocks_map_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_accommodations_blocks_map_heading_tone" DEFAULT 'default',
  	"background" "enum_accommodations_blocks_map_background" DEFAULT 'default',
  	"show_address" boolean DEFAULT true,
  	"show_transport" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_rich_text_locales" (
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_accommodations_blocks_cta_links_variant" DEFAULT 'primary',
  	"icon" "enum_accommodations_blocks_cta_links_icon"
  );
  
  CREATE TABLE "accommodations_blocks_cta_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_cta_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_booking_search" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_accommodations_blocks_booking_search_source" DEFAULT 'manual',
  	"accommodation_type" "enum_accommodations_blocks_booking_search_accommodation_type" DEFAULT 'all',
  	"debug" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_booking_search_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_booking_favorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" numeric DEFAULT 6,
  	"quantity_to_show" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_booking_favorites_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_blocks_booking_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_accommodations_blocks_booking_simple_source" DEFAULT 'manual',
  	"show_picture" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "accommodations_blocks_booking_simple_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_accommodations_type" NOT NULL,
  	"specs_capacity" numeric NOT NULL,
  	"specs_bedrooms" numeric NOT NULL,
  	"specs_surface" numeric NOT NULL,
  	"specs_has_a_c" boolean DEFAULT false,
  	"specs_pet_friendly" boolean DEFAULT false,
  	"pricing_from" numeric,
  	"pricing_currency" varchar DEFAULT 'EUR',
  	"media_main_image_id" integer NOT NULL,
  	"media_floor_plan_id" integer,
  	"media_video" varchar,
  	"category_id" integer NOT NULL,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"booking_external_id" varchar,
  	"booking_bookable" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "accommodations_locales" (
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"subtype" varchar,
  	"short_description" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"pricing_price_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "accommodations_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "accommodations_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "accommodations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"accommodations_id" integer
  );
  
  CREATE TABLE "entities_schedule_periods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_entities_schedule_periods_icon" NOT NULL
  );
  
  CREATE TABLE "entities_schedule_periods_locales" (
  	"label" varchar NOT NULL,
  	"hours" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "entities_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_entities_features_icon" NOT NULL
  );
  
  CREATE TABLE "entities_features_locales" (
  	"label" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "entities_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_entities_ctas_variant" NOT NULL
  );
  
  CREATE TABLE "entities_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "entities_personalization" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"segment" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "entities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_entities_type" NOT NULL,
  	"icon" "enum_entities_icon" NOT NULL,
  	"image_id" integer NOT NULL,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"has_own_page" boolean DEFAULT false,
  	"category_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entities_locales" (
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"short_description" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"tag" varchar,
  	"schedule_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "entities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_media_text_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_media_text_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_media_text_ctas_icon"
  );
  
  CREATE TABLE "pages_blocks_media_text_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media" "enum_pages_blocks_media_text_media" DEFAULT 'image' NOT NULL,
  	"image_id" integer,
  	"embed_url" varchar,
  	"split" numeric DEFAULT 6,
  	"reverse" boolean DEFAULT false,
  	"eyebrow_rule" boolean DEFAULT false,
  	"align" "enum_pages_blocks_media_text_align" DEFAULT 'center',
  	"ratio" "enum_pages_blocks_media_text_ratio" DEFAULT 'landscape',
  	"background" "enum_pages_blocks_media_text_background" DEFAULT 'default',
  	"slot_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_text_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"title_accent" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_icon_grid_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_icon_grid_ctas_icon"
  );
  
  CREATE TABLE "pages_blocks_icon_grid_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_icon_grid_items_icon",
  	"included" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_icon_grid_items_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_pages_blocks_icon_grid_heading_tone" DEFAULT 'default',
  	"columns" numeric DEFAULT 3,
  	"variant" "enum_pages_blocks_icon_grid_variant" DEFAULT 'bare',
  	"background" "enum_pages_blocks_icon_grid_background" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"date" varchar,
  	"variant" "enum_pages_blocks_card_grid_items_variant" DEFAULT 'link'
  );
  
  CREATE TABLE "pages_blocks_card_grid_items_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"tag" varchar,
  	"read_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_card_grid_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_card_grid_ctas_icon"
  );
  
  CREATE TABLE "pages_blocks_card_grid_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_pages_blocks_card_grid_heading_tone" DEFAULT 'default',
  	"background" "enum_pages_blocks_card_grid_background" DEFAULT 'default',
  	"card" "enum_pages_blocks_card_grid_card" DEFAULT 'stacked' NOT NULL,
  	"card_size" "enum_pages_blocks_card_grid_card_size" DEFAULT 'default',
  	"columns" numeric DEFAULT 3,
  	"source" "enum_pages_blocks_card_grid_source" DEFAULT 'manual',
  	"source_config_category" varchar,
  	"source_config_limit" numeric,
  	"source_config_featured" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_pages_blocks_blog_heading_tone" DEFAULT 'default',
  	"background" "enum_pages_blocks_blog_background" DEFAULT 'default',
  	"source" "enum_pages_blocks_blog_source" DEFAULT 'latest' NOT NULL,
  	"limit" numeric DEFAULT 3,
  	"show_excerpt" boolean DEFAULT false,
  	"show_more_link" boolean DEFAULT false,
  	"show_more_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"category" varchar,
  	"show_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_images_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_gallery_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_gallery_ctas_icon"
  );
  
  CREATE TABLE "pages_blocks_gallery_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_gallery_background" DEFAULT 'default',
  	"variant" "enum_pages_blocks_gallery_variant" DEFAULT 'slider',
  	"columns" numeric DEFAULT 3,
  	"aspect_ratio" "enum_pages_blocks_gallery_aspect_ratio" DEFAULT '16/9',
  	"lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_delay" numeric DEFAULT 3000,
  	"loop" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"show_arrows" boolean DEFAULT true,
  	"effect" "enum_pages_blocks_gallery_effect" DEFAULT 'slide',
  	"slides_per_view" numeric DEFAULT 1,
  	"heading_level" "enum_pages_blocks_gallery_heading_level" DEFAULT '2',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_map_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_map_ctas_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_map_ctas_icon"
  );
  
  CREATE TABLE "pages_blocks_map_ctas_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_tone" "enum_pages_blocks_map_heading_tone" DEFAULT 'default',
  	"background" "enum_pages_blocks_map_background" DEFAULT 'default',
  	"show_address" boolean DEFAULT true,
  	"show_transport" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_cta_links_variant" DEFAULT 'primary',
  	"icon" "enum_pages_blocks_cta_links_icon"
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_booking_search" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_booking_search_source" DEFAULT 'manual',
  	"accommodation_type" "enum_pages_blocks_booking_search_accommodation_type" DEFAULT 'all',
  	"debug" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_booking_search_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_booking_favorites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quantity" numeric DEFAULT 6,
  	"quantity_to_show" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_booking_favorites_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_booking_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_booking_simple_source" DEFAULT 'manual',
  	"show_picture" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_booking_simple_locales" (
  	"widget_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_personalization" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"segment" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_pages_type" DEFAULT 'static' NOT NULL,
  	"parent_id" integer,
  	"hero_variant" "enum_pages_hero_variant" DEFAULT 'none' NOT NULL,
  	"hero_media_id" integer,
  	"hero_title_mode" "enum_pages_hero_title_mode" DEFAULT 'text',
  	"hero_align" "enum_pages_hero_align" DEFAULT 'left',
  	"hero_show_breadcrumbs" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_canonical_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_subtitle" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_numbers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"author" varchar,
  	"featured" boolean DEFAULT false,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"category" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"consent_at" timestamp(3) with time zone NOT NULL,
  	"ip_hash" varchar NOT NULL,
  	"email_sent" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"accommodations_id" integer,
  	"entities_id" integer,
  	"pages_id" integer,
  	"articles_id" integer,
  	"contact_submissions_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_config_location_transport" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_site_config_location_transport_icon" NOT NULL
  );
  
  CREATE TABLE "site_config_location_transport_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_contact_form_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_config_contact_form_subjects_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_languages_domain_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"locale" varchar,
  	"domain" varchar
  );
  
  CREATE TABLE "site_config_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_config_custom_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"position" "enum_site_config_custom_code_position" DEFAULT 'bodyEnd' NOT NULL,
  	"requires_consent" boolean DEFAULT false
  );
  
  CREATE TABLE "site_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"general_site_name" varchar NOT NULL,
  	"general_logo_id" integer NOT NULL,
  	"general_logo_inverted_id" integer NOT NULL,
  	"general_stars" numeric,
  	"general_business_type" "enum_site_config_general_business_type" DEFAULT 'campground' NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"contact_postal_code" varchar NOT NULL,
  	"contact_city" varchar NOT NULL,
  	"contact_country" varchar NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"location_latitude" numeric NOT NULL,
  	"location_longitude" numeric NOT NULL,
  	"maps_provider" "enum_site_config_maps_provider" DEFAULT 'osm' NOT NULL,
  	"maps_google_maps_api_key" varchar,
  	"maps_static_image_id" integer,
  	"maps_force_consent" boolean DEFAULT false,
  	"contact_form_privacy_policy_url" varchar DEFAULT '/rgpd' NOT NULL,
  	"contact_form_recipient" varchar,
  	"languages_default" varchar DEFAULT 'fr' NOT NULL,
  	"languages_prefix_default" boolean DEFAULT false NOT NULL,
  	"languages_strategy" "enum_site_config_languages_strategy" DEFAULT 'prefix' NOT NULL,
  	"social_instagram" varchar,
  	"social_facebook" varchar,
  	"social_youtube" varchar,
  	"social_linkedin" varchar,
  	"social_tiktok" varchar,
  	"social_instagram_handle" varchar,
  	"tracking_gtm_id" varchar,
  	"tracking_ga_id" varchar,
  	"tracking_meta_pixel_id" varchar,
  	"booking_engine" "enum_site_config_booking_engine" DEFAULT 'none' NOT NULL,
  	"booking_code_camping" varchar,
  	"booking_site_id" varchar,
  	"booking_features_favorites" boolean DEFAULT false,
  	"booking_features_simpleblock" boolean DEFAULT false,
  	"booking_id_property" numeric,
  	"booking_booking_url" varchar,
  	"booking_layout" "enum_site_config_booking_layout" DEFAULT 'horizontal',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_config_locales" (
  	"general_site_description" varchar NOT NULL,
  	"general_opening_dates" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_config_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "header_top_bar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_header_top_bar_links_icon" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_top_bar_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation_children_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"top_bar_show_login" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"top_bar_booking_button_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_columns_type" DEFAULT 'links' NOT NULL,
  	"newsletter_provider" "enum_footer_columns_newsletter_provider",
  	"newsletter_action_url" varchar
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"newsletter_description" varchar,
  	"newsletter_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"virtual_assistant_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"virtual_assistant_title" varchar,
  	"virtual_assistant_subtitle" varchar,
  	"virtual_assistant_placeholder" varchar,
  	"copyright" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "banner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"type" "enum_banner_type" DEFAULT 'info' NOT NULL,
  	"dismissible" boolean DEFAULT true,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "banner_locales" (
  	"message" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_bedroom_details" ADD CONSTRAINT "accommodations_bedroom_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_bedroom_details_locales" ADD CONSTRAINT "accommodations_bedroom_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_bedroom_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_equipment" ADD CONSTRAINT "accommodations_equipment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_equipment_locales" ADD CONSTRAINT "accommodations_equipment_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_equipment"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_documents" ADD CONSTRAINT "accommodations_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_documents" ADD CONSTRAINT "accommodations_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_documents_locales" ADD CONSTRAINT "accommodations_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_features" ADD CONSTRAINT "accommodations_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_features_locales" ADD CONSTRAINT "accommodations_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_personalization" ADD CONSTRAINT "accommodations_personalization_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_personalization" ADD CONSTRAINT "accommodations_personalization_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text_ctas" ADD CONSTRAINT "accommodations_blocks_media_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text_ctas_locales" ADD CONSTRAINT "accommodations_blocks_media_text_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_media_text_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text" ADD CONSTRAINT "accommodations_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text" ADD CONSTRAINT "accommodations_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_media_text_locales" ADD CONSTRAINT "accommodations_blocks_media_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid_ctas" ADD CONSTRAINT "accommodations_blocks_icon_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid_ctas_locales" ADD CONSTRAINT "accommodations_blocks_icon_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_icon_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid_items" ADD CONSTRAINT "accommodations_blocks_icon_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid_items_locales" ADD CONSTRAINT "accommodations_blocks_icon_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_icon_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid" ADD CONSTRAINT "accommodations_blocks_icon_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_icon_grid_locales" ADD CONSTRAINT "accommodations_blocks_icon_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_items" ADD CONSTRAINT "accommodations_blocks_card_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_items" ADD CONSTRAINT "accommodations_blocks_card_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_items_locales" ADD CONSTRAINT "accommodations_blocks_card_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_card_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_ctas" ADD CONSTRAINT "accommodations_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_ctas_locales" ADD CONSTRAINT "accommodations_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid" ADD CONSTRAINT "accommodations_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_card_grid_locales" ADD CONSTRAINT "accommodations_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_blog" ADD CONSTRAINT "accommodations_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_blog_locales" ADD CONSTRAINT "accommodations_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_images" ADD CONSTRAINT "accommodations_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_images" ADD CONSTRAINT "accommodations_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_images_locales" ADD CONSTRAINT "accommodations_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_ctas" ADD CONSTRAINT "accommodations_blocks_gallery_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_ctas_locales" ADD CONSTRAINT "accommodations_blocks_gallery_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_gallery_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery" ADD CONSTRAINT "accommodations_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_gallery_locales" ADD CONSTRAINT "accommodations_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_map_ctas" ADD CONSTRAINT "accommodations_blocks_map_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_map_ctas_locales" ADD CONSTRAINT "accommodations_blocks_map_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_map_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_map" ADD CONSTRAINT "accommodations_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_map_locales" ADD CONSTRAINT "accommodations_blocks_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_rich_text" ADD CONSTRAINT "accommodations_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_rich_text_locales" ADD CONSTRAINT "accommodations_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_cta_links" ADD CONSTRAINT "accommodations_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_cta_links_locales" ADD CONSTRAINT "accommodations_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_cta" ADD CONSTRAINT "accommodations_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_cta_locales" ADD CONSTRAINT "accommodations_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_search" ADD CONSTRAINT "accommodations_blocks_booking_search_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_search_locales" ADD CONSTRAINT "accommodations_blocks_booking_search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_booking_search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_favorites" ADD CONSTRAINT "accommodations_blocks_booking_favorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_favorites_locales" ADD CONSTRAINT "accommodations_blocks_booking_favorites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_booking_favorites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_simple" ADD CONSTRAINT "accommodations_blocks_booking_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_blocks_booking_simple_locales" ADD CONSTRAINT "accommodations_blocks_booking_simple_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations_blocks_booking_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_media_main_image_id_media_id_fk" FOREIGN KEY ("media_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_media_floor_plan_id_media_id_fk" FOREIGN KEY ("media_floor_plan_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accommodations_locales" ADD CONSTRAINT "accommodations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_texts" ADD CONSTRAINT "accommodations_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_numbers" ADD CONSTRAINT "accommodations_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_rels" ADD CONSTRAINT "accommodations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_rels" ADD CONSTRAINT "accommodations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accommodations_rels" ADD CONSTRAINT "accommodations_rels_accommodations_fk" FOREIGN KEY ("accommodations_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_schedule_periods" ADD CONSTRAINT "entities_schedule_periods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_schedule_periods_locales" ADD CONSTRAINT "entities_schedule_periods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities_schedule_periods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_features" ADD CONSTRAINT "entities_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_features_locales" ADD CONSTRAINT "entities_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_ctas" ADD CONSTRAINT "entities_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_ctas_locales" ADD CONSTRAINT "entities_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_personalization" ADD CONSTRAINT "entities_personalization_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entities_personalization" ADD CONSTRAINT "entities_personalization_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities" ADD CONSTRAINT "entities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entities" ADD CONSTRAINT "entities_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entities_locales" ADD CONSTRAINT "entities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_rels" ADD CONSTRAINT "entities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entities_rels" ADD CONSTRAINT "entities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_ctas" ADD CONSTRAINT "pages_blocks_media_text_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_ctas_locales" ADD CONSTRAINT "pages_blocks_media_text_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text" ADD CONSTRAINT "pages_blocks_media_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_text_locales" ADD CONSTRAINT "pages_blocks_media_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid_ctas" ADD CONSTRAINT "pages_blocks_icon_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid_ctas_locales" ADD CONSTRAINT "pages_blocks_icon_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid_items" ADD CONSTRAINT "pages_blocks_icon_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid_items_locales" ADD CONSTRAINT "pages_blocks_icon_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid" ADD CONSTRAINT "pages_blocks_icon_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_grid_locales" ADD CONSTRAINT "pages_blocks_icon_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_items" ADD CONSTRAINT "pages_blocks_card_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_items" ADD CONSTRAINT "pages_blocks_card_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_items_locales" ADD CONSTRAINT "pages_blocks_card_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_ctas" ADD CONSTRAINT "pages_blocks_card_grid_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_ctas_locales" ADD CONSTRAINT "pages_blocks_card_grid_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_locales" ADD CONSTRAINT "pages_blocks_card_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog" ADD CONSTRAINT "pages_blocks_blog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_locales" ADD CONSTRAINT "pages_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images_locales" ADD CONSTRAINT "pages_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_ctas" ADD CONSTRAINT "pages_blocks_gallery_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_ctas_locales" ADD CONSTRAINT "pages_blocks_gallery_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_ctas" ADD CONSTRAINT "pages_blocks_map_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_ctas_locales" ADD CONSTRAINT "pages_blocks_map_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_locales" ADD CONSTRAINT "pages_blocks_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_search" ADD CONSTRAINT "pages_blocks_booking_search_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_search_locales" ADD CONSTRAINT "pages_blocks_booking_search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking_search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_favorites" ADD CONSTRAINT "pages_blocks_booking_favorites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_favorites_locales" ADD CONSTRAINT "pages_blocks_booking_favorites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking_favorites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_simple" ADD CONSTRAINT "pages_blocks_booking_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_booking_simple_locales" ADD CONSTRAINT "pages_blocks_booking_simple_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_booking_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_personalization" ADD CONSTRAINT "pages_personalization_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_personalization" ADD CONSTRAINT "pages_personalization_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_numbers" ADD CONSTRAINT "pages_numbers_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accommodations_fk" FOREIGN KEY ("accommodations_id") REFERENCES "public"."accommodations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entities_fk" FOREIGN KEY ("entities_id") REFERENCES "public"."entities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_location_transport" ADD CONSTRAINT "site_config_location_transport_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_location_transport_locales" ADD CONSTRAINT "site_config_location_transport_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config_location_transport"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_contact_form_subjects" ADD CONSTRAINT "site_config_contact_form_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_contact_form_subjects_locales" ADD CONSTRAINT "site_config_contact_form_subjects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config_contact_form_subjects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_languages_domain_map" ADD CONSTRAINT "site_config_languages_domain_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_legal_links" ADD CONSTRAINT "site_config_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_custom_code" ADD CONSTRAINT "site_config_custom_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config" ADD CONSTRAINT "site_config_general_logo_id_media_id_fk" FOREIGN KEY ("general_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_config" ADD CONSTRAINT "site_config_general_logo_inverted_id_media_id_fk" FOREIGN KEY ("general_logo_inverted_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_config" ADD CONSTRAINT "site_config_maps_static_image_id_media_id_fk" FOREIGN KEY ("maps_static_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_config_locales" ADD CONSTRAINT "site_config_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_config_texts" ADD CONSTRAINT "site_config_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_top_bar_links" ADD CONSTRAINT "header_top_bar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_top_bar_links_locales" ADD CONSTRAINT "header_top_bar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_top_bar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_children" ADD CONSTRAINT "header_navigation_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_children_locales" ADD CONSTRAINT "header_navigation_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation" ADD CONSTRAINT "header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_partners" ADD CONSTRAINT "footer_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_partners" ADD CONSTRAINT "footer_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banner_locales" ADD CONSTRAINT "banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."banner"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_bedroom_details_order_idx" ON "accommodations_bedroom_details" USING btree ("_order");
  CREATE INDEX "accommodations_bedroom_details_parent_id_idx" ON "accommodations_bedroom_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_bedroom_details_locales_locale_parent_id_uniq" ON "accommodations_bedroom_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_equipment_order_idx" ON "accommodations_equipment" USING btree ("_order");
  CREATE INDEX "accommodations_equipment_parent_id_idx" ON "accommodations_equipment" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_equipment_locales_locale_parent_id_unique" ON "accommodations_equipment_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_documents_order_idx" ON "accommodations_documents" USING btree ("_order");
  CREATE INDEX "accommodations_documents_parent_id_idx" ON "accommodations_documents" USING btree ("_parent_id");
  CREATE INDEX "accommodations_documents_file_idx" ON "accommodations_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "accommodations_documents_locales_locale_parent_id_unique" ON "accommodations_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_features_order_idx" ON "accommodations_features" USING btree ("_order");
  CREATE INDEX "accommodations_features_parent_id_idx" ON "accommodations_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_features_locales_locale_parent_id_unique" ON "accommodations_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_personalization_order_idx" ON "accommodations_personalization" USING btree ("_order");
  CREATE INDEX "accommodations_personalization_parent_id_idx" ON "accommodations_personalization" USING btree ("_parent_id");
  CREATE INDEX "accommodations_personalization_image_idx" ON "accommodations_personalization" USING btree ("image_id");
  CREATE INDEX "accommodations_blocks_media_text_ctas_order_idx" ON "accommodations_blocks_media_text_ctas" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_media_text_ctas_parent_id_idx" ON "accommodations_blocks_media_text_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_media_text_ctas_locales_locale_parent_" ON "accommodations_blocks_media_text_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_media_text_order_idx" ON "accommodations_blocks_media_text" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_media_text_parent_id_idx" ON "accommodations_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_media_text_path_idx" ON "accommodations_blocks_media_text" USING btree ("_path");
  CREATE INDEX "accommodations_blocks_media_text_image_idx" ON "accommodations_blocks_media_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "accommodations_blocks_media_text_locales_locale_parent_id_un" ON "accommodations_blocks_media_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_icon_grid_ctas_order_idx" ON "accommodations_blocks_icon_grid_ctas" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_icon_grid_ctas_parent_id_idx" ON "accommodations_blocks_icon_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_icon_grid_ctas_locales_locale_parent_i" ON "accommodations_blocks_icon_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_icon_grid_items_order_idx" ON "accommodations_blocks_icon_grid_items" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_icon_grid_items_parent_id_idx" ON "accommodations_blocks_icon_grid_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_icon_grid_items_locales_locale_parent_" ON "accommodations_blocks_icon_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_icon_grid_order_idx" ON "accommodations_blocks_icon_grid" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_icon_grid_parent_id_idx" ON "accommodations_blocks_icon_grid" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_icon_grid_path_idx" ON "accommodations_blocks_icon_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_icon_grid_locales_locale_parent_id_uni" ON "accommodations_blocks_icon_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_card_grid_items_order_idx" ON "accommodations_blocks_card_grid_items" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_card_grid_items_parent_id_idx" ON "accommodations_blocks_card_grid_items" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_card_grid_items_image_idx" ON "accommodations_blocks_card_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "accommodations_blocks_card_grid_items_locales_locale_parent_" ON "accommodations_blocks_card_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_card_grid_ctas_order_idx" ON "accommodations_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_card_grid_ctas_parent_id_idx" ON "accommodations_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_card_grid_ctas_locales_locale_parent_i" ON "accommodations_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_card_grid_order_idx" ON "accommodations_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_card_grid_parent_id_idx" ON "accommodations_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_card_grid_path_idx" ON "accommodations_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_card_grid_locales_locale_parent_id_uni" ON "accommodations_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_blog_order_idx" ON "accommodations_blocks_blog" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_blog_parent_id_idx" ON "accommodations_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_blog_path_idx" ON "accommodations_blocks_blog" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_blog_locales_locale_parent_id_unique" ON "accommodations_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_gallery_images_order_idx" ON "accommodations_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_gallery_images_parent_id_idx" ON "accommodations_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_gallery_images_image_idx" ON "accommodations_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "accommodations_blocks_gallery_images_locales_locale_parent_i" ON "accommodations_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_gallery_ctas_order_idx" ON "accommodations_blocks_gallery_ctas" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_gallery_ctas_parent_id_idx" ON "accommodations_blocks_gallery_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_gallery_ctas_locales_locale_parent_id_" ON "accommodations_blocks_gallery_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_gallery_order_idx" ON "accommodations_blocks_gallery" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_gallery_parent_id_idx" ON "accommodations_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_gallery_path_idx" ON "accommodations_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_gallery_locales_locale_parent_id_uniqu" ON "accommodations_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_map_ctas_order_idx" ON "accommodations_blocks_map_ctas" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_map_ctas_parent_id_idx" ON "accommodations_blocks_map_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_map_ctas_locales_locale_parent_id_uniq" ON "accommodations_blocks_map_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_map_order_idx" ON "accommodations_blocks_map" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_map_parent_id_idx" ON "accommodations_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_map_path_idx" ON "accommodations_blocks_map" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_map_locales_locale_parent_id_unique" ON "accommodations_blocks_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_rich_text_order_idx" ON "accommodations_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_rich_text_parent_id_idx" ON "accommodations_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_rich_text_path_idx" ON "accommodations_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_rich_text_locales_locale_parent_id_uni" ON "accommodations_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_cta_links_order_idx" ON "accommodations_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_cta_links_parent_id_idx" ON "accommodations_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accommodations_blocks_cta_links_locales_locale_parent_id_uni" ON "accommodations_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_cta_order_idx" ON "accommodations_blocks_cta" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_cta_parent_id_idx" ON "accommodations_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_cta_path_idx" ON "accommodations_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_cta_locales_locale_parent_id_unique" ON "accommodations_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_booking_search_order_idx" ON "accommodations_blocks_booking_search" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_booking_search_parent_id_idx" ON "accommodations_blocks_booking_search" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_booking_search_path_idx" ON "accommodations_blocks_booking_search" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_booking_search_locales_locale_parent_i" ON "accommodations_blocks_booking_search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_booking_favorites_order_idx" ON "accommodations_blocks_booking_favorites" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_booking_favorites_parent_id_idx" ON "accommodations_blocks_booking_favorites" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_booking_favorites_path_idx" ON "accommodations_blocks_booking_favorites" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_booking_favorites_locales_locale_paren" ON "accommodations_blocks_booking_favorites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_blocks_booking_simple_order_idx" ON "accommodations_blocks_booking_simple" USING btree ("_order");
  CREATE INDEX "accommodations_blocks_booking_simple_parent_id_idx" ON "accommodations_blocks_booking_simple" USING btree ("_parent_id");
  CREATE INDEX "accommodations_blocks_booking_simple_path_idx" ON "accommodations_blocks_booking_simple" USING btree ("_path");
  CREATE UNIQUE INDEX "accommodations_blocks_booking_simple_locales_locale_parent_i" ON "accommodations_blocks_booking_simple_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_media_media_main_image_idx" ON "accommodations" USING btree ("media_main_image_id");
  CREATE INDEX "accommodations_media_media_floor_plan_idx" ON "accommodations" USING btree ("media_floor_plan_id");
  CREATE INDEX "accommodations_category_idx" ON "accommodations" USING btree ("category_id");
  CREATE INDEX "accommodations_updated_at_idx" ON "accommodations" USING btree ("updated_at");
  CREATE INDEX "accommodations_created_at_idx" ON "accommodations" USING btree ("created_at");
  CREATE INDEX "accommodations_slug_idx" ON "accommodations_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "accommodations_locales_locale_parent_id_unique" ON "accommodations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accommodations_texts_order_parent" ON "accommodations_texts" USING btree ("order","parent_id");
  CREATE INDEX "accommodations_numbers_order_parent_idx" ON "accommodations_numbers" USING btree ("order","parent_id");
  CREATE INDEX "accommodations_rels_order_idx" ON "accommodations_rels" USING btree ("order");
  CREATE INDEX "accommodations_rels_parent_idx" ON "accommodations_rels" USING btree ("parent_id");
  CREATE INDEX "accommodations_rels_path_idx" ON "accommodations_rels" USING btree ("path");
  CREATE INDEX "accommodations_rels_media_id_idx" ON "accommodations_rels" USING btree ("media_id");
  CREATE INDEX "accommodations_rels_accommodations_id_idx" ON "accommodations_rels" USING btree ("accommodations_id");
  CREATE INDEX "entities_schedule_periods_order_idx" ON "entities_schedule_periods" USING btree ("_order");
  CREATE INDEX "entities_schedule_periods_parent_id_idx" ON "entities_schedule_periods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "entities_schedule_periods_locales_locale_parent_id_unique" ON "entities_schedule_periods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entities_features_order_idx" ON "entities_features" USING btree ("_order");
  CREATE INDEX "entities_features_parent_id_idx" ON "entities_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "entities_features_locales_locale_parent_id_unique" ON "entities_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entities_ctas_order_idx" ON "entities_ctas" USING btree ("_order");
  CREATE INDEX "entities_ctas_parent_id_idx" ON "entities_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "entities_ctas_locales_locale_parent_id_unique" ON "entities_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entities_personalization_order_idx" ON "entities_personalization" USING btree ("_order");
  CREATE INDEX "entities_personalization_parent_id_idx" ON "entities_personalization" USING btree ("_parent_id");
  CREATE INDEX "entities_personalization_image_idx" ON "entities_personalization" USING btree ("image_id");
  CREATE INDEX "entities_image_idx" ON "entities" USING btree ("image_id");
  CREATE INDEX "entities_category_idx" ON "entities" USING btree ("category_id");
  CREATE INDEX "entities_updated_at_idx" ON "entities" USING btree ("updated_at");
  CREATE INDEX "entities_created_at_idx" ON "entities" USING btree ("created_at");
  CREATE INDEX "entities_slug_idx" ON "entities_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "entities_locales_locale_parent_id_unique" ON "entities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entities_rels_order_idx" ON "entities_rels" USING btree ("order");
  CREATE INDEX "entities_rels_parent_idx" ON "entities_rels" USING btree ("parent_id");
  CREATE INDEX "entities_rels_path_idx" ON "entities_rels" USING btree ("path");
  CREATE INDEX "entities_rels_media_id_idx" ON "entities_rels" USING btree ("media_id");
  CREATE INDEX "pages_blocks_media_text_ctas_order_idx" ON "pages_blocks_media_text_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_ctas_parent_id_idx" ON "pages_blocks_media_text_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_media_text_ctas_locales_locale_parent_id_unique" ON "pages_blocks_media_text_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_text_order_idx" ON "pages_blocks_media_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_text_parent_id_idx" ON "pages_blocks_media_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_text_path_idx" ON "pages_blocks_media_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_text_image_idx" ON "pages_blocks_media_text" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_media_text_locales_locale_parent_id_unique" ON "pages_blocks_media_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_grid_ctas_order_idx" ON "pages_blocks_icon_grid_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_grid_ctas_parent_id_idx" ON "pages_blocks_icon_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_icon_grid_ctas_locales_locale_parent_id_unique" ON "pages_blocks_icon_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_grid_items_order_idx" ON "pages_blocks_icon_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_grid_items_parent_id_idx" ON "pages_blocks_icon_grid_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_icon_grid_items_locales_locale_parent_id_unique" ON "pages_blocks_icon_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_grid_order_idx" ON "pages_blocks_icon_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_grid_parent_id_idx" ON "pages_blocks_icon_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_grid_path_idx" ON "pages_blocks_icon_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_icon_grid_locales_locale_parent_id_unique" ON "pages_blocks_icon_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_items_order_idx" ON "pages_blocks_card_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_items_parent_id_idx" ON "pages_blocks_card_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_items_image_idx" ON "pages_blocks_card_grid_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_items_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_ctas_order_idx" ON "pages_blocks_card_grid_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_ctas_parent_id_idx" ON "pages_blocks_card_grid_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_ctas_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_card_grid_locales_locale_parent_id_unique" ON "pages_blocks_card_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_blog_order_idx" ON "pages_blocks_blog" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_parent_id_idx" ON "pages_blocks_blog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_path_idx" ON "pages_blocks_blog" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_blog_locales_locale_parent_id_unique" ON "pages_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_images_locales_locale_parent_id_unique" ON "pages_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_ctas_order_idx" ON "pages_blocks_gallery_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_ctas_parent_id_idx" ON "pages_blocks_gallery_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gallery_ctas_locales_locale_parent_id_unique" ON "pages_blocks_gallery_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_map_ctas_order_idx" ON "pages_blocks_map_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_ctas_parent_id_idx" ON "pages_blocks_map_ctas" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_map_ctas_locales_locale_parent_id_unique" ON "pages_blocks_map_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_map_locales_locale_parent_id_unique" ON "pages_blocks_map_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_search_order_idx" ON "pages_blocks_booking_search" USING btree ("_order");
  CREATE INDEX "pages_blocks_booking_search_parent_id_idx" ON "pages_blocks_booking_search" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_search_path_idx" ON "pages_blocks_booking_search" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_booking_search_locales_locale_parent_id_unique" ON "pages_blocks_booking_search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_favorites_order_idx" ON "pages_blocks_booking_favorites" USING btree ("_order");
  CREATE INDEX "pages_blocks_booking_favorites_parent_id_idx" ON "pages_blocks_booking_favorites" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_favorites_path_idx" ON "pages_blocks_booking_favorites" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_booking_favorites_locales_locale_parent_id_uniq" ON "pages_blocks_booking_favorites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_booking_simple_order_idx" ON "pages_blocks_booking_simple" USING btree ("_order");
  CREATE INDEX "pages_blocks_booking_simple_parent_id_idx" ON "pages_blocks_booking_simple" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_booking_simple_path_idx" ON "pages_blocks_booking_simple" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_booking_simple_locales_locale_parent_id_unique" ON "pages_blocks_booking_simple_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_personalization_order_idx" ON "pages_personalization" USING btree ("_order");
  CREATE INDEX "pages_personalization_parent_id_idx" ON "pages_personalization" USING btree ("_parent_id");
  CREATE INDEX "pages_personalization_image_idx" ON "pages_personalization" USING btree ("image_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_numbers_order_parent_idx" ON "pages_numbers" USING btree ("order","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "articles_image_idx" ON "articles" USING btree ("image_id");
  CREATE INDEX "articles_seo_seo_og_image_idx" ON "articles" USING btree ("seo_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_slug_idx" ON "articles_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_submissions_ip_hash_idx" ON "contact_submissions" USING btree ("ip_hash");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_accommodations_id_idx" ON "payload_locked_documents_rels" USING btree ("accommodations_id");
  CREATE INDEX "payload_locked_documents_rels_entities_id_idx" ON "payload_locked_documents_rels" USING btree ("entities_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_config_location_transport_order_idx" ON "site_config_location_transport" USING btree ("_order");
  CREATE INDEX "site_config_location_transport_parent_id_idx" ON "site_config_location_transport" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_config_location_transport_locales_locale_parent_id_uniq" ON "site_config_location_transport_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_config_contact_form_subjects_order_idx" ON "site_config_contact_form_subjects" USING btree ("_order");
  CREATE INDEX "site_config_contact_form_subjects_parent_id_idx" ON "site_config_contact_form_subjects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_config_contact_form_subjects_locales_locale_parent_id_u" ON "site_config_contact_form_subjects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_config_languages_domain_map_order_idx" ON "site_config_languages_domain_map" USING btree ("_order");
  CREATE INDEX "site_config_languages_domain_map_parent_id_idx" ON "site_config_languages_domain_map" USING btree ("_parent_id");
  CREATE INDEX "site_config_legal_links_order_idx" ON "site_config_legal_links" USING btree ("_order");
  CREATE INDEX "site_config_legal_links_parent_id_idx" ON "site_config_legal_links" USING btree ("_parent_id");
  CREATE INDEX "site_config_custom_code_order_idx" ON "site_config_custom_code" USING btree ("_order");
  CREATE INDEX "site_config_custom_code_parent_id_idx" ON "site_config_custom_code" USING btree ("_parent_id");
  CREATE INDEX "site_config_general_general_logo_idx" ON "site_config" USING btree ("general_logo_id");
  CREATE INDEX "site_config_general_general_logo_inverted_idx" ON "site_config" USING btree ("general_logo_inverted_id");
  CREATE INDEX "site_config_maps_maps_static_image_idx" ON "site_config" USING btree ("maps_static_image_id");
  CREATE UNIQUE INDEX "site_config_locales_locale_parent_id_unique" ON "site_config_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_config_texts_order_parent" ON "site_config_texts" USING btree ("order","parent_id");
  CREATE INDEX "header_top_bar_links_order_idx" ON "header_top_bar_links" USING btree ("_order");
  CREATE INDEX "header_top_bar_links_parent_id_idx" ON "header_top_bar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_top_bar_links_locales_locale_parent_id_unique" ON "header_top_bar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_children_order_idx" ON "header_navigation_children" USING btree ("_order");
  CREATE INDEX "header_navigation_children_parent_id_idx" ON "header_navigation_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_navigation_children_locales_locale_parent_id_unique" ON "header_navigation_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_navigation_order_idx" ON "header_navigation" USING btree ("_order");
  CREATE INDEX "header_navigation_parent_id_idx" ON "header_navigation" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_partners_order_idx" ON "footer_partners" USING btree ("_order");
  CREATE INDEX "footer_partners_parent_id_idx" ON "footer_partners" USING btree ("_parent_id");
  CREATE INDEX "footer_partners_logo_idx" ON "footer_partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "banner_locales_locale_parent_id_unique" ON "banner_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "accommodations_bedroom_details" CASCADE;
  DROP TABLE "accommodations_bedroom_details_locales" CASCADE;
  DROP TABLE "accommodations_equipment" CASCADE;
  DROP TABLE "accommodations_equipment_locales" CASCADE;
  DROP TABLE "accommodations_documents" CASCADE;
  DROP TABLE "accommodations_documents_locales" CASCADE;
  DROP TABLE "accommodations_features" CASCADE;
  DROP TABLE "accommodations_features_locales" CASCADE;
  DROP TABLE "accommodations_personalization" CASCADE;
  DROP TABLE "accommodations_blocks_media_text_ctas" CASCADE;
  DROP TABLE "accommodations_blocks_media_text_ctas_locales" CASCADE;
  DROP TABLE "accommodations_blocks_media_text" CASCADE;
  DROP TABLE "accommodations_blocks_media_text_locales" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid_ctas" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid_ctas_locales" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid_items" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid_items_locales" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid" CASCADE;
  DROP TABLE "accommodations_blocks_icon_grid_locales" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid_items" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid_items_locales" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid" CASCADE;
  DROP TABLE "accommodations_blocks_card_grid_locales" CASCADE;
  DROP TABLE "accommodations_blocks_blog" CASCADE;
  DROP TABLE "accommodations_blocks_blog_locales" CASCADE;
  DROP TABLE "accommodations_blocks_gallery_images" CASCADE;
  DROP TABLE "accommodations_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "accommodations_blocks_gallery_ctas" CASCADE;
  DROP TABLE "accommodations_blocks_gallery_ctas_locales" CASCADE;
  DROP TABLE "accommodations_blocks_gallery" CASCADE;
  DROP TABLE "accommodations_blocks_gallery_locales" CASCADE;
  DROP TABLE "accommodations_blocks_map_ctas" CASCADE;
  DROP TABLE "accommodations_blocks_map_ctas_locales" CASCADE;
  DROP TABLE "accommodations_blocks_map" CASCADE;
  DROP TABLE "accommodations_blocks_map_locales" CASCADE;
  DROP TABLE "accommodations_blocks_rich_text" CASCADE;
  DROP TABLE "accommodations_blocks_rich_text_locales" CASCADE;
  DROP TABLE "accommodations_blocks_cta_links" CASCADE;
  DROP TABLE "accommodations_blocks_cta_links_locales" CASCADE;
  DROP TABLE "accommodations_blocks_cta" CASCADE;
  DROP TABLE "accommodations_blocks_cta_locales" CASCADE;
  DROP TABLE "accommodations_blocks_booking_search" CASCADE;
  DROP TABLE "accommodations_blocks_booking_search_locales" CASCADE;
  DROP TABLE "accommodations_blocks_booking_favorites" CASCADE;
  DROP TABLE "accommodations_blocks_booking_favorites_locales" CASCADE;
  DROP TABLE "accommodations_blocks_booking_simple" CASCADE;
  DROP TABLE "accommodations_blocks_booking_simple_locales" CASCADE;
  DROP TABLE "accommodations" CASCADE;
  DROP TABLE "accommodations_locales" CASCADE;
  DROP TABLE "accommodations_texts" CASCADE;
  DROP TABLE "accommodations_numbers" CASCADE;
  DROP TABLE "accommodations_rels" CASCADE;
  DROP TABLE "entities_schedule_periods" CASCADE;
  DROP TABLE "entities_schedule_periods_locales" CASCADE;
  DROP TABLE "entities_features" CASCADE;
  DROP TABLE "entities_features_locales" CASCADE;
  DROP TABLE "entities_ctas" CASCADE;
  DROP TABLE "entities_ctas_locales" CASCADE;
  DROP TABLE "entities_personalization" CASCADE;
  DROP TABLE "entities" CASCADE;
  DROP TABLE "entities_locales" CASCADE;
  DROP TABLE "entities_rels" CASCADE;
  DROP TABLE "pages_blocks_media_text_ctas" CASCADE;
  DROP TABLE "pages_blocks_media_text_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_media_text" CASCADE;
  DROP TABLE "pages_blocks_media_text_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_grid_ctas" CASCADE;
  DROP TABLE "pages_blocks_icon_grid_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_grid_items" CASCADE;
  DROP TABLE "pages_blocks_icon_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_grid" CASCADE;
  DROP TABLE "pages_blocks_icon_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_items" CASCADE;
  DROP TABLE "pages_blocks_card_grid_items_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid_ctas" CASCADE;
  DROP TABLE "pages_blocks_card_grid_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_card_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_blog" CASCADE;
  DROP TABLE "pages_blocks_blog_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery_ctas" CASCADE;
  DROP TABLE "pages_blocks_gallery_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_map_ctas" CASCADE;
  DROP TABLE "pages_blocks_map_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_map_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_booking_search" CASCADE;
  DROP TABLE "pages_blocks_booking_search_locales" CASCADE;
  DROP TABLE "pages_blocks_booking_favorites" CASCADE;
  DROP TABLE "pages_blocks_booking_favorites_locales" CASCADE;
  DROP TABLE "pages_blocks_booking_simple" CASCADE;
  DROP TABLE "pages_blocks_booking_simple_locales" CASCADE;
  DROP TABLE "pages_personalization" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_numbers" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_config_location_transport" CASCADE;
  DROP TABLE "site_config_location_transport_locales" CASCADE;
  DROP TABLE "site_config_contact_form_subjects" CASCADE;
  DROP TABLE "site_config_contact_form_subjects_locales" CASCADE;
  DROP TABLE "site_config_languages_domain_map" CASCADE;
  DROP TABLE "site_config_legal_links" CASCADE;
  DROP TABLE "site_config_custom_code" CASCADE;
  DROP TABLE "site_config" CASCADE;
  DROP TABLE "site_config_locales" CASCADE;
  DROP TABLE "site_config_texts" CASCADE;
  DROP TABLE "header_top_bar_links" CASCADE;
  DROP TABLE "header_top_bar_links_locales" CASCADE;
  DROP TABLE "header_navigation_children" CASCADE;
  DROP TABLE "header_navigation_children_locales" CASCADE;
  DROP TABLE "header_navigation" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_partners" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "banner" CASCADE;
  DROP TABLE "banner_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_accommodations_equipment_icon";
  DROP TYPE "public"."enum_accommodations_features_icon";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_ctas_variant";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_ctas_icon";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_media";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_align";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_ratio";
  DROP TYPE "public"."enum_accommodations_blocks_media_text_background";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_ctas_variant";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_ctas_icon";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_items_icon";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_heading_tone";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_variant";
  DROP TYPE "public"."enum_accommodations_blocks_icon_grid_background";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_items_variant";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_ctas_icon";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_heading_tone";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_background";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_card";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_card_size";
  DROP TYPE "public"."enum_accommodations_blocks_card_grid_source";
  DROP TYPE "public"."enum_accommodations_blocks_blog_heading_tone";
  DROP TYPE "public"."enum_accommodations_blocks_blog_background";
  DROP TYPE "public"."enum_accommodations_blocks_blog_source";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_ctas_variant";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_ctas_icon";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_background";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_variant";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_effect";
  DROP TYPE "public"."enum_accommodations_blocks_gallery_heading_level";
  DROP TYPE "public"."enum_accommodations_blocks_map_ctas_variant";
  DROP TYPE "public"."enum_accommodations_blocks_map_ctas_icon";
  DROP TYPE "public"."enum_accommodations_blocks_map_heading_tone";
  DROP TYPE "public"."enum_accommodations_blocks_map_background";
  DROP TYPE "public"."enum_accommodations_blocks_cta_links_variant";
  DROP TYPE "public"."enum_accommodations_blocks_cta_links_icon";
  DROP TYPE "public"."enum_accommodations_blocks_booking_search_source";
  DROP TYPE "public"."enum_accommodations_blocks_booking_search_accommodation_type";
  DROP TYPE "public"."enum_accommodations_blocks_booking_simple_source";
  DROP TYPE "public"."enum_accommodations_type";
  DROP TYPE "public"."enum_entities_schedule_periods_icon";
  DROP TYPE "public"."enum_entities_features_icon";
  DROP TYPE "public"."enum_entities_ctas_variant";
  DROP TYPE "public"."enum_entities_type";
  DROP TYPE "public"."enum_entities_icon";
  DROP TYPE "public"."enum_pages_blocks_media_text_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_media_text_ctas_icon";
  DROP TYPE "public"."enum_pages_blocks_media_text_media";
  DROP TYPE "public"."enum_pages_blocks_media_text_align";
  DROP TYPE "public"."enum_pages_blocks_media_text_ratio";
  DROP TYPE "public"."enum_pages_blocks_media_text_background";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_ctas_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_heading_tone";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_variant";
  DROP TYPE "public"."enum_pages_blocks_icon_grid_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_items_variant";
  DROP TYPE "public"."enum_pages_blocks_card_grid_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_card_grid_ctas_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_heading_tone";
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_size";
  DROP TYPE "public"."enum_pages_blocks_card_grid_source";
  DROP TYPE "public"."enum_pages_blocks_blog_heading_tone";
  DROP TYPE "public"."enum_pages_blocks_blog_background";
  DROP TYPE "public"."enum_pages_blocks_blog_source";
  DROP TYPE "public"."enum_pages_blocks_gallery_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_gallery_ctas_icon";
  DROP TYPE "public"."enum_pages_blocks_gallery_background";
  DROP TYPE "public"."enum_pages_blocks_gallery_variant";
  DROP TYPE "public"."enum_pages_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_gallery_effect";
  DROP TYPE "public"."enum_pages_blocks_gallery_heading_level";
  DROP TYPE "public"."enum_pages_blocks_map_ctas_variant";
  DROP TYPE "public"."enum_pages_blocks_map_ctas_icon";
  DROP TYPE "public"."enum_pages_blocks_map_heading_tone";
  DROP TYPE "public"."enum_pages_blocks_map_background";
  DROP TYPE "public"."enum_pages_blocks_cta_links_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_links_icon";
  DROP TYPE "public"."enum_pages_blocks_booking_search_source";
  DROP TYPE "public"."enum_pages_blocks_booking_search_accommodation_type";
  DROP TYPE "public"."enum_pages_blocks_booking_simple_source";
  DROP TYPE "public"."enum_pages_type";
  DROP TYPE "public"."enum_pages_hero_variant";
  DROP TYPE "public"."enum_pages_hero_title_mode";
  DROP TYPE "public"."enum_pages_hero_align";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_site_config_location_transport_icon";
  DROP TYPE "public"."enum_site_config_custom_code_position";
  DROP TYPE "public"."enum_site_config_general_business_type";
  DROP TYPE "public"."enum_site_config_maps_provider";
  DROP TYPE "public"."enum_site_config_languages_strategy";
  DROP TYPE "public"."enum_site_config_booking_engine";
  DROP TYPE "public"."enum_site_config_booking_layout";
  DROP TYPE "public"."enum_header_top_bar_links_icon";
  DROP TYPE "public"."enum_footer_columns_type";
  DROP TYPE "public"."enum_footer_columns_newsletter_provider";
  DROP TYPE "public"."enum_banner_type";`)
}
