"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  users,
  userRoleEnum,
  businessFunctionDemos,
  businessFunctionSlugEnum,
  type UserRole,
  type BusinessFunctionSlug,
  type BusinessFunctionDemoMetadata,
} from "@/db/schema";

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

// —— Business function demo ——

const TEXT_MAX_LENGTH = 2000;
const URL_MAX_LENGTH = 2048;
const VALID_CATEGORY_SLUGS: readonly string[] = businessFunctionSlugEnum.enumValues;

export type CreateBusinessFunctionDemoState = {
  error?: string;
  success?: string;
};

export async function createBusinessFunctionDemo(
  _prev: CreateBusinessFunctionDemoState,
  formData: FormData
): Promise<CreateBusinessFunctionDemoState> {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const businessFunctionSlugRaw = formData.get("businessFunctionSlug");
  const titleRaw = formData.get("title");
  const descriptionRaw = formData.get("description");
  const narrativeRaw = formData.get("narrative");
  const urlRaw = formData.get("url");
  const imageUrlRaw = formData.get("imageUrl");

  if (typeof businessFunctionSlugRaw !== "string" || !VALID_CATEGORY_SLUGS.includes(businessFunctionSlugRaw)) {
    return { error: `Category must be one of: ${VALID_CATEGORY_SLUGS.join(", ")}.` };
  }
  const businessFunctionSlug = businessFunctionSlugRaw as BusinessFunctionSlug;

  const title = typeof titleRaw === "string" ? titleRaw.trim().slice(0, 500) : "";
  const description = typeof descriptionRaw === "string" ? descriptionRaw.trim().slice(0, TEXT_MAX_LENGTH) : "";
  const narrative = typeof narrativeRaw === "string" ? narrativeRaw.trim().slice(0, TEXT_MAX_LENGTH) : "";

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Description is required." };
  if (!narrative) return { error: "Narrative is required." };

  const url = typeof urlRaw === "string" ? urlRaw.trim().slice(0, URL_MAX_LENGTH) || undefined : undefined;
  const imageUrl = typeof imageUrlRaw === "string" ? imageUrlRaw.trim().slice(0, URL_MAX_LENGTH) || undefined : undefined;

  const metadata: BusinessFunctionDemoMetadata = {};
  if (url) metadata.url = url;
  if (imageUrl) metadata.imageUrl = imageUrl;

  try {
    await db.insert(businessFunctionDemos).values({
      categorySlug: businessFunctionSlug,
      title,
      description,
      narrative,
      metadata: Object.keys(metadata).length > 0 ? metadata : null,
      sortOrder: 0,
    });
    return { success: `Demo "${title}" was added to ${businessFunctionSlug}.` };
  } catch (e) {
    return { error: "Failed to create demo. Try again." };
  }
}
