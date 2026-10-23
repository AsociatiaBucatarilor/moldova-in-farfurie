import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "landing" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "landing_locales" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "landing_locales" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landing_seo_seo_image_idx" ON "landing" USING btree ("seo_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing" DROP CONSTRAINT "landing_seo_image_id_media_id_fk";
  
  DROP INDEX "landing_seo_seo_image_idx";
  ALTER TABLE "landing" DROP COLUMN "seo_image_id";
  ALTER TABLE "landing_locales" DROP COLUMN "seo_title";
  ALTER TABLE "landing_locales" DROP COLUMN "seo_description";`)
}
