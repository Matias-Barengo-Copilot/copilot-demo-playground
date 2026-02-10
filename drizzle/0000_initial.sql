-- Current schema: users, business_function_demos, ai_agents.
-- Run once on a fresh DB (e.g. npm run db:migrate).
-- Idempotent: safe to run if tables already exist.

DO $$ BEGIN
  CREATE TYPE "user_role" AS ENUM('admin', 'presenter', 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL UNIQUE,
  "name" text,
  "role" "user_role" NOT NULL DEFAULT 'viewer',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  CREATE TYPE "business_function_slug" AS ENUM(
    'recruitment-hr', 'marketing-seo', 'customer-support',
    'ecommerce', 'operations', 'finance'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "business_function_demos" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "category_slug" "business_function_slug" NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "narrative" text NOT NULL,
  "metadata" jsonb,
  "sort_order" smallint DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  CREATE TYPE "agent_status" AS ENUM('active', 'busy', 'offline');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

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
);
