-- Rename allowed_emails to users
ALTER TABLE "allowed_emails" RENAME TO "users";

-- Create role enum and add column
CREATE TYPE "user_role" AS ENUM('admin', 'presenter', 'viewer');

ALTER TABLE "users" ADD COLUMN "role" "user_role" NOT NULL DEFAULT 'viewer';

-- Set existing user(s) to admin (e.g. matias@copilotinnovations.com)
UPDATE "users" SET "role" = 'admin';
