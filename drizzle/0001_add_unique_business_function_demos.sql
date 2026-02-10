-- Add unique (category_slug, title) for existing tables created before 0000 had it.
DO $$ BEGIN
  ALTER TABLE "business_function_demos"
  ADD CONSTRAINT "business_function_demos_category_slug_title_unique"
  UNIQUE ("category_slug", "title");
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
