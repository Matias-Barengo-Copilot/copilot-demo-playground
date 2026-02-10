/**
 * Business function demos: read from DB.
 * Used by the Business Functions section and category pages.
 */

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  businessFunctionDemos,
  businessFunctionSlugEnum,
  type BusinessFunctionSlug,
  type BusinessFunctionDemoRow,
} from "@/db/schema";

/** Shape used by the UI (grid + modal). Aligned with DB row + metadata. */
export type BusinessFunctionDemo = {
  id: string;
  title: string;
  description: string;
  narrative: string;
  url: string;
  imageUrl?: string;
  tags?: string[];
};

const VALID_CATEGORY_IDS = businessFunctionSlugEnum.enumValues;

export function isValidCategoryId(slug: string): slug is BusinessFunctionSlug {
  return (VALID_CATEGORY_IDS as readonly string[]).includes(slug);
}

/** Get demos for a Business Function category from the DB, ordered by sort_order. */
export async function getDemosForCategory(
  categorySlug: BusinessFunctionSlug
): Promise<BusinessFunctionDemo[]> {
  const rows = await db
    .select()
    .from(businessFunctionDemos)
    .where(eq(businessFunctionDemos.categorySlug, categorySlug))
    .orderBy(businessFunctionDemos.sortOrder, businessFunctionDemos.title);

  return rows.map((row) => rowToDemo(row));
}

/** Get demo count for one category. */
export async function getDemoCountForCategory(
  categorySlug: BusinessFunctionSlug
): Promise<number> {
  const rows = await db
    .select({ id: businessFunctionDemos.id })
    .from(businessFunctionDemos)
    .where(eq(businessFunctionDemos.categorySlug, categorySlug));
  return rows.length;
}

/** Get demo counts for all 6 categories (for landing cards). */
export async function getDemoCountsForAllCategories(): Promise<
  Record<BusinessFunctionSlug, number>
> {
  const entries = await Promise.all(
    (VALID_CATEGORY_IDS as readonly BusinessFunctionSlug[]).map(
      async (slug) => [slug, await getDemoCountForCategory(slug)] as const
    )
  );
  return Object.fromEntries(entries) as Record<BusinessFunctionSlug, number>;
}

/** Get demos for all 6 business function categories in parallel (for landing flip cards). */
export async function getDemosForAllCategories(): Promise<
  Record<BusinessFunctionSlug, BusinessFunctionDemo[]>
> {
  const entries = await Promise.all(
    (VALID_CATEGORY_IDS as readonly BusinessFunctionSlug[]).map(
      async (slug) => [slug, await getDemosForCategory(slug)] as const
    )
  );
  return Object.fromEntries(entries) as Record<
    BusinessFunctionSlug,
    BusinessFunctionDemo[]
  >;
}

function rowToDemo(row: BusinessFunctionDemoRow): BusinessFunctionDemo {
  const meta = row.metadata ?? {};
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    narrative: row.narrative,
    url: meta.url ?? "",
    imageUrl: meta.imageUrl,
    tags: meta.tags,
  };
}
