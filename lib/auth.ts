import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import type { User } from "@/db/schema";

const EMAIL_MAX_LENGTH = 255;

/**
 * Checks whether the email exists in the users table (whitelist).
 * Validates and sanitizes the email before querying.
 */
export async function isEmailAllowed(email: string | null | undefined): Promise<boolean> {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase().slice(0, EMAIL_MAX_LENGTH);
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;

  const rows = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.email, trimmed))
    .limit(1);

  return rows.length > 0;
}

/**
 * Returns the app user (with role) by email, or null if not found.
 */
export async function getUserByEmail(email: string | null | undefined): Promise<User | null> {
  if (!email || typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase().slice(0, EMAIL_MAX_LENGTH);
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;

  const rows = await db.select().from(users).where(eq(users.email, trimmed)).limit(1);
  return rows[0] ?? null;
}
