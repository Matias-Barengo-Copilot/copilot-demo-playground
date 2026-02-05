/**
 * Seed example demos into the demos table.
 * Data mirrors lib/demo-catalog.ts; schema may change when real demos arrive.
 *
 * Usage: npx tsx scripts/seed-demos.ts
 * Requires DATABASE_URL in .env.
 */
import "dotenv/config";
import { db } from "../lib/db";
import { demos } from "../db/schema";

const SEED_DEMOS = [
  // Business Functions
  {
    slug: "hr-hiring",
    category: "business_function" as const,
    title: "HR: Hiring baristas",
    description:
      "See how AI helps Mountain View Coffee recruit and screen barista candidates.",
    narrative:
      "Mountain View Coffee is scaling. Use this demo to explore AI-assisted hiring for front-of-house roles.",
    metadata: { tags: ["HR", "Recruitment"] },
    sortOrder: 0,
  },
  {
    slug: "marketing-seasonal",
    category: "business_function" as const,
    title: "Marketing: Seasonal campaigns",
    description: "Promote seasonal drinks and events with AI-driven marketing workflows.",
    narrative:
      "Launch the fall pumpkin spice campaign and see how AI supports content and targeting.",
    metadata: { tags: ["Marketing"] },
    sortOrder: 1,
  },
  {
    slug: "support-orders",
    category: "business_function" as const,
    title: "Customer support: Order issues",
    description: "Handle order complaints and refunds with an AI-assisted support flow.",
    narrative:
      "A customer's order was wrong. Walk through how support resolves it with AI.",
    metadata: { tags: ["Customer Support"] },
    sortOrder: 2,
  },
  // AI Agents
  {
    slug: "barista-bot",
    category: "ai_agent" as const,
    title: "Barista Bot",
    description:
      "A simulated AI agent that helps with drink recommendations and order handling.",
    narrative:
      "Mocha is Mountain View Coffee's virtual barista—friendly, fast, and always suggesting the right drink.",
    metadata: { agentName: "Mocha" },
    sortOrder: 0,
  },
  {
    slug: "inventory-agent",
    category: "ai_agent" as const,
    title: "Inventory assistant",
    description: "Simulated agent that answers questions about stock and reordering.",
    narrative:
      "Bean Counter keeps the back office in order. Ask about beans, supplies, and restock schedules.",
    metadata: { agentName: "Bean Counter" },
    sortOrder: 1,
  },
  // Industry
  {
    slug: "ohio-gratings",
    category: "industry" as const,
    title: "Ohio Gratings",
    description: "Industry-specific AI demo: manufacturing and operations.",
    narrative:
      "Ohio Gratings is a long-time customer of Mountain View Coffee. See how they use AI in their manufacturing workflows.",
    metadata: {
      externalUrl: "https://example.com/ohio-gratings-demo",
      industry: "Manufacturing",
      customerStory:
        "Ohio Gratings is a long-time customer of Mountain View Coffee. See how they use AI in their manufacturing workflows.",
    },
    sortOrder: 0,
  },
  {
    slug: "acme-retail",
    category: "industry" as const,
    title: "Acme Retail",
    description: "AI for retail inventory and customer experience.",
    narrative:
      "Acme Retail stops by for coffee every morning. Discover how they apply AI in their stores.",
    metadata: {
      externalUrl: "https://example.com/acme-retail-demo",
      industry: "Retail",
      customerStory:
        "Acme Retail stops by for coffee every morning. Discover how they apply AI in their stores.",
    },
    sortOrder: 1,
  },
];

async function main() {
  const result = await db
    .insert(demos)
    .values(SEED_DEMOS)
    .onConflictDoNothing({ target: demos.slug });
  console.log("Seed demos: inserted or skipped (slug conflict). Run count:", SEED_DEMOS.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
