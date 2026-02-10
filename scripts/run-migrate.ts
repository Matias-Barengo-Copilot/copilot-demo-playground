/**
 * Run the initial migration (current schema).
 * Idempotent: safe if schema already exists.
 *
 * Usage: npx tsx scripts/run-migrate.ts
 * Requires: DATABASE_URL in .env
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
  await sql`
    DO $$ BEGIN
      CREATE TYPE "user_role" AS ENUM('admin', 'presenter', 'viewer');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" text NOT NULL UNIQUE,
      "name" text,
      "role" "user_role" NOT NULL DEFAULT 'viewer',
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `;
  await sql`
    DO $$ BEGIN
      CREATE TYPE "business_function_slug" AS ENUM(
        'recruitment-hr', 'marketing-seo', 'customer-support',
        'ecommerce', 'operations', 'finance'
      );
    EXCEPTION WHEN duplicate_object THEN NULL; END $$
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS "business_function_demos" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "category_slug" "business_function_slug" NOT NULL,
      "title" text NOT NULL,
      "description" text NOT NULL,
      "narrative" text NOT NULL,
      "metadata" jsonb,
      "sort_order" smallint DEFAULT 0 NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "business_function_demos_category_slug_title_unique" UNIQUE ("category_slug", "title")
    )
  `;
  await sql`
    DO $$ BEGIN
      CREATE TYPE "agent_status" AS ENUM('active', 'busy', 'offline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS "ai_agents" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "slug" text NOT NULL UNIQUE,
      "name" text NOT NULL,
      "role" text NOT NULL,
      "department" text NOT NULL,
      "status" "agent_status" DEFAULT 'active' NOT NULL,
      "description" text NOT NULL,
      "welcome_message" text,
      "image_url" text,
      "capabilities" jsonb,
      "actions" jsonb,
      "sort_order" smallint DEFAULT 0 NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    )
  `;
  await sql`
    DO $$ BEGIN
      ALTER TABLE "business_function_demos"
      ADD CONSTRAINT "business_function_demos_category_slug_title_unique"
      UNIQUE ("category_slug", "title");
    EXCEPTION WHEN duplicate_object THEN NULL; END $$
  `;
  console.log("Migration completed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
