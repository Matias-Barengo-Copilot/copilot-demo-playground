/**
 * Seed example business function demos into business_function_demos table.
 *
 * Usage: npx tsx scripts/seed-demos.ts
 * Requires DATABASE_URL in .env.
 * Idempotent: re-running skips rows that already exist (unique on category_slug + title).
 */
import "dotenv/config";
import { db } from "../lib/db";
import { businessFunctionDemos } from "../db/schema";

const SEED_DEMOS = [
  {
    categorySlug: "recruitment-hr" as const,
    title: "Hiring baristas",
    description:
      "See how AI helps Mountain View Coffee recruit and screen barista candidates.",
    narrative:
      "Mountain View Coffee is scaling. Use this demo to explore AI-assisted hiring for front-of-house roles.",
    metadata: { tags: ["HR", "Recruitment"], url: "https://example.com/demo/recruitment-hr/hr-hiring" },
    sortOrder: 0,
  },
  {
    categorySlug: "recruitment-hr" as const,
    title: "Resume screening",
    description: "AI-powered resume screening and candidate shortlisting for open positions.",
    narrative: "Filter and rank applicants for barista and shift lead roles with consistent criteria.",
    metadata: { tags: ["HR", "Recruitment"], url: "https://example.com/demo/recruitment-hr/resume-screening" },
    sortOrder: 1,
  },
  {
    categorySlug: "marketing-seo" as const,
    title: "Seasonal campaigns",
    description: "Promote seasonal drinks and events with AI-driven marketing workflows.",
    narrative:
      "Launch the fall pumpkin spice campaign and see how AI supports content and targeting.",
    metadata: { tags: ["Marketing"], url: "https://example.com/demo/marketing-seo/seasonal-campaigns" },
    sortOrder: 0,
  },
  {
    categorySlug: "customer-support" as const,
    title: "Order issues",
    description: "Handle order complaints and refunds with an AI-assisted support flow.",
    narrative: "A customer's order was wrong. Walk through how support resolves it with AI.",
    metadata: { tags: ["Customer Support"], url: "https://example.com/demo/customer-support/order-issues" },
    sortOrder: 0,
  },
  {
    categorySlug: "finance" as const,
    title: "Invoice processing",
    description: "Extract and match invoices from suppliers.",
    narrative: "From bean orders to equipment—process invoices faster with AI.",
    metadata: { tags: ["Finance"], url: "https://example.com/demo/finance/invoice-processing" },
    sortOrder: 0,
  },
];

async function main() {
  await db
    .insert(businessFunctionDemos)
    .values(SEED_DEMOS)
    .onConflictDoNothing({
      target: [businessFunctionDemos.categorySlug, businessFunctionDemos.title],
    });
  console.log(`Seed demos: ${SEED_DEMOS.length} processed (inserted or skipped on conflict).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
