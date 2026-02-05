/**
 * Config-driven demo catalog for the CoPilot Demo Portal.
 * All demos are contextualized within Mountain View Coffee.
 * Business Functions demos live in mocks/demos/*.json and are read via lib/demos-mock.ts.
 */

// —— Category 2: AI Agents (simulations only, coffee-themed) ——
export type AIAgentDemo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Coffee-themed agent name/personality */
  agentName: string;
  narrative: string;
  type: "simulation";
};

export const AI_AGENT_DEMOS: AIAgentDemo[] = [
  {
    id: "barista-bot",
    slug: "barista-bot",
    title: "Barista Bot",
    description: "A simulated AI agent that helps with drink recommendations and order handling.",
    agentName: "Mocha",
    narrative: "Mocha is Mountain View Coffee's virtual barista—friendly, fast, and always suggesting the right drink.",
    type: "simulation",
  },
  {
    id: "inventory-agent",
    slug: "inventory-agent",
    title: "Inventory assistant",
    description: "Simulated agent that answers questions about stock and reordering.",
    agentName: "Bean Counter",
    narrative: "Bean Counter keeps the back office in order. Ask about beans, supplies, and restock schedules.",
    type: "simulation",
  },
];

// —— Category 3: Industry use cases (external links, "customers" of the coffee shop) ——
export type IndustryDemo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** External URL to the existing demo */
  externalUrl: string;
  industry: string;
  /** Short story: who they are, how they use AI (customer of Mountain View Coffee) */
  customerStory: string;
  type: "external";
};

export const INDUSTRY_DEMOS: IndustryDemo[] = [
  {
    id: "ohio-gratings",
    slug: "ohio-gratings",
    title: "Ohio Gratings",
    description: "Industry-specific AI demo: manufacturing and operations.",
    externalUrl: "https://example.com/ohio-gratings-demo",
    industry: "Manufacturing",
    customerStory: "Ohio Gratings is a long-time customer of Mountain View Coffee. See how they use AI in their manufacturing workflows.",
    type: "external",
  },
  {
    id: "acme-retail",
    slug: "acme-retail",
    title: "Acme Retail",
    description: "AI for retail inventory and customer experience.",
    externalUrl: "https://example.com/acme-retail-demo",
    industry: "Retail",
    customerStory: "Acme Retail stops by for coffee every morning. Discover how they apply AI in their stores.",
    type: "external",
  },
];

// —— Helpers ——
export function getAIAgentBySlug(slug: string): AIAgentDemo | undefined {
  return AI_AGENT_DEMOS.find((d) => d.slug === slug);
}

export function getIndustryDemoBySlug(slug: string): IndustryDemo | undefined {
  return INDUSTRY_DEMOS.find((d) => d.slug === slug);
}
