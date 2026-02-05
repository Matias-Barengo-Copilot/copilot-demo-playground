-- Demo portal catalog (structure may evolve when real demos arrive)
CREATE TYPE "demo_category" AS ENUM('business_function', 'ai_agent', 'industry');

CREATE TABLE "demos" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "category" "demo_category" NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "narrative" text NOT NULL,
  "metadata" jsonb,
  "sort_order" smallint DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
