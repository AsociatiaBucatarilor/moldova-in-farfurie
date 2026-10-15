import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The partner "label" field was removed, but its table (landing_partners_items_locales) is
// intentionally kept: this migration runs before the new deployment goes live, and the
// previous one still reads that table. It can be dropped in a later migration.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"privacy_updated_on" timestamp(3) with time zone,
  	"cookies_updated_on" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "legal_locales" (
  	"privacy_title" varchar NOT NULL,
  	"privacy_content" jsonb,
  	"cookies_title" varchar NOT NULL,
  	"cookies_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "landing_locales" ADD COLUMN "partners_title" varchar;
  ALTER TABLE "legal_locales" ADD CONSTRAINT "legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "legal_locales_locale_parent_id_unique" ON "legal_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "legal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "legal_locales" CASCADE;
  ALTER TABLE "landing_locales" DROP COLUMN "partners_title";`)
}
