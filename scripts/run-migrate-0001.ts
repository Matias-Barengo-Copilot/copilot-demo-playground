/**
 * One-off script to run migration 0001: rename allowed_emails → users, add role.
 * Run once: npx tsx scripts/run-migrate-0001.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(connectionString);

async function main() {
  await sql`ALTER TABLE "allowed_emails" RENAME TO "users"`;
  console.log("OK: RENAME TABLE");
  await sql`CREATE TYPE "user_role" AS ENUM('admin', 'presenter', 'viewer')`;
  console.log("OK: CREATE TYPE user_role");
  await sql`ALTER TABLE "users" ADD COLUMN "role" "user_role" NOT NULL DEFAULT 'viewer'`;
  console.log("OK: ADD COLUMN role");
  await sql`UPDATE "users" SET "role" = 'admin'`;
  console.log("OK: UPDATE existing user(s) to admin");
  console.log("Migration 0001 completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
