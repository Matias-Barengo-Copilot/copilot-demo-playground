/**
 * Demos by category: read from JSON mocks (stand-in for DB).
 * Categories match the 6 landing cards: recruitment-hr, marketing-seo, customer-support, ecommerce, operations, finance.
 */

import recruitmentHr from "@/mocks/demos/recruitment-hr.json";
import marketingSeo from "@/mocks/demos/marketing-seo.json";
import customerSupport from "@/mocks/demos/customer-support.json";
import ecommerce from "@/mocks/demos/ecommerce.json";
import operations from "@/mocks/demos/operations.json";
import finance from "@/mocks/demos/finance.json";

export type DemoFromMock = {
  id: string;
  slug: string;
  title: string;
  description: string;
  narrative: string;
  /** URL opened in a new tab (no in-app demo page) */
  url: string;
  /** Optional main image (e.g. app screenshot) for the detail modal */
  imageUrl?: string;
  tags?: string[];
};

const DEMOS_BY_CATEGORY: Record<string, DemoFromMock[]> = {
  "recruitment-hr": recruitmentHr as DemoFromMock[],
  "marketing-seo": marketingSeo as DemoFromMock[],
  "customer-support": customerSupport as DemoFromMock[],
  ecommerce: ecommerce as DemoFromMock[],
  operations: operations as DemoFromMock[],
  finance: finance as DemoFromMock[],
};

export const CATEGORY_IDS = Object.keys(DEMOS_BY_CATEGORY) as string[];

export function getDemosForCategory(categoryId: string): DemoFromMock[] {
  return DEMOS_BY_CATEGORY[categoryId] ?? [];
}

export function getDemoCountForCategory(categoryId: string): number {
  return getDemosForCategory(categoryId).length;
}

export function getDemoBySlug(
  categoryId: string,
  demoSlug: string
): DemoFromMock | undefined {
  return getDemosForCategory(categoryId).find((d) => d.slug === demoSlug);
}

export function isValidCategoryId(categoryId: string): boolean {
  return categoryId in DEMOS_BY_CATEGORY;
}
