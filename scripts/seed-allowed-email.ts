/**
 * Script to add a user to the users table (whitelist) with an optional role.
 * Usage: npx tsx scripts/seed-allowed-email.ts you@email.com [admin|presenter|viewer]
 *
 * Requires DATABASE_URL in .env.
 */
import "dotenv/config";
import { db } from "../lib/db";
import { users } from "../db/schema";
import type { UserRole } from "../db/schema";

const email = process.argv[2]?.trim()?.toLowerCase();
const role = (process.argv[3]?.toLowerCase() ?? "viewer") as UserRole;
const validRoles: UserRole[] = ["admin", "presenter", "viewer"];
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Usage: npx tsx scripts/seed-allowed-email.ts <email> [admin|presenter|viewer]");
  process.exit(1);
}
if (!validRoles.includes(role)) {
  console.error("Role must be one of: admin, presenter, viewer");
  process.exit(1);
}

async function main() {
  await db
    .insert(users)
    .values({ email, role })
    .onConflictDoNothing({ target: users.email });
  console.log(`Added (or already existed): ${email} with role ${role}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
