import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "landing" ADD COLUMN "footer_phone" varchar;
  ALTER TABLE "landing" ADD COLUMN "footer_email" varchar;
  ALTER TABLE "landing_locales" ADD COLUMN "footer_address" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "landing" DROP COLUMN "footer_phone";
  ALTER TABLE "landing" DROP COLUMN "footer_email";
  ALTER TABLE "landing_locales" DROP COLUMN "footer_address";`)
}
