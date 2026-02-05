"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users, userRoleEnum, type UserRole } from "@/db/schema";

const EMAIL_MAX_LENGTH = 255;
const VALID_ROLES: readonly UserRole[] = userRoleEnum.enumValues;

export type CreateUserState = {
  error?: string;
  success?: string;
};

export async function createUser(
  _prev: CreateUserState,
  formData: FormData
): Promise<CreateUserState> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const emailRaw = formData.get("email");
  const email =
    typeof emailRaw === "string"
      ? emailRaw.trim().toLowerCase().slice(0, EMAIL_MAX_LENGTH)
      : "";
  const nameRaw = formData.get("name");
  const name = typeof nameRaw === "string" ? nameRaw.trim().slice(0, 255) || null : null;
  const roleRaw = formData.get("role");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Valid email is required" };
  }
  if (typeof roleRaw !== "string" || !(VALID_ROLES as readonly string[]).includes(roleRaw)) {
    return { error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}.` };
  }
  const userRole = roleRaw as UserRole;

  try {
    await db.insert(users).values({ email, name, role: userRole });
    return { success: `User ${email} created with role ${userRole}.` };
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "23505") {
      return { error: "A user with this email already exists." };
    }
    return { error: "Failed to create user. Try again." };
  }
}
