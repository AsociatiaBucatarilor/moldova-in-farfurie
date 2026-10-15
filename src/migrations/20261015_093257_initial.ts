import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ro', 'ru', 'en');
  CREATE TYPE "public"."enum_raioane_region" AS ENUM('nord', 'centru', 'sud');
  CREATE TYPE "public"."enum_raioane_map_id" AS ENUM('anenii-noi', 'balti', 'basarabeasca', 'bender', 'briceni', 'cahul', 'calarasi', 'cantemir', 'causeni', 'chisinau', 'cimislia', 'criuleni', 'donduseni', 'drochia', 'dubasari', 'edinet', 'falesti', 'floresti', 'gagauzia', 'glodeni', 'hincesti', 'ialoveni', 'leova', 'nisporeni', 'ocnita', 'orhei', 'rezina', 'riscani', 'singerei', 'soldanesti', 'soroca', 'stefan-voda', 'straseni', 'taraclia', 'telenesti', 'transnistria', 'ungheni');
  CREATE TABLE "raioane_sights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "raioane_sights_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "raioane_dishes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "raioane_dishes_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "raioane" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" "enum_raioane_region" NOT NULL,
  	"map_id" "enum_raioane_map_id" NOT NULL,
  	"episode_url" varchar,
  	"teaser_url" varchar,
  	"cover_id" integer,
  	"more_url" varchar DEFAULT 'https://moldova.travel',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "raioane_locales" (
  	"name" varchar NOT NULL,
  	"intro" varchar,
  	"heritage" varchar,
  	"food" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_objectkey" varchar,
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
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
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
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
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
  	"raioane_id" integer,
  	"media_id" integer,
  	"users_id" integer
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
  
  CREATE TABLE "landing_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "landing_hero_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "landing_partners_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "landing_partners_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_id" integer,
  	"hero_trailer_url" varchar,
  	"map_featured_id" integer,
  	"footer_instagram" varchar,
  	"footer_facebook" varchar,
  	"footer_youtube" varchar,
  	"footer_tiktok" varchar,
  	"footer_hashtag" varchar DEFAULT '#MoldovaInFarfurie',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "landing_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_tagline" varchar,
  	"hero_description" varchar,
  	"hero_script" varchar,
  	"map_eyebrow" varchar,
  	"map_title" varchar,
  	"map_description" varchar,
  	"map_script" varchar,
  	"districts_eyebrow" varchar,
  	"districts_title" varchar,
  	"districts_description" varchar,
  	"quote_text" varchar,
  	"quote_author" varchar,
  	"footer_copyright" varchar,
  	"footer_made_with" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "raioane_sights" ADD CONSTRAINT "raioane_sights_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "raioane_sights" ADD CONSTRAINT "raioane_sights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."raioane"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "raioane_sights_locales" ADD CONSTRAINT "raioane_sights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."raioane_sights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "raioane_dishes" ADD CONSTRAINT "raioane_dishes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "raioane_dishes" ADD CONSTRAINT "raioane_dishes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."raioane"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "raioane_dishes_locales" ADD CONSTRAINT "raioane_dishes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."raioane_dishes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "raioane" ADD CONSTRAINT "raioane_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "raioane_locales" ADD CONSTRAINT "raioane_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."raioane"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_raioane_fk" FOREIGN KEY ("raioane_id") REFERENCES "public"."raioane"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_hero_stats" ADD CONSTRAINT "landing_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_hero_stats_locales" ADD CONSTRAINT "landing_hero_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_hero_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_partners_items" ADD CONSTRAINT "landing_partners_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_partners_items" ADD CONSTRAINT "landing_partners_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_partners_items_locales" ADD CONSTRAINT "landing_partners_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_partners_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_hero_background_id_media_id_fk" FOREIGN KEY ("hero_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_map_featured_id_raioane_id_fk" FOREIGN KEY ("map_featured_id") REFERENCES "public"."raioane"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_locales" ADD CONSTRAINT "landing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "raioane_sights_order_idx" ON "raioane_sights" USING btree ("_order");
  CREATE INDEX "raioane_sights_parent_id_idx" ON "raioane_sights" USING btree ("_parent_id");
  CREATE INDEX "raioane_sights_image_idx" ON "raioane_sights" USING btree ("image_id");
  CREATE UNIQUE INDEX "raioane_sights_locales_locale_parent_id_unique" ON "raioane_sights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "raioane_dishes_order_idx" ON "raioane_dishes" USING btree ("_order");
  CREATE INDEX "raioane_dishes_parent_id_idx" ON "raioane_dishes" USING btree ("_parent_id");
  CREATE INDEX "raioane_dishes_image_idx" ON "raioane_dishes" USING btree ("image_id");
  CREATE UNIQUE INDEX "raioane_dishes_locales_locale_parent_id_unique" ON "raioane_dishes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "raioane_map_id_idx" ON "raioane" USING btree ("map_id");
  CREATE INDEX "raioane_cover_idx" ON "raioane" USING btree ("cover_id");
  CREATE INDEX "raioane_updated_at_idx" ON "raioane" USING btree ("updated_at");
  CREATE INDEX "raioane_created_at_idx" ON "raioane" USING btree ("created_at");
  CREATE UNIQUE INDEX "raioane_locales_locale_parent_id_unique" ON "raioane_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_raioane_id_idx" ON "payload_locked_documents_rels" USING btree ("raioane_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_hero_stats_order_idx" ON "landing_hero_stats" USING btree ("_order");
  CREATE INDEX "landing_hero_stats_parent_id_idx" ON "landing_hero_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "landing_hero_stats_locales_locale_parent_id_unique" ON "landing_hero_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landing_partners_items_order_idx" ON "landing_partners_items" USING btree ("_order");
  CREATE INDEX "landing_partners_items_parent_id_idx" ON "landing_partners_items" USING btree ("_parent_id");
  CREATE INDEX "landing_partners_items_logo_idx" ON "landing_partners_items" USING btree ("logo_id");
  CREATE UNIQUE INDEX "landing_partners_items_locales_locale_parent_id_unique" ON "landing_partners_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landing_hero_hero_background_idx" ON "landing" USING btree ("hero_background_id");
  CREATE INDEX "landing_map_map_featured_idx" ON "landing" USING btree ("map_featured_id");
  CREATE UNIQUE INDEX "landing_locales_locale_parent_id_unique" ON "landing_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "raioane_sights" CASCADE;
  DROP TABLE "raioane_sights_locales" CASCADE;
  DROP TABLE "raioane_dishes" CASCADE;
  DROP TABLE "raioane_dishes_locales" CASCADE;
  DROP TABLE "raioane" CASCADE;
  DROP TABLE "raioane_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_hero_stats" CASCADE;
  DROP TABLE "landing_hero_stats_locales" CASCADE;
  DROP TABLE "landing_partners_items" CASCADE;
  DROP TABLE "landing_partners_items_locales" CASCADE;
  DROP TABLE "landing" CASCADE;
  DROP TABLE "landing_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_raioane_region";
  DROP TYPE "public"."enum_raioane_map_id";`)
}
